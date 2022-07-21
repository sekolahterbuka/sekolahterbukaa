import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Modal,
  Group,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useState } from 'react';
import useCreateOrganizations from '../../services/organizations/query-hooks/useCreateOrganization';
import useGetOrganizationByOwner from '../../services/organizations/query-hooks/useGetOrganizations';
import useGetUser from '../../services/users/query-hooks/useGetUser';
import { UserSchema } from '../../services/users/schema/user.query.schema';
import { app_permission } from '../../utils/const/appType';
import LoadingPage from '../LoadingPage';

interface PropsModal {
  userData: UserSchema | undefined;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

function CreateOrganization(props: PropsModal) {
  const { opened, setOpened, userData } = props;
  const [organizationName, setOrganizationName] = useInputState('');
  const [organizationDesc, setOrganizationDesc] = useInputState('');

  const createOrganization = useCreateOrganizations({
    name: organizationName.trim().toLowerCase(),
    description: organizationDesc,
    permission: app_permission.public,
    owner: userData?.id as any,
  });

  const handleClick = () => {
    createOrganization.mutate();
    setOpened(false);
    setOrganizationName('');
    setOrganizationDesc('');
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Buat Organisasi"
      >
        <Stack>
          {createOrganization.isError && <Text>Terjadi kesalahan</Text>}
          <TextInput
            required
            label="Nama organiasi"
            id="name"
            value={organizationName}
            onChange={setOrganizationName}
          />
          <Textarea
            label="Descripsi"
            id="name"
            value={organizationDesc}
            onChange={setOrganizationDesc}
          />
          <Button
            onClick={handleClick}
            loading={createOrganization.isLoading ? true : false}
          >
            Buat Organiasi
          </Button>
        </Stack>
      </Modal>
    </>
  );
}

const Organizations = () => {
  const { data: userData } = useGetUser();
  const [opened, setOpened] = useState(false);
  const { data: organizations, isLoading } = useGetOrganizationByOwner();

  return (
    <Box>
      <CreateOrganization
        opened={opened}
        setOpened={setOpened}
        userData={userData}
      />
      <Button onClick={() => setOpened(true)}>Buat Organisasi</Button>
      <Space h={32} />
      {isLoading && <LoadingPage />}
      {!organizations?.length && <Text>Tidak ada data organisasi</Text>}
      <SimpleGrid cols={3} spacing={20}>
        {organizations?.map((org) => (
          <Card key={org.id}>
            <Card.Section py={40}>
              <Center>{org.name}</Center>
            </Card.Section>
            <Divider />
            <Stack mt={10}>
              <Text>Owner: {org.users.fullname}</Text>
              <Text>Staff: {org.organization_staffs.length}</Text>
              <Group>
                {org.organization_staffs.map((staff) => (
                  <Text key={staff.id}>{staff.users.username}, </Text>
                ))}
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Organizations;
