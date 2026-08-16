"use client";

import { useEffect, useState } from "react";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string | null;
  featured: boolean;
};

const INITIAL_PROJECTS = 6;
const LOAD_AMOUNT = 3;

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const visibleProjects = projects.slice(0, visibleCount);

  const hasMore = visibleCount < projects.length;

  function loadMore() {
    setVisibleCount((current) =>
      Math.min(current + LOAD_AMOUNT, projects.length)
    );
  }

  if (loading) {
    return (
      <section
        id="projects"
        className="px-6 py-24 md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-zinc-500">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            My Work
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Selected Projects
          </h2>

          <p className="mt-4 max-w-2xl text-zinc-500">
            A collection of websites, applications and digital
            experiences I've designed and developed.
          </p>
        </div>

        {/* EMPTY STATE */}
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-10 text-center">
            <p className="text-zinc-500">
              Projects coming soon.
            </p>
          </div>
        ) : (
          <>
            {/* PROJECT GRID */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <article
                  key={project.id}
                  className="group overflow-hidden rounded-2xl border border-zinc-900 bg-[#0B0B10] transition duration-500 hover:-translate-y-1 hover:border-zinc-700"
                >
                  {/* IMAGE */}
                  <div className="aspect-[16/10] overflow-hidden bg-zinc-950">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-700">
                        No image
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.15em] text-zinc-600">
                      {project.category}
                    </p>

                    <h3 className="mt-2 text-xl font-medium">
                      {project.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
                      {project.description}
                    </p>

                    <a
                      href={`/projects/${project.slug}`}
                      className="mt-5 inline-block text-sm text-zinc-400 transition hover:text-white"
                    >
                      View Project →
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* LOAD MORE */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={loadMore}
                  className="rounded-full border border-zinc-800 px-7 py-3 text-sm font-medium transition hover:border-zinc-500 hover:bg-white hover:text-black"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}