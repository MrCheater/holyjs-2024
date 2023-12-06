import { setIn } from "./set-in"

const s0 = setIn({}, ["animals", "cats"], 10)
const s1 = setIn(s0, ["animals", "dogs"], 20)
const s2 = setIn(s1, ["plants", "orchids"], 15)
const s3 = setIn(s2, ["plants", "roses"], 25)

export const {
  animals: { cats, dogs },
  plants: { orchids, roses }
} = s3
