import { deleteSubscribe, getSubscribe, postSubscribe } from "@/lib/controllers/subscribe/subscribeController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
      const data = await postSubscribe(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };
  
  export const GET = async (req) => {
    try {
      const data = await getSubscribe(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };
  
  export const DELETE = async (req) => {
    try {
      const data = await deleteSubscribe(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };