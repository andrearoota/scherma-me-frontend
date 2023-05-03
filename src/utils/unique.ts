/**
 *
 * @param data any[]
 * @param key string
 * @returns any[]
 */
export default function unique (data: any[], key: string): any[] {
  return data.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t[key] === value[key]
    ))
  )
}
