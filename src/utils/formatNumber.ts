/**
* Format number to 123.456,789
* @param {Number} number
* @param {Number} minimumFractionDigits
* @param {Number} maximumFractionDigits
* @returns {String} Formatted number
*/

export default function formatNumber (number: number, minimumFractionDigits: number = 3, maximumFractionDigits: number = 3): string {
  return number.toLocaleString('de-DE', { minimumFractionDigits, maximumFractionDigits })
}
