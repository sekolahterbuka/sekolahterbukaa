import z from 'zod';

export const signupUserSchema = z.object({
  password: z.string().min(6, 'min 6 character'),
  username: z.string().min(2),
  email: z.string().email(),
  fullname: z.string().min(2),
});
export type SignupUserSchema = z.TypeOf<typeof signupUserSchema>;

export const loginUserSchema = z.object({
  password: z.string().min(6, 'min 6 character'),
  email: z.string().email(),
});
export type LoginUserSchema = z.TypeOf<typeof loginUserSchema>;
