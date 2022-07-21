import { ReactNode, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Center,
  Box,
  Title,
  Group,
  Avatar,
  Menu,
  Button,
} from '@mantine/core';
import { useRouter } from 'next/router';
import useLogout from '../../../services/users/query-hooks/useLogout';
import { UserSchema } from '../../../services/users/schema/user.query.schema';
import useGetUser from '../../../services/users/query-hooks/useGetUser';

interface Props {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const { children } = props;
  const user = useGetUser();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const router = useRouter();
  const logoutUser = useLogout();

  if (logoutUser.isSuccess) {
    router.push('/');
  }
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      header={
        <Header height={70} p="md">
          <Group>
            <Group sx={{ flexGrow: 1 }}>
              <Title
                onClick={() => router.push('/')}
                sx={{ cursor: 'pointer' }}
              >
                IMDB
              </Title>
            </Group>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xs"
                />
              </MediaQuery>
              <Group
                align="center"
                sx={(theme) => ({
                  [theme.fn.smallerThan('sm')]: {
                    display: 'none',
                  },
                  [theme.fn.largerThan('sm')]: {
                    display: 'flex',
                  },
                })}
              >
                <Text>{user.data?.username}</Text>
                <Menu
                  control={
                    <Avatar style={{ cursor: 'pointer' }}>
                      {user.data?.username[0].toUpperCase()}
                    </Avatar>
                  }
                >
                  <Menu.Label>Logout</Menu.Label>
                  <Menu.Item>
                    <Button onClick={() => logoutUser.mutate()}>Logout</Button>
                  </Menu.Item>
                </Menu>
              </Group>
            </div>
          </Group>
        </Header>
      }
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          sx={(theme) => ({
            [theme.fn.smallerThan('sm')]: {
              width: 200,
            },
            [theme.fn.largerThan('sm')]: {
              width: 300,
            },
          })}
        >
          <Group
            sx={(theme) => ({
              alignItems: 'center',
              justifyContent: 'space-between',
              [theme.fn.smallerThan('sm')]: {
                display: 'flex',
              },

              [theme.fn.largerThan('sm')]: {
                display: 'none',
              },
            })}
          >
            <Text>{user.data?.username}</Text>
            <Menu
              control={
                <Avatar style={{ cursor: 'pointer' }}>
                  {user.data?.username[0].toUpperCase()}
                </Avatar>
              }
            >
              <Menu.Label>Logout</Menu.Label>
              <Menu.Item>
                <Button onClick={() => logoutUser.mutate()}>Logout</Button>
              </Menu.Item>
            </Menu>
          </Group>
        </Navbar>
      }
      //   aside={
      //     <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      //       <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //         <Text>Application sidebar</Text>
      //       </Aside>
      //     </MediaQuery>
      //   }
      // footer={
      //   <Footer height={60} p="md">
      //     <Center>
      //       <Text>&copy; {userData?.username} 2022</Text>
      //     </Center>
      //   </Footer>
      // }
    >
      <Box
        sx={(theme) => ({
          [theme.fn.largerThan('sm')]: {
            marginLeft: 300,
          },
          [theme.fn.smallerThan('sm')]: {
            marginLeft: 0,
          },
        })}
      >
        {children}
      </Box>
    </AppShell>
  );
}
