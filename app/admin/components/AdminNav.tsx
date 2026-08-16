"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  {
    name: "Dashboard",
    href: "/admin",
  },
  {
    name: "Projects",
    href: "/admin/projects",
  },
  {
    name: "Messages",
    href: "/admin/messages",
  },
];

export default function AdminNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 border-r border-zinc-900 bg-[#050507] p-6 lg:block">
        <div className="flex h-full flex-col">

          <Link
            href="/admin"
            className="text-xl font-bold tracking-tight text-white"
          >
            MUBIX
          </Link>

          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-600">
            Admin
          </p>

          <nav className="mt-10 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  isActive(link.href)
                    ? "bg-white text-black"
                    : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            target="_blank"
            className="mt-auto block rounded-xl border border-zinc-900 px-4 py-3 text-center text-sm text-zinc-500 transition hover:border-zinc-700 hover:text-white"
          >
            View Portfolio ↗
          </Link>

        </div>
      </aside>

      {/* MOBILE HEADER */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-[#050507] lg:hidden">

        <div className="flex h-16 items-center justify-between px-5">

          <Link
            href="/admin"
            className="text-lg font-bold tracking-tight text-white"
          >
            MUBIX
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle admin menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 text-zinc-300 transition hover:border-zinc-600 hover:text-white"
          >
            {menuOpen ? (
              <span className="text-xl">×</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-zinc-900 px-5 py-4">

            <nav className="space-y-2">

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm transition ${
                    isActive(link.href)
                      ? "bg-white text-black"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/"
                target="_blank"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl border border-zinc-900 px-4 py-3 text-sm text-zinc-400 transition hover:border-zinc-700 hover:text-white"
              >
                View Portfolio ↗
              </Link>

            </nav>

          </div>
        )}

      </header>
    </>
  );
}