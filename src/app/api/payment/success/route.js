import { successSSLcommerze } from "@/lib/controllers/payment/ssl_commerze/success";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await successSSLcommerze(req);

    if (typeof data === "string") {
      return Response.redirect(data);
    } else {
      return NextResponse.json(data, { status: data?.status || 500 });
    }
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
}
