import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Search,
  Eye 
} from 'lucide-react';
import { ProviderStatus } from '../../types';

const ProvidersList = ({ 
  providers, 
  onApprove, 
  onDeny, 
  onView 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || provider.status === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  const statusBadge = (status) => {
    switch(status) {
      case ProviderStatus.PENDING:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
            <AlertCircle size={12} />
            Pending
          </span>
        );
      case ProviderStatus.APPROVED:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
            <CheckCircle2 size={12} />
            Approved
          </span>
        );
      case ProviderStatus.DENIED:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-800">
            <XCircle size={12} />
            Denied
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 form-input max-w-xs"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === 'all' 
                  ? 'bg-gray-200 text-gray-800' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter(ProviderStatus.PENDING)}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === ProviderStatus.PENDING 
                  ? 'bg-warning-100 text-warning-800' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter(ProviderStatus.APPROVED)}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === ProviderStatus.APPROVED 
                  ? 'bg-success-100 text-success-800' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter(ProviderStatus.DENIED)}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === ProviderStatus.DENIED 
                  ? 'bg-error-100 text-error-800' 
                  : 'bg-white text-gray-600 border border-gray-300'
              }`}
            >
              Denied
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                        <div className="text-sm text-gray-500">{provider.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{provider.businessName}</div>
                    <div className="text-sm text-gray-500">{provider.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {statusBadge(provider.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(provider.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onView(provider)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye size={18} />
                      </button>
                      
                      {provider.status === ProviderStatus.PENDING && (
                        <>
                          <button
                            onClick={() => onApprove(provider.id)}
                            className="text-success-600 hover:text-success-900"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button
                            onClick={() => onDeny(provider.id)}
                            className="text-error-600 hover:text-error-900"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No providers found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProvidersList;