import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [unreadMessages, totalMessages, totalProjects, featuredProjects] =
    await Promise.all([
      prisma.message.count({
        where: {
          status: "unread",
        },
      }),

      prisma.message.count(),

      prisma.project.count(),

      prisma.project.count({
        where: {
          featured: true,
        },
      }),
    ]);

  return (
    <main className="min-h-screen bg-[#050507] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
            Admin Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Welcome back
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage your portfolio, projects and client messages.
          </p>
        </div>

        {/* STATS */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* UNREAD */}
          <Link
            href="/admin/messages"
            className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition hover:border-zinc-700"
          >
            <p className="text-sm text-zinc-500">
              Unread Messages
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {unreadMessages}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              View messages →
            </p>
          </Link>

          {/* TOTAL MESSAGES */}
          <Link
            href="/admin/messages"
            className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition hover:border-zinc-700"
          >
            <p className="text-sm text-zinc-500">
              Total Messages
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {totalMessages}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              Manage messages →
            </p>
          </Link>

          {/* PROJECTS */}
          <Link
            href="/admin/projects"
            className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition hover:border-zinc-700"
          >
            <p className="text-sm text-zinc-500">
              Total Projects
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {totalProjects}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              Manage projects →
            </p>
          </Link>

          {/* FEATURED */}
          <Link
            href="/admin/projects"
            className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition hover:border-zinc-700"
          >
            <p className="text-sm text-zinc-500">
              Featured Projects
            </p>

            <p className="mt-3 text-4xl font-semibold">
              {featuredProjects}
            </p>

            <p className="mt-2 text-xs text-zinc-600">
              View projects →
            </p>
          </Link>

        </div>

        {/* QUICK ACTIONS */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">

            <Link
              href="/admin/projects/new"
              className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition hover:border-zinc-700"
            >
              <p className="text-lg font-medium">
                Add Project
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Add a new project to your portfolio.
              </p>

              <p className="mt-5 text-sm text-zinc-300">
                Create Project →
              </p>
            </Link>

            <Link
              href="/admin/projects"
              className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition hover:border-zinc-700"
            >
              <p className="text-lg font-medium">
                Manage Projects
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Edit, delete and feature your projects.
              </p>

              <p className="mt-5 text-sm text-zinc-300">
                View Projects →
              </p>
            </Link>

            <Link
              href="/admin/messages"
              className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition hover:border-zinc-700"
            >
              <p className="text-lg font-medium">
                Client Messages
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Read and respond to potential clients.
              </p>

              <p className="mt-5 text-sm text-zinc-300">
                View Messages →
              </p>
            </Link>

          </div>
        </section>

        {/* STATUS */}
        <section className="mt-10 rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6">
          <div className="flex items-center justify-between">

            <div>
              <h2 className="font-medium">
                Portfolio Status
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Your portfolio backend is connected.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

              <span className="text-sm text-green-400">
                Online
              </span>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}