import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserProfileQuery } from '~/queries/apis/authApi.query';

type PrivateRouteProps = { children: ReactNode };

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isFetched, data } = useUserProfileQuery();

  if (!data && isFetched) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
