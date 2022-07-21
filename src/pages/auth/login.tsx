import {
  Container,
  Text,
  PasswordInput,
  TextInput,
  Button,
  Anchor,
  Stack,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useRouter } from 'next/router';
import LoadingPage from '../../components/LoadingPage';
import useGetUser from '../../services/users/query-hooks/useGetUser';
import useLogin from '../../services/users/query-hooks/useLogin';

const Login = () => {
  const { data: user } = useGetUser();
  const router = useRouter();
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const loginMutation = useLogin({ email, password });

  if (loginMutation.isSuccess) {
    router.push(`/app`);
  }
  if (user?.id.length) {
    router.push(`/app`);

    return <LoadingPage />;
  }
  return (
    <Container mt={32} size="xs">
      <Stack>
        {loginMutation.isError && <Text>Something Wrong</Text>}
        <Text>Login</Text>
        <TextInput
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={setEmail}
        />
        <PasswordInput
          id="password"
          label="Email"
          value={password}
          onChange={setPassword}
        />
        <Button
          mt={20}
          fullWidth
          onClick={() => loginMutation.mutate()}
          loading={loginMutation.isLoading ? true : false}
        >
          Login
        </Button>
        <Text>
          Already new?{' '}
          <Anchor onClick={() => router.push('/auth/signup')}>Sign Up</Anchor>
        </Text>
      </Stack>
    </Container>
  );
};

export default Login;
