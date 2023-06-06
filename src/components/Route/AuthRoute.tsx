import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserProfileQuery } from '~/queries/apis/authApi.query';

type AuthRouteProps = { children: ReactNode };

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { data } = useUserProfileQuery();

  if (data) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
