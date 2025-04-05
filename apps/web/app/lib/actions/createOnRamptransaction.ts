"use server";

import {prisma} from "@repo/db/client";



export async function createOnRampTransaction(provider: string, amount: number , token : string) {
    // Ideally the token should come from the banking provider (hdfc/axis)
    console.log("🟢 Server Action Triggered: createOnRampTransaction"); // ✅ Debug log

    await prisma.onRampTransaction.create({  

        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number("5"),
            amount: amount * 100
        }
    });

    console.log("🟢 Transaction Created Successfully"); // ✅

    return {
        message: "Done"
    }
}
