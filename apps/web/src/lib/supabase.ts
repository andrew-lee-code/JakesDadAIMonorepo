import { createClient } from "@supabase/supabase-js";
import type { Database } from "@jakes-dad/shared";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error("Missing VITE_SUPABASE_URL environment variable");
}

if (!supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_ANON_KEY environment variable");
}

// Create and export the Supabase client with typed database schema
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
