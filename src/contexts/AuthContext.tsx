import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'volunteer' | 'org_admin' | 'admin';
  emailVerified: boolean;
  organizationId?: string;
  organizationStatus?: 'pending_review' | 'approved' | 'rejected';
  phone?: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType?: 'volunteer' | 'org' | 'admin') => Promise<{ success: boolean; message?: string; requiresVerification?: boolean }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  forgotPassword: (email: string, userType?: 'volunteer' | 'org') => Promise<{ success: boolean; message?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; message?: string }>;
  verifyEmail: (token: string) => Promise<{ success: boolean; message?: string }>;
  resendVerification: () => Promise<{ success: boolean; message?: string }>;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  userType: 'volunteer' | 'org';
  organizationName?: string;
  organizationDescription?: string;
  tradeLicense?: string;
  website?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// FIXED MOCK USER DATABASE - Exact credentials from requirements
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Ahmed Al-Mansouri',
    email: 'ahmed@example.com',
    password: 'password123',
    role: 'volunteer',
    emailVerified: true,
    phone: '+971501234567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    email: 'fatima@example.com',
    password: 'password123',
    role: 'volunteer',
    emailVerified: true,
    phone: '+971509876543',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    createdAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    name: 'Red Crescent UAE',
    email: 'contact@redcrescent.ae',
    password: 'password123',
    role: 'org_admin',
    emailVerified: true,
    organizationId: 'org1',
    organizationStatus: 'approved',
    phone: '+97143216789',
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: '4',
    name: 'System Administrator',
    email: 'admin@swaeduae.ae',
    password: 'password123',
    role: 'admin',
    emailVerified: true,
    phone: '+97143334455',
    createdAt: '2024-01-01T08:00:00Z'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('swaeduae_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('Restored user from localStorage:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('swaeduae_user');
      }
    }
  }, []);

  const login = async (email: string, password: string, userType?: 'volunteer' | 'org' | 'admin') => {
    console.log('🔐 LOGIN ATTEMPT STARTED');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User Type:', userType);
    console.log('Available users in database:', mockUsers.map(u => ({ 
      email: u.email, 
      password: u.password, 
      role: u.role 
    })));

    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user with case-insensitive email matching
      const foundUser = mockUsers.find(u => 
        u.email.toLowerCase().trim() === email.toLowerCase().trim() && 
        u.password === password
      );
      
      console.log('🔍 User search result:', foundUser ? {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
        emailVerified: foundUser.emailVerified
      } : 'NOT FOUND');

      if (!foundUser) {
        console.log('❌ LOGIN FAILED: User not found or password incorrect');
        setIsLoading(false);
        return { success: false, message: 'Invalid email or password' };
      }

      // Check role-based access
      if (userType === 'volunteer' && foundUser.role !== 'volunteer') {
        console.log('❌ LOGIN FAILED: Role mismatch - expected volunteer, got', foundUser.role);
        setIsLoading(false);
        return { success: false, message: 'Invalid credentials for volunteer login' };
      }
      
      if (userType === 'org' && foundUser.role !== 'org_admin') {
        console.log('❌ LOGIN FAILED: Role mismatch - expected org_admin, got', foundUser.role);
        setIsLoading(false);
        return { success: false, message: 'Invalid credentials for organization login' };
      }
      
      if (userType === 'admin' && foundUser.role !== 'admin') {
        console.log('❌ LOGIN FAILED: Role mismatch - expected admin, got', foundUser.role);
        setIsLoading(false);
        return { success: false, message: 'Invalid credentials for admin login' };
      }

      // Check email verification
      if (!foundUser.emailVerified) {
        console.log('❌ LOGIN FAILED: Email not verified');
        setIsLoading(false);
        return { success: false, message: 'Please verify your email address first', requiresVerification: true };
      }

      // Check organization approval for org_admin
      if (foundUser.role === 'org_admin' && foundUser.organizationStatus !== 'approved') {
        console.log('❌ LOGIN FAILED: Organization not approved');
        setIsLoading(false);
        return { success: false, message: 'Your organization is still pending approval. Please wait for admin review.' };
      }

      // SUCCESS - Set user and save to localStorage
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('swaeduae_user', JSON.stringify(userWithoutPassword));
      
      console.log('✅ LOGIN SUCCESSFUL for user:', userWithoutPassword.email);
      console.log('User role:', userWithoutPassword.role);
      console.log('User saved to localStorage');
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('💥 LOGIN ERROR:', error);
      setIsLoading(false);
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: RegisterData) => {
    console.log('📝 REGISTRATION ATTEMPT:', userData);
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (existingUser) {
        console.log('❌ REGISTRATION FAILED: Email already exists');
        setIsLoading(false);
        return { success: false, message: 'Email address is already registered' };
      }

      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.userType === 'volunteer' ? 'volunteer' : 'org_admin',
        emailVerified: true, // Auto-verify for demo
        phone: userData.phone,
        organizationId: userData.userType === 'org' ? `org_${Date.now()}` : undefined,
        organizationStatus: userData.userType === 'org' ? 'approved' : undefined, // Auto-approve for demo
        createdAt: new Date().toISOString()
      };

      mockUsers.push(newUser);
      console.log('✅ REGISTRATION SUCCESSFUL for:', newUser.email);
      
      setIsLoading(false);
      return { 
        success: true, 
        message: userData.userType === 'volunteer' 
          ? 'Registration successful! You can now login.' 
          : 'Organization registration successful! You can now login.'
      };
    } catch (error) {
      console.error('💥 REGISTRATION ERROR:', error);
      setIsLoading(false);
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    console.log('🚪 LOGOUT: Clearing user session');
    setUser(null);
    localStorage.removeItem('swaeduae_user');
  };

  const forgotPassword = async (email: string, userType?: 'volunteer' | 'org') => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!foundUser) {
        return { success: false, message: 'No account found with this email address' };
      }
      if (userType === 'volunteer' && foundUser.role !== 'volunteer') {
        return { success: false, message: 'No volunteer account found with this email' };
      }
      if (userType === 'org' && foundUser.role !== 'org_admin') {
        return { success: false, message: 'No organization account found with this email' };
      }
      return { success: true, message: 'Password reset link sent to your email address' };
    } catch (error) {
      return { success: false, message: 'Failed to send reset link. Please try again.' };
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to reset password. Please try again.' };
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Email verified successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to verify email. Please try again.' };
    }
  };

  const resendVerification = async () => {
    if (!user) return { success: false, message: 'No user logged in' };
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Verification email sent' };
    } catch (error) {
      return { success: false, message: 'Failed to send verification email. Please try again.' };
    }
  };

  const contextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerification,
    isLoading
  };

  console.log('🔄 AuthProvider render - Current user:', user?.email || 'None');
  console.log('🔄 AuthProvider render - IsLoading:', isLoading);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}