import React from 'react';
import AuthLayout from '../components/Layout/AuthLayout';
import ProviderRegisterForm from '../components/Auth/ProviderRegisterForm';

const ProviderRegister = () => {
  return (
    <AuthLayout 
      title="Register as Provider"
      subtitle="Create a provider account to list your mandap services"
    >
      <ProviderRegisterForm />
    </AuthLayout>
  );
};

export default ProviderRegister;