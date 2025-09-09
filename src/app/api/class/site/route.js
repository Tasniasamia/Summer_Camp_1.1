import { getAllClass } from "@/lib/controllers/class/classController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try{
      const data=await getAllClass(req);
      return NextResponse.json(data);
  }
     catch(e){
    return handleError(NextResponse, e, 500);
  
  }
  };