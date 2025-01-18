import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Dimensions, JobPost, Location, Requirements } from "../types/job";
import { Truck, MapPin, Calendar, DollarSign, Package, ClipboardCheck, ShieldCheck } from "lucide-react";

const initialState: JobPost = {
  description: "",
  title: "",
  category: "medical_supplies",
  pickupLocation: {
    address: "",
    city: "",
    country: "Kenya",
    postalCode: "",
  },
  dropoffLocation: {
    address: "",
    city: "",
    country: "Kenya",
    postalCode: "",
  },
  salary: 0,
  departureDate: "",
  expectedDeliveryDate: "",
  dimensions: {
    length: 0,
    width: 0,
    height: 0,
  },
  weight: 0,
  requirements: {
    vehicleType: "truck",
    insurance: false,
    trackingSystem: false,
    temperatureControlled: false,
    experienceYears: 0,
    specialLicenses: [],
    additionalRequirements: ''
  }
};

const PostJob = () => {
  const [formData, setFormData] = useState<JobPost>(initialState);

  document.title = "Post Job | FreightFlow";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit data to server
    console.log(formData);
  };

  const handleLocationChange = (
    type: "pickupLocation" | "dropoffLocation",
    field: keyof Location,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleDimensionsChange = (field: keyof Dimensions, value: string) => {
    setFormData((prev) => ({
     ...prev,
      dimensions: {
       ...prev.dimensions,
        [field]: parseFloat(value) || 0,
      },
    }));
  };

  const handleRequirementsChange = (field: keyof Requirements, value: any) => {
    setFormData((prev => ({
        ...prev,
        requirements: {
            ...prev.requirements,
            [field]: value,
        }
    })));
  };

  const handleSpecialLicensesChange = (license: string) => {
    setFormData(prev => {
      const currentLicenses = prev.requirements.specialLicenses;
      const updatedLicenses = currentLicenses.includes(license)
        ? currentLicenses.filter(l => l !== license)
        : [...currentLicenses, license];
      
      return {
        ...prev,
        requirements: {
          ...prev.requirements,
          specialLicenses: updatedLicenses
        }
      };
    });
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          {/* <div className="flex justify-center mb-4">
            <Truck className="h-12 w-12 text-blue-600" />
          </div> */}
          {/* <h1 className="text-4xl font-bold text-gray-900 mb-2">FreightFlow</h1> */}
          <p className="text-xl text-gray-600">Post Your Freight Job</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  Job Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                >
                  <option value="medical_supplies">Medical Supplies</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="food">Food</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pickup Location */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Pickup Location
                </h3>
                {['address', 'city', 'postalCode'].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`pickup-${field}`}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={`pickup-${field}`}
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.pickupLocation[field as keyof Location]}
                      onChange={(e) => handleLocationChange('pickupLocation', field as keyof Location, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>

              {/* Dropoff Location */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-red-600" />
                  Dropoff Location
                </h3>
                {['address', 'city', 'postalCode'].map((field) => (
                  <div key={field} className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`dropoff-${field}`}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      id={`dropoff-${field}`}
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.dropoffLocation[field as keyof Location]}
                      onChange={(e) => handleLocationChange('dropoffLocation', field as keyof Location, e.target.value)}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dates and Payment */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Schedule & Payment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departureDate">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Departure Date & Time
                </label>
                <input
                  id="departureDate"
                  type="datetime-local"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.departureDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expectedDeliveryDate">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Expected Delivery Date & Time
                </label>
                <input
                  id="expectedDeliveryDate"
                  type="datetime-local"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.expectedDeliveryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedDeliveryDate: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salary">
                  <DollarSign className="h-4 w-4 inline mr-2" />
                  Budget (KES)
                </label>
                <input
                  id="salary"
                  type="number"
                  min="0"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.salary}
                  onChange={(e) => setFormData(prev => ({ ...prev, salary: parseInt(e.target.value)}))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Cargo Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              <Package className="h-6 w-6 inline mr-2" />
              Cargo Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Dimensions (meters)</label>
                <div className="grid grid-cols-3 gap-4">
                  {['length', 'width', 'height'].map((dim) => (
                    <div key={dim}>
                      <label className="block text-gray-700 text-xs mb-1" htmlFor={dim}>
                        {dim.charAt(0).toUpperCase() + dim.slice(1)}
                      </label>
                      <input
                        id={dim}
                        type="number"
                        step="0.1"
                        min="0"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.dimensions[dim as keyof Dimensions]}
                        onChange={(e) => handleDimensionsChange(dim as keyof Dimensions, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                  Weight (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  min="0"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: parseInt(e.target.value)}))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Job Requirements */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              <ClipboardCheck className="h-6 w-6 inline mr-2" />
              Job Requirements
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleType">
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.requirements.vehicleType}
                    onChange={(e) => handleRequirementsChange('vehicleType', e.target.value)}
                    required
                  >
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                    <option value="refrigerated_truck">Refrigerated Truck</option>
                    <option value="flatbed">Flatbed</option>
                    <option value="container">Container Truck</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experienceYears">
                    Minimum Years of Experience
                  </label>
                  <input
                    id="experienceYears"
                    type="number"
                    min="0"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.requirements.experienceYears}
                    onChange={(e) => handleRequirementsChange('experienceYears', parseInt(e.target.value)   )}
                    required
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-blue-600" />
                  Required Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      id="insurance"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData.requirements.insurance}
                      onChange={(e) => handleRequirementsChange('insurance', e.target.checked)}
                    />
                    <label htmlFor="insurance" className="ml-2 block text-sm text-gray-700">
                      Cargo Insurance
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="trackingSystem"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData.requirements.trackingSystem}
                      onChange={(e) => handleRequirementsChange('trackingSystem', e.target.checked)}
                    />
                    <label htmlFor="trackingSystem" className="ml-2 block text-sm text-gray-700">
                      GPS Tracking System
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="temperatureControlled"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={formData.requirements.temperatureControlled}
                      onChange={(e) => handleRequirementsChange('temperatureControlled', e.target.checked)}
                    />
                    <label htmlFor="temperatureControlled" className="ml-2 block text-sm text-gray-700">
                      Temperature Control
                    </label>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Special Licenses Required</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Hazmat', 'Heavy Vehicle', 'International Transit'].map((license) => (
                    <div key={license} className="flex items-center">
                      <input
                        id={license.toLowerCase().replace(' ', '-')}
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        checked={formData.requirements.specialLicenses.includes(license)}
                        onChange={() => handleSpecialLicensesChange(license)}
                      />
                      <label
                        htmlFor={license.toLowerCase().replace(' ', '-')}
                        className="ml-2 block text-sm text-gray-700"
                      >
                        {license}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additionalRequirements">
                  Additional Requirements
                </label>
                <textarea
                  id="additionalRequirements"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={3}
                  value={formData.requirements.additionalRequirements}
                  onChange={(e) => handleRequirementsChange('additionalRequirements', e.target.value)}
                  placeholder="Any other specific requirements..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline flex items-center"
            >
              <Truck className="h-5 w-5 mr-2" />
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default PostJob;
