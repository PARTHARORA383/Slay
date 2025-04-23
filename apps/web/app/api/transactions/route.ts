
import { NextRequest, NextResponse } from "next/server.js";
import { prisma } from "@repo/db/client";



export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing userId in query parameters' },
        { status: 400 }
      );
    }

    const transactions = await prisma.onRampTransaction.findMany({
      where: { userId : parseInt(userId) },
    });

    return NextResponse.json(
      { success: true, transactions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}