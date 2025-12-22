import { createAvatarFilename } from "./stringUtils";

/**
 * Creates a complete image URL for an owner's avatar
 */
export function getOwnerAvatarUrl(ownerName: string): string {
  return `/images/owner_pictures/${createAvatarFilename(ownerName)}.webp`;
}
