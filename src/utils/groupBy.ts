/**
 *
 * @param data any[]
 * @param key string
 * @returns any[]
 */
export default function groupBy (array: any[], key: string): any[] {
  return array.reduce(function (prevValue, currValue) {
    (prevValue[currValue[key]] = prevValue[currValue[key]] ?? []).push(currValue)
    return prevValue
  }, {})
}
