import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building2, Search, Filter, MoreHorizontal, Eye, Edit, CheckCircle,
  XCircle, AlertTriangle, Calendar, Clock, Mail, Phone, MapPin,
  FileText, Download, Globe, Users, Activity, ArrowLeft, Star,
  Shield, Award, TrendingUp, ExternalLink, Upload, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  website?: string;
  logo?: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  verificationStatus: 'verified' | 'pending' | 'under_review' | 'rejected';
  registrationDate: string;
  lastActivity: string;
  location: {
    emirate: string;
    city: string;
    address: string;
  };
  category: string;
  description: string;
  documents: {
    tradeLicense?: string;
    taxCertificate?: string;
    authorityLetter?: string;
    additionalDocs?: string[];
  };
  contactPerson: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  statistics: {
    totalEvents: number;
    activeEvents: number;
    totalVolunteers: number;
    certificatesIssued: number;
    averageRating: number;
    completionRate: number;
  };
  compliance: {
    dataProtection: boolean;
    volunteerSafety: boolean;
    financialTransparency: boolean;
    reportingCompliance: boolean;
  };
  flags: string[];
  adminNotes: string;
  verificationNotes: string;
  approvedBy?: string;
  approvedDate?: string;
}

export default function AdminOrganizations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [emirateFilter, setEmirateFilter] = useState('all');
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [showOrgDialog, setShowOrgDialog] = useState(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);
  const [verificationDecision, setVerificationDecision] = useState<'approve' | 'reject' | ''>('');
  const [verificationNotes, setVerificationNotes] = useState('');

  // Mock data
  const organizations: Organization[] = [
    {
      id: '1',
      name: 'Dubai Environmental Foundation',
      email: 'contact@def.ae',
      phone: '+971 4 333 4444',
      website: 'https://def.ae',
      logo: '/api/placeholder/60/60',
      status: 'active',
      verificationStatus: 'verified',
      registrationDate: '2024-02-01T09:00:00Z',
      lastActivity: '2024-03-25T16:45:00Z',
      location: {
        emirate: 'Dubai',
        city: 'Business Bay',
        address: 'Business Bay Tower, Level 15, Dubai, UAE'
      },
      category: 'Environment & Sustainability',
      description: 'Leading environmental conservation organization in the UAE, focused on sustainability initiatives and community engagement.',
      documents: {
        tradeLicense: 'trade_license_def.pdf',
        taxCertificate: 'tax_cert_def.pdf',
        authorityLetter: 'authority_letter_def.pdf',
        additionalDocs: ['annual_report_2023.pdf', 'audit_report_2023.pdf']
      },
      contactPerson: {
        name: 'Sarah Al-Zaabi',
        position: 'Director of Operations',
        email: 'sarah@def.ae',
        phone: '+971 50 123 4567'
      },
      statistics: {
        totalEvents: 45,
        activeEvents: 8,
        totalVolunteers: 1247,
        certificatesIssued: 892,
        averageRating: 4.8,
        completionRate: 94
      },
      compliance: {
        dataProtection: true,
        volunteerSafety: true,
        financialTransparency: true,
        reportingCompliance: true
      },
      flags: [],
      adminNotes: 'Excellent track record, highly recommended organization.',
      verificationNotes: 'All documents verified. Organization meets all compliance requirements.',
      approvedBy: 'Admin Team',
      approvedDate: '2024-02-05T14:30:00Z'
    },
    {
      id: '2',
      name: 'UAE Youth Development Initiative',
      email: 'info@uaeyouth.org',
      phone: '+971 2 555 6666',
      website: 'https://uaeyouth.org',
      status: 'pending',
      verificationStatus: 'under_review',
      registrationDate: '2024-03-20T11:30:00Z',
      lastActivity: '2024-03-24T09:15:00Z',
      location: {
        emirate: 'Abu Dhabi',
        city: 'Al Reem Island',
        address: 'Sky Tower, Level 22, Al Reem Island, Abu Dhabi, UAE'
      },
      category: 'Youth & Education',
      description: 'Non-profit organization dedicated to empowering UAE youth through educational programs and community service opportunities.',
      documents: {
        tradeLicense: 'trade_license_youth.pdf',
        taxCertificate: 'tax_cert_youth.pdf',
        authorityLetter: 'authority_letter_youth.pdf'
      },
      contactPerson: {
        name: 'Ahmed Al-Mansouri',
        position: 'Executive Director',
        email: 'ahmed@uaeyouth.org',
        phone: '+971 50 987 6543'
      },
      statistics: {
        totalEvents: 0,
        activeEvents: 0,
        totalVolunteers: 0,
        certificatesIssued: 0,
        averageRating: 0,
        completionRate: 0
      },
      compliance: {
        dataProtection: true,
        volunteerSafety: true,
        financialTransparency: false,
        reportingCompliance: true
      },
      flags: ['New Organization', 'Pending Financial Documentation'],
      adminNotes: 'New organization with good credentials. Awaiting financial transparency documentation.',
      verificationNotes: 'Documents under review. Financial transparency compliance pending.'
    },
    {
      id: '3',
      name: 'Sharjah Community Care',
      email: 'contact@scc.ae',
      phone: '+971 6 777 8888',
      status: 'suspended',
      verificationStatus: 'verified',
      registrationDate: '2024-01-15T14:20:00Z',
      lastActivity: '2024-03-15T12:30:00Z',
      location: {
        emirate: 'Sharjah',
        city: 'Al Majaz',
        address: 'Al Majaz Waterfront, Building 3, Sharjah, UAE'
      },
      category: 'Community Development',
      description: 'Community-focused organization providing support services and volunteer opportunities in Sharjah.',
      documents: {
        tradeLicense: 'trade_license_scc.pdf',
        taxCertificate: 'tax_cert_scc.pdf'
      },
      contactPerson: {
        name: 'Fatima Hassan',
        position: 'Program Manager',
        email: 'fatima@scc.ae',
        phone: '+971 50 456 7890'
      },
      statistics: {
        totalEvents: 23,
        activeEvents: 2,
        totalVolunteers: 456,
        certificatesIssued: 234,
        averageRating: 3.8,
        completionRate: 67
      },
      compliance: {
        dataProtection: true,
        volunteerSafety: false,
        financialTransparency: true,
        reportingCompliance: false
      },
      flags: ['Safety Violations', 'Reporting Issues', 'Low Completion Rate'],
      adminNotes: 'Suspended due to safety violations and poor event completion rates. Under review.',
      verificationNotes: 'Organization verified but currently suspended due to compliance issues.',
      approvedBy: 'Admin Team',
      approvedDate: '2024-01-20T10:15:00Z'
    },
    {
      id: '4',
      name: 'Green Future Foundation',
      email: 'hello@greenfuture.ae',
      phone: '+971 4 999 0000',
      website: 'https://greenfuture.ae',
      status: 'pending',
      verificationStatus: 'rejected',
      registrationDate: '2024-03-18T16:45:00Z',
      lastActivity: '2024-03-19T08:20:00Z',
      location: {
        emirate: 'Dubai',
        city: 'DIFC',
        address: 'DIFC Gate Village, Building 5, Dubai, UAE'
      },
      category: 'Environment & Sustainability',
      description: 'Environmental organization focused on sustainable development and green initiatives.',
      documents: {
        tradeLicense: 'trade_license_green.pdf'
      },
      contactPerson: {
        name: 'Mohammad Ali',
        position: 'Founder',
        email: 'mohammad@greenfuture.ae',
        phone: '+971 50 111 2222'
      },
      statistics: {
        totalEvents: 0,
        activeEvents: 0,
        totalVolunteers: 0,
        certificatesIssued: 0,
        averageRating: 0,
        completionRate: 0
      },
      compliance: {
        dataProtection: false,
        volunteerSafety: false,
        financialTransparency: false,
        reportingCompliance: false
      },
      flags: ['Incomplete Documentation', 'Failed Verification', 'Missing Compliance'],
      adminNotes: 'Rejected due to incomplete documentation and failed verification process.',
      verificationNotes: 'Verification rejected. Missing critical documents and compliance requirements not met.'
    }
  ];

  const categories = [
    'Environment & Sustainability',
    'Education & Literacy',
    'Healthcare & Medical',
    'Community Development',
    'Youth & Children',
    'Senior Citizens',
    'Disability Support',
    'Animal Welfare',
    'Arts & Culture',
    'Sports & Recreation'
  ];

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.contactPerson.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || org.category === categoryFilter;
    const matchesEmirate = emirateFilter === 'all' || org.location.emirate === emirateFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesEmirate;
  });

  const getStatusBadge = (status: Organization['status']) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Pending', className: 'bg-blue-100 text-blue-800' },
      suspended: { label: 'Suspended', className: 'bg-yellow-100 text-yellow-800' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getVerificationBadge = (status: Organization['verificationStatus']) => {
    const statusConfig = {
      verified: { label: 'Verified', className: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> },
      pending: { label: 'Pending', className: 'bg-gray-100 text-gray-800', icon: <Clock className="h-3 w-3" /> },
      under_review: { label: 'Under Review', className: 'bg-blue-100 text-blue-800', icon: <Eye className="h-3 w-3" /> },
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

  const handleViewOrganization = (org: Organization) => {
    setSelectedOrg(org);
    setShowOrgDialog(true);
  };

  const handleVerificationReview = (org: Organization) => {
    setSelectedOrg(org);
    setShowVerificationDialog(true);
  };

  const handleVerificationDecision = () => {
    if (selectedOrg && verificationDecision && verificationNotes) {
      // Simulate verification decision
      alert(`Organization ${selectedOrg.name} has been ${verificationDecision}d. Notes: ${verificationNotes}`);
      setShowVerificationDialog(false);
      setVerificationDecision('');
      setVerificationNotes('');
      setSelectedOrg(null);
    }
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

  const getComplianceScore = (compliance: Organization['compliance']) => {
    const total = Object.keys(compliance).length;
    const passed = Object.values(compliance).filter(Boolean).length;
    return Math.round((passed / total) * 100);
  };

  const stats = {
    total: organizations.length,
    active: organizations.filter(o => o.status === 'active').length,
    pending: organizations.filter(o => o.status === 'pending').length,
    suspended: organizations.filter(o => o.status === 'suspended').length,
    rejected: organizations.filter(o => o.status === 'rejected').length,
    verified: organizations.filter(o => o.verificationStatus === 'verified').length,
    underReview: organizations.filter(o => o.verificationStatus === 'under_review').length
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
              <h1 className="text-3xl font-bold text-gray-900">Organization Management</h1>
              <p className="text-gray-600">Verify and manage platform organizations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Organizations
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Verification Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Orgs</div>
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
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
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
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.underReview}</div>
              <div className="text-sm text-gray-600">Under Review</div>
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
                    placeholder="Search organizations, contacts, emails..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={emirateFilter} onValueChange={setEmirateFilter}>
                <SelectTrigger className="w-40">
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

        {/* Organizations List */}
        <div className="space-y-4">
          {filteredOrganizations.length > 0 ? (
            filteredOrganizations.map((org) => (
              <Card key={org.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        {org.logo ? (
                          <img src={org.logo} alt={org.name} className="w-16 h-16 rounded-lg" />
                        ) : (
                          <Building2 className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{org.name}</h3>
                          {getStatusBadge(org.status)}
                          {getVerificationBadge(org.verificationStatus)}
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4" />
                              <span>{org.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4" />
                              <span>{org.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{org.location.city}, {org.location.emirate}</span>
                            </div>
                            {org.website && (
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4" />
                                <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {org.website}
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span><strong>Registered:</strong> {formatDateTime(org.registrationDate)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4" />
                              <span><strong>Last Active:</strong> {formatDateTime(org.lastActivity)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span><strong>Contact:</strong> {org.contactPerson.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="text-xs">{org.category}</Badge>
                            </div>
                          </div>
                        </div>

                        {/* Statistics */}
                        {org.statistics.totalEvents > 0 && (
                          <div className="grid grid-cols-4 gap-4 mb-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{org.statistics.totalEvents}</div>
                              <div className="text-xs text-gray-600">Events</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">{org.statistics.totalVolunteers}</div>
                              <div className="text-xs text-gray-600">Volunteers</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-purple-600">{org.statistics.certificatesIssued}</div>
                              <div className="text-xs text-gray-600">Certificates</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-lg font-bold text-yellow-600">{org.statistics.averageRating}</span>
                              </div>
                              <div className="text-xs text-gray-600">Rating</div>
                            </div>
                          </div>
                        )}

                        {/* Compliance Score */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">Compliance Score:</span>
                            <span className={`text-sm font-bold ${
                              getComplianceScore(org.compliance) >= 75 ? 'text-green-600' :
                              getComplianceScore(org.compliance) >= 50 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {getComplianceScore(org.compliance)}%
                            </span>
                          </div>
                          {org.flags.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                              <span className="text-sm text-red-600">{org.flags.length} flags</span>
                            </div>
                          )}
                        </div>

                        {/* Flags */}
                        {org.flags.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {org.flags.map((flag, index) => (
                                <Badge key={index} variant="destructive" className="text-xs">
                                  {flag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-sm text-gray-600 line-clamp-2">{org.description}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrganization(org)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      
                      {(org.verificationStatus === 'pending' || org.verificationStatus === 'under_review') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVerificationReview(org)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Review
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
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No organizations found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || emirateFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'No organizations have registered yet.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Organization Detail Dialog */}
        <Dialog open={showOrgDialog} onOpenChange={setShowOrgDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Organization Details</DialogTitle>
              <DialogDescription>
                {selectedOrg && `Detailed information for ${selectedOrg.name}`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedOrg && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Organization Name</Label>
                      <div className="text-lg font-medium">{selectedOrg.name}</div>
                    </div>
                    <div>
                      <Label>Category</Label>
                      <div>{selectedOrg.category}</div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <div>{selectedOrg.email}</div>
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <div>{selectedOrg.phone}</div>
                    </div>
                    {selectedOrg.website && (
                      <div>
                        <Label>Website</Label>
                        <div>
                          <a href={selectedOrg.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center space-x-1">
                            <span>{selectedOrg.website}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Address</Label>
                      <div>{selectedOrg.location.address}</div>
                      <div className="text-sm text-gray-600">{selectedOrg.location.city}, {selectedOrg.location.emirate}</div>
                    </div>
                    <div>
                      <Label>Contact Person</Label>
                      <div className="font-medium">{selectedOrg.contactPerson.name}</div>
                      <div className="text-sm text-gray-600">{selectedOrg.contactPerson.position}</div>
                      <div className="text-sm text-gray-600">{selectedOrg.contactPerson.email}</div>
                      <div className="text-sm text-gray-600">{selectedOrg.contactPerson.phone}</div>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedOrg.status)}</div>
                  </div>
                  <div>
                    <Label>Verification Status</Label>
                    <div className="mt-1">{getVerificationBadge(selectedOrg.verificationStatus)}</div>
                  </div>
                  <div>
                    <Label>Compliance Score</Label>
                    <div className="mt-1">
                      <span className={`text-lg font-bold ${
                        getComplianceScore(selectedOrg.compliance) >= 75 ? 'text-green-600' :
                        getComplianceScore(selectedOrg.compliance) >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {getComplianceScore(selectedOrg.compliance)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                {selectedOrg.statistics.totalEvents > 0 && (
                  <div>
                    <Label>Performance Statistics</Label>
                    <div className="grid md:grid-cols-6 gap-4 mt-2">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{selectedOrg.statistics.totalEvents}</div>
                        <div className="text-xs text-gray-600">Total Events</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{selectedOrg.statistics.activeEvents}</div>
                        <div className="text-xs text-gray-600">Active Events</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{selectedOrg.statistics.totalVolunteers}</div>
                        <div className="text-xs text-gray-600">Volunteers</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">{selectedOrg.statistics.certificatesIssued}</div>
                        <div className="text-xs text-gray-600">Certificates</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">{selectedOrg.statistics.averageRating}</div>
                        <div className="text-xs text-gray-600">Avg Rating</div>
                      </div>
                      <div className="text-center p-3 bg-indigo-50 rounded-lg">
                        <div className="text-xl font-bold text-indigo-600">{selectedOrg.statistics.completionRate}%</div>
                        <div className="text-xs text-gray-600">Completion</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Compliance Details */}
                <div>
                  <Label>Compliance Requirements</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    {Object.entries(selectedOrg.compliance).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        {value ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <Label>Submitted Documents</Label>
                  <div className="space-y-2 mt-2">
                    {selectedOrg.documents.tradeLicense && (
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span>Trade License</span>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    )}
                    {selectedOrg.documents.taxCertificate && (
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span>Tax Certificate</span>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    )}
                    {selectedOrg.documents.authorityLetter && (
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span>Authority Letter</span>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    )}
                    {selectedOrg.documents.additionalDocs?.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span>{doc}</span>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin Notes */}
                <div>
                  <Label>Admin Notes</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                    {selectedOrg.adminNotes || 'No admin notes available.'}
                  </div>
                </div>

                {/* Verification Notes */}
                {selectedOrg.verificationNotes && (
                  <div>
                    <Label>Verification Notes</Label>
                    <div className="mt-2 p-3 bg-blue-50 rounded border text-sm">
                      {selectedOrg.verificationNotes}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowOrgDialog(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Organization
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  {(selectedOrg.verificationStatus === 'pending' || selectedOrg.verificationStatus === 'under_review') && (
                    <Button 
                      onClick={() => {
                        setShowOrgDialog(false);
                        handleVerificationReview(selectedOrg);
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Review Verification
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Verification Review Dialog */}
        <Dialog open={showVerificationDialog} onOpenChange={setShowVerificationDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Verification Review</DialogTitle>
              <DialogDescription>
                {selectedOrg && `Review verification for ${selectedOrg.name}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Verification Decision</Label>
                <Select value={verificationDecision} onValueChange={(value: 'approve' | 'reject') => setVerificationDecision(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select decision" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approve">Approve Organization</SelectItem>
                    <SelectItem value="reject">Reject Application</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="verificationNotes">Review Notes *</Label>
                <Textarea
                  id="verificationNotes"
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Enter detailed notes about the verification decision..."
                  rows={4}
                />
              </div>

              {verificationDecision === 'approve' && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    This organization will be approved and can start creating events and managing volunteers.
                  </AlertDescription>
                </Alert>
              )}

              {verificationDecision === 'reject' && (
                <Alert className="border-red-200 bg-red-50">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    This organization will be rejected and notified of the decision with your notes.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowVerificationDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleVerificationDecision}
                  disabled={!verificationDecision || !verificationNotes}
                  className={verificationDecision === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                >
                  {verificationDecision === 'approve' ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Organization
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}