"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 md:px-10 lg:px-20"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[140px]" />

      <div className="mx-auto w-full max-w-7xl">

        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-2 w-2 rounded-full bg-purple-500" />

          <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Full-Stack Developer · UI/UX Designer
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          I design & build
          <br />

          <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
            digital experiences.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 max-w-2xl text-base leading-7 text-zinc-500 md:text-lg"
        >
          I'm Mubix, a Full-Stack Web Developer and UI/UX Designer
          focused on creating modern, interactive, and purposeful
          websites and web applications.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03]"
          >
            View My Work
            <span>↗</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-800 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-600 hover:text-white"
          >
            Let's Work Together
          </a>
        </motion.div>

        {/* Bottom information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 flex flex-col gap-6 border-t border-zinc-900 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-700">
              Based in
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Nigeria · Available Worldwide
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-700">
              Currently
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Available for freelance projects
            </p>
          </div>

          <div className="hidden sm:block">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-700">
              Scroll
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              ↓ Explore
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}