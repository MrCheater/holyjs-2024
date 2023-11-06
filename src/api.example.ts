import { t, createApi } from "./api"

const { api } = createApi("https://example.com")
  .define(
    "users/create",
    t.object({
      email: t.string(),
      firstName: t.string(),
      lastName: t.string().optional(),
      avatar: t.string().optional()
    }),
    t.object({ id: t.string() })
  )
  .define("users/delete", t.object({ id: t.string() }), t.literal("ok"))
  .define(
    "users/update",
    t.object({
      id: t.string(),
      email: t.string().optional(),
      firstName: t.string().optional(),
      lastName: t.string().optional(),
      avatar: t.string().optional()
    }),
    t.literal("ok")
  )
  .define("avatars/create", t.object({}), t.object({ url: t.string() }))

void (async () => {
  const { id: testUserId } = await api.users.create({
    email: "test@example.com",
    firstName: "test"
  })
  await api.users.delete({ id: testUserId })
  const { url: avatarUrl } = await api.avatars.create({})
  await api.users.update({ id: testUserId, avatar: avatarUrl })
})()
