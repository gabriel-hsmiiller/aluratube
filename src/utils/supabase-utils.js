import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://exrauzydhoumewzuuywz.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4cmF1enlkaG91bWV3enV1eXd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzMTI1NjgsImV4cCI6MTk4Mzg4ODU2OH0.tBU3sjqnTAGKL3sZ83oLXTkNW998WgC1zw1L9iH6PXk';
export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);