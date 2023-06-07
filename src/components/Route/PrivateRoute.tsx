import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserProfileQuery } from '~/queries/apis/authApi.query';
import FullPageLoading from '../FullPageLoading/FullPageLoading';

type PrivateRouteProps = { children: ReactNode };

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isFetched, data, isFetching } = useUserProfileQuery();

  if (isFetching) {
    return <FullPageLoading />;
  }

  if (!data && isFetched) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
