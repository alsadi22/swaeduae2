// Mock database for SwaedUAE volunteer platform
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'volunteer' | 'organization' | 'admin';
  phone?: string;
  emiratesId?: string;
  organizationId?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  website?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  organizationName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  coordinates: { lat: number; lng: number };
  maxVolunteers: number;
  registeredVolunteers: number;
  category: string;
  status: 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';
  requirements: string[];
  createdAt: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  volunteerId: string;
  status: 'registered' | 'checked_in' | 'checked_out' | 'completed' | 'no_show';
  registeredAt: string;
  checkedInAt?: string;
  checkedOutAt?: string;
}

export interface Certificate {
  id: string;
  volunteerId: string;
  volunteerName: string;
  eventId: string;
  eventTitle: string;
  organizationName: string;
  hoursCompleted: number;
  issuedAt: string;
  qrCode: string;
  verificationUrl: string;
}

export interface AttendanceLog {
  id: string;
  volunteerId: string;
  eventId: string;
  type: 'check_in' | 'check_out' | 'heartbeat';
  timestamp: string;
  location: { lat: number; lng: number };
  isWithinGeofence: boolean;
}

// Mock data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Al Mansouri',
    email: 'ahmed@example.com',
    role: 'volunteer',
    phone: '+971501234567',
    emiratesId: '784-1990-1234567-1',
    createdAt: '2024-01-15T10:00:00Z',
    isActive: true
  },
  {
    id: '2',
    name: 'Fatima Al Zahra',
    email: 'fatima@example.com',
    role: 'volunteer',
    phone: '+971507654321',
    emiratesId: '784-1995-7654321-2',
    createdAt: '2024-02-20T14:30:00Z',
    isActive: true
  },
  {
    id: '3',
    name: 'UAE Red Crescent',
    email: 'contact@redcrescent.ae',
    role: 'organization',
    phone: '+97143334444',
    organizationId: 'org1',
    createdAt: '2024-01-01T09:00:00Z',
    isActive: true
  },
  {
    id: '4',
    name: 'Admin User',
    email: 'admin@swaeduae.ae',
    role: 'admin',
    createdAt: '2024-01-01T08:00:00Z',
    isActive: true
  }
];

export const mockOrganizations: Organization[] = [
  {
    id: 'org1',
    name: 'UAE Red Crescent',
    email: 'contact@redcrescent.ae',
    phone: '+97143334444',
    description: 'Humanitarian organization providing aid and support across the UAE',
    website: 'https://redcrescent.ae',
    isVerified: true,
    createdAt: '2024-01-01T09:00:00Z'
  },
  {
    id: 'org2',
    name: 'Emirates Foundation',
    email: 'info@emiratesfoundation.ae',
    phone: '+97143335555',
    description: 'Supporting youth development and community initiatives',
    website: 'https://emiratesfoundation.ae',
    isVerified: true,
    createdAt: '2024-01-10T11:00:00Z'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'evt1',
    title: 'Beach Cleanup - Dubai Marina',
    description: 'Join us for a community beach cleanup to protect our marine environment',
    organizationId: 'org1',
    organizationName: 'UAE Red Crescent',
    date: '2024-10-15',
    startTime: '07:00',
    endTime: '11:00',
    location: 'Dubai Marina Beach',
    coordinates: { lat: 25.0657, lng: 55.1713 },
    maxVolunteers: 50,
    registeredVolunteers: 23,
    category: 'Environment',
    status: 'published',
    requirements: ['Comfortable clothing', 'Sun protection', 'Water bottle'],
    createdAt: '2024-09-20T10:00:00Z'
  },
  {
    id: 'evt2',
    title: 'Food Distribution - Sharjah',
    description: 'Help distribute meals to families in need during Ramadan',
    organizationId: 'org2',
    organizationName: 'Emirates Foundation',
    date: '2024-10-20',
    startTime: '18:00',
    endTime: '22:00',
    location: 'Sharjah Community Center',
    coordinates: { lat: 25.3463, lng: 55.4209 },
    maxVolunteers: 30,
    registeredVolunteers: 18,
    category: 'Community Support',
    status: 'published',
    requirements: ['Food handling certification preferred', 'Comfortable shoes'],
    createdAt: '2024-09-25T15:30:00Z'
  }
];

export const mockRegistrations: EventRegistration[] = [
  {
    id: 'reg1',
    eventId: 'evt1',
    volunteerId: '1',
    status: 'registered',
    registeredAt: '2024-09-22T09:15:00Z'
  },
  {
    id: 'reg2',
    eventId: 'evt2',
    volunteerId: '1',
    status: 'completed',
    registeredAt: '2024-09-26T14:20:00Z',
    checkedInAt: '2024-10-20T17:55:00Z',
    checkedOutAt: '2024-10-20T21:45:00Z'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: 'cert1',
    volunteerId: '1',
    volunteerName: 'Ahmed Al Mansouri',
    eventId: 'evt2',
    eventTitle: 'Food Distribution - Sharjah',
    organizationName: 'Emirates Foundation',
    hoursCompleted: 4,
    issuedAt: '2024-10-21T10:00:00Z',
    qrCode: 'QR_CERT_001_2024',
    verificationUrl: 'https://swaeduae.ae/qr/verify?code=QR_CERT_001_2024'
  }
];

export const mockAttendanceLogs: AttendanceLog[] = [
  {
    id: 'att1',
    volunteerId: '1',
    eventId: 'evt2',
    type: 'check_in',
    timestamp: '2024-10-20T17:55:00Z',
    location: { lat: 25.3463, lng: 55.4209 },
    isWithinGeofence: true
  },
  {
    id: 'att2',
    volunteerId: '1',
    eventId: 'evt2',
    type: 'check_out',
    timestamp: '2024-10-20T21:45:00Z',
    location: { lat: 25.3463, lng: 55.4209 },
    isWithinGeofence: true
  }
];

// Utility functions
export const getEventsByOrganization = (orgId: string) => 
  mockEvents.filter(event => event.organizationId === orgId);

export const getRegistrationsByVolunteer = (volunteerId: string) =>
  mockRegistrations.filter(reg => reg.volunteerId === volunteerId);

export const getCertificatesByVolunteer = (volunteerId: string) =>
  mockCertificates.filter(cert => cert.volunteerId === volunteerId);

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lng2-lng1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distance in meters
};

export const isWithinGeofence = (eventCoords: {lat: number, lng: number}, userCoords: {lat: number, lng: number}, radius: number = 150): boolean => {
  const distance = calculateDistance(eventCoords.lat, eventCoords.lng, userCoords.lat, userCoords.lng);
  return distance <= radius;
};