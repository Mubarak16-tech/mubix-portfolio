import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET PROJECT
 * Works with either:
 * /api/projects/meme-coin
 * /api/projects/project-id
 */
export async function GET(
  request: Request,
  { params }: Params
) {
  try {
    const { slug } = await params;

    const project = await prisma.project.findFirst({
      where: {
        OR: [
          {
            id: slug,
          },
          {
            slug: slug,
          },
        ],
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load project",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PATCH PROJECT
 * Used by the admin edit page.
 */
export async function PATCH(
  request: Request,
  { params }: Params
) {
  try {
    const { slug } = await params;

    const body = await request.json();

    const {
      title,
      category,
      description,
      image,
      featured,
      slug: newSlug,
    } = body;

    const existingProject = await prisma.project.findFirst({
      where: {
        OR: [
          {
            id: slug,
          },
          {
            slug: slug,
          },
        ],
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: existingProject.id,
      },
      data: {
        title,
        category,
        description,
        image: image || null,
        featured: Boolean(featured),
        slug: newSlug || existingProject.slug,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error: any) {
    console.error("PATCH PROJECT ERROR:", error);

    // Prisma unique slug error
    if (error?.code === "P2002") {
      return NextResponse.json(
        {
          error: "A project with this slug already exists.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to update project",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * DELETE PROJECT
 * Used by the admin project management page.
 */
export async function DELETE(
  request: Request,
  { params }: Params
) {
  try {
    const { slug } = await params;

    const existingProject = await prisma.project.findFirst({
      where: {
        OR: [
          {
            id: slug,
          },
          {
            slug: slug,
          },
        ],
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          error: "Project not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.project.delete({
      where: {
        id: existingProject.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete project",
      },
      {
        status: 500,
      }
    );
  }
}