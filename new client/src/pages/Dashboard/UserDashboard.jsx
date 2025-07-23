import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Store } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mt-1">Find the perfect mandap for your special occasion</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card card-hover overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-200 relative">
              <img 
                src={`https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
                alt="Mandap venue"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">Luxury Wedding Venue {i}</h3>
              <p className="text-gray-600 text-sm mb-2">City, Country</p>
              <p className="text-gray-700 text-sm mb-4 flex-1">
                Beautiful mandap decorations for all occasions with stunning designs.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Store size={16} className="text-primary-600" />
                  <span className="text-sm text-primary-600 font-medium">Provider Name</span>
                </div>
                <button className="btn btn-primary text-sm py-1">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Find Your Perfect Venue</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-medium">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Browse providers</p>
              <p className="text-sm text-gray-600">Explore our curated list of mandap service providers</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-medium">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Compare options</p>
              <p className="text-sm text-gray-600">View details, photos, and pricing information</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-medium">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Book your venue</p>
              <p className="text-sm text-gray-600">Secure your date with your chosen provider</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;