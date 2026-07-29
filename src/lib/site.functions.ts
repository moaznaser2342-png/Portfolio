import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

/** Public: returns the storage path of the current hero photo (or null). */
export const getHeroPhoto = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("site_settings")
    .select("hero_photo_url, updated_at")
    .eq("id", "main")
    .maybeSingle();
  return { path: data?.hero_photo_url ?? null, updatedAt: data?.updated_at ?? null };
});

/** Is the signed-in user the site owner? */
export const getIsOwner = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { count } = await context.supabase
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("user_id", context.userId)
      .eq("role", "owner");
    return { isOwner: (count ?? 0) > 0 };
  });

/** Owner-only: point the hero at a newly uploaded storage object. */
export const setHeroPhoto = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({ path: z.string().min(1).max(300).regex(/^hero\/[A-Za-z0-9._-]+$/) })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("site_settings")
      .update({ hero_photo_url: data.path, updated_at: new Date().toISOString() })
      .eq("id", "main");
    if (error) throw new Error(error.message);
    return { ok: true };
  });
