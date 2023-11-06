import { t } from "./schema";
const itemSchema = t.union([
    t.object({
        type: t.literal("rect"),
        width: t.number(),
        height: t.number()
    }),
    t.object({
        type: t.literal("circle"),
        radius: t.number()
    })
]);
const userSchema = t.object({
    id: t.number(),
    firstName: t.string(),
    lastName: t.string().optional(),
    gender: t.union([t.literal("male"), t.literal("female"), t.null()])
});
const schema = t.object({
    me: t.intersection([
        userSchema,
        t.object({
            isAdmin: t.boolean()
        })
    ]),
    users: t.array(userSchema),
    items: t.array(itemSchema)
});
