import { supabase } from "../lib/supabase";

/**
 * Upload a video file to Supabase Storage
 * @param file - The video file to upload
 * @param fileName - The name for the file (optional, will use original name if not provided)
 * @returns Promise with the public URL of the uploaded video
 */
export async function uploadVideo(
  file: File,
  fileName?: string
): Promise<string> {
  const finalFileName = fileName || `${Date.now()}-${file.name}`;

  // Upload file to Supabase Storage
  const { error } = await supabase.storage
    .from("videos") // You'll need to create this bucket in Supabase
    .upload(`historical/${finalFileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Failed to upload video: ${error.message}`);
  }

  // Get the public URL
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("videos")
    .getPublicUrl(`historical/${finalFileName}`);

  return publicUrl;
}

/**
 * Get a signed URL for a private video (if you want private videos)
 * @param path - The path to the video in storage
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns Promise with the signed URL
 */
export async function getSignedVideoUrl(
  path: string,
  expiresIn: number = 3600
): Promise<string> {
  const { data, error } = await supabase.storage
    .from("videos")
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(`Failed to get signed URL: ${error.message}`);
  }

  return data.signedUrl;
}

/**
 * Delete a video from Supabase Storage
 * @param path - The path to the video in storage
 */
export async function deleteVideo(path: string): Promise<void> {
  const { error } = await supabase.storage.from("videos").remove([path]);

  if (error) {
    throw new Error(`Failed to delete video: ${error.message}`);
  }
}
