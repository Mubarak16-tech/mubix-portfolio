import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const message = await prisma.message.update({
      where: {
        id,
      },
      data: {
        status: body.status || "read",
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("UPDATE MESSAGE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update message." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.message.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete message." },
      { status: 500 }
    );
  }
}