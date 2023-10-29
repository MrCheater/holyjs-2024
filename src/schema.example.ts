import { t, TypeOf } from "./schema";


const itemsSchema = t.union([
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


const schema = t.record({
    me: t.record({
        id: t.number(),
        firstName: t.string(),
        lastName: t.string().optional(),
        isAdmin: t.boolean(),
    }),
    users: t.array(
        t.record({
            id: t.number(),
            firstName: t.string(),
            lastName: t.string().optional(),
        }),
    ),
    items: itemsSchema,
});

//////////////////
type ISchema = TypeOf<typeof schema>;
type IItemsSchema = TypeOf<typeof itemsSchema>;
