import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Route from './components/Route';
import { IS_PROD } from './configs';
import { queryClient } from './query-client';
import FullPageLoading from './components/FullPageLoading/FullPageLoading';

const MainScreen = lazy(() => import('./screens/MainScreen'));
const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Route.Private>
        <MainScreen />
      </Route.Private>
    ),
  },
  {
    path: '/register',
    element: (
      <Route.Auth>
        <RegisterScreen />
      </Route.Auth>
    ),
  },
  {
    path: '/login',
    element: (
      <Route.Auth>
        <LoginScreen />
      </Route.Auth>
    ),
  },
]);

function App() {
  return (
    <Suspense fallback={<FullPageLoading />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {!IS_PROD && <ReactQueryDevtools initialIsOpen={true} />}
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
