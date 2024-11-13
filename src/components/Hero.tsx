import { Truck, Package, Shield, ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 bg-cover bg-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Connect with Trusted Drivers & Ship with Confidence
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              The smart way to connect goods owners with professional drivers.
              Fast, secure, and reliable delivery solutions at your fingertips.
            </p>
            <div className="flex flex-wrap gap-4">
              <NavLink
                to="/auth"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                Get Started <ArrowRight size={20} />
              </NavLink>
              <NavLink
                to="#"
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </NavLink>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Truck, label: "Active Drivers", value: "2,500+" },
                  { icon: Package, label: "Deliveries", value: "150K+" },
                  { icon: Shield, label: "Secure Trips", value: "99.9%" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-white/5 rounded-xl"
                  >
                    <stat.icon className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
