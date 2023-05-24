import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';

const router = createBrowserRouter([
  { path: '/', element: <div>Hello World!</div> },
  {
    path: '/register',
    element: <RegisterScreen />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
