import z from 'zod';

export const createOrganizationStaffsSchema = z.object({
  title: z.string(),
  description: z.string(),
  users_id: z.string(),
  role: z.string(),
  organizations_id: z.string(),
});
export type CreateOrganizationStaffsSchema = z.TypeOf<
  typeof createOrganizationStaffsSchema
>;
