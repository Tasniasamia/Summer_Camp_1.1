import { deleteContact, getContact, postContact, replyContact } from "@/lib/controllers/contact/contactController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
      const data = await postContact(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };
  
  export const GET = async (req) => {
    try {
      const data = await getContact(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };


  export const PUT= async (req) => {
    try {
      const data = await replyContact(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };
  
  export const DELETE = async (req) => {
    try {
      const data = await deleteContact(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };