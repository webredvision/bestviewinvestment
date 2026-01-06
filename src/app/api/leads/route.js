import { ConnectDB } from "@/lib/db/ConnectDB"
import LeadsModel from "@/lib/models/LeadsModel"
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await ConnectDB();
        const { username, mobile, email, message,address } = await request.json()
        // console.log(username)
        // Basic validation
       
        // await transporter.sendMail(mailOptions);
        if (!username || !mobile || !email) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        await LeadsModel.create({
            username,
            mobile,
            email,
            message,
            address,
        })
        return NextResponse.json({ msg: "Created" }, {
            status: 201
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Error sending message." }, {
            status: 500
        })
    }
}


export async function GET(request) {
    try {
        await ConnectDB();
        const leads = await LeadsModel.find({});
        return NextResponse.json({ leads }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        await ConnectDB();
        const id = request.nextUrl.searchParams.get("id")
        await LeadsModel.findByIdAndDelete(id);
        return NextResponse.json({ msg: "Lead deleted" }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


export async function PUT(request) {
    try {
        await ConnectDB();
        const id = request.nextUrl.searchParams.get("id")

        await LeadsModel.findByIdAndUpdate(id, {
            $set: {
                isComplete: true
            }
        });

        return NextResponse.json({ msg: "Lead Updated" }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
