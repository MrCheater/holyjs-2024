export const setIn = (record, path, value) => {
  let pointer = record
  const keys = path.slice(0, -1)
  const lastKey = path[path.length - 1]
  for (const key of keys) {
    if (!(key in pointer)) {
      pointer[key] = {}
    }
    pointer = pointer[key]
  }
  pointer[lastKey] = value
  return record
}
