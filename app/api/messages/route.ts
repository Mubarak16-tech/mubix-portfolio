import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        {
          error: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        projectType: body.projectType || null,
        message: body.message,
        status: "unread",
      },
    });

    return NextResponse.json(message, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE MESSAGE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}