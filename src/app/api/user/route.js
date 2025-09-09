import { deleteController, getUsers, postUser, updateUser } from "@/lib/controllers/users/userController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export async function GET(req) {
  try{
    const data=await getUsers(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}

export async function POST(req) {
  try{
    const data=await postUser(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}

export async function PUT(req) {
  try{
    const data=await updateUser(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}

export async function DELETE(req) {
  try{
    const data=await deleteController(req);
    return NextResponse.json(data);
}
   catch(e){
  return handleError(NextResponse, e, 500);

}
}
