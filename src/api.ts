import { t, IType, TypeOf } from "./schema"
import { split, ISplit } from "./split"
import { setIn, ISetIn } from "./set-in"

export { t }

type ApiCreator<TApi extends Record<string, Record<string, any>> = {}> = {
  define<
    TScopedName extends string,
    TRequest extends IType,
    TResponse extends IType
  >(
    scopedName: TScopedName,
    request: TRequest,
    response: TResponse
  ): ApiCreator<
    ISetIn<
      TApi,
      ISplit<TScopedName, "/">,
      (_: TypeOf<TRequest>) => Promise<TypeOf<TResponse>>
    >
  >
  api: TApi
}

export const createApi = (url: string): ApiCreator => {
  const api: Record<string, Record<string, any>> = {}
  const apiCreator: ApiCreator<any> = {
    define(scopedName: string, request: IType, response: IType) {
      setIn(api, split(scopedName, "/"), async (body: any) => {
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
