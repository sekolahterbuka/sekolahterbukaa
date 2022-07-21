import { Button, Stack, Container, Group, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { userAgent } from 'next/server';
import useGetUser from '../services/users/query-hooks/useGetUser';

const Home = () => {
  const user = useGetUser()
  const router = useRouter();
  return (
    <Container>
      <Stack align="center" justify="center" sx={{ height: '100vh' }}>
        <Stack my={8} align="center" justify="center">
          <Title order={1}>Sekolah Terbuka</Title>
          <Group mx={4}>
            <Button onClick={() => router.push('/auth/login')}>Login</Button>
            <Button onClick={() => router.push('/auth/signup')}>Signup</Button>
          </Group>
          {user.data?.id.length && (
            <Button fullWidth onClick={() => router.push('/app')}>
              Dashboard
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
