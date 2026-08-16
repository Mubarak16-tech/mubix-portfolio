"use client";

import { motion } from "framer-motion";
import { techStack } from "@/data/tech-stack";

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden px-6 py-32 md:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 md:text-sm">
            My Toolkit
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Technologies I use
            <span className="block bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              to build.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            A combination of modern development technologies and design
            tools that help me turn ideas into complete digital products.
          </p>
        </div>

        {/* Technology Categories */}
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {techStack.map((stack, index) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition-colors duration-300 hover:border-zinc-700 md:p-8"
            >
              {/* Category */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {stack.category}
                </h3>

                <span className="text-xs text-zinc-700">
                  0{index + 1}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
                {stack.description}
              </p>

              {/* Technologies */}
              <div className="mt-7 flex flex-wrap gap-2">
                {stack.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-zinc-800 bg-[#08080c] px-3 py-2 text-xs text-zinc-400 transition-all duration-200 hover:border-purple-500/40 hover:text-white"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex flex-col gap-4 border-t border-zinc-900 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-sm text-zinc-600">
            ALWAYS LEARNING. ALWAYS BUILDING.
          </p>

          <p className="text-sm text-zinc-500">
            The right tool for the right problem.
          </p>
        </motion.div>

      </div>
    </section>
  );
}