import prisma from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/helpers/hashing";
import { verifyToken } from "@/lib/helpers/jwt";

export const forget_password = async (req) => {
  try {
    const { email, password, otp } = await req.json();
    const findUser=await prisma.user.findUnique({where:{email:email}});
    if(!findUser){
      return {success:false,msg:"User not found",status:400};
    }
    if (password && email && otp) {
      const { id } = await prisma.otp.findFirst({ where: { otp: otp } });
      await prisma.otp.update({
        where: { id: parseInt(id) },
        data: { isVerify: true },
      });

      const convertPassword = await hashPassword(password);
      const findUser = await prisma.user.findUnique({
        where: { email: email },
      });
      if (findUser) {
        const updatePassword = await prisma.user.update({
          where: { email: email },
          data: { password: convertPassword },
        });
        return {
          success: true,
          msg: "Password Update Successfully",
          data: updatePassword,
          status: 200,
        };
      } else {
        return { success: false, msg: "User not found", status: 400 };
      }
    }
  } catch (e) {
    return { success: false, msg: e.message, status: 400 };
  }
};


export const changePassword=async(req)=>{
  try{
  const {password}=await req.json();
  const authHeader=await req.headers.get("authorization");
  if(!authHeader){
    return {
      success:false,msg:"No Token Provided",status:400
    }}
  const token=authHeader.split(" ")[1];
  const {email}=verifyToken(token);
  if(password){
    const newPassword=await hashPassword(password);
    const updateUser=await prisma.user.update({
      where:{email:email},
      data:{password:newPassword}
    });
    if(updateUser){
      return {
        success:true,
        status:400,
        msg:"Password updated successfully"
      }
    }
  }

  }
  catch(e){
    return {
      success:false,
      msg:e?.message,
      status:500
    }
  }
  
}