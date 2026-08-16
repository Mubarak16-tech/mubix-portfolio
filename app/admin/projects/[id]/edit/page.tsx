"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  image: string | null;
  featured: boolean;
};

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        const response = await fetch(
          `/api/projects/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Project not found");
        }

        const data = await response.json();

        setProject(data);
        setImage(data.image || "");
      } catch (error) {
        console.error(error);
        alert("Failed to load project.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [params.id]);

  async function uploadImage(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
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
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!project) return;

    setSaving(true);

    try {
      const response = await fetch(
        `/api/projects/${project.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: project.title,
            slug: project.slug,
            category: project.category,
            description: project.description,
            image: image || null,
            featured: project.featured,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update project"
        );
      }

      alert("Project updated successfully.");

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update project."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject() {
    if (!project) return;

    const confirmed = confirm(
      `Delete "${project.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/projects/${project.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete project.");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050507] p-10 text-white">
        Loading project...
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-[#050507] p-10 text-white">
        Project not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050507] px-6 py-10 text-white md:px-10">
      <div className="mx-auto max-w-4xl">

        <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
          Admin / Projects / Edit
        </p>

        <h1 className="mt-3 text-4xl font-semibold">
          Edit Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-7"
        >

          {/* TITLE */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Project Title
            </label>

            <input
              value={project.title}
              onChange={(e) =>
                setProject({
                  ...project,
                  title: e.target.value,
                })
              }
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 outline-none focus:border-zinc-500"
            />
          </div>

          {/* SLUG */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Slug
            </label>

            <input
              value={project.slug}
              onChange={(e) =>
                setProject({
                  ...project,
                  slug: e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "-"),
                })
              }
              required
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 outline-none focus:border-zinc-500"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Category
            </label>

            <select
              value={project.category}
              onChange={(e) =>
                setProject({
                  ...project,
                  category: e.target.value,
                })
              }
              className="w-full rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 outline-none"
            >
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
              Description
            </label>

            <textarea
              value={project.description}
              onChange={(e) =>
                setProject({
                  ...project,
                  description: e.target.value,
                })
              }
              rows={7}
              required
              className="w-full resize-none rounded-xl border border-zinc-800 bg-[#0B0B10] px-4 py-4 outline-none focus:border-zinc-500"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="mb-3 block text-sm text-zinc-400">
              Project Image
            </label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();

                const file = e.dataTransfer.files?.[0];

                if (file) {
                  uploadImage(file);
                }
              }}
              className="relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-800 bg-[#0B0B10] p-5"
            >
              {image ? (
                <div>
                  <img
                    src={image}
                    alt={project.title}
                    className="mx-auto max-h-[400px] rounded-xl object-contain"
                  />

                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="mt-4 rounded-full border border-zinc-800 px-5 py-2 text-sm text-zinc-400 hover:text-white"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                  <p className="text-lg">
                    {uploading
                      ? "Uploading..."
                      : "Drag & Drop image here"}
                  </p>

                  {!uploading && (
                    <label className="mt-5 cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">
                      Browse from PC

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (file) {
                            uploadImage(file);
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* FEATURED */}
          <label className="flex items-center gap-3 rounded-xl border border-zinc-900 bg-[#0B0B10] p-5">
            <input
              type="checkbox"
              checked={project.featured}
              onChange={(e) =>
                setProject({
                  ...project,
                  featured: e.target.checked,
                })
              }
            />

            <span className="text-sm">
              Featured Project
            </span>
          </label>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3 border-t border-zinc-900 pt-7">

            <button
              type="submit"
              disabled={saving || uploading}
              className="rounded-full bg-white px-7 py-3 font-semibold text-black disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() =>
                router.push("/admin/projects")
              }
              className="rounded-full border border-zinc-800 px-7 py-3"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={deleteProject}
              className="rounded-full border border-red-900/60 px-7 py-3 text-red-400"
            >
              Delete Project
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}