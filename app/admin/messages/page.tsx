"use client";

import { useEffect, useMemo, useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  message: string;
  status: string;
  createdAt: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadMessages() {
    try {
      const response = await fetch("/api/messages");

      if (!response.ok) {
        throw new Error("Failed to load messages");
      }

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function toggleRead(message: Message) {
    const newStatus =
      message.status === "unread" ? "read" : "unread";

    try {
      const response = await fetch(
        `/api/messages/${message.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update message");
      }

      setMessages((current) =>
        current.map((item) =>
          item.id === message.id
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update message.");
    }
  }

  async function deleteMessage(message: Message) {
    const confirmed = confirm(
      `Delete the message from ${message.name}?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/messages/${message.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      setMessages((current) =>
        current.filter((item) => item.id !== message.id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete message.");
    }
  }

  const unreadCount = messages.filter(
    (message) => message.status === "unread"
  ).length;

  const filteredMessages = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return messages;

    return messages.filter(
      (message) =>
        message.name.toLowerCase().includes(value) ||
        message.email.toLowerCase().includes(value) ||
        message.phone?.toLowerCase().includes(value) ||
        message.projectType
          ?.toLowerCase()
          .includes(value) ||
        message.message.toLowerCase().includes(value)
    );
  }, [messages, search]);

  function whatsappLink(phone: string | null) {
    if (!phone) return "#";

    const cleanNumber = phone.replace(/\D/g, "");

    return `https://wa.me/${cleanNumber}`;
  }

  function emailLink(email: string) {
    return `mailto:${email}`;
  }

  return (
    <main className="min-h-screen bg-[#050507] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
            Admin Dashboard
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <h1 className="text-4xl font-semibold">
              Messages
            </h1>

            {unreadCount > 0 && (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                {unreadCount} unread
              </span>
            )}
          </div>

          <p className="mt-2 text-zinc-500">
            Messages sent through your portfolio contact form.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mt-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-5 py-4 text-sm outline-none focus:border-zinc-500 md:max-w-md"
          />
        </div>

        {/* MESSAGES */}
        <div className="mt-8">

          {loading ? (
            <p className="text-zinc-500">
              Loading messages...
            </p>
          ) : filteredMessages.length === 0 ? (
            <div className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-12 text-center">
              <p className="text-zinc-500">
                {search
                  ? "No messages found."
                  : "No messages yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {filteredMessages.map((message) => {
                const unread =
                  message.status === "unread";

                return (
                  <article
                    key={message.id}
                    className={`rounded-2xl border bg-[#0B0B10] p-6 ${
                      unread
                        ? "border-zinc-700"
                        : "border-zinc-900"
                    }`}
                  >

                    {/* TOP */}
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-xl font-medium">
                            {message.name}
                          </h2>

                          {unread && (
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black">
                              Unread
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-zinc-500">
                          {message.createdAt
                            ? new Date(
                                message.createdAt
                              ).toLocaleString()
                            : ""}
                        </p>
                      </div>

                      {message.projectType && (
                        <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
                          {message.projectType}
                        </span>
                      )}
                    </div>

                    {/* CONTACT INFO */}
                    <div className="mt-6 grid gap-3 border-y border-zinc-900 py-5 md:grid-cols-2">

                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                          Email
                        </p>

                        <a
                          href={emailLink(message.email)}
                          className="mt-1 block text-sm text-zinc-300 hover:text-white"
                        >
                          {message.email}
                        </a>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                          Phone / WhatsApp
                        </p>

                        {message.phone ? (
                          <a
                            href={whatsappLink(message.phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block text-sm text-zinc-300 hover:text-white"
                          >
                            {message.phone}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm text-zinc-600">
                            Not provided
                          </p>
                        )}
                      </div>

                    </div>

                    {/* MESSAGE */}
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-wider text-zinc-600">
                        Message
                      </p>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-zinc-400">
                        {message.message}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 flex flex-wrap gap-2">

                      <button
                        onClick={() =>
                          toggleRead(message)
                        }
                        className="rounded-full border border-zinc-800 px-5 py-2.5 text-sm transition hover:border-zinc-600"
                      >
                        {unread
                          ? "Mark as Read"
                          : "Mark as Unread"}
                      </button>

                      <a
                        href={emailLink(message.email)}
                        className="rounded-full border border-zinc-800 px-5 py-2.5 text-sm transition hover:border-zinc-600"
                      >
                        Email
                      </a>

                      {message.phone && (
                        <a
                          href={whatsappLink(message.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-zinc-800 px-5 py-2.5 text-sm transition hover:border-zinc-600"
                        >
                          WhatsApp
                        </a>
                      )}

                      <button
                        onClick={() =>
                          deleteMessage(message)
                        }
                        className="rounded-full border border-red-900/50 px-5 py-2.5 text-sm text-red-400 transition hover:border-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>
          )}

        </div>
      </div>
    </main>
  );
}