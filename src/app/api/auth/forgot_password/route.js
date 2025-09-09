import { forget_password } from "@/lib/controllers/auth/passwordController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await forget_password(req); 
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};
