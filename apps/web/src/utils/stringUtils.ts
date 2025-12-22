/**
 * Capitalizes the first letter of each word in a string
 */
export function capitalizeName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Creates a filename for an owner's avatar image
 */
export function createAvatarFilename(ownerName: string): string {
  return ownerName.toLowerCase().replace(/\s+/g, "");
}
