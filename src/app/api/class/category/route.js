import { deleteCateogry, getAllCategory, postClassCategory, putClassCategory } from "@/lib/controllers/class/categoryController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await postClassCategory(req); 
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};

export const GET=async(req)=>{
  try{
      const data=await getAllCategory(req);
      return NextResponse.json(data);
  }
  catch(e){
    return handleError(NextResponse, e, 500);

  }
}

export const PUT = async (req) => {
  try {
    const data = await putClassCategory(req); 
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};


export const DELETE = async (req) => {
  try {
    const data = await deleteCateogry(req); 
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};
