import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
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
      notFound();
    }

    return (
      <main className="min-h-screen bg-[#050507] px-6 py-24 text-white md:px-10">
        <div className="mx-auto max-w-6xl">

          <Link
            href="/#projects"
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to Projects
          </Link>

          <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-900 bg-[#0B0B10]">

            {project.image && (
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="p-8 md:p-12">

              <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
                {project.category}
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                {project.title}
              </h1>

              <p className="mt-8 max-w-3xl whitespace-pre-line text-base leading-8 text-zinc-400 md:text-lg">
                {project.description}
              </p>

            </div>
          </div>

        </div>
      </main>
    );
  } catch (error) {
    console.error("PROJECT PAGE ERROR:", error);
    throw error;
  }
}