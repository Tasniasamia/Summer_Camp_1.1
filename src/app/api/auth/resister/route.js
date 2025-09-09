import { register } from "@/lib/controllers/auth/userController";
import { handleError } from "@/lib/helpers/errorHandler"
import { NextResponse } from "next/server"

export const POST=async(req)=>{
    try{
        const result=await register(req);
        return NextResponse.json(result, { status: result.status }); // 👈 fix
    }
    catch(e){
        return handleError(NextResponse, e, 500);
    }
}