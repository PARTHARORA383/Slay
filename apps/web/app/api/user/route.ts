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

export const GET = async ()=>{
const users = await prisma.onRampTransaction.findMany()

return NextResponse.json({
  users
})

}