import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '~/stores/useAuthStore';

type PrivateRouteProps = { children: ReactNode };

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLogged = useAuthStore((state) => state.isLogged);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
