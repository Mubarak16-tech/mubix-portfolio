import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, projectType, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing." },
        { status: 400 }
      );
    }

    const contact = await prisma.message.create({
      data: {
        name,
        email,
        phone,
        projectType,
        message,
      },
    });

    return NextResponse.json(
      { success: true, contact },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}