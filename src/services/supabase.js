import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://byfohktztfzvtpmhguwa.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5Zm9oa3R6dGZ6dnRwbWhndXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NDA3MDYsImV4cCI6MjA0NjExNjcwNn0.NAHZz7uYtms9IFX92tG1mtR1AQGeYeEx7jKVwT3R9k4";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
