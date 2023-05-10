/**
 * Capitalize the first letter of a string
 * @param string String to capitalize
 * @returns {String} Capitalized string
 */
export function firstLetterCapitalize (string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
