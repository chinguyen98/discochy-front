import { Navigate } from 'react-router-dom';
import useAuthStore from '~/stores/useAuthStore';

const LoginScreen = () => {
  const isLogged = useAuthStore((state) => state.isLogged);

  if (isLogged) {
    return <Navigate to="/" />;
  }

  return <div>LoginScreen</div>;
};

export default LoginScreen;
