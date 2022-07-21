import z from 'zod';
import { userSchema } from '../../users/schema/user.query.schema';

export const organizationStaffsSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  users_id: z.string(),
  organizations_id: z.string(),
  role: z.string(),
  users: userSchema,
  created_at: z.date(),
  updated_at: z.date(),
});
export type OrganizationStaffsSchema = z.TypeOf<
  typeof organizationStaffsSchema
>;
