import { useMutation, useQueryClient } from 'react-query';
import supabase from '../../../utils/supabase';

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export default function useLogout() {
  const queryClient = useQueryClient();
  return useMutation(() => logout(), {
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
}
