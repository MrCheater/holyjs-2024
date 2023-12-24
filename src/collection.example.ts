import { MapFunctions } from "./collection"

const enum Operations {
  PUSH = "push",
  POP = "pop",
  REVERSE = "reverse"
}
type ICollection<TItem> = MapFunctions<
  Operations,
  {
    [Operations.PUSH]: [[TItem], void]
    [Operations.POP]: [[], TItem | undefined]
    [Operations.REVERSE]: [[], void]
  }
>

class Collection<TItem> implements ICollection<TItem> {
  private _items: Array<TItem> = []

  push(item: TItem) {
    this._items.push(item)
  }
  pop() {
    return this._items.pop()
  }
  reverse() {
    this._items.reverse()
  }
}
