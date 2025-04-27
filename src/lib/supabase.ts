"use client";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://regjmsradwfmqfkzcepq.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlZ2ptc3JhZHdmbXFma3pjZXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzNzA4MjAsImV4cCI6MjAyODk0NjgyMH0.Nh83ebqzf8TZFr3Syk5_7-2YGGcGEyMkGX0dnwIYPbo';

export const supabase = createClient(supabaseUrl, supabaseKey);
