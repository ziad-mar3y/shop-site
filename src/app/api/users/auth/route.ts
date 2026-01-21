import { NextResponse } from "next/server";


interface users {
    name : string
    email : string
}

    const users : users[] = []


export async function GET() {
    

    return NextResponse.json(users)
}


export async function POST(req : Request) {

    const body = await req.json()

    users.push(body)
    return NextResponse.json({
        message : "success",
        data : users
    })

}