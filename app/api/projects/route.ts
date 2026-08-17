import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        {
          featured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.title ||
      !body.slug ||
      !body.category ||
      !body.description
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: {
        slug: body.slug,
      },
    });

    if (existingProject) {
      return NextResponse.json(
        { error: "A project with this slug already exists." },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        description: body.description,
        image: body.image || null,
        websiteUrl: body.websiteUrl || null,
        featured: Boolean(body.featured),
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 }
    );
  }
}