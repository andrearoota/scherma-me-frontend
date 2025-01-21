/**
 * Convert a string to a SEO friendly URL.
 * @param url
 * @returns
 */
export function toSeoUrl(url: string): string {
  return url
    .toString() // Convert to string
    .normalize('NFD') // Change diacritics
    .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
    .replace(/\s+/g, '-') // Change whitespace to dashes
    .toLowerCase() // Change to lowercase
    .replace(/&/g, '-and-') // Replace ampersand
    .replace(/[^a-z0-9\-]/g, '') // Remove anything that is not a letter, number or dash
    .replace(/-+/g, '-') // Remove duplicate dashes
    .replace(/^-*/, '') // Remove starting dashes
    .replace(/-*$/, ''); // Remove trailing dashes
}

/**
 * Remove duplicate objects from an array based on a key.
 * @param data - An array of objects.
 * @param key - The key to compare.
 * @returns An array of unique objects.
 */
export default function unique<T>(data: T[], key: keyof T): T[] {
  const seen = new Set<T[keyof T]>();
  return data.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

/**
 * Capitalize the first letter of a string.
 * @param input - The string to capitalize.
 * @returns The capitalized string, or an empty string if input is invalid.
 */
export function firstLetterCapitalize(input: string): string {
  if (typeof input !== 'string' || input.trim() === '') {
    return '';
  }
  const trimmed = input.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/**
 * Format number to 123.456,789
 * @param number
 * @param minimumFractionDigits
 * @param maximumFractionDigits
 * @returns {String} Formatted number
 */
export function formatNumber(
  number: number,
  minimumFractionDigits: number = 3,
  maximumFractionDigits: number = 3
): string {
  return number.toLocaleString('de-DE', { minimumFractionDigits, maximumFractionDigits });
}
