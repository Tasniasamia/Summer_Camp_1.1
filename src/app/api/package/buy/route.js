import { buyPacakge, getPackageByUser } from "@/lib/controllers/package/packageController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";
  
  export const POST = async (req) => {
    try {
      const data = await buyPacakge(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };
  
  export const GET=async(req)=>{
    try {
      const data = await getPackageByUser(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  }