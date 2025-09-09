import prisma from "@/lib/db";

export const sendOtp = async (req) => {
  try {
    const { email, action } = await req.json();
    if (!action || !email) {
      return { success: false, msg: "Value is missing", status: 500 };
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    if (action === "registration") {
      const existingUser = await prisma.user.findFirst({ where: { email } });
      if (existingUser) {
        return { success: false, msg: "Email already exists", status: 400 };
      }
    } else if (action == "forget_password") {
      const existingUser = await prisma.user.findFirst({ where: { email } });
      if (!existingUser) {
        return { success: false, msg: "Email not registered", status: 400 };
      }
    } else {
      return { success: false, msg: "Invalid data", status: 400 };
    }
    const existingOtp = await prisma.otp.findFirst({
      where: { email, action },
    });

    if (existingOtp) {
      await prisma.otp.update({
        where: { id: existingOtp.id },
        data: { otp },
      });
    } else {
      await prisma.otp.create({
        data: { email, otp, action },
      });
    }
    return { success: true, action,otp, msg: `Please check your email`, status: 200 };
  } catch (error) {
    return { success: false, msg: error.message, status: 500 };
  }
};

export const verifiyOtp = async (req) => {
  try {
    const { otp } = await req.json();
    const verifyUser = await prisma.otp.findFirst({ where: { otp: otp } });
    const { id } = verifyUser;
    if (id) {
      await prisma.otp.update({
        where: { id: parseInt(id) },
        data: { isVerify: true },
      });
      return { success: true, msg: "Verified Successfully", status: 200 };
    }
    return { success: false, msg: "Not Verified", status: 400 };
  } catch (error) {
    return { success: false, msg: error.message, status: 500 };
  }
};
