import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getIsOwner, getHeroPhoto, setHeroPhoto } from "@/lib/site.functions";
import { Upload, LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Manage hero photo — Moaz Naser Portfolio" },
      { name: "description", content: "Upload and replace the portfolio hero photo." },
      { property: "og:title", content: "Manage hero photo" },
      { property: "og:description", content: "Owner tools for the portfolio hero photo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [cacheBust, setCacheBust] = useState(0);

  const ownerFn = useServerFn(getIsOwner);
  const photoFn = useServerFn(getHeroPhoto);
  const saveFn = useServerFn(setHeroPhoto);

  const owner = useQuery({ queryKey: ["is-owner"], queryFn: () => ownerFn({}) });
  const photo = useQuery({ queryKey: ["hero-photo"], queryFn: () => photoFn({}) });

  async function handleFile(file: File) {
    if (!ALLOWED.includes(file.type)) {
      toast.error("Please choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Image must be under 8 MB.");
      return;
    }
    setUploading(true);
    try {
      const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
      const path = `hero/portrait-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("site-photos")
        .upload(path, file, { contentType: file.type, upsert: true });
      if (uploadError) throw uploadError;

      await saveFn({ data: { path } });
      await queryClient.invalidateQueries({ queryKey: ["hero-photo"] });
      setCacheBust(Date.now());
      toast.success("Hero photo updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (owner.isLoading) {
    return <p className="p-10 text-sm text-muted-foreground">Loading…</p>;
  }

  if (!owner.data?.isOwner) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="surface-card max-w-sm p-8 text-center">
          <h1 className="text-xl font-semibold">Not authorized</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account isn&apos;t the site owner.
          </p>
          <button onClick={signOut} className="mt-6 text-sm text-primary underline-offset-4 hover:underline">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <Link to="/" className="eyebrow">
          ← Back to portfolio
        </Link>
        <button
          onClick={signOut}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>

      <h1 className="mt-8 text-3xl font-bold">Hero photo</h1>
      <p className="mt-2 text-muted-foreground">
        Upload a portrait to use as the background of your homepage hero. Landscape or
        portrait images both work — the photo is cropped to fill the screen.
      </p>

      <div className="surface-card mt-8 overflow-hidden">
        <div className="aspect-[16/9] w-full bg-secondary/40">
          {photo.data?.path ? (
            <img
              src={`/api/public/hero-photo?v=${cacheBust || photo.data.updatedAt}`}
              alt="Current hero photo"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No photo uploaded yet
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 p-6">
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
          <button
            onClick={() => fileInput.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            style={{ backgroundImage: "var(--gradient-gold)" }}
          >
            <Upload className="size-4" />
            {uploading ? "Uploading…" : photo.data?.path ? "Replace photo" : "Upload photo"}
          </button>
          <span className="text-xs text-muted-foreground">JPG, PNG or WebP · up to 8 MB</span>
        </div>
      </div>
    </div>
  );
}
