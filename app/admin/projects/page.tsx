"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string | null;
  featured: boolean;
  createdAt: string;
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadProjects();
  }, []);

  async function deleteProject(project: Project) {
    const confirmed = confirm(
      `Delete "${project.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/projects/${project.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects((current) =>
        current.filter((item) => item.id !== project.id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete project.");
    }
  }

  const filteredProjects = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return projects;

    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(value) ||
        project.category.toLowerCase().includes(value)
    );
  }, [projects, search]);

  return (
    <main className="min-h-screen bg-[#050507] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Admin Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-semibold">
              Projects
            </h1>

            <p className="mt-2 text-zinc-500">
              {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            + Add Project
          </Link>
        </div>

        {/* SEARCH */}
        <div className="mt-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-5 py-4 text-sm outline-none focus:border-zinc-500 md:max-w-md"
          />
        </div>

        {/* CONTENT */}
        <div className="mt-8">

          {loading ? (
            <p className="text-zinc-500">
              Loading projects...
            </p>
          ) : filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-12 text-center">
              <p className="text-zinc-500">
                {search
                  ? "No projects match your search."
                  : "No projects yet."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5">

              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col gap-5 rounded-2xl border border-zinc-900 bg-[#0B0B10] p-4 md:flex-row md:items-center"
                >

                  {/* IMAGE */}
                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-zinc-950 md:w-48">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-zinc-700">
                        No image
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-medium">
                        {project.title}
                      </h2>

                      {project.featured && (
                        <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-zinc-300">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-zinc-500">
                      {project.category}
                    </p>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600">
                      {project.description}
                    </p>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex shrink-0 gap-2">

                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="rounded-full border border-zinc-800 px-5 py-2.5 text-sm transition hover:border-zinc-600"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProject(project)}
                      className="rounded-full border border-red-900/50 px-5 py-2.5 text-sm text-red-400 transition hover:border-red-700 hover:text-red-300"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </main>
  );
}