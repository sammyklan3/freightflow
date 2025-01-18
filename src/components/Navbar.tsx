import { Truck, Bell, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { userData } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/dashboard" className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              FreightFlow
            </span>
          </NavLink>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Find Jobs
            </a>
            <a href="/post-job" className="text-gray-600 hover:text-gray-900">
              Post a Job
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Drivers
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="h-6 w-6" />
            </button>
            <NavLink
              to="/auth"
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              <User className="h-5 w-5" />
              <span>{userData?.username ? userData.username : "Sign In"}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
