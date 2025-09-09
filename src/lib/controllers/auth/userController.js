import prisma from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/helpers/hashing";
import { generateToken, verifyToken } from "@/lib/helpers/jwt";

export const login = async (req) => {
  try {
    const { password, email ,role} = await req.json();
    const findUser = await prisma.user.findFirst({
      where: {
        email: email,
        role: role
      }
    });
    const verifyPassword = await comparePassword(password, findUser?.password);
    if (findUser && verifyPassword) {
      return {
        success: true,
        data: { token: generateToken({ email: email,role:role,id:findUser?.id }) },
        msg: "Login Successfully",
        status: 200,
      };
    } else {
      return { success: false, msg: "User not found", status: 400 };
    }
  } catch (e) {
    return { success: false, msg: e?.message, status: 200 };
  }
};

export const register = async (req) => {
  try {
    const { email, password, name, role, otp, action } = await req.json();

    // Required field check
    if (!email || !password || !name || !role || !otp || !action) {
      return ({ success: false, msg: "All fields are required", status: 400 });
    }

    // Duplicate user check
    const existUser = await prisma.user.findUnique({ where: { email } });
    if (existUser) {
      return ({ success: false, msg: "Email already exists", status: 400 });
    }
    const findOtp = await prisma.otp.findFirst({ where: { email, otp, action } });
    if (!findOtp) {
      return ({ success: false, msg: "Invalid OTP", status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const createUser = await prisma.user.create({
      data: { email, password: hashedPassword, role, name },
    });
   const createdUser=await prisma.user.findUnique({where:{email:email}});
   console.log("createdUser",createdUser);
   if(createdUser){
    const findAdmin=await prisma.user.findFirst({where:{role:"admin"}});
    if(findAdmin){
      console.log("findAdmin", findAdmin);

      await prisma.conversation.create({
        data: {
          userId: createdUser?.id,
          person: findAdmin?.id,
          person_email: findAdmin?.email,
          role: findAdmin?.role,
          person_name:findAdmin?.name,
          image:findAdmin?.image
        }
      });
      
    }
   }
    await prisma.otp.delete({ where: { id: findOtp.id } });
    return ({
      success: true,
      data: createUser,
      msg: "User Registered Successfully",
      status: 201,
    });
  } catch (e) {
    return ({ success: false, msg: e.message, status: 500 });
  }
};

export const getProfile=async(req)=>{
  try{
  const authHeader=await req.headers.get("authorization");
  if(!authHeader){
    return {
      success:false,msg:"No Token Provided",status:400
    }}
  const token=authHeader.split(" ")[1];
  const {email}=verifyToken(token);
  const { password, ...userWithoutPassword }=await prisma.user.findUnique({where:{email:email}});
  
  return {success:true,data:userWithoutPassword,msg:"Get user successfully",status:200}
  }
  catch(e){
    return {success:false, msg:e?.message, status:500}
  }
}