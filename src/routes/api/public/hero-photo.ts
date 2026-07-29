import { createFileRoute } from "@tanstack/react-router";

/**
 * Streams the current hero photo from private storage so visitors can see it
 * without the bucket being public.
 */
export const Route = createFileRoute("/api/public/hero-photo")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: settings } = await supabaseAdmin
          .from("site_settings")
          .select("hero_photo_url")
          .eq("id", "main")
          .maybeSingle();

        const path = settings?.hero_photo_url;
        if (!path || !/^hero\/[A-Za-z0-9._-]+$/.test(path)) {
          return new Response("Not found", { status: 404 });
        }

        const { data: file, error } = await supabaseAdmin.storage
          .from("site-photos")
          .download(path);
        if (error || !file) return new Response("Not found", { status: 404 });

        return new Response(await file.arrayBuffer(), {
          headers: {
            "content-type": file.type || "image/jpeg",
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});
