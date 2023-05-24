import { Navigate, useNavigate } from 'react-router-dom';
import useAuthStore from '~/stores/useAuthStore';

const MainScreen = () => {
  const isLogged = useAuthStore((state) => state.isLogged);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <>Hello World!</>;
};

export default MainScreen;
