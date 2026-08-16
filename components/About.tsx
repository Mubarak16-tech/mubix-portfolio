"use client";

import { motion } from "framer-motion";
import { aboutContent } from "@/data/about";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-32 md:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md overflow-hidden rounded-3xl border border-zinc-900 bg-[#0B0B10]">

              {/* Glow */}
              <div
                className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[100px]"
                aria-hidden="true"
              />

              {/* Mubix Logo / Identity */}
              <div className="relative flex h-full items-center justify-center">
               
                  <Image
                    src="/images/mubix-logo.png"
                    alt="Mubix"
                    width={450}
                    height={450}
                    priority
                  />
              </div>

              {/* Corner label */}
              <div className="absolute bottom-6 left-6 rounded-full border border-zinc-800 bg-black/30 px-4 py-2 text-xs text-zinc-500 backdrop-blur-md">
                Full-Stack + UI/UX
              </div>

            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >

            <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 md:text-sm">
              {aboutContent.eyebrow}
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              {aboutContent.heading}
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
              {aboutContent.description}
            </p>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500">
              {aboutContent.secondaryDescription}
            </p>

            {/* Strengths */}
            <div className="mt-10">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-600">
                What I Bring
              </p>

              <div className="flex flex-wrap gap-2">
                {aboutContent.strengths.map((strength) => (
                  <span
                    key={strength}
                    className="rounded-full border border-zinc-800 bg-[#0B0B10] px-4 py-2 text-sm text-zinc-400 transition-all duration-200 hover:border-purple-500/40 hover:text-white"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.03]"
              >
                Let's Work Together
                <span>→</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center rounded-full border border-zinc-800 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-600 hover:text-white"
              >
                View My Work
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}