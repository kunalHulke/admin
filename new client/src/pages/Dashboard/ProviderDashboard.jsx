import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Store, Calendar, Users, CheckCircle } from 'lucide-react';
import StatCard from '../../components/Dashboard/StatCard';

const ProviderDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your mandap business</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="bg-primary-100 rounded-lg p-3 flex items-center justify-center">
            <Store className="w-10 h-10 text-primary-600" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              {user?.name}
            </h2>
            <p className="text-gray-600">{user?.businessName || 'Your Business'}</p>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                <p className="text-gray-900">{user?.email}</p>
                <p className="text-gray-900">{user?.phone || '+1234567890'}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="text-gray-900">{user?.address || '123 Business Address, City'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Bookings" 
          value="0"
          icon={Calendar}
          color="bg-primary-600"
        />
        
        <StatCard 
          title="Upcoming Events" 
          value="0"
          icon={Calendar}
          color="bg-secondary-600"
        />
        
        <StatCard 
          title="Customers" 
          value="0"
          icon={Users}
          color="bg-accent-600"
        />
        
        <StatCard 
          title="Completed Events" 
          value="0"
          icon={CheckCircle}
          color="bg-success-600"
        />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Business Description</h2>
        <p className="text-gray-700">
          {user?.description || 'Your business description will appear here.'}
        </p>
      </div>
      
      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Get Started</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-medium">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Complete your profile</p>
              <p className="text-sm text-gray-600">Add photos and details about your mandap services</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-medium">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Add your packages</p>
              <p className="text-sm text-gray-600">Create different service packages with pricing</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <span className="text-primary-600 font-medium">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Set your availability</p>
              <p className="text-sm text-gray-600">Define when your venue is available for bookings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;