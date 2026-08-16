"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Full-Stack Development",
  "UI/UX Design",
  "Web Applications",
  "Business Websites",
];

const socials = [
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-zinc-900 px-6 pb-8 pt-20 md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Top */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#home"
              className="inline-flex items-center"
            >
              <Image
                src="/images/mubix-logo.png"
                alt="Mubix"
                width={110}
                height={36}
              />
            </a>

            <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-500">
              Full-Stack Web Developer and UI/UX Designer creating
              modern, interactive, and useful digital experiences.
            </p>

            <a
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-purple-400"
            >
              Start a project
              <span>→</span>
            </a>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              Navigation
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-fit text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              Services
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <span
                  key={service}
                  className="text-sm text-zinc-500"
                >
                  {service}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              Connect
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-sm text-zinc-500 transition-colors hover:text-white"
                >
                  {social.name} ↗
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-zinc-900" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 text-sm md:flex-row md:items-center md:justify-between">

          <p className="text-zinc-600">
            © {new Date().getFullYear()} Mubix. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <p className="text-zinc-700">
              Designed & Built by Mubix
            </p>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all hover:border-zinc-600 hover:text-white"
            >
              ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}