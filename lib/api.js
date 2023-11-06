import { t } from "./schema"
export { t }
export const createApi = (url) => {
  const api = {}
  const apiCreator = {
    define(scopedName, request, response) {
      let pointer = api
      const path = scopedName.split("/")
      if (path.length === 0) {
        return apiCreator
      }
      const [lastKey] = path.slice(-1, 1)
      for (const key of path) {
        if (!pointer[key]) {
          pointer[key] = {}
        }
        pointer = pointer[key]
      }
      pointer[lastKey] = async (body) => {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
        return await response.json()
      }
      return apiCreator
    },
    api
  }
  return apiCreator
}
