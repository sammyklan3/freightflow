import React from "react";
import { Truck, Package } from "lucide-react";

interface BrandingProps {
  userType: "driver" | "owner";
}

const Branding: React.FC<BrandingProps> = ({ userType }) => {
  return (
    <div className="hidden md:flex flex-col items-center justify-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl">
      <div className="flex items-center gap-3 text-indigo-600 mb-6">
        {userType === "driver" ? (
          <Truck className="w-12 h-12" />
        ) : (
          <Package className="w-12 h-12" />
        )}
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {userType === "driver" ? "Drive & Earn" : "Ship with Confidence"}
      </h1>
      <p className="text-gray-600 text-center mb-6">
        {userType === "driver"
          ? "Join our network of professional drivers and start earning on your schedule."
          : "Connect with reliable drivers to transport your goods safely and efficiently."}
      </p>
      <img
        src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=2000"
        alt="Logistics"
        className="w-full h-48 object-cover rounded-xl shadow-lg"
      />
    </div>
  );
};

export default Branding;
