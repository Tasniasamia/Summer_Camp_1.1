import { getPage, postPage } from "@/lib/controllers/settings/settingsController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
      const data = await postPage(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };
  
  export const GET = async (req) => {
    try {
      const data = await getPage(req);
      return NextResponse.json(data);
    } catch (e) {
      return handleError(NextResponse, e, 500);
    }
  };