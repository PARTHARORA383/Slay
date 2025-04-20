import { NextResponse } from "next/server.js";
import { prisma } from "@repo/db/client";


export const POST = async () => {
    await prisma.user.create({
        data: {
            email: "afasdffdasadsfsd",
            name: "adsads"
        }
    })
    return NextResponse.json({
        message: "hi there"
    })
}