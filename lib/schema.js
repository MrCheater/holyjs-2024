const type = (name) => (value) =>
  Object.defineProperty([0, [name, value]], "optional", {
    value: () => [1, [name, value]]
  })
export const t = {
  string: type(0),
  number: type(1),
  boolean: type(2),
  null: type(3),
  literal: type(7),
  object: type(4),
  array: type(5),
  union: type(6),
  intersection: type(8)
}
