import { User, Provider, UserRole, ProviderStatus, AnalyticsData } from '../types';

// Mock users data
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: UserRole.ADMIN,
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: UserRole.USER,
    createdAt: '2023-01-15T00:00:00.000Z',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: UserRole.USER,
    createdAt: '2023-02-01T00:00:00.000Z',
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: UserRole.USER,
    createdAt: '2023-02-15T00:00:00.000Z',
  },
];

// Mock providers data
export const mockProviders: Provider[] = [
  {
    id: 'provider-1',
    name: 'Sam Wilson',
    email: 'sam@mandap.com',
    role: UserRole.PROVIDER,
    status: ProviderStatus.APPROVED,
    businessName: 'Wilson Mandap Services',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    description: 'We provide beautiful mandap decorations for all occasions.',
    createdAt: '2023-01-10T00:00:00.000Z',
  },
  {
    id: 'provider-2',
    name: 'Emily Davis',
    email: 'emily@mandap.com',
    role: UserRole.PROVIDER,
    status: ProviderStatus.PENDING,
    businessName: 'Emily\'s Wedding Venues',
    phone: '+0987654321',
    address: '456 Park Ave, City, Country',
    description: 'Luxury wedding venues and mandap services.',
    createdAt: '2023-02-20T00:00:00.000Z',
  },
  {
    id: 'provider-3',
    name: 'Michael Brown',
    email: 'michael@mandap.com',
    role: UserRole.PROVIDER,
    status: ProviderStatus.DENIED,
    businessName: 'Brown\'s Mandap Designs',
    phone: '+1122334455',
    address: '789 Oak St, City, Country',
    description: 'Innovative mandap designs for modern weddings.',
    createdAt: '2023-03-05T00:00:00.000Z',
  },
  {
    id: 'provider-4',
    name: 'Sarah Johnson',
    email: 'sarah@mandap.com',
    role: UserRole.PROVIDER,
    status: ProviderStatus.APPROVED,
    businessName: 'Sarah\'s Wedding Venues',
    phone: '+5566778899',
    address: '101 Elm St, City, Country',
    description: 'Traditional and cultural mandap services.',
    createdAt: '2023-03-15T00:00:00.000Z',
  },
];

// Mock analytics data
export const mockAnalyticsData: AnalyticsData = {
  totalUsers: mockUsers.filter(u => u.role === UserRole.USER).length,
  totalProviders: mockProviders.length,
  pendingProviders: mockProviders.filter(p => p.status === ProviderStatus.PENDING).length,
  approvedProviders: mockProviders.filter(p => p.status === ProviderStatus.APPROVED).length,
  deniedProviders: mockProviders.filter(p => p.status === ProviderStatus.DENIED).length,
  userGrowth: [
    { month: 'Jan', count: 1 },
    { month: 'Feb', count: 2 },
    { month: 'Mar', count: 0 },
    { month: 'Apr', count: 3 },
    { month: 'May', count: 2 },
    { month: 'Jun', count: 5 },
  ],
  providerGrowth: [
    { month: 'Jan', count: 1 },
    { month: 'Feb', count: 0 },
    { month: 'Mar', count: 2 },
    { month: 'Apr', count: 1 },
    { month: 'May', count: 1 },
    { month: 'Jun', count: 0 },
  ],
};

// Mock credentials for login testing
export const mockCredentials = {
  admin: {
    email: 'admin@example.com',
    password: 'password123',
  },
  user: {
    email: 'john@example.com',
    password: 'password123',
  },
  approvedProvider: {
    email: 'sam@mandap.com',
    password: 'password123',
  },
  pendingProvider: {
    email: 'emily@mandap.com',
    password: 'password123',
  },
};