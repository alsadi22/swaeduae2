import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, Search, Filter, MoreHorizontal, Eye, Edit, Ban,
  CheckCircle, XCircle, AlertTriangle, Calendar, Clock,
  Mail, Phone, MapPin, Award, Activity, Shield, Download,
  UserCheck, UserX, MessageSquare, FileText, Star, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'suspended' | 'pending' | 'banned';
  role: 'volunteer' | 'organization' | 'admin';
  verificationStatus: 'verified' | 'pending' | 'rejected';
  registrationDate: string;
  lastLogin: string;
  totalHours: number;
  eventsAttended: number;
  certificatesEarned: number;
  organizationName?: string;
  location: {
    emirate: string;
    city: string;
  };
  riskScore: number;
  flags: string[];
  notes: string;
  skills: string[];
  preferredCategories: string[];
}

export default function AdminUsers() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [emirateFilter, setEmirateFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showSuspendDialog, setShowSuspendDialog] = useState(false);
  const [suspensionReason, setSuspensionReason] = useState('');

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'Ahmed Al-Mansouri',
      email: 'ahmed@example.com',
      phone: '+971 50 111 1111',
      avatar: '/api/placeholder/40/40',
      status: 'active',
      role: 'volunteer',
      verificationStatus: 'verified',
      registrationDate: '2024-01-15T10:00:00Z',
      lastLogin: '2024-03-25T14:30:00Z',
      totalHours: 156,
      eventsAttended: 23,
      certificatesEarned: 12,
      location: {
        emirate: 'Dubai',
        city: 'Dubai Marina'
      },
      riskScore: 2,
      flags: [],
      notes: 'Highly reliable volunteer with excellent attendance record.',
      skills: ['Environmental Conservation', 'Leadership', 'First Aid'],
      preferredCategories: ['Environment', 'Community Development']
    },
    {
      id: '2',
      name: 'Dubai Environmental Foundation',
      email: 'contact@def.ae',
      phone: '+971 4 333 4444',
      status: 'active',
      role: 'organization',
      verificationStatus: 'verified',
      registrationDate: '2024-02-01T09:00:00Z',
      lastLogin: '2024-03-25T16:45:00Z',
      totalHours: 0,
      eventsAttended: 0,
      certificatesEarned: 0,
      organizationName: 'Dubai Environmental Foundation',
      location: {
        emirate: 'Dubai',
        city: 'Business Bay'
      },
      riskScore: 1,
      flags: [],
      notes: 'Verified environmental organization with excellent track record.',
      skills: [],
      preferredCategories: []
    },
    {
      id: '3',
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      phone: '+971 50 222 2222',
      status: 'suspended',
      role: 'volunteer',
      verificationStatus: 'verified',
      registrationDate: '2024-01-20T11:30:00Z',
      lastLogin: '2024-03-20T09:15:00Z',
      totalHours: 89,
      eventsAttended: 15,
      certificatesEarned: 6,
      location: {
        emirate: 'Abu Dhabi',
        city: 'Al Reem Island'
      },
      riskScore: 7,
      flags: ['Multiple No-Shows', 'Late Cancellations'],
      notes: 'Suspended due to repeated no-shows without notice. Review in 30 days.',
      skills: ['Community Service', 'Event Coordination'],
      preferredCategories: ['Community', 'Education']
    },
    {
      id: '4',
      name: 'Mohammed Ali',
      email: 'mohammed@example.com',
      phone: '+971 50 333 3333',
      status: 'pending',
      role: 'volunteer',
      verificationStatus: 'pending',
      registrationDate: '2024-03-24T16:20:00Z',
      lastLogin: '2024-03-24T16:20:00Z',
      totalHours: 0,
      eventsAttended: 0,
      certificatesEarned: 0,
      location: {
        emirate: 'Sharjah',
        city: 'Al Majaz'
      },
      riskScore: 3,
      flags: ['New Account'],
      notes: 'New registration pending email verification.',
      skills: ['Photography', 'Social Media'],
      preferredCategories: ['Arts & Culture', 'Youth Development']
    },
    {
      id: '5',
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      phone: '+971 50 444 4444',
      status: 'banned',
      role: 'volunteer',
      verificationStatus: 'rejected',
      registrationDate: '2024-02-10T14:00:00Z',
      lastLogin: '2024-03-15T11:30:00Z',
      totalHours: 12,
      eventsAttended: 2,
      certificatesEarned: 0,
      location: {
        emirate: 'Dubai',
        city: 'Deira'
      },
      riskScore: 9,
      flags: ['Inappropriate Behavior', 'Fake Credentials', 'Multiple Violations'],
      notes: 'Permanently banned for inappropriate conduct and providing false information.',
      skills: [],
      preferredCategories: []
    }
  ];

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.organizationName && user.organizationName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesEmirate = emirateFilter === 'all' || user.location.emirate === emirateFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesEmirate;
  });

  const getStatusBadge = (status: User['status']) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      suspended: { label: 'Suspended', className: 'bg-yellow-100 text-yellow-800' },
      pending: { label: 'Pending', className: 'bg-blue-100 text-blue-800' },
      banned: { label: 'Banned', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getRoleBadge = (role: User['role']) => {
    const roleConfig = {
      volunteer: { label: 'Volunteer', className: 'bg-blue-100 text-blue-800' },
      organization: { label: 'Organization', className: 'bg-purple-100 text-purple-800' },
      admin: { label: 'Admin', className: 'bg-red-100 text-red-800' }
    };
    
    const config = roleConfig[role];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getVerificationBadge = (status: User['verificationStatus']) => {
    const statusConfig = {
      verified: { label: 'Verified', className: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800', icon: <Clock className="h-3 w-3" /> },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800', icon: <XCircle className="h-3 w-3" /> }
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { label: 'Low', color: 'text-green-600' };
    if (score <= 6) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'High', color: 'text-red-600' };
  };

  const handleSuspendUser = (user: User) => {
    setSelectedUser(user);
    setShowSuspendDialog(true);
  };

  const handleConfirmSuspension = () => {
    if (selectedUser && suspensionReason) {
      // Simulate suspension
      alert(`User ${selectedUser.name} has been suspended. Reason: ${suspensionReason}`);
      setShowSuspendDialog(false);
      setSuspensionReason('');
      setSelectedUser(null);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserDialog(true);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    pending: users.filter(u => u.status === 'pending').length,
    banned: users.filter(u => u.status === 'banned').length,
    volunteers: users.filter(u => u.role === 'volunteer').length,
    organizations: users.filter(u => u.role === 'organization').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Monitor and manage platform users</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Users
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.suspended}</div>
              <div className="text-sm text-gray-600">Suspended</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.banned}</div>
              <div className="text-sm text-gray-600">Banned</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.volunteers}</div>
              <div className="text-sm text-gray-600">Volunteers</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.organizations}</div>
              <div className="text-sm text-gray-600">Organizations</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users, emails, organizations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="volunteer">Volunteers</SelectItem>
                  <SelectItem value="organization">Organizations</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>

              <Select value={emirateFilter} onValueChange={setEmirateFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Emirate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Emirates</SelectItem>
                  {emirates.map((emirate) => (
                    <SelectItem key={emirate} value={emirate}>{emirate}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                        ) : (
                          <span className="text-lg font-medium text-gray-600">
                            {user.name.split(' ').map(n => n.charAt(0)).join('')}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                          {getStatusBadge(user.status)}
                          {getRoleBadge(user.role)}
                          {getVerificationBadge(user.verificationStatus)}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{user.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{user.location.city}, {user.location.emirate}</span>
                            </div>
                            {user.organizationName && (
                              <div className="flex items-center space-x-2">
                                <Shield className="h-4 w-4" />
                                <span>{user.organizationName}</span>
                              </div>
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span><strong>Registered:</strong> {formatDateTime(user.registrationDate)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4" />
                              <span><strong>Last Login:</strong> {formatDateTime(user.lastLogin)}</span>
                            </div>
                            {user.role === 'volunteer' && (
                              <>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span><strong>Hours:</strong> {user.totalHours}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Award className="h-4 w-4" />
                                  <span><strong>Certificates:</strong> {user.certificatesEarned}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Risk Score and Flags */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">Risk Score:</span>
                              <span className={`text-sm font-bold ${getRiskLevel(user.riskScore).color}`}>
                                {user.riskScore}/10 ({getRiskLevel(user.riskScore).label})
                              </span>
                            </div>
                            {user.flags.length > 0 && (
                              <div className="flex items-center space-x-1">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <span className="text-sm text-red-600">{user.flags.length} flags</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Flags */}
                        {user.flags.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {user.flags.map((flag, index) => (
                                <Badge key={index} variant="destructive" className="text-xs">
                                  {flag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {user.notes && (
                          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            <strong>Notes:</strong> {user.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewUser(user)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      
                      {user.status === 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSuspendUser(user)}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                      )}

                      {user.status === 'suspended' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-600 hover:text-green-700"
                        >
                          <UserCheck className="h-4 w-4 mr-1" />
                          Reactivate
                        </Button>
                      )}

                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || roleFilter !== 'all' || emirateFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'No users have registered yet.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* User Detail Dialog */}
        <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                {selectedUser && `Detailed information for ${selectedUser.name}`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedUser && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <div className="text-lg font-medium">{selectedUser.name}</div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <div>{selectedUser.email}</div>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <div>{selectedUser.phone}</div>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <div>{selectedUser.location.city}, {selectedUser.location.emirate}</div>
                  </div>
                </div>

                {/* Status Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Account Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                  </div>
                  <div>
                    <Label>Verification</Label>
                    <div className="mt-1">{getVerificationBadge(selectedUser.verificationStatus)}</div>
                  </div>
                </div>

                {/* Activity Stats */}
                {selectedUser.role === 'volunteer' && (
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{selectedUser.totalHours}</div>
                      <div className="text-sm text-gray-600">Total Hours</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedUser.eventsAttended}</div>
                      <div className="text-sm text-gray-600">Events Attended</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{selectedUser.certificatesEarned}</div>
                      <div className="text-sm text-gray-600">Certificates</div>
                    </div>
                  </div>
                )}

                {/* Skills and Categories */}
                {selectedUser.skills.length > 0 && (
                  <div>
                    <Label>Skills</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedUser.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedUser.preferredCategories.length > 0 && (
                  <div>
                    <Label>Preferred Categories</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedUser.preferredCategories.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risk Assessment */}
                <div>
                  <Label>Risk Assessment</Label>
                  <div className="mt-2 p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span>Risk Score</span>
                      <span className={`font-bold ${getRiskLevel(selectedUser.riskScore).color}`}>
                        {selectedUser.riskScore}/10 ({getRiskLevel(selectedUser.riskScore).label})
                      </span>
                    </div>
                    {selectedUser.flags.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-red-600">Active Flags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedUser.flags.map((flag, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {flag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <Label>Admin Notes</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                    {selectedUser.notes || 'No admin notes available.'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowUserDialog(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  {selectedUser.status === 'active' && (
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        setShowUserDialog(false);
                        handleSuspendUser(selectedUser);
                      }}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend User
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Suspend User Dialog */}
        <Dialog open={showSuspendDialog} onOpenChange={setShowSuspendDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Suspend User</DialogTitle>
              <DialogDescription>
                {selectedUser && `Suspend ${selectedUser.name} from the platform`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  This action will prevent the user from accessing the platform and participating in events.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="suspensionReason">Reason for Suspension *</Label>
                <Select value={suspensionReason} onValueChange={setSuspensionReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-shows">Repeated No-Shows</SelectItem>
                    <SelectItem value="inappropriate-behavior">Inappropriate Behavior</SelectItem>
                    <SelectItem value="fake-credentials">Fake Credentials</SelectItem>
                    <SelectItem value="policy-violation">Policy Violation</SelectItem>
                    <SelectItem value="security-concern">Security Concern</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowSuspendDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleConfirmSuspension}
                  disabled={!suspensionReason}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}