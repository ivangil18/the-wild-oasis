import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qjivsaxsizwgxzqzzgiq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaXZzYXhzaXp3Z3h6cXp6Z2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4MTgwNjAsImV4cCI6MjAwOTM5NDA2MH0.LM1oOS1Ucs2UXfdBcdB_Xi_fDg2q7YsCno95cVd_L3E";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
