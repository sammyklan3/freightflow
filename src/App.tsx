import { lazy } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PostJob from "./pages/PostJob";


import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// const Auth = lazy(() => import("./pages/Auth"));
// const Home = lazy(() => import("./pages/Home"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const PostJob = lazy(() => import("./pages/PostJob"));

function App() {
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
      path: "/post-job",
      element: (
        // <ProtectedRoute>
          <PostJob />
        // </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
