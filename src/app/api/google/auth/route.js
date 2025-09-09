import { google } from "googleapis";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

const CREDENTIALS_PATH = path.join(process.cwd(), "config/oauth-client.json");
const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
const { client_id, client_secret, redirect_uris } = credentials.web;

const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

export async function GET() {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/calendar.events",
      "https://www.googleapis.com/auth/calendar"
    ],
    prompt: "consent",
  });

  return NextResponse.json({ url: authUrl });
}
