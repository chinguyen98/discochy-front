import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '~/stores/useAuthStore';

type AuthRouteProps = { children: ReactNode };

const AuthRoute = ({ children }: AuthRouteProps) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  if (isLogged) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthRoute;
