import { Quote } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      quote: "This platform has revolutionized how we handle our logistics. The drivers are professional and the tracking system is impeccable.",
      author: "Sarah Johnson",
      role: "Logistics Manager",
      company: "Global Retail Co."
    },
    {
      quote: "As a driver, I've found more opportunities and better clients through this platform than anywhere else. The payment system is reliable and fast.",
      author: "Michael Chen",
      role: "Professional Driver",
      company: "Independent Contractor"
    },
    {
      quote: "The platform's ease of use and customer support are outstanding. It's helped us scale our delivery operations significantly.",
      author: "David Martinez",
      role: "Operations Director",
      company: "Fresh Foods Inc."
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Businesses & Drivers
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl relative">
              <Quote className="w-12 h-12 text-blue-600 mb-4" />
              <p className="text-gray-700 mb-6">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-600">{testimonial.role}</p>
                <p className="text-blue-600">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;