class Collection {
  _items = []
  push(item) {
    this._items.push(item)
  }
  pop() {
    return this._items.pop()
  }
  reverse() {
    this._items.reverse()
  }
}
export {}
