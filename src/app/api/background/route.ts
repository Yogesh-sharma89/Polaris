import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(){
    await inngest.send({
        name:'execute/ai',
        data:{}
    })

    return NextResponse.json({status:'Background job started'})
}