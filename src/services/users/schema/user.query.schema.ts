import z from 'zod';

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  fullname: z.string(),
  avatar_url: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});
export type UserSchema = z.TypeOf<typeof userSchema>;
