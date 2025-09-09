import prisma from "@/lib/db";

export const failedSSLcommerze=async(req)=>{
    try{
    const {searchParams}=new URL(req.url);
    const resourceType=searchParams.get("resourceType");
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");
    const amount = formData.get("amount");
    const currency = formData.get("currency");
    const classInfo = JSON.parse(formData.get("value_a") || '{}');
    const userInfo = JSON.parse(formData.get("value_b") || '{}');
    if (tran_id) {
    if(resourceType === "course"){
    await prisma.enrollClass.update({
           where: { transactionId: tran_id },
           data: { status: "failed" },
         });
    }
    else{
      await prisma.purchasePackage.update({
        where: { transactionId: tran_id },
        data: { status: "paid" },
      });
    }
    }

    return `http://localhost:3000/payment/failed?tran_id=${tran_id}&amount=${amount}&currency=${currency}`
    
}
catch(err){
    return {success:false,status:500,msg:err?.message}
}
}