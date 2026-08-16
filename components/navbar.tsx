"use client";

import { useState } from "react";
import Image from "next/image";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Projects", id: "projects" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">

        {/* LOGO */}
         <a
              href="#home"
              className="flex items-center"
            >
              <Image
                src="/images/mubix-logo.png"
                alt="Mubix"
                width={70}
                height={70}  
                priority
              />
            </a>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* DESKTOP CONTACT BUTTON */}
        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 md:block"
        >
          Let's Talk
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-black/40 text-white backdrop-blur-md md:hidden"
        >
          {menuOpen ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <span className="text-xl leading-none">☰</span>
          )}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="border-t border-zinc-900 bg-black/95 px-6 py-5 backdrop-blur-xl md:hidden">

          <div className="flex flex-col">

            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="border-b border-zinc-900 py-4 text-left text-base text-zinc-300 transition hover:text-white"
              >
                {item.name}
              </button>
            ))}

            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-5 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Let's Talk
            </button>

          </div>
        </div>
      )}
    </header>
  );
}