import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";

export const postContact=async(req)=>{
   try{
    const {email,message,phone,name}=await req.json();
    if(!email || !message || !phone ||  !name ){
        return {
            success:false,
            msg:"All values are required",
            status:400
        }
    }
    const data=await prisma.contact.create({data:{email:email,message:message,phone:phone,name:name}});
    if(data){
        return {status:200,msg:"Contact creatd successfully",success:true}
    }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }

}


export const getContact=async(req)=>{
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
            msg: "Only admin can get contact list",
          };
        }
        const {searchParams}=new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search");
        const id=searchParams.get('id');
        if(id){
            const findContact=await prisma.contact.findUnique({where:{id:parseInt(id)}});
            return {data:findContact,msg:"Get data successfully",status:200}
        }
        if (page || limit || search) {
          const skip = (page - 1) * limit;
          const findSearch = search ? { name: { contains: search } } : {};
          const [docs, totalDocs] = await Promise.all([
            prisma.contact.findMany({
              skip,
              take: limit,
              orderBy: { createdAt: "desc" },
              where: {
                ...findSearch        
              }
            }),
            prisma.contact.count(),
          ]);
          const totalPages = Math.ceil(totalDocs / limit);
          const responseData = {
            success: true,
            statusCode: 200,
            message: "Contacts fetched successfully",
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
            msg: "Get contacts successfully",
            status: 200,
            success: true,
          };
        }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }

}

export const replyContact=async(req)=>{
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
            msg: "Only admin can reply for contact",
          };
        }
        const {reply,id,isReply}=await req.json();
        if(isReply){
            const addReply=await prisma.contact.update({where:{id:parseInt(id)},data:{reply:reply,isReply:true}})
            if(addReply){
                return {status:200,msg:"post reply successfully",success:true}
            }
        }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }
}

export const deleteContact=async(req)=>{
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
            msg: "Only admin can delete contacts",
          };
        }
         const {searchParams}=new URL(req.url);
         const id=searchParams.get('id');
         if(!id){
          return {success:false,msg:"id is required",status:400}
         }
         const deleteData=await prisma.contact.delete({where:{id:parseInt(id)}});
         if(deleteData){
            return {status:200,success:true,msg:"Contact deleted successfully"}
         }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }
}