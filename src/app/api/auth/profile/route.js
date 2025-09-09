import { getProfile } from "@/lib/controllers/auth/userController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const data = await getProfile(req); 
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};
