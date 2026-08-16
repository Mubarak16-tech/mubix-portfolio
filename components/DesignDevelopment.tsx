"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "Understand the idea, users, goals, and problems before writing a single line of code.",
    label: "Research & Strategy",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "Turn ideas into clear user flows, wireframes, interfaces, and interactive prototypes.",
    label: "UI/UX & Prototyping",
  },
  {
    number: "03",
    title: "DEVELOP",
    description:
      "Transform the approved design into a fast, responsive, and scalable web application.",
    label: "Frontend & Backend",
  },
  {
    number: "04",
    title: "LAUNCH",
    description:
      "Test, optimize, deploy, and continuously improve the finished digital product.",
    label: "Testing & Deployment",
  },
];

export default function DesignDevelopment() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:px-10 lg:px-20">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500 md:text-sm">
            Design × Development
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            From an idea
            <br />
            to a{" "}
            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              real product.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
            I combine UI/UX design with full-stack development to take
            digital products from the first idea to a finished,
            production-ready experience.
          </p>
        </div>

        {/* Process */}
        <div className="relative mt-20">

          {/* Connecting line */}
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent md:block" />

          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="group relative"
              >
                <div className="grid gap-6 rounded-2xl border border-zinc-900 bg-[#0B0B10] p-6 transition-all duration-300 hover:border-zinc-700 md:grid-cols-[80px_220px_1fr] md:items-center md:p-8">

                  {/* Number */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-[#0B0B10] text-xs font-medium text-zinc-500 transition-colors group-hover:border-purple-500/50 group-hover:text-purple-400">
                    {step.number}
                  </div>

                  {/* Title */}
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      {step.label}
                    </p>

                    <h3 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                      {step.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="max-w-xl text-sm leading-6 text-zinc-500 md:text-base">
                    {step.description}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 border-t border-zinc-900 pt-8"
        >
          <p className="text-sm text-zinc-600">
            ONE PERSON.{" "}
            <span className="text-zinc-300">
              FROM DESIGN TO DEPLOYMENT.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}