import { useQuery } from 'react-query';
import supabase from '../../../utils/supabase';
import { supabaseTable } from '../../../utils/supabase/tables';
import { userKeys } from '../query-key/userKey';
import { UserSchema } from '../schema/user.query.schema';

const getUser = async (userId: any) => {
  const { data, error } = await supabase
    .from<UserSchema>(supabaseTable.users)
    .select()
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('User not found');
  }

  return data;
};

export default function useGetUser() {
  const user = supabase.auth.user();
  return useQuery(userKeys.detail(user?.id), () => getUser(user?.id));
}
