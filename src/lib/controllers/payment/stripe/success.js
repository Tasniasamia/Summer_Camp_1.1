import prisma from "@/lib/db";

export const successStripe = async (req) => {
  try {
    const url = new URL(req.url);
    const transactionId = url.searchParams.get("transaction");
    const resourceType = url.searchParams.get("resourceType");
    if (!transactionId) {
      return { msg: "Transaction ID missing", success: false, status: 400 };
    }
    
    if(resourceType==="course"){
    // Find enrollment
    const enroll = await prisma.enrollClass.findUnique({
      where: { transactionId },
    });

    if (!enroll) {
      return { msg: "Enrollment not found", success: false, status: 404 };
    }

    const classId = enroll.classId;
    const userId = enroll.userId;
    // Update class seats
    const findClass = await prisma.class.findUnique({ where: { id: classId } });
    if (findClass) {
      await prisma.class.update({
        where: { id: classId },
        data: {
          sit: { decrement: 1 },
          enrollment: { increment: 1 },
        },
      });

      // Create conversation between student and instructor
      const instructor = await prisma.user.findUnique({ where: { id: findClass.instructorId } });
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (instructor && user) {
        await prisma.conversation.createMany({
          data: [
            {
              userId: userId,
              person: instructor.id,
              person_name: instructor.name,
              person_email: instructor.email,
              role: instructor.role,
              image: instructor.image,
            },
            {
              userId: instructor.id,
              person: user.id,
              person_name: user.name,
              person_email: user.email,
              role: user.role,
              image: user.image,
            },
          ],
        });
      }
    }
    // Update enrollment status
    await prisma.enrollClass.update({
      where: {transactionId: transactionId },
      data: { status: "paid" },
    });
  }
  else{
    await prisma.purchasePackage.update({
      where: {transactionId: transactionId },
      data: { status: "paid" },
    });
  }


    // Redirect URL return
    return `http://localhost:3000/payment/success?tran_id=${transactionId}`;
  } catch (e) {
    return { msg: e?.message, success: false, status: 500 };
  }
};
