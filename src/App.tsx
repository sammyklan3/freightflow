import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  const { userData } = useAuth();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/dashboard",
      element: userData ? <Dashboard /> : <Navigate to="/auth" />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
