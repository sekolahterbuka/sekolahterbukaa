import z from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string(),
  description: z.string(),
  owner: z.string(),
  permission: z.string(),
});
export type CreateOrganizationSchema = z.TypeOf<
  typeof createOrganizationSchema
>;
