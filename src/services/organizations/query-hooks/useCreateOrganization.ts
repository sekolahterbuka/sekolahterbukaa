import { useMutation, useQueryClient } from 'react-query';
import supabase from '../../../utils/supabase';
import { supabaseTable } from '../../../utils/supabase/tables';
import { OrganizationStaffsSchema } from '../../organizationStaffs/schema/organizationStaffs.query.schema';
import { CreateOrganizationSchema } from '../schema/organizations.mutation.schema';
import { OrganizationSchema } from '../schema/organizations.query.schema';
import { app_role } from '../../../utils/const/appType';
import { organizationsKeys } from '../query-key/OrganizationsKey';

const createOrganization = async (organization: CreateOrganizationSchema) => {
  const { data: organizationNameMatch } = await supabase
    .from<OrganizationSchema>(supabaseTable.organizations)
    .select('*')
    .match({
      name: organization.name,
      owner: organization.owner,
    })
    .single();

  if (organizationNameMatch) {
    throw new Error('organization with name is exist');
  }

  if (!organizationNameMatch) {
    const { data, error: cretingError } = await supabase
      .from<OrganizationSchema>(supabaseTable.organizations)
      .insert({
        name: organization.name,
        description: organization.description,
        permission: organization.permission,
        owner: organization.owner,
      });

    if (cretingError) {
      throw cretingError;
    }

    return data[0];
  }
};

export default function useCreateOrganizations(
  organization: CreateOrganizationSchema
) {
  const queryClient = useQueryClient();
  return useMutation(() => createOrganization(organization), {
    onSuccess: async (data) => {
      const { error: insertError } = await supabase
        .from<OrganizationStaffsSchema>(supabaseTable.organization_staffs)
        .insert({
          title: 'admin',
          description: 'kamu adalah admin dan owner',
          users_id: data?.owner,
          organizations_id: data?.id,
          role: app_role.admin,
        });
      if (insertError) {
        throw insertError;
      }
      queryClient.invalidateQueries(organizationsKeys.list(data?.owner));
    },
  });
}
