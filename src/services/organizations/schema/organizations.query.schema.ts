import z from 'zod';
import { organizationStaffsSchema } from '../../organizationStaffs/schema/organizationStaffs.query.schema';
import { userSchema } from '../../users/schema/user.query.schema';

export const organizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  owner: z.string(),
  permission: z.string(),
  users: userSchema,
  organization_staffs: organizationStaffsSchema.array(),
  'organization_staffs.users_id': z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});
export type OrganizationSchema = z.TypeOf<typeof organizationSchema>;
