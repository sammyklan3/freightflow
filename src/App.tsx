import { lazy, Suspense } from "react";
import { useAuth } from "./hooks/useAuth";
import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  const { userData } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Auth />
        </Suspense>
      ),
    },
    {
      path: "/dashboard",
      element: userData ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Dashboard />
        </Suspense>
      ) : (
        <Navigate to="/auth" />
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    }    
  ]);

  return <RouterProvider router={router} />;
}

export default App;