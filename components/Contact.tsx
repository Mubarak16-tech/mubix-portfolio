"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send message."
        );
      }

      setSuccess(
        "Your message has been sent successfully. I'll get back to you soon."
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
    } catch (err) {
      console.error("CONTACT FORM ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="px-6 py-24 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Get In Touch
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Let's work together.
          </h2>

          <p className="mt-5 text-zinc-500">
            Have a project in mind? Send me a message and
            tell me what you need. I'll get back to you as
            soon as possible.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-12 max-w-3xl space-y-6"
        >

          {/* NAME */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm text-zinc-400"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-zinc-400"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
            />
          </div>

          {/* PHONE / WHATSAPP */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm text-zinc-400"
            >
              Phone / WhatsApp Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+234 800 000 0000"
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
            />

            <p className="mt-2 text-xs text-zinc-600">
              Add your WhatsApp number if you prefer to be
              contacted there.
            </p>
          </div>

          {/* PROJECT TYPE */}
          <div>
            <label
              htmlFor="projectType"
              className="mb-2 block text-sm text-zinc-400"
            >
              Project Type
            </label>

            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition focus:border-zinc-500"
            >
              <option value="">
                Select project type
              </option>

              <option value="Web Development">
                Web Development
              </option>

              <option value="Web Design">
                Web Design
              </option>

              <option value="UI/UX Design">
                UI/UX Design
              </option>

              <option value="App Development">
                App Development
              </option>

              <option value="Graphic Design">
                Graphic Design
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* MESSAGE */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-sm text-zinc-400"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={7}
              required
              className="w-full resize-none rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-500"
            />
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="rounded-xl border border-green-900/50 bg-green-950/20 px-5 py-4 text-sm text-green-400">
              {success}
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="rounded-xl border border-red-900/50 bg-red-950/20 px-5 py-4 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={sending}
            className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
    </section>
  );
}