import prisma from "@/lib/db";
import {  verifyToken } from "@/lib/helpers/jwt";

export const getUsers=async(req)=>{
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
          return { msg: "Unautorized Access" ,success:false, status: 401 };
        }
        const token = authHeader.split(" ")[1];
        const payload=verifyToken(token);
        if(payload?.role === "admin"){
          const {searchParams}=new URL(req.url);
          const page = parseInt(searchParams.get("page"));
          const limit = parseInt(searchParams.get("limit"));
          const search = searchParams.get("search");
          if (page || limit || search) {
            const skip = (page - 1) * limit;
            const findSearch = search ? { name: { contains: search } } : {};
            const [docs, totalDocs] = await Promise.all([
              prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                where: findSearch,
              }),
              prisma.user.count(),
            ]);
            const totalPages = Math.ceil(totalDocs / limit);
            const responseData = {
              success: true,
              statusCode: 200,
              message: "Users fetched successfully",
              data: {
                docs,
                totalDocs,
                limit,
                page,
                totalPages,
                pagingCounter: skip + 1,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
              },
            };
            return {
              data: responseData,
              msg: "Get users successfully",
              status: 200,
              success: true,
            };
          } 
          else {
            const alldata = await prisma.user.findMany({});
            return {
              data: alldata,
              msg: "Get user successfully",
              status: 200,
              success: true,
            };
          }
        }
      } 
      catch (error) {
        return {success:false,msg:error.message ,status:500}
      }
}


export const postUser=async(req)=>{
  try {
    const data = await req.json();
    const { email, password, address, phone_number, image, role, name } = data;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return {user:existingUser, success:false,msg: "User already exists" ,status:400}
    }
    const newUser = await prisma.user.create({
      data: { email, password, address, phone_number, image, role, name },
    });
    return { data: newUser, token,success:true , status: 201 };
  } catch (error) {
    return {success:false,msg:error.message ,status:500}
  }
}

export const updateUser=async(req)=>{
  try {
    const headers=req.headers.get("authorization");
    if(!headers){
      return {
        success:false,
        msg:"Unauthorized Access",
        status:401
      }
    }
    const token=headers.split(" ")[1];
    const {email,id,role}=verifyToken(token);
    const findUser=await prisma.user.findUnique({where:{email:email}});
    if(findUser){
      const data = await req.json();
      const {address,phone_number,image,role,name } = data;
     if (!id) {
        return { msg: "User id is required" ,status: 400,success:false }
      }
     const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { address, phone_number, image, role, name },
      });
      return {data:updatedUser,msg:"User updated successfully",success:true,status:200};
    }
    else{
      return {success:false,status:400,msg:"Invalid User"}
    }
    
  } catch (error) {
    return {success:false,msg:error.message ,status:500}
  }
}

export const deleteController=async(req)=>{
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "No token provided" }), { status: 401 });
    }
    const token = authHeader.split(" ")[1];
    const payload=verifyToken(token);
    const url = new URL(req.url);
    let id = url.searchParams.get("id");
    if (!id) {
      const body = await req.json();
      id = body.id;
    }
   if (!id) {
      return ({ msg: "User id is required" ,success:false, status: 400});
    }
     const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
   return ({ msg: "User deleted successfully" ,success:true, status: 200});
  } catch (error) {
    return {success:false,msg:error.message ,status:500}

  }
}