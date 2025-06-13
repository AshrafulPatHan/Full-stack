// src/app/api/notices/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  const newNotice = new Notice({
    title: body.title,
    description: body.description,
  });

  const saved = await newNotice.save();
  return NextResponse.json(saved);
}

export async function GET() {
  await dbConnect();
  const notices = await Notice.find();
  return NextResponse.json(notices);
}
