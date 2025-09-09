import { deleteClass, getClass, postClass, updateClass } from "@/lib/controllers/class/classController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST=async(req)=>{
  try{
    const data=await postClass(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}


export const GET = async (req) => {
  try{
    const data=await getClass(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
};




export const PUT = async (req) => {
  try{
    const data=await updateClass(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
};


export async function DELETE(req) {
  try{
    const data=await deleteClass(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}
