import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <p>This is the landing page</p>
        </div>
      ),
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;