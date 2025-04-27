import { supabase } from './supabase';

export async function fetchAllPhotos(): Promise<string[]> {
  // List all files in the 'photos' bucket
  const { data, error } = await supabase.storage.from('photos').list('', { limit: 100 });
  if (error) {
    console.error('Error fetching photo list:', error.message);
    return [];
  }
  if (!data) return [];
  // Map to public URLs
  return data
    .filter((file) => file.name)
    .map((file) => supabase.storage.from('photos').getPublicUrl(file.name).data.publicUrl);
}
