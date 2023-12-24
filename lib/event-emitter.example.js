import { EventEmitter } from "./event-emitter"
const store = new EventEmitter()
store.emit("create", {
  nodes: [
    { id: 1, name: "1", parent: null },
    { id: 11, name: "1.1", parent: 1 },
    { id: 2, name: "2", parent: null },
    { id: 3, name: "3", parent: null }
  ]
})
store.emit("remove", { ids: [2] })
store.emit("move", { pairs: { id: 3, parent: 1 } })
