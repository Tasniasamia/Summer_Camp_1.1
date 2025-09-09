import { enrollClass, getEnrollClass, updateEnrollClass } from "@/lib/controllers/class/enrollClassController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await enrollClass(req);
    return NextResponse.json(data); // <-- সরাসরি object
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
}


export async function PUT(req) {
  try{
    const data=await updateEnrollClass(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}

export async function GET(req) {
  try{
    const data=await getEnrollClass(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}
