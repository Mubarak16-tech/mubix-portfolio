import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050507] px-6 py-24 text-white md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <Link
          href="/#projects"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to Projects
        </Link>

        {/* PROJECT */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-900 bg-[#0B0B10]">

          {/* IMAGE */}
          {project.image && (
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="p-8 md:p-12">

            {/* CATEGORY */}
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
              {project.category}
            </p>

            {/* TITLE */}
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              {project.title}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 max-w-3xl whitespace-pre-line text-base leading-8 text-zinc-400 md:text-lg">
              {project.description}
            </p>

            {/* WEBSITE BUTTON */}
            {project.websiteUrl && (
              <div className="mt-10">
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Visit Website →
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}