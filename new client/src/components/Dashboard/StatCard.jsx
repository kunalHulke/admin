import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  change 
}) => {
  return (
    <div className="card p-6 hover:shadow-md transition-all">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${
                change.isPositive ? 'text-success-600' : 'text-error-600'
              }`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="ml-2 text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        
        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;