import { MapPin, Clock, Shield, Banknote, Users, Star } from "lucide-react";

function Features() {
  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description:
        "Track your shipments in real-time with precise GPS location updates.",
    },
    {
      icon: Clock,
      title: "Fast Matching",
      description:
        "Get matched with available drivers in your area within minutes.",
    },
    {
      icon: Shield,
      title: "Secure & Insured",
      description:
        "All shipments are fully insured and handled with utmost security.",
    },
    {
      icon: Banknote,
      title: "Competitive Pricing",
      description:
        "Transparent pricing with no hidden fees. Pay only for what you need.",
    },
    {
      icon: Users,
      title: "Verified Drivers",
      description:
        "All drivers are thoroughly vetted and professionally certified.",
    },
    {
      icon: Star,
      title: "Rating System",
      description: "Quality assurance through our comprehensive rating system.",
    },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide the tools and features you need for seamless logistics
            operations
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
