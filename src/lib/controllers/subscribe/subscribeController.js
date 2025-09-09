import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";

export const postSubscribe=async(req)=>{
   try{
    const {email}=await req.json();
    if(!email){
        return {
            success:false,
            msg:"email required",
            status:400
        }
    }
    const data=await prisma.subscribe.create({data:{email:email}});
    if(data){
        return {status:200,msg:"Subscribe successfully",success:true}
    }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }

}


export const getSubscribe=async(req)=>{
    try{
        const authHeader = req.headers.get("authorization"); // fixed typo
        if (!authHeader) {
          return { success: false, status: 401, msg: "Unauthorized access" };
        }
        const token = authHeader.split(" ")[1];
        const payload = verifyToken(token);
    
        if (payload?.role !== "admin") {
          return {
            status: 403,
            success: false,
            msg: "Only admin can get subscribers",
          };
        }
        const {searchParams}=new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search");
        if (page || limit || search) {
          const skip = (page - 1) * limit;
          const findSearch = search ? { name: { contains: search } } : {};
          const [docs, totalDocs] = await Promise.all([
            prisma.subscribe.findMany({
              skip,
              take: limit,
              orderBy: { createdAt: "desc" },
              where: {
                ...findSearch        
              }
            }),
            prisma.subscribe.count(),
          ]);
          const totalPages = Math.ceil(totalDocs / limit);
          const responseData = {
            success: true,
            statusCode: 200,
            message: "Subscribers fetched successfully",
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
            msg: "Get subscribers successfully",
            status: 200,
            success: true,
          };
        }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }

}

export const deleteSubscribe=async(req)=>{
    try{
        const authHeader = req.headers.get("authorization"); // fixed typo
        if (!authHeader) {
          return { success: false, status: 401, msg: "Unauthorized access" };
        }
        const token = authHeader.split(" ")[1];
        const payload = verifyToken(token);
    
        if (payload?.role !== "admin") {
          return {
            status: 403,
            success: false,
            msg: "Only admin can delete subscribers",
          };
        }
         const {searchParams}=new URL(req.url);
         const id=searchParams.get('id');
         if(!id){
          return {success:false,msg:"id is required",status:400}
         }
         const deleteData=await prisma.subscribe.delete({where:{id:parseInt(id)}});
         if(deleteData){
            return {status:200,success:true,msg:"Subscriber deleted successfully"}
         }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }
}