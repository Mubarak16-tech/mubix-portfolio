"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050507] px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-zinc-900 bg-[#0B0B10] p-8"
      >
        <h1 className="text-3xl font-semibold">Mubix Admin</h1>

        <p className="mt-2 text-sm text-zinc-600">
          Sign in to manage your portfolio.
        </p>

        <div className="mt-8 space-y-4">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded-xl border border-zinc-800 bg-transparent p-4 outline-none"
          />

          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded-xl border border-zinc-800 bg-transparent p-4 outline-none"
          />
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <button className="mt-6 w-full rounded-full bg-white py-4 font-semibold text-black">
          Sign In
        </button>
      </form>
    </main>
  );
}