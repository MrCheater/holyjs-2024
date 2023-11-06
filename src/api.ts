import { t, IType, TypeOf } from "./schema"
import { Split } from "./split"

export { t }

type DeepValue<Path extends string[], Value = true> = Path extends []
  ? Value
  : Path extends [infer Key extends string, ...infer Tail extends string[]]
  ? { [k in Key]: DeepValue<Tail, Value> }
  : never

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
    TApi &
      DeepValue<
        Split<TScopedName, "/">,
        (_: TypeOf<TRequest>) => Promise<TypeOf<TResponse>>
      >
  >
  api: TApi
}

export const createApi = (url: string): ApiCreator => {
  const api: Record<string, any> = {}
  const apiCreator: ApiCreator<any> = {
    define(
      scopedName: string,
      request: IType,
      response: IType
    ): ApiCreator<any> {
      let pointer = api
      const path = scopedName.split("/")
      if (path.length === 0) {
        return apiCreator
      }
      const [lastKey] = path.slice(-1, 1) as [string]
      for (const key of path) {
        if (!pointer[key]) {
          pointer[key] = {}
        }
        pointer = pointer[key]
      }
      pointer[lastKey] = async (body: any) => {
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
