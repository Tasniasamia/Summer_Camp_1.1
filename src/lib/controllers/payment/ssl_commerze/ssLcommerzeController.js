import prisma from "@/lib/db";

export const ssLcommerzeController = async ({
  user,
  data,
  resourceType,
  transaction,
}) => {
  const payload = {
    store_id: process.env.STORE_ID,
    store_passwd: process.env.STORE_PASSWORD,
    total_amount: data.price,
    currency: "USD",
    tran_id: transaction,
    success_url: `http://localhost:3000/api/payment/success?resourceType=${resourceType}`,
    fail_url: `http://localhost:3000/api/payment/fail?resourceType=${resourceType}`,
    cancel_url: `http://localhost:3000/api/payment/cancel?resourceType=${resourceType}`,
    cus_name: user.name,
    cus_email: user.email,
    cus_add1: user.address || "Dhaka",
    cus_phone: user.phone_number || "01921",
    cus_country: "Bangladesh",
    cus_city: "Dhaka",
    shipping_method: "NO",
    product_name: data.name || "Test Product",
    product_category: "General",
    product_profile: "general",
    status: "pending",
  };

  // 5. Initiate payment
  const response = await fetch(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(payload),
    }
  );

  const result = await response.json();
  console.log("SSLCommerz result:", result);

  if (result.status === "SUCCESS") {
    // 6. Create enrollClass record
    if (resourceType === "course") {
      const addEnroll = await prisma.enrollClass.create({
        data: {
          name: user.name,
          classId: data?.id,
          userId: user?.id,
          status: "pending",
          transactionId: transaction,
          payment: "sslcommerze",
        },
      });
    } else if (resourceType === "package"){
      const {id}=user;
      const findUser=await prisma.purchasePackage.findUnique({where:{userId:id}});
      if(findUser){
        if(findUser?.packageId===data?.id && findUser?.status === "paid"){
          return {
            msg: "You have already bought this package", success: false, status: 400
          }
        }else{
          await prisma.purchasePackage.update({
            where:{userId:id},
            data: {
              name: user?.name,
              packageId: data?.id,
              userId: user?.id,
              status: "pending",
              transactionId: transaction,
              payment: "sslcommerze",
            },
          });
        }
    
      }
      else{
        await prisma.purchasePackage.create({
          data: {
            name: user?.name,
            packageId: data?.id,
            userId: user?.id,
            status: "pending",
            transactionId: transaction,
            payment: "sslcommerze",
          },
        });
      }
    }

    return { GatewayPageURL: result.GatewayPageURL, success: true };
  } else {
    return {
      success: false,
      msg: "Payment initiation failed",
      data: result,
      status: 400,
    };
  }
};
