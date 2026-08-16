"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We start by understanding the idea, goals, target users, requirements, and the problem the product needs to solve.",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "I turn the idea into user flows, wireframes, UI designs, and interactive prototypes before development begins.",
  },
  {
    number: "03",
    title: "DEVELOP",
    description:
      "I transform the approved design into a responsive and functional application using modern frontend and backend technologies.",
  },
  {
    number: "04",
    title: "TEST",
    description:
      "I test the application across devices and screen sizes, fix issues, improve performance, and make sure everything works as expected.",
  },
  {
    number: "05",
    title: "LAUNCH",
    description:
      "Once everything is ready, I deploy the product and make sure it is properly configured for real users.",
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 md:text-sm">
            How I Work
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            A simple process.
            <span className="block bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              A better product.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            Every project follows a clear process designed to keep the
            work organized, transparent, and focused on the final goal.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative mt-20">

          {/* Timeline line */}
          <div className="absolute left-[19px] top-5 hidden h-[calc(100%-40px)] w-px bg-gradient-to-b from-purple-500 via-blue-500/50 to-cyan-400/20 md:block" />

          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="group relative"
              >
                <div className="grid gap-6 rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition-all duration-300 hover:border-zinc-700 md:grid-cols-[40px_180px_1fr] md:items-center md:p-8">

                  {/* Number */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-[#0B0B10] text-xs font-semibold text-zinc-500 transition-all duration-300 group-hover:border-purple-500/50 group-hover:text-purple-400">
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="max-w-2xl text-sm leading-6 text-zinc-500 md:text-base">
                    {step.description}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col gap-5 border-t border-zinc-900 pt-8 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-zinc-300">
              Have an idea in mind?
            </p>

            <p className="mt-1 text-sm text-zinc-600">
              Let's turn it into something real.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-800 px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-zinc-600 hover:bg-white/[0.03]"
          >
            Start a Project
            <span>→</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}