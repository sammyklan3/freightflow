import { MapPin, Clock, DollarSign, Package } from 'lucide-react';
import Badge from './Badge';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
          <p className="text-gray-600 font-medium mb-4">{job.company}</p>
        </div>
        <Badge label={job.type} type="warning" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2 text-gray-400" />
          {job.location}
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2 text-gray-400" />
          {job.posted}
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
          {job.salary}
        </div>
        <div className="flex items-center text-gray-600">
          <Package className="h-5 w-5 mr-2 text-gray-400" />
          Goods Transport
        </div>
      </div>

      <p className="text-gray-600 mb-4">{job.description}</p>

      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4">
        <button className="flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out">
          Apply Now
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-150 ease-in-out">
          Save Job
        </button>
      </div>
    </div>
  );
};

export default JobCard;