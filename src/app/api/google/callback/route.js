import { google } from "googleapis";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
 
// Load credentials
const CREDENTIALS_PATH = path.join(process.cwd(), "config/oauth-client.json");
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
const { client_id, client_secret, redirect_uris } =
  credentials.installed || credentials.web;
 
// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
 
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
 
    if (!code) {
      return NextResponse.json(
        { error: true, message: "No code provided" },
        { status: 400 }
      );
    }
 
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
 
    // Save tokens in DB using Prisma
    await prisma.GoogleToken.upsert({
      where: { id: 1 },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token ?? undefined,
        expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      },
      create: {
        id: 1,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token ?? undefined,
        expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : null,
      },
    });
 
    // ✅ Send success response
    return NextResponse.json({
      success: true,
      message: "Google tokens saved successfully",
      data: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
    });
  } catch (err) {
    console.error("Google Callback Error:", err);
    return NextResponse.json(
      { error: true, message: "Failed to get token", details: err.message },
      { status: 500 }
    );
  }
}
 