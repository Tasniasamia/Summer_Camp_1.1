import prisma from "@/lib/db";

export async function GET(req) {
    const url = new URL(req.url);
    const transaction = url.searchParams.get("transaction");
    const resourceType=url.searchParams.get("resourceType");
    // DB update
    if(resourceType === "course"){
      await prisma.enrollClass.updateMany({
        where: { transactionId: transaction },
        data: { status: "cancel" },
      });
    }
    else{
      await prisma.enrollClass.update({
        where: {transactionId: transaction },
        data: { status: "paid" },
      });
    }
   
  
    // redirect user
    return Response.redirect(`${process.env.BASE_URL}/payment/cancel`);
  }
  