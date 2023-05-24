import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const MainScreen = lazy(() => import('./screens/MainScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));

const router = createBrowserRouter([
  { path: '/', element: <MainScreen /> },
  {
    path: '/register',
    element: <RegisterScreen />
  },
  {
    path: '/login',
    element: <LoginScreen />
  }
]);

function App() {
  return (
    <Suspense fallback={<></>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
