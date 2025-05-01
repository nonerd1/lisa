import getConfig from 'next/config';

/**
 * Resolves a path to include the basePath when deployed on GitHub Pages
 * or other platforms with a base path
 */
export function resolvePath(path: string): string {
  const { publicRuntimeConfig } = getConfig();
  
  // If the path already starts with http or https, it's an external URL and we don't modify it
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // If path doesn't start with a slash, add one
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Add the base path if it exists in the config
  return publicRuntimeConfig?.basePath 
    ? `${publicRuntimeConfig.basePath}${normalizedPath}`
    : normalizedPath;
} 