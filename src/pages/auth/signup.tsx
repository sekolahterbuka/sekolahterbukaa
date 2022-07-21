import { useRouter } from 'next/router';
import { useInputState } from '@mantine/hooks';
import {
  Button,
  Container,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Anchor,
} from '@mantine/core';
import useGetUser from '../../services/users/query-hooks/useGetUser';
import useSignUp from '../../services/users/query-hooks/useSignup';
import LoadingPage from '../../components/LoadingPage';

const Signup = () => {
  const { data: user } = useGetUser();

  const router = useRouter();
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [fullName, setFullName] = useInputState('');
  const [username, setUsername] = useInputState('');

  const createUserMutation = useSignUp({
    email,
    password,
    username,
    fullname: fullName,
  });

  if (createUserMutation.isSuccess) {
    router.push(`/app`);
  }

  if (user?.id.length) {
    router.push(`/app`);
    return <LoadingPage />;
  }

  return (
    <Container mt={32} size="xs">
      {createUserMutation.isError && <Text>Something went wrong</Text>}
      <Stack>
        <Text>Sign Up</Text>
        <TextInput
          id="fullName"
          label="fullName"
          value={fullName}
          onChange={setFullName}
        />
        <TextInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
        />
        <TextInput
          id="username"
          label="Username"
          value={username}
          onChange={setUsername}
        />

        <Button
          mt={20}
          fullWidth
          onClick={() => createUserMutation.mutate()}
          loading={createUserMutation.isLoading ? true : false}
        >
          Sign Up
        </Button>
        <Text>
          Already have account?{' '}
          <Anchor onClick={() => router.push('/auth/login')}>Login</Anchor>
        </Text>
      </Stack>
    </Container>
  );
};

export default Signup;
