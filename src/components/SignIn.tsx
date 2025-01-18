import React, { useState } from "react";
import { ArrowRight, Mail, Lock, Truck, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SignInProps } from "../types/auth";
import { useAuth } from "../hooks/useAuth";
import Branding from "./Branding";

const SignIn: React.FC<SignInProps> = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submitting if already submitting
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response.data.message);
      console.error("An error occurred:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [userType, setUserType] = useState<"driver" | "owner">("driver");

  return (
    <>
      <Branding userType={userType} />

      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setUserType("driver")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              userType === "driver"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Truck className="w-4 h-4" />
            Driver
          </button>
          <button
            onClick={() => setUserType("owner")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              userType === "owner"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Package className="w-4 h-4" />
            Owner
          </button>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back!</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="you@example.com"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="••••••••"
                required
                disabled={isSubmitting}
              />
            </div>
            {error.length > 0 && (
              <>
                <br />
                <p className="text-red-500 text-xs">{error}</p>
              </>
            )}
          </div>

          <button
            type="submit"
            className={`w-full ${isSubmitting ? "bg-indigo-400" : "bg-indigo-600"} text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 group`}
          >
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignIn;
