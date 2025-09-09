export async function GET(req) {
    const url = new URL(req.url);
    const transaction = url.searchParams.get("transaction");
  
    // DB update
    await prisma.enrollClass.updateMany({
      where: { transactionId: transaction },
      data: { status: "failed" },
    });
  
    // redirect user
    return Response.redirect(`${process.env.BASE_URL}/payment/failed`);
  }
  