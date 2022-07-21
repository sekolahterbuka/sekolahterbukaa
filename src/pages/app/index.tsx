import { Center, Title } from '@mantine/core';
import AuthWrapper from '../../components/AuthWrapper';
import Layout from '../../components/Layout/app/Layout';
import Organizations from '../../components/organization/Organizations';
import useGetUser from '../../services/users/query-hooks/useGetUser';

const App = () => {
  const user = useGetUser();

  return (
    <AuthWrapper>
      <Layout>
        <Organizations />
      </Layout>
    </AuthWrapper>
  );
};

export default App;
