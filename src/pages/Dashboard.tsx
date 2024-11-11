import React from 'react'
import { MapPin } from 'lucide-react';
import Navbar from '../components/Navbar'
import { jobs } from '../data/jobs'
import JobCard from '../components/JobCard'

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Next Driving Opportunity</h1>
          <p className="text-xl text-gray-600">Connect with goods owners and secure reliable transportation jobs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Search and Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Search Filters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      className="pl-10 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter location"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                  <select className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <option>All Types</option>
                    <option>Local Delivery</option>
                    <option>Long Haul</option>
                    <option>Same Day Delivery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                  <select className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <option>Any Experience</option>
                    <option>Entry Level</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard;
