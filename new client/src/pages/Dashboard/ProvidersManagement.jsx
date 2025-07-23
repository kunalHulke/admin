import React, { useState, useEffect } from 'react';
import ProvidersList from '../../components/Dashboard/ProvidersList';
import ProviderDetailModal from '../../components/Dashboard/ProviderDetailModal';
import { useAuth } from '../../contexts/AuthContext';
import { getApprovalRequests, getAllProviders } from '../../services/api';
import toast from 'react-hot-toast';

const ProvidersManagement = () => {
  const { approveProvider, denyProvider } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch providers from API
  const fetchProviders = async () => {
    try {
      setLoading(true);
      const [providersResponse, requestsResponse] = await Promise.all([
        getAllProviders(),
        getApprovalRequests()
      ]);
      
      // Combine providers with their approval status
      const providersWithStatus = providersResponse.providers.map(provider => {
        const request = requestsResponse.requests.find(req => req.providerId._id === provider._id);
        return {
          id: provider._id,
          name: provider.name,
          email: provider.email,
          role: 'provider',
          status: request ? request.status : 'approved',
          businessName: provider.name, // Using name as business name for now
          phone: provider.phoneNumber,
          address: 'Address not provided', // Default address
          description: 'Description not provided', // Default description
          createdAt: provider.createdAt || new Date().toISOString(),
        };
      });
      
      setProviders(providersWithStatus);
    } catch (error) {
      console.error('Error fetching providers:', error);
      toast.error('Failed to fetch providers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
    
    // Listen for refresh events from socket
    const handleRefresh = () => {
      fetchProviders();
    };
    
    window.addEventListener('refreshProviders', handleRefresh);
    window.addEventListener('refreshApprovalRequests', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshProviders', handleRefresh);
      window.removeEventListener('refreshApprovalRequests', handleRefresh);
    };
  }, []);
  
  const handleViewProvider = (provider) => {
    setSelectedProvider(provider);
  };
  
  const handleCloseModal = () => {
    setSelectedProvider(null);
  };
  
  const handleApprove = async (id) => {
    try {
      await approveProvider(id);
      
      // Update local state
      setProviders(prev => 
        prev.map(provider => 
          provider.id === id 
            ? { ...provider, status: 'approved' } 
            : provider
        )
      );
      
      // Close modal if open
      if (selectedProvider?.id === id) {
        setSelectedProvider(prev => 
          prev ? { ...prev, status: 'approved' } : null
        );
      }
      
      // Refresh data
      fetchProviders();
    } catch (error) {
      console.error('Error approving provider:', error);
    }
  };
  
  const handleDeny = async (id) => {
    try {
      await denyProvider(id);
      
      // Update local state
      setProviders(prev => 
        prev.map(provider => 
          provider.id === id 
            ? { ...provider, status: 'rejected' } 
            : provider
        )
      );
      
      // Close modal if open
      if (selectedProvider?.id === id) {
        setSelectedProvider(prev => 
          prev ? { ...prev, status: 'rejected' } : null
        );
      }
      
      // Refresh data
      fetchProviders();
    } catch (error) {
      console.error('Error denying provider:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Providers Management</h1>
        <p className="text-gray-600 mt-1">View and manage mandap service providers</p>
      </div>
      
      <ProvidersList 
        providers={providers}
        onApprove={handleApprove}
        onDeny={handleDeny}
        onView={handleViewProvider}
      />
      
      {selectedProvider && (
        <ProviderDetailModal 
          provider={selectedProvider}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onDeny={handleDeny}
        />
      )}
    </div>
  );
};

export default ProvidersManagement;