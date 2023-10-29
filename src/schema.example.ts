import { t, TypeOf } from "./schema";

const itemSchema = t.union([
  t.record({
    type: t.literal("rect"),
    width: t.number(),
    height: t.number(),
  }),
  t.record({
    type: t.literal("circle"),
    radius: t.number(),
  }),
]);

const userSchema = t.record({
  id: t.number(),
  firstName: t.string(),
  lastName: t.string().optional(),
  gender: t.union([t.literal("male"), t.literal("female"), t.null()]),
});

const schema = t.record({
  me: t.intersection([
    userSchema,
    t.record({
      isAdmin: t.boolean(),
    }),
  ]),
  users: t.array(userSchema),
  items: t.array(itemSchema),
});

//////////////////
type ISchema = TypeOf<typeof schema>;
type IItemSchema = TypeOf<typeof itemSchema>;
type IUserSchema = TypeOf<typeof userSchema>;
