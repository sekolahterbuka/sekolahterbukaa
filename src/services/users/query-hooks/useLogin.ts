import { useMutation } from 'react-query';
import supabase from '../../../utils/supabase';
import { LoginUserSchema } from '../schema/user.mutation.schema';

const login = async (user: LoginUserSchema) => {
  const { email, password } = user;
  const { user: data, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useLogin(user: LoginUserSchema) {
  const { email, password } = user;

  return useMutation(() => login({ email, password }));
}
