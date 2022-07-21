import { useMutation } from 'react-query';
import supabase from '../../../utils/supabase';
import { supabaseTable } from '../../../utils/supabase/tables';
import { SignupUserSchema } from '../schema/user.mutation.schema';
import { UserSchema } from '../schema/user.query.schema';

const createUser = async (user: SignupUserSchema) => {
  const { data: userWithUsernameOrEmail } = await supabase
    .from<UserSchema>(supabaseTable.users)
    .select('*')
    .or(`email.eq.${user.email},username.eq.${user.username}`)
    .single();

  if (userWithUsernameOrEmail) {
    throw new Error('user with username or email exist');
  }

  const { user: data, error: signUpError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (signUpError) {
    throw signUpError;
  }

  return data;
};

export default function useSignUp(user: SignupUserSchema) {
  return useMutation(() => createUser(user), {
    onSuccess: async (data) => {
      const { data: insertData, error: insertError } = await supabase
        .from<UserSchema>(supabaseTable.users)
        .insert({
          id: data?.id,
          username: user.username,
          email: data?.email,
          fullname: user.fullname,
        });
      if (insertError) {
        throw insertError;
      }
      return insertData;
    },
  });
}
