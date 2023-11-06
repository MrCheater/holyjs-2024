type UndefinedToOptional<T> = {
  [K in keyof T]-?: (
    x: undefined extends T[K] ? { [P in K]?: T[K] } : { [P in K]: T[K] }
  ) => void
}[keyof T] extends (x: infer I) => void
  ? I extends infer U
    ? { [K in keyof U]: U[K] }
    : never
  : never

type TupleToUnion<T extends ReadonlyArray<unknown>> = T[number]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export const enum ITypeName {
  String,
  Number,
  Boolean,
  Null,
  Object,
  Array,
  Union,
  Literal,
  Intersection
}

export const enum ITypeMode {
  Strict,
  Optional
}

type IString = [ITypeName.String, void]
type INumber = [ITypeName.Number, void]
type IBoolean = [ITypeName.Boolean, void]
type INull = [ITypeName.Null, void]
type ILiteral<T extends string> = [ITypeName.Literal, T]
type IObject<
  T extends Record<string, IStrictType<IAnyType> | IOptionalType<IAnyType>>
> = [ITypeName.Object, T]
type IArray<T extends IStrictType<IAnyType>> = [ITypeName.Array, T]
type IUnion<T extends ReadonlyArray<IStrictType<IAnyType>>> = [
  ITypeName.Union,
  T
]
type IIntersection<T extends ReadonlyArray<IStrictType<IAnyType>>> = [
  ITypeName.Intersection,
  T
]

type ISomeLiteral = [ITypeName.Literal, string]
type ISomeObject = [
  ITypeName.Object,
  Record<string, IStrictType<IAnyType> | IOptionalType<IAnyType>>
]
type ISomeArray = [ITypeName.Array, IStrictType<IAnyType>]
type ISomeUnion = [ITypeName.Union, ReadonlyArray<IStrictType<IAnyType>>]
type ISomeIntersection = [
  ITypeName.Intersection,
  ReadonlyArray<IStrictType<IAnyType>>
]

type IAnyType =
  | IString
  | INumber
  | IBoolean
  | INull
  | ISomeLiteral
  | ISomeObject
  | ISomeArray
  | ISomeUnion
  | ISomeIntersection

type IOptionalType<T extends IAnyType> = [ITypeMode.Optional, T]
type IStrictType<T extends IAnyType> = [ITypeMode.Strict, T]

type SchemaConstructor = {
  string: () => IType<IString>
  number: () => IType<INumber>
  boolean: () => IType<IBoolean>
  null: () => IType<INull>
  literal: <T extends string>(_: T) => IType<ILiteral<T>>
  object: <
    T extends Record<string, IStrictType<IAnyType> | IOptionalType<IAnyType>>
  >(
    _: T
  ) => IType<IObject<T>>
  array: <T extends IStrictType<IAnyType>>(_: T) => IType<IArray<T>>
  union: <T extends ReadonlyArray<IStrictType<IAnyType>>>(
    _: T
  ) => IType<IUnion<T>>
  intersection: <T extends ReadonlyArray<IStrictType<IAnyType>>>(
    _: T
  ) => IType<IIntersection<T>>
}

type IRealType<T extends IAnyType> = T extends IString
  ? string
  : T extends INumber
  ? number
  : T extends IBoolean
  ? boolean
  : T extends INull
  ? null
  : T extends ILiteral<infer R>
  ? R
  : T extends IObject<infer R>
  ? UndefinedToOptional<{ [K in keyof R]: TypeOf<R[K]> }>
  : T extends IArray<infer R>
  ? R extends [ITypeMode, IAnyType]
    ? Array<TypeOf<R>>
    : never
  : T extends IUnion<infer R>
  ? R extends ReadonlyArray<IStrictType<IAnyType>>
    ? TypeOf<TupleToUnion<R>>
    : never
  : T extends IIntersection<infer R>
  ? R extends ReadonlyArray<IStrictType<IAnyType>>
    ? UnionToIntersection<TypeOf<TupleToUnion<R>>>
    : never
  : never

export type TypeOf<R> = R extends IStrictType<infer T>
  ? IRealType<T>
  : R extends IOptionalType<infer T>
  ? IRealType<T> | undefined
  : never

export type IType<T extends IAnyType = IAnyType> = IStrictType<T> & {
  optional(): IOptionalType<T>
}

const type = (name: ITypeName) => (value?: any) =>
  Object.defineProperty([ITypeMode.Strict, [name, value]], "optional", {
    value: () => [ITypeMode.Optional, [name, value]]
  }) as any

export const t: SchemaConstructor = {
  string: type(ITypeName.String),
  number: type(ITypeName.Number),
  boolean: type(ITypeName.Boolean),
  null: type(ITypeName.Null),
  literal: type(ITypeName.Literal),
  object: type(ITypeName.Object),
  array: type(ITypeName.Array),
  union: type(ITypeName.Union),
  intersection: type(ITypeName.Intersection)
}
