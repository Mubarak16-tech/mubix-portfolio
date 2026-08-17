"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [creating, setCreating] = useState(false);

  async function uploadImage(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be less than 10MB.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setImage(data.url);
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title || !slug || !category || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    setCreating(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          category,
          description,
          image: image || null,
          websiteUrl: websiteUrl.trim() || null,
          featured,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      alert("Project created successfully!");

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error("CREATE PROJECT ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create project"
      );
    } finally {
      setCreating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050507] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
            Admin / Projects
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Add New Project
          </h1>

          <p className="mt-2 text-zinc-500">
            Add a project to your portfolio.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-8"
        >

          {/* PROJECT TITLE */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Project Title *
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);

                if (!slug) {
                  setSlug(createSlug(e.target.value));
                }
              }}
              placeholder="e.g. Mubix E-commerce Website"
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition focus:border-zinc-500"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Project Slug *
            </label>

            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(createSlug(e.target.value))}
              placeholder="mubix-ecommerce-website"
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition focus:border-zinc-500"
            />

            <p className="mt-2 text-xs text-zinc-700">
              Used for the project's URL.
            </p>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Category *
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none focus:border-zinc-500"
            >
              <option value="">Select category</option>

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

          {/* DESCRIPTION */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Description *
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the project..."
              rows={7}
              required
              className="w-full resize-none rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition focus:border-zinc-500"
            />
          </div>

          {/* WEBSITE URL */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Website URL{" "}
              <span className="text-zinc-600">
                (Optional)
              </span>
            </label>

            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 text-white outline-none transition focus:border-zinc-500"
            />

            <p className="mt-2 text-xs text-zinc-700">
              Add the live website link if this project has one.
              Leave it empty if it does not.
            </p>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="mb-3 block text-sm text-zinc-400">
              Project Image
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => {
                setDragging(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);

                const file = e.dataTransfer.files?.[0];

                if (file) {
                  uploadImage(file);
                }
              }}
              className={`relative flex min-h-[300px] items-center justify-center rounded-2xl border-2 border-dashed transition ${
                dragging
                  ? "border-white bg-white/10"
                  : "border-zinc-800 bg-[#0B0B10]"
              }`}
            >
              {image ? (
                /* IMAGE PREVIEW */
                <div className="relative w-full p-5">

                  <img
                    src={image}
                    alt="Project preview"
                    className="mx-auto max-h-[400px] rounded-xl object-contain"
                  />

                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute right-7 top-7 rounded-full bg-black px-4 py-2 text-sm text-white transition hover:bg-zinc-800"
                  >
                    Remove
                  </button>

                </div>
              ) : (
                /* UPLOAD AREA */
                <div className="flex flex-col items-center justify-center p-8 text-center">

                  {uploading ? (
                    <>
                      <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-white" />

                      <p className="font-medium">
                        Uploading image...
                      </p>

                      <p className="mt-2 text-sm text-zinc-600">
                        Please wait
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl">
                        📁
                      </div>

                      <p className="mt-4 text-lg font-medium">
                        Drag & Drop your image here
                      </p>

                      <p className="mt-2 text-sm text-zinc-600">
                        or
                      </p>

                      <label className="mt-5 cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200">
                        Browse from PC

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                              uploadImage(file);
                            }
                          }}
                        />
                      </label>

                      <p className="mt-4 text-xs text-zinc-700">
                        PNG, JPG or WEBP • Maximum 10MB
                      </p>
                    </>
                  )}

                </div>
              )}
            </div>
          </div>

          {/* FEATURED */}
          <div className="rounded-2xl border border-zinc-900 bg-[#0B0B10] p-5">
            <label className="flex cursor-pointer items-center gap-3">

              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4"
              />

              <div>
                <p className="text-sm font-medium">
                  Featured Project
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Show this project prominently on your portfolio.
                </p>
              </div>

            </label>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 border-t border-zinc-900 pt-8">

            <button
              type="submit"
              disabled={creating || uploading}
              className="rounded-full bg-white px-7 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating
                ? "Creating..."
                : "Create Project"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full border border-zinc-800 px-7 py-3 text-sm transition hover:border-zinc-600"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}