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
  Award, Search, Filter, MoreHorizontal, Eye, Edit, CheckCircle,
  XCircle, AlertTriangle, Calendar, Users, Building2, ArrowLeft,
  FileText, Download, MessageSquare, Shield, Star, Activity,
  Hash, Globe, Copy, Ban, Flag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Certificate {
  id: string;
  serialNumber: string;
  volunteerId: string;
  volunteerName: string;
  volunteerEmail: string;
  eventId: string;
  eventTitle: string;
  organizationId: string;
  organizationName: string;
  templateId: string;
  templateName: string;
  hoursCompleted: number;
  issueDate: string;
  completionDate: string;
  status: 'issued' | 'verified' | 'revoked' | 'disputed' | 'pending_verification';
  verificationStatus: 'verified' | 'pending' | 'failed' | 'suspicious';
  downloadCount: number;
  shareCount: number;
  verificationAttempts: number;
  lastVerified?: string;
  qrCode: string;
  digitalSignature: string;
  blockchainHash?: string;
  fraudFlags: string[];
  securityScore: number;
  location: {
    emirate: string;
    city: string;
  };
  metadata: {
    language: 'en' | 'ar' | 'both';
    format: 'pdf' | 'digital' | 'both';
    watermarked: boolean;
    encrypted: boolean;
  };
  adminNotes: string;
  fraudReport?: {
    reportedBy: string;
    reason: string;
    reportDate: string;
    investigationStatus: 'open' | 'investigating' | 'resolved' | 'dismissed';
    resolution?: string;
  };
}

