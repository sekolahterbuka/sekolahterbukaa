import { useRouter } from 'next/router';
import { QueryObserverResult } from 'react-query';
import useGetUser from '../services/users/query-hooks/useGetUser';
import { UserSchema } from '../services/users/schema/user.query.schema';
import LoadingPage from './LoadingPage';

interface Props {
  children: React.ReactNode;
}

const AuthWrapper = (props: Props) => {
  const user = useGetUser();
  const { children } = props;
  const router = useRouter();
  if (user.isLoading) {
    return <LoadingPage />;
  }
  if (user.isError) {
    router.push('/auth');
    return <LoadingPage />;
  }

  if (!user.data?.id.length) {
    router.push('/auth');
  }

  return <>{children}</>;
};

export default AuthWrapper;
