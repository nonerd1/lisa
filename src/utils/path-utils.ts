/**
 * Normalizes a path by ensuring it starts with a slash
 */
export function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

/**
 * Creates a full path including the application's base path if it exists
 */
export function getFullPath(path: string): string {
  // Normalize the path
  const normalizedPath = normalizePath(path);
  
  // Return the normalized path
  return normalizedPath;
}

/**
 * Resolves a path for assets - simplified version without runtime config
 */
export function resolvePath(path: string): string {
  // If the path already starts with http or https, it's an external URL and we don't modify it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If path doesn't start with a slash, add one
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Return the normalized path
  return normalizedPath;
} 