import {
  deletePackage,
  getPackage,
  postPackage,
  updatePackage,
} from "@/lib/controllers/package/packageController";
import { handleError } from "@/lib/helpers/errorHandler";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await postPackage(req);
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};

export const GET = async (req) => {
  try {
    const data = await getPackage(req);
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};

export const PUT = async (req) => {
  try {
    const data = await updatePackage(req);
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};

export const DELETE = async (req) => {
  try {
    const data = await deletePackage(req);
    return NextResponse.json(data);
  } catch (e) {
    return handleError(NextResponse, e, 500);
  }
};