export default function AdminCertificates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [organizationFilter, setOrganizationFilter] = useState('all');
  const [fraudFilter, setFraudFilter] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [revokeReason, setRevokeReason] = useState('');

  // Mock data
  const certificates: Certificate[] = [
    {
      id: '1',
      serialNumber: 'UAE-ENV-2024-001247',
      volunteerId: '1',
      volunteerName: 'Ahmed Al-Mansouri',
      volunteerEmail: 'ahmed@example.com',
      eventId: '1',
      eventTitle: 'Beach Cleanup Drive - Jumeirah',
      organizationId: '1',
      organizationName: 'Dubai Environmental Foundation',
      templateId: '1',
      templateName: 'Environmental Conservation Certificate',
      hoursCompleted: 4,
      issueDate: '2024-03-26T10:00:00Z',
      completionDate: '2024-03-25T12:00:00Z',
      status: 'issued',
      verificationStatus: 'verified',
      downloadCount: 3,
      shareCount: 1,
      verificationAttempts: 5,
      lastVerified: '2024-03-26T14:30:00Z',
      qrCode: 'https://verify.swaed.ae/cert/UAE-ENV-2024-001247',
      digitalSignature: 'SHA256:a1b2c3d4e5f6...',
      blockchainHash: '0x1234567890abcdef...',
      fraudFlags: [],
      securityScore: 95,
      location: {
        emirate: 'Dubai',
        city: 'Dubai'
      },
      metadata: {
        language: 'both',
        format: 'both',
        watermarked: true,
        encrypted: true
      },
      adminNotes: 'Legitimate certificate with strong verification.'
    },
    {
      id: '2',
      serialNumber: 'UAE-COM-2024-000856',
      volunteerId: '2',
      volunteerName: 'Fatima Hassan',
      volunteerEmail: 'fatima@example.com',
      eventId: '2',
      eventTitle: 'Community Food Distribution',
      organizationId: '2',
      organizationName: 'UAE Community Support',
      templateId: '2',
      templateName: 'Community Service Certificate',
      hoursCompleted: 3,
      issueDate: '2024-03-24T16:45:00Z',
      completionDate: '2024-03-24T20:00:00Z',
      status: 'disputed',
      verificationStatus: 'pending',
      downloadCount: 1,
      shareCount: 0,
      verificationAttempts: 2,
      qrCode: 'https://verify.swaed.ae/cert/UAE-COM-2024-000856',
      digitalSignature: 'SHA256:b2c3d4e5f6g7...',
      fraudFlags: ['Hours Disputed', 'Verification Pending'],
      securityScore: 72,
      location: {
        emirate: 'Dubai',
        city: 'Al Karama'
      },
      metadata: {
        language: 'en',
        format: 'pdf',
        watermarked: true,
        encrypted: false
      },
      adminNotes: 'Certificate issued but hours are under dispute.',
      fraudReport: {
        reportedBy: 'Organization',
        reason: 'Volunteer claimed 6 hours but only worked 3 hours according to organization records.',
        reportDate: '2024-03-25T09:00:00Z',
        investigationStatus: 'investigating'
      }
    },
    {
      id: '3',
      serialNumber: 'UAE-EDU-2024-000234',
      volunteerId: '3',
      volunteerName: 'Mohammed Ali',
      volunteerEmail: 'mohammed@example.com',
      eventId: '3',
      eventTitle: 'Youth Coding Workshop',
      organizationId: '3',
      organizationName: 'Tech for Good UAE',
      templateId: '3',
      templateName: 'Education & Training Certificate',
      hoursCompleted: 5,
      issueDate: '2024-03-22T11:30:00Z',
      completionDate: '2024-03-22T18:00:00Z',
      status: 'revoked',
      verificationStatus: 'failed',
      downloadCount: 0,
      shareCount: 0,
      verificationAttempts: 1,
      qrCode: 'https://verify.swaed.ae/cert/UAE-EDU-2024-000234',
      digitalSignature: 'SHA256:c3d4e5f6g7h8...',
      fraudFlags: ['Event Cancelled', 'Invalid Hours', 'Revoked Certificate'],
      securityScore: 15,
      location: {
        emirate: 'Abu Dhabi',
        city: 'Al Reem Island'
      },
      metadata: {
        language: 'en',
        format: 'digital',
        watermarked: false,
        encrypted: false
      },
      adminNotes: 'Certificate revoked due to event cancellation and safety violations.',
      fraudReport: {
        reportedBy: 'Admin',
        reason: 'Event was cancelled due to safety violations, certificate should not have been issued.',
        reportDate: '2024-03-23T10:00:00Z',
        investigationStatus: 'resolved',
        resolution: 'Certificate revoked, volunteer notified, organization suspended from issuing certificates temporarily.'
      }
    },
    {
      id: '4',
      serialNumber: 'UAE-HEA-2024-000445',
      volunteerId: '4',
      volunteerName: 'Sarah Ahmed',
      volunteerEmail: 'sarah@example.com',
      eventId: '4',
      eventTitle: 'Senior Citizens Health Checkup',
      organizationId: '4',
      organizationName: 'Sharjah Health Initiative',
      templateId: '4',
      templateName: 'Healthcare Volunteer Certificate',
      hoursCompleted: 6,
      issueDate: '2024-03-21T09:15:00Z',
      completionDate: '2024-03-20T15:00:00Z',
      status: 'issued',
      verificationStatus: 'verified',
      downloadCount: 2,
      shareCount: 3,
      verificationAttempts: 8,
      lastVerified: '2024-03-25T16:20:00Z',
      qrCode: 'https://verify.swaed.ae/cert/UAE-HEA-2024-000445',
      digitalSignature: 'SHA256:d4e5f6g7h8i9...',
      blockchainHash: '0x9876543210fedcba...',
      fraudFlags: [],
      securityScore: 98,
      location: {
        emirate: 'Sharjah',
        city: 'Al Majaz'
      },
      metadata: {
        language: 'both',
        format: 'both',
        watermarked: true,
        encrypted: true
      },
      adminNotes: 'High-security certificate for healthcare volunteer with medical certification.'
    },
    {
      id: '5',
      serialNumber: 'UAE-FAKE-2024-999999',
      volunteerId: '5',
      volunteerName: 'Suspicious User',
      volunteerEmail: 'fake@example.com',
      eventId: '5',
      eventTitle: 'Non-existent Event',
      organizationId: '5',
      organizationName: 'Fake Organization',
      templateId: '5',
      templateName: 'Fraudulent Certificate',
      hoursCompleted: 100,
      issueDate: '2024-03-26T23:59:00Z',
      completionDate: '2024-03-26T23:59:00Z',
      status: 'pending_verification',
      verificationStatus: 'suspicious',
      downloadCount: 0,
      shareCount: 0,
      verificationAttempts: 0,
      qrCode: 'https://verify.swaed.ae/cert/UAE-FAKE-2024-999999',
      digitalSignature: 'SHA256:invalid...',
      fraudFlags: ['Suspicious Hours', 'Invalid Organization', 'Fake Event', 'No Verification', 'Bulk Generation'],
      securityScore: 5,
      location: {
        emirate: 'Dubai',
        city: 'Unknown'
      },
      metadata: {
        language: 'en',
        format: 'pdf',
        watermarked: false,
        encrypted: false
      },
      adminNotes: 'Highly suspicious certificate flagged by fraud detection system.',
      fraudReport: {
        reportedBy: 'System',
        reason: 'Automated fraud detection: Impossible hours (100h), non-existent event, fake organization.',
        reportDate: '2024-03-27T00:01:00Z',
        investigationStatus: 'open'
      }
    }
  ];

  const organizations = [
    'Dubai Environmental Foundation',
    'UAE Community Support',
    'Tech for Good UAE',
    'Sharjah Health Initiative',
    'Future Leaders UAE'
  ];

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.volunteerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.organizationName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    const matchesVerification = verificationFilter === 'all' || cert.verificationStatus === verificationFilter;
    const matchesOrganization = organizationFilter === 'all' || cert.organizationName === organizationFilter;
    const matchesFraud = fraudFilter === 'all' || 
                        (fraudFilter === 'flagged' && cert.fraudFlags.length > 0) ||
                        (fraudFilter === 'clean' && cert.fraudFlags.length === 0);
    
    return matchesSearch && matchesStatus && matchesVerification && matchesOrganization && matchesFraud;
  });

  const getStatusBadge = (status: Certificate['status']) => {
    const statusConfig = {
      issued: { label: 'Issued', className: 'bg-green-100 text-green-800' },
      verified: { label: 'Verified', className: 'bg-blue-100 text-blue-800' },
      revoked: { label: 'Revoked', className: 'bg-red-100 text-red-800' },
      disputed: { label: 'Disputed', className: 'bg-yellow-100 text-yellow-800' },
      pending_verification: { label: 'Pending', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getVerificationBadge = (status: Certificate['verificationStatus']) => {
    const statusConfig = {
      verified: { label: 'Verified', className: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> },
      pending: { label: 'Pending', className: 'bg-gray-100 text-gray-800', icon: <AlertTriangle className="h-3 w-3" /> },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800', icon: <XCircle className="h-3 w-3" /> },
      suspicious: { label: 'Suspicious', className: 'bg-orange-100 text-orange-800', icon: <Flag className="h-3 w-3" /> }
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getSecurityLevel = (score: number) => {
    if (score >= 90) return { label: 'High', color: 'text-green-600' };
    if (score >= 70) return { label: 'Medium', color: 'text-yellow-600' };
    if (score >= 50) return { label: 'Low', color: 'text-orange-600' };
    return { label: 'Critical', color: 'text-red-600' };
  };

  const handleViewCertificate = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setShowCertificateDialog(true);
  };

  const handleRevokeCertificate = (cert: Certificate) => {
    setSelectedCertificate(cert);
    setShowRevokeDialog(true);
  };

  const handleConfirmRevoke = () => {
    if (selectedCertificate && revokeReason) {
      // Simulate certificate revocation
      alert(`Certificate ${selectedCertificate.serialNumber} has been revoked. Reason: ${revokeReason}`);
      setShowRevokeDialog(false);
      setRevokeReason('');
      setSelectedCertificate(null);
    }
  };

  const handleVerifyCertificate = (cert: Certificate) => {
    if (confirm(`Manually verify certificate ${cert.serialNumber}?`)) {
      alert(`Certificate ${cert.serialNumber} has been manually verified.`);
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

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === 'issued').length,
    verified: certificates.filter(c => c.verificationStatus === 'verified').length,
    disputed: certificates.filter(c => c.status === 'disputed').length,
    revoked: certificates.filter(c => c.status === 'revoked').length,
    flagged: certificates.filter(c => c.fraudFlags.length > 0).length,
    suspicious: certificates.filter(c => c.verificationStatus === 'suspicious').length
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
              <h1 className="text-3xl font-bold text-gray-900">Certificate Oversight</h1>
              <p className="text-gray-600">Monitor and manage platform certificates</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Certificates
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Fraud Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Certificates</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.issued}</div>
              <div className="text-sm text-gray-600">Issued</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.verified}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.disputed}</div>
              <div className="text-sm text-gray-600">Disputed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Ban className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.revoked}</div>
              <div className="text-sm text-gray-600">Revoked</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Flag className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.flagged}</div>
              <div className="text-sm text-gray-600">Flagged</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.suspicious}</div>
              <div className="text-sm text-gray-600">Suspicious</div>
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
                    placeholder="Search certificates, volunteers, events, serial numbers..."
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
                  <SelectItem value="issued">Issued</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                  <SelectItem value="revoked">Revoked</SelectItem>
                  <SelectItem value="pending_verification">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Verification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Verification</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="suspicious">Suspicious</SelectItem>
                </SelectContent>
              </Select>

              <Select value={organizationFilter} onValueChange={setOrganizationFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Organization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Organizations</SelectItem>
                  {organizations.map((org) => (
                    <SelectItem key={org} value={org}>{org}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={fraudFilter} onValueChange={setFraudFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Fraud" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="clean">Clean</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Certificates List */}
        <div className="space-y-4">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((cert) => (
              <Card key={cert.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{cert.volunteerName}</h3>
                        {getStatusBadge(cert.status)}
                        {getVerificationBadge(cert.verificationStatus)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Hash className="h-4 w-4" />
                            <span><strong>Serial:</strong> {cert.serialNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span><strong>Event:</strong> {cert.eventTitle}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4" />
                            <span><strong>Organization:</strong> {cert.organizationName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4" />
                            <span><strong>Hours:</strong> {cert.hoursCompleted}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span><strong>Issued:</strong> {formatDateTime(cert.issueDate)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4" />
                            <span><strong>Downloads:</strong> {cert.downloadCount}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4" />
                            <span><strong>Verifications:</strong> {cert.verificationAttempts}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span className={`font-bold ${getSecurityLevel(cert.securityScore).color}`}>
                              Security: {cert.securityScore}% ({getSecurityLevel(cert.securityScore).label})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Security Features */}
                      <div className="flex items-center space-x-4 mb-3 text-xs">
                        {cert.metadata.watermarked && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            <Shield className="h-3 w-3 mr-1" />
                            Watermarked
                          </Badge>
                        )}
                        {cert.metadata.encrypted && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            <Shield className="h-3 w-3 mr-1" />
                            Encrypted
                          </Badge>
                        )}
                        {cert.blockchainHash && (
                          <Badge variant="outline" className="bg-purple-50 text-purple-700">
                            <Hash className="h-3 w-3 mr-1" />
                            Blockchain
                          </Badge>
                        )}
                        <Badge variant="outline" className="bg-gray-50 text-gray-700">
                          {cert.metadata.language === 'both' ? 'EN/AR' : cert.metadata.language.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Fraud Flags */}
                      {cert.fraudFlags.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <Flag className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">{cert.fraudFlags.length} fraud flags</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {cert.fraudFlags.map((flag, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fraud Report */}
                      {cert.fraudReport && (
                        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-800">Fraud Report</span>
                            <Badge className={
                              cert.fraudReport.investigationStatus === 'resolved' ? 'bg-green-100 text-green-800' :
                              cert.fraudReport.investigationStatus === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {cert.fraudReport.investigationStatus}
                            </Badge>
                          </div>
                          <p className="text-sm text-red-700">{cert.fraudReport.reason}</p>
                          <div className="text-xs text-red-600 mt-1">
                            Reported by {cert.fraudReport.reportedBy} on {formatDateTime(cert.fraudReport.reportDate)}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewCertificate(cert)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      
                      {cert.verificationStatus === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVerifyCertificate(cert)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                      )}

                      {cert.status === 'issued' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRevokeCertificate(cert)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Revoke
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
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || verificationFilter !== 'all' || organizationFilter !== 'all' || fraudFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'No certificates have been issued yet.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Certificate Detail Dialog */}
        <Dialog open={showCertificateDialog} onOpenChange={setShowCertificateDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Certificate Details</DialogTitle>
              <DialogDescription>
                {selectedCertificate && `Detailed information for certificate ${selectedCertificate.serialNumber}`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedCertificate && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Certificate Serial Number</Label>
                      <div className="text-lg font-medium font-mono">{selectedCertificate.serialNumber}</div>
                    </div>
                    <div>
                      <Label>Volunteer</Label>
                      <div>{selectedCertificate.volunteerName}</div>
                      <div className="text-sm text-gray-600">{selectedCertificate.volunteerEmail}</div>
                    </div>
                    <div>
                      <Label>Event</Label>
                      <div>{selectedCertificate.eventTitle}</div>
                    </div>
                    <div>
                      <Label>Organization</Label>
                      <div>{selectedCertificate.organizationName}</div>
                    </div>
                    <div>
                      <Label>Template</Label>
                      <div>{selectedCertificate.templateName}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Status</Label>
                      <div className="mt-1 flex items-center space-x-2">
                        {getStatusBadge(selectedCertificate.status)}
                        {getVerificationBadge(selectedCertificate.verificationStatus)}
                      </div>
                    </div>
                    <div>
                      <Label>Hours Completed</Label>
                      <div className="text-2xl font-bold text-blue-600">{selectedCertificate.hoursCompleted}</div>
                    </div>
                    <div>
                      <Label>Issue Date</Label>
                      <div>{formatDateTime(selectedCertificate.issueDate)}</div>
                    </div>
                    <div>
                      <Label>Completion Date</Label>
                      <div>{formatDateTime(selectedCertificate.completionDate)}</div>
                    </div>
                    <div>
                      <Label>Security Score</Label>
                      <div className="mt-1">
                        <span className={`text-2xl font-bold ${getSecurityLevel(selectedCertificate.securityScore).color}`}>
                          {selectedCertificate.securityScore}%
                        </span>
                        <span className={`ml-2 text-sm ${getSecurityLevel(selectedCertificate.securityScore).color}`}>
                          ({getSecurityLevel(selectedCertificate.securityScore).label})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Statistics */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedCertificate.downloadCount}</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{selectedCertificate.shareCount}</div>
                    <div className="text-sm text-gray-600">Shares</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{selectedCertificate.verificationAttempts}</div>
                    <div className="text-sm text-gray-600">Verifications</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{selectedCertificate.fraudFlags.length}</div>
                    <div className="text-sm text-gray-600">Fraud Flags</div>
                  </div>
                </div>

                {/* Security Features */}
                <div>
                  <Label>Security Features</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span>Watermarked</span>
                        {selectedCertificate.metadata.watermarked ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span>Encrypted</span>
                        {selectedCertificate.metadata.encrypted ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span>Blockchain Verified</span>
                        {selectedCertificate.blockchainHash ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-between p-2 border rounded">
                        <span>Digital Signature</span>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>QR Code URL</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xs bg-gray-100 p-2 rounded flex-1">{selectedCertificate.qrCode}</code>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Digital Signature</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xs bg-gray-100 p-2 rounded flex-1">{selectedCertificate.digitalSignature}</code>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {selectedCertificate.blockchainHash && (
                  <div>
                    <Label>Blockchain Hash</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="text-xs bg-gray-100 p-2 rounded flex-1">{selectedCertificate.blockchainHash}</code>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Fraud Information */}
                {selectedCertificate.fraudFlags.length > 0 && (
                  <div>
                    <Label>Fraud Flags</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedCertificate.fraudFlags.map((flag, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCertificate.fraudReport && (
                  <div>
                    <Label>Fraud Report</Label>
                    <div className="mt-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-red-800">Reported by: </span>
                          <span className="text-sm text-red-700">{selectedCertificate.fraudReport.reportedBy}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-red-800">Date: </span>
                          <span className="text-sm text-red-700">{formatDateTime(selectedCertificate.fraudReport.reportDate)}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-red-800">Status: </span>
                          <Badge className={
                            selectedCertificate.fraudReport.investigationStatus === 'resolved' ? 'bg-green-100 text-green-800' :
                            selectedCertificate.fraudReport.investigationStatus === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {selectedCertificate.fraudReport.investigationStatus}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-red-800">Reason: </span>
                          <span className="text-sm text-red-700">{selectedCertificate.fraudReport.reason}</span>
                        </div>
                        {selectedCertificate.fraudReport.resolution && (
                          <div>
                            <span className="text-sm font-medium text-red-800">Resolution: </span>
                            <span className="text-sm text-red-700">{selectedCertificate.fraudReport.resolution}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Notes */}
                <div>
                  <Label>Admin Notes</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                    {selectedCertificate.adminNotes || 'No admin notes available.'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowCertificateDialog(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    View Public Certificate
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Volunteer
                  </Button>
                  {selectedCertificate.status === 'issued' && (
                    <Button 
                      onClick={() => {
                        setShowCertificateDialog(false);
                        handleRevokeCertificate(selectedCertificate);
                      }}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Revoke Certificate
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Revoke Certificate Dialog */}
        <Dialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Revoke Certificate</DialogTitle>
              <DialogDescription>
                {selectedCertificate && `Revoke certificate ${selectedCertificate.serialNumber}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <Ban className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Warning:</strong> This action will permanently revoke the certificate and notify the volunteer.
                  The certificate will be marked as invalid and cannot be used for verification.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="revokeReason">Reason for Revocation *</Label>
                <Select value={revokeReason} onValueChange={setRevokeReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fraudulent_hours">Fraudulent Hours Claimed</SelectItem>
                    <SelectItem value="event_cancelled">Event Was Cancelled</SelectItem>
                    <SelectItem value="fake_participation">Fake Participation</SelectItem>
                    <SelectItem value="duplicate_certificate">Duplicate Certificate</SelectItem>
                    <SelectItem value="organization_request">Organization Request</SelectItem>
                    <SelectItem value="security_breach">Security Breach</SelectItem>
                    <SelectItem value="technical_error">Technical Error</SelectItem>
                    <SelectItem value="policy_violation">Policy Violation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowRevokeDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmRevoke}
                  disabled={!revokeReason}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Revoke Certificate
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}