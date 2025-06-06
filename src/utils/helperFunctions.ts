/**
 * Capitalize first char of a given string
 * @param str
 */
export function capitalizeFirstChar(str: string): string {
  const strClean = str?.trim();
  if (!strClean) {
    return str;
  }
  return strClean.charAt(0).toUpperCase() + strClean.slice(1);
}

/**
 * Validates URL
 * @param url
 */
export function isURLValid(url: string): boolean {
  let validUrl: URL;

  try {
    validUrl = new URL(url);
  } catch {
    return false;
  }

  return validUrl.protocol === 'https:' ? true : false;
}
