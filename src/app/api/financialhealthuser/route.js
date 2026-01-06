import { ConnectDB } from "@/lib/db/ConnectDB"
import FinancialHealthUsersModel from "@/lib/models/FinancialHealthUsersModel";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await ConnectDB();
        const users = await FinancialHealthUsersModel.find({});
        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
