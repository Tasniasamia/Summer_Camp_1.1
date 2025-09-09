import { successStripe } from "@/lib/controllers/payment/stripe/success";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const data = await successStripe(req);

    if (typeof data === "string") {
      return Response.redirect(data);
    } else {
      return NextResponse.json(data, { status: data?.status || 500 });
    }
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
}
