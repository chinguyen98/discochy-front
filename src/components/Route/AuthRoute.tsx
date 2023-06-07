import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserProfileQuery } from '~/queries/apis/authApi.query';
import FullPageLoading from '../FullPageLoading/FullPageLoading';

type AuthRouteProps = { children: ReactNode };

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { data, isFetching } = useUserProfileQuery();

  if (isFetching) {
    return <FullPageLoading />;
  }

  if (data) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
