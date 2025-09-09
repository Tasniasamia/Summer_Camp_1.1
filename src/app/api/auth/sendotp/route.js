import { sendOtp } from "@/lib/controllers/auth/otpController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await sendOtp(req); // data can be object now, not string
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};
