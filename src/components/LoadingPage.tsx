import { Container, Loader, Stack } from '@mantine/core';

const LoadingPage = () => {
  return (
    <Container>
      <Stack align="center" justify="center" sx={{ height: '100vh' }}>
        <Loader />
      </Stack>
    </Container>
  );
};

export default LoadingPage;
