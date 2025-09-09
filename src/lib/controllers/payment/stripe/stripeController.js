import Stripe from "stripe";
import prisma from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeController = async ({
  user,
  data,
  resourceType,
  transaction,
}) => {
  try {
    if (resourceType === "course") {
      await prisma.enrollClass.create({
        data: {
          name: user.name,
          classId: data.id,
          userId: user.id,
          status: "pending",
          transactionId: transaction,
          payment: "stripe",
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
    // 2. Stripe Checkout Session create
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "crypto"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: data.name,
            },
            unit_amount: data.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/api/payment/stripe/success?transaction=${transaction}&resourceType=${resourceType}`,
      cancel_url: `${process.env.BASE_URL}/api/payment/stripe/cancel?transaction=${transaction}&resourceType=${resourceType}`,
      metadata: {
        transactionId: transaction,
        userId: user.id,
        classId: data.id,
      },
    });

    // 3. Redirect URL return
    return { url: session.url, success: true };
  } catch (err) {
    return { success: false, msg: err.message };
  }
};
