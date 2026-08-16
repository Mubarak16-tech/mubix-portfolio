"use client";

import { motion } from "framer-motion";

const developmentServices = [
  "Business Websites",
  "E-commerce",
  "SaaS Applications",
  "Dashboards",
  "Fintech Platforms",
  "Social Platforms",
  "AI Applications",
];

const designServices = [
  "UI Design",
  "UX Design",
  "Design Systems",
  "Wireframing",
  "Prototyping",
  "Responsive Design",
  "Product Design",
];

export default function Services() {
  return (
    <section
      id="services"
      className="border-t border-zinc-900 px-6 py-24 md:px-10 md:py-32 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              What I do
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-white md:text-6xl">
              Design thinking.
              <br />
              <span className="text-zinc-600">
                Full-stack execution.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-500 md:text-lg">
              I combine UI/UX design with full-stack development to
              turn ideas into polished, functional digital products.
            </p>
          </motion.div>
        </div>

        {/* Services */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">

          {/* Development */}
          <ServiceCard
            number="01"
            title="Development"
            description="I build modern, responsive and scalable websites and web applications from frontend to backend."
            services={developmentServices}
            accent="purple"
          />

          {/* Design */}
          <ServiceCard
            number="02"
            title="UI/UX Design"
            description="I design clear, intuitive and visually engaging interfaces that make digital products easier to use."
            services={designServices}
            accent="blue"
          />

        </div>
      </div>
    </section>
  );
}

type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
  services: string[];
  accent: "purple" | "blue";
};

function ServiceCard({
  number,
  title,
  description,
  services,
  accent,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-[#0B0B10] p-7 transition-colors duration-300 hover:border-zinc-700 md:p-9"
    >
      {/* Glow */}
      <div
        className={`pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full blur-[100px] transition-opacity duration-500 ${
          accent === "purple"
            ? "bg-purple-600/10 group-hover:bg-purple-600/20"
            : "bg-blue-600/10 group-hover:bg-blue-600/20"
        }`}
      />

      <div className="relative">

        {/* Number */}
        <div className="flex items-center justify-between">
          <span className="text-xs tracking-[0.2em] text-zinc-700">
            {number}
          </span>

          <span className="text-zinc-700 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-16 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-500 md:text-base">
          {description}
        </p>

        {/* Service list */}
        <div className="mt-10 border-t border-zinc-900">
          {services.map((service, index) => (
            <div
              key={service}
              className="flex items-center justify-between border-b border-zinc-900 py-4"
            >
              <span className="text-sm text-zinc-400 transition-colors group-hover:text-zinc-200">
                {service}
              </span>

              <span className="text-xs text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}