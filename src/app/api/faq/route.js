import { deleteFaq, getFaq, postFaq } from "@/lib/controllers/faq/faqController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
      const data = await postFaq(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };
  
  export const GET = async (req) => {
    try {
      const data = await getFaq(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };
  
  export const DELETE = async (req) => {
    try {
      const data = await deleteFaq(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };