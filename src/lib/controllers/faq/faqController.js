import prisma from "@/lib/db";
import { verifyToken } from "@/lib/helpers/jwt";

export const postFaq=async(req)=>{
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
        msg: "Only admin can add faq",
      };
    }
    const res=await req.json();
    const data=await prisma.faq.create({data: res});
    if(data){
        return {status:200,msg:"Faq created Successfully",success:true}
    }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }

}


export const getFaq=async(req)=>{
    try{
    const data=await prisma.faq.findMany({}) ;
    return {data:data,success:true,status:200} 
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }

}

export const deleteFaq=async(req)=>{
    try{
         const {searchParams}=new URL(req.url);
         const id=searchParams.get('id');
         if(!id){
          return {success:false,msg:"id is required",status:400}
         }
         const deleteData=await prisma.faq.delete({where:{id:parseInt(id)}});
         if(deleteData){
            return {status:200,success:true,msg:"Faq deleted successfully"}
         }
    }
    catch(e){
        return {success:false,msg:e?.message,status:500}
    }
}