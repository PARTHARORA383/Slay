import { prisma } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server.js";


export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId in query parameters' },
        { status: 400 }
      );
    }

    const balance = await prisma.balance.findFirst({
      where: { userId : parseInt(userId) },
    });

    return NextResponse.json(
      { success: true, balance },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}