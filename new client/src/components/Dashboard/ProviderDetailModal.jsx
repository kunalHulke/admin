import React from 'react';
import { X, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { ProviderStatus } from '../../types';

const ProviderDetailModal = ({ 
  provider, 
  onClose, 
  onApprove, 
  onDeny 
}) => {
  const statusBadge = (status) => {
    switch(status) {
      case ProviderStatus.PENDING:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-warning-100 text-warning-800">
            <AlertCircle size={14} />
            Pending
          </span>
        );
      case ProviderStatus.APPROVED:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-success-100 text-success-800">
            <CheckCircle2 size={14} />
            Approved
          </span>
        );
      case ProviderStatus.DENIED:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-medium bg-error-100 text-error-800">
            <XCircle size={14} />
            Denied
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Provider Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{provider.businessName}</h3>
              <p className="text-gray-500 mt-1">{provider.address}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              {statusBadge(provider.status)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Name:</span> {provider.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Email:</span> {provider.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Phone:</span> {provider.phone}
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Registration Details</h4>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Registered on:</span> {new Date(provider.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Provider ID:</span> {provider.id}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Business Description</h4>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-md">{provider.description}</p>
          </div>
          
          {provider.status === ProviderStatus.PENDING && onApprove && onDeny && (
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => onDeny(provider.id)}
                className="btn btn-outline border-error-300 text-error-600 hover:bg-error-50"
              >
                Deny
              </button>
              <button
                onClick={() => onApprove(provider.id)}
                className="btn btn-primary"
              >
                Approve
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailModal;