import { useQuery } from 'react-query';
import supabase from '../../../utils/supabase';
import { supabaseTable } from '../../../utils/supabase/tables';
import { organizationsKeys } from '../query-key/OrganizationsKey';
import { OrganizationSchema } from '../schema/organizations.query.schema';

const getOrganizationByOwner = async (userId: any) => {
  const { data, error } = await supabase
    .from<OrganizationSchema>(supabaseTable.organizations)
    .select(
      `id, name, created_at, users(fullname, id, username), organization_staffs!inner(*, users(*))`
    )
    .eq('owner', userId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Organization not found');
  }

  return data;
};

export function useGetOrganizationByOwner() {
  const user = supabase.auth.user();
  return useQuery(organizationsKeys.list(user?.id), () =>
    getOrganizationByOwner(user?.id)
  );
}

const getOrganizationByStaffs = async (userId: any) => {
  const { data, error } = await supabase
    .from<OrganizationSchema>(supabaseTable.organizations)
    .select(
      `id, name, created_at, users(fullname, id, username), organization_staffs!inner(*, users(*))`
    )
    .eq('organization_staffs.users_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('Organization not found');
  }

  return data;
};

export function useGetOrganizationByStaffs() {
  const user = supabase.auth.user();
  return useQuery(organizationsKeys.list(user?.id), () =>
    getOrganizationByStaffs(user?.id)
  );
}
