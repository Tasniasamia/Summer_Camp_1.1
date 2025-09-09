import prisma from "@/lib/db";

export const successSSLcommerze = async (req) => {
  try {
    const {searchParams}=new URL(req.url);
    const resourceType=searchParams.get("resourceType");
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    const amount = formData.get("amount");
    const currency = formData.get("currency");

    if (!tran_id) {
      return { msg: "Transaction ID missing", success: false, status: 400 };
    }
    if(resourceType=="course"){
    // Find enrollClass
    const enroll = await prisma.enrollClass.findUnique({
      where: { transactionId: tran_id },
    });

    if (!enroll) {
      return { msg: "Enrollment not found", success: false, status: 404 };
    }

    const classId = enroll.classId;
    const userId = enroll.userId;

    const findClass = await prisma.class.findUnique({ where: { id: classId } });

    if (findClass) {
      await prisma.class.update({
        where: { id: classId },
        data: {
          sit: { decrement: 1 },
          enrollment: { increment: 1 },
        },
      });

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

    await prisma.enrollClass.update({
      where: { transactionId: tran_id },
      data: { status: "paid" },
    });
  }
  else{
    await prisma.purchasePackage.update({
      where: { transactionId: tran_id },
      data: { status: "paid" },
    });
    
  }
  return `http://localhost:3000/payment/success?tran_id=${tran_id}&amount=${amount}&currency=${currency}`;
  } catch (e) {
    return { msg: e?.message, success: false, status: 500 };
  }
};
