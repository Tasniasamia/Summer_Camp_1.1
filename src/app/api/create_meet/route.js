import { google } from "googleapis";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { summary, description, startTime, endTime, attendees } = await req.json();

    if (!summary || !description || !startTime || !endTime) {
      return NextResponse.json(
        { error: "summary, description, startTime, endTime required" },
        { status: 400 }
      );
    }

    // Fetch saved token
    const tokenData = await prisma.GoogleToken.findUnique({ where: { id: 1 } });
    if (!tokenData) {
      return NextResponse.json({ error: "Google tokens not found" }, { status: 400 });
    }

    // Setup OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.ClIENT_SECRET,
      process.env.REDIRECT_URL
    );
   
  
    oauth2Client.setCredentials({
      access_token: tokenData.accessToken,
      refresh_token: tokenData.refreshToken,
      expiry_date: tokenData.expiryDate ? new Date(tokenData.expiryDate).getTime() : null,
    });

    // Refresh access token if needed
    const accessTokenResponse = await oauth2Client.getAccessToken();
    if (!accessTokenResponse || !accessTokenResponse.token) {
      return NextResponse.json({ error: "Failed to refresh Google access token" }, { status: 500 });
    }

    oauth2Client.setCredentials({
      access_token: accessTokenResponse.token,
      refresh_token: tokenData.refreshToken,
    });

    // Save refreshed token in DB
    await prisma.GoogleToken.update({
      where: { id: 1 },
      data: {
        accessToken: accessTokenResponse.token,
        refreshToken: tokenData.refreshToken,
        expiryDate: new Date(Date.now() + 3600 * 1000), // 1 hour expiry
      },
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    // console.log("calender",calendar)

    // Event resource
    const event = {
      summary,
      description,
      start: { dateTime: new Date(startTime).toISOString(), timeZone: "Asia/Dhaka" },
      end: { dateTime: new Date(endTime).toISOString(), timeZone: "Asia/Dhaka" },
      attendees: attendees.map(a => ({ email: a.email })), // ensure proper format
      conferenceData: {
        createRequest: {
          requestId: uuidv4(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };
 
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
      sendUpdates: "all",
    });

    // Save in DB
    const savedMeeting = await prisma.meeting.create({
      data: {
        summary,
        description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        attendees: JSON.stringify(attendees || []),
        meetLink: response.data.hangoutLink || "",
        eventId: response.data.id || "",
      },
    });

    return NextResponse.json({
      meetLink: savedMeeting.meetLink,
      eventId: savedMeeting.eventId,
    });
  } catch (err) {
    console.error("Google Meet creation error:", err);
    return NextResponse.json(
      { error: "Failed to create meeting", details: err.message },
      { status: 500 }
    );
  }
}
