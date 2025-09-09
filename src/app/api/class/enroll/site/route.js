import { getEnrolledClass } from "@/lib/controllers/class/enrollClassController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try{
        const data=await getEnrolledClass(req);
        return NextResponse.json(data);
    }
       catch(e){
      return handleError(NextResponse, e, 500);
    
    }
};
