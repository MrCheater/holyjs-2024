import { t } from "./schema"
import { split } from "./split"
import { setIn } from "./set-in"
export { t }
export const createApi = (url) => {
  const api = {}
  const apiCreator = {
    define(scopedName, request, response) {
      setIn(api, split(scopedName, "/"), async (body) => {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        })
        return await response.json()
      })
      return apiCreator
    },
    api
  }
  return apiCreator
}
