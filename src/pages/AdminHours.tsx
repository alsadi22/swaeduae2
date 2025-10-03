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
  Clock, Search, Filter, MoreHorizontal, Eye, Edit, CheckCircle,
  XCircle, AlertTriangle, Calendar, Users, MapPin, ArrowLeft,
  FileText, Download, MessageSquare, Award, Activity, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HourEntry {
  id: string;
  volunteerId: string;
  volunteerName: string;
  volunteerEmail: string;
  eventId: string;
  eventTitle: string;
  organizationId: string;
  organizationName: string;
  submittedHours: number;
  approvedHours?: number;
  adjustedHours?: number;
  status: 'pending' | 'approved' | 'disputed' | 'rejected' | 'adjusted';
  submissionDate: string;
  reviewDate?: string;
  completionDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  location: {
    emirate: string;
    city: string;
    address: string;
  };
  evidence: {
    photos?: string[];
    documents?: string[];
    witnessContact?: string;
    additionalNotes?: string;
  };
  dispute: {
    reason?: string;
    submittedBy: 'volunteer' | 'organization' | 'admin';
    submissionDate?: string;
    resolution?: string;
    resolvedBy?: string;
    resolvedDate?: string;
  };
  adminNotes: string;
  organizationNotes?: string;
  volunteerNotes?: string;
  flags: string[];
  riskScore: number;
  verificationMethod: 'qr_scan' | 'manual_checkin' | 'gps_verification' | 'witness_confirmation' | 'photo_evidence';
}

export default function AdminHours() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [emirateFilter, setEmirateFilter] = useState('all');
  const [disputeFilter, setDisputeFilter] = useState('all');
  const [selectedHour, setSelectedHour] = useState<HourEntry | null>(null);
  const [showHourDialog, setShowHourDialog] = useState(false);
  const [showAdjustDialog, setShowAdjustDialog] = useState(false);
  const [adjustmentHours, setAdjustmentHours] = useState('');
  const [adjustmentReason, setAdjustmentReason] = useState('');

  // Mock data
  const hourEntries: HourEntry[] = [
    {
      id: '1',
      volunteerId: '1',
      volunteerName: 'Ahmed Al-Mansouri',
      volunteerEmail: 'ahmed@example.com',
      eventId: '1',
      eventTitle: 'Beach Cleanup Drive - Jumeirah',
      organizationId: '1',
      organizationName: 'Dubai Environmental Foundation',
      submittedHours: 4,
      approvedHours: 4,
      status: 'approved',
      submissionDate: '2024-03-25T16:30:00Z',
      reviewDate: '2024-03-26T09:15:00Z',
      completionDate: '2024-03-25T12:00:00Z',
      checkInTime: '2024-03-25T08:00:00Z',
      checkOutTime: '2024-03-25T12:00:00Z',
      location: {
        emirate: 'Dubai',
        city: 'Dubai',
        address: 'Jumeirah Beach, Dubai Marina'
      },
      evidence: {
        photos: ['beach_cleanup_1.jpg', 'beach_cleanup_2.jpg'],
        additionalNotes: 'Participated in full cleanup activity, helped with waste sorting and beach restoration.'
      },
      dispute: {
        submittedBy: 'volunteer'
      },
      adminNotes: 'Verified through QR scan and photo evidence. Excellent participation.',
      organizationNotes: 'Outstanding volunteer, arrived early and stayed until completion.',
      flags: [],
      riskScore: 1,
      verificationMethod: 'qr_scan'
    },
    {
      id: '2',
      volunteerId: '2',
      volunteerName: 'Fatima Hassan',
      volunteerEmail: 'fatima@example.com',
      eventId: '2',
      eventTitle: 'Community Food Distribution',
      organizationId: '2',
      organizationName: 'UAE Community Support',
      submittedHours: 6,
      status: 'disputed',
      submissionDate: '2024-03-24T18:30:00Z',
      completionDate: '2024-03-24T20:00:00Z',
      checkInTime: '2024-03-24T16:00:00Z',
      location: {
        emirate: 'Dubai',
        city: 'Al Karama',
        address: 'Al Karama Community Center, Dubai'
      },
      evidence: {
        witnessContact: '+971 50 123 4567',
        additionalNotes: 'Left early due to family emergency, but completed assigned tasks.'
      },
      dispute: {
        reason: 'Organization claims volunteer left 2 hours early without completing full shift.',
        submittedBy: 'organization',
        submissionDate: '2024-03-25T10:00:00Z'
      },
      adminNotes: 'Dispute requires investigation. Volunteer claims emergency, organization disputes hours.',
      organizationNotes: 'Volunteer left at 18:00 instead of 20:00, only completed 2 hours of work.',
      volunteerNotes: 'Had family emergency, but completed all assigned food packaging tasks before leaving.',
      flags: ['Time Discrepancy', 'Early Departure'],
      riskScore: 6,
      verificationMethod: 'manual_checkin'
    },
    {
      id: '3',
      volunteerId: '3',
      volunteerName: 'Mohammed Ali',
      volunteerEmail: 'mohammed@example.com',
      eventId: '3',
      eventTitle: 'Tree Planting Initiative',
      organizationId: '1',
      organizationName: 'Dubai Environmental Foundation',
      submittedHours: 5,
      approvedHours: 4,
      adjustedHours: 4,
      status: 'adjusted',
      submissionDate: '2024-03-23T17:45:00Z',
      reviewDate: '2024-03-24T11:20:00Z',
      completionDate: '2024-03-23T17:00:00Z',
      checkInTime: '2024-03-23T13:00:00Z',
      checkOutTime: '2024-03-23T17:00:00Z',
      location: {
        emirate: 'Dubai',
        city: 'Dubai',
        address: 'Dubai Miracle Garden'
      },
      evidence: {
        photos: ['tree_planting_1.jpg'],
        documents: ['attendance_sheet.pdf']
      },
      dispute: {
        submittedBy: 'volunteer'
      },
      adminNotes: 'Hours adjusted from 5 to 4 based on actual check-in/check-out times.',
      organizationNotes: 'Good participation, but arrived 1 hour late.',
      volunteerNotes: 'Traffic delay caused late arrival, but worked efficiently.',
      flags: ['Late Arrival'],
      riskScore: 3,
      verificationMethod: 'gps_verification'
    },
    {
      id: '4',
      volunteerId: '4',
      volunteerName: 'Sarah Ahmed',
      volunteerEmail: 'sarah@example.com',
      eventId: '4',
      eventTitle: 'Senior Citizens Health Checkup',
      organizationId: '3',
      organizationName: 'Sharjah Health Initiative',
      submittedHours: 8,
      status: 'pending',
      submissionDate: '2024-03-22T19:30:00Z',
      completionDate: '2024-03-22T15:00:00Z',
      checkInTime: '2024-03-22T09:00:00Z',
      checkOutTime: '2024-03-22T15:00:00Z',
      location: {
        emirate: 'Sharjah',
        city: 'Al Majaz',
        address: 'Al Majaz Community Health Center'
      },
      evidence: {
        photos: ['health_checkup_1.jpg', 'health_checkup_2.jpg'],
        documents: ['medical_volunteer_cert.pdf', 'attendance_record.pdf'],
        witnessContact: '+971 6 555 7777',
        additionalNotes: 'Assisted with 15 health screenings, provided first aid support.'
      },
      dispute: {
        submittedBy: 'volunteer'
      },
      adminNotes: 'Awaiting organization verification. Medical volunteer with proper certification.',
      organizationNotes: 'Excellent medical volunteer, very professional and helpful.',
      flags: [],
      riskScore: 1,
      verificationMethod: 'witness_confirmation'
    },
    {
      id: '5',
      volunteerId: '5',
      volunteerName: 'Omar Hassan',
      volunteerEmail: 'omar@example.com',
      eventId: '5',
      eventTitle: 'Youth Mentoring Session',
      organizationId: '4',
      organizationName: 'Future Leaders UAE',
      submittedHours: 3,
      status: 'rejected',
      submissionDate: '2024-03-21T20:15:00Z',
      reviewDate: '2024-03-22T14:30:00Z',
      completionDate: '2024-03-21T18:00:00Z',
      location: {
        emirate: 'Abu Dhabi',
        city: 'Al Reem Island',
        address: 'Youth Development Center'
      },
      evidence: {
        additionalNotes: 'Conducted mentoring session with 5 youth participants.'
      },
      dispute: {
        reason: 'No proper verification method used, insufficient evidence provided.',
        submittedBy: 'admin',
        submissionDate: '2024-03-22T14:30:00Z',
        resolution: 'Rejected due to lack of proper verification and evidence.',
        resolvedBy: 'Admin Team',
        resolvedDate: '2024-03-22T14:30:00Z'
      },
      adminNotes: 'Rejected - no QR scan, GPS verification, or witness confirmation. Insufficient evidence.',
      organizationNotes: 'Organization did not confirm volunteer attendance.',
      volunteerNotes: 'Forgot to check in properly, but did attend the session.',
      flags: ['No Verification', 'Insufficient Evidence', 'Organization Unconfirmed'],
      riskScore: 8,
      verificationMethod: 'photo_evidence'
    }
  ];

  const emirates = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'];

  const filteredHours = hourEntries.filter(hour => {
    const matchesSearch = hour.volunteerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hour.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hour.organizationName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || hour.status === statusFilter;
    const matchesEmirate = emirateFilter === 'all' || hour.location.emirate === emirateFilter;
    const matchesDispute = disputeFilter === 'all' || 
                          (disputeFilter === 'disputed' && hour.status === 'disputed') ||
                          (disputeFilter === 'no_dispute' && hour.status !== 'disputed');
    
    return matchesSearch && matchesStatus && matchesEmirate && matchesDispute;
  });

  const getStatusBadge = (status: HourEntry['status']) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'bg-blue-100 text-blue-800' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
      disputed: { label: 'Disputed', className: 'bg-yellow-100 text-yellow-800' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
      adjusted: { label: 'Adjusted', className: 'bg-purple-100 text-purple-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getVerificationBadge = (method: HourEntry['verificationMethod']) => {
    const methodConfig = {
      qr_scan: { label: 'QR Scan', className: 'bg-green-100 text-green-800' },
      manual_checkin: { label: 'Manual Check-in', className: 'bg-blue-100 text-blue-800' },
      gps_verification: { label: 'GPS Verified', className: 'bg-purple-100 text-purple-800' },
      witness_confirmation: { label: 'Witness Confirmed', className: 'bg-orange-100 text-orange-800' },
      photo_evidence: { label: 'Photo Evidence', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = methodConfig[method];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { label: 'Low', color: 'text-green-600' };
    if (score <= 6) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'High', color: 'text-red-600' };
  };

  const handleViewHour = (hour: HourEntry) => {
    setSelectedHour(hour);
    setShowHourDialog(true);
  };

  const handleAdjustHours = (hour: HourEntry) => {
    setSelectedHour(hour);
    setAdjustmentHours(hour.submittedHours.toString());
    setShowAdjustDialog(true);
  };

  const handleConfirmAdjustment = () => {
    if (selectedHour && adjustmentHours && adjustmentReason) {
      // Simulate hour adjustment
      alert(`Hours for ${selectedHour.volunteerName} adjusted from ${selectedHour.submittedHours} to ${adjustmentHours}. Reason: ${adjustmentReason}`);
      setShowAdjustDialog(false);
      setAdjustmentHours('');
      setAdjustmentReason('');
      setSelectedHour(null);
    }
  };

  const handleApproveHours = (hour: HourEntry) => {
    if (confirm(`Approve ${hour.submittedHours} hours for ${hour.volunteerName}?`)) {
      alert(`${hour.submittedHours} hours approved for ${hour.volunteerName}.`);
    }
  };

  const handleRejectHours = (hour: HourEntry) => {
    const reason = prompt(`Reject hours for ${hour.volunteerName}. Please provide a reason:`);
    if (reason) {
      alert(`Hours rejected for ${hour.volunteerName}. Reason: ${reason}`);
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

  const calculateActualHours = (checkIn?: string, checkOut?: string) => {
    if (!checkIn || !checkOut) return null;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return Math.round(diffHours * 10) / 10; // Round to 1 decimal place
  };

  const stats = {
    total: hourEntries.length,
    pending: hourEntries.filter(h => h.status === 'pending').length,
    approved: hourEntries.filter(h => h.status === 'approved').length,
    disputed: hourEntries.filter(h => h.status === 'disputed').length,
    rejected: hourEntries.filter(h => h.status === 'rejected').length,
    adjusted: hourEntries.filter(h => h.status === 'adjusted').length,
    totalHours: hourEntries.filter(h => h.status === 'approved' || h.status === 'adjusted')
                           .reduce((sum, h) => sum + (h.adjustedHours || h.approvedHours || h.submittedHours), 0)
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
              <h1 className="text-3xl font-bold text-gray-900">Hours Management</h1>
              <p className="text-gray-600">Review and manage volunteer hour submissions</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Hours
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Hours Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Submissions</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
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
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Edit className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.adjusted}</div>
              <div className="text-sm text-gray-600">Adjusted</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalHours}</div>
              <div className="text-sm text-gray-600">Total Hours</div>
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
                    placeholder="Search volunteers, events, organizations..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="disputed">Disputed</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="adjusted">Adjusted</SelectItem>
                </SelectContent>
              </Select>

              <Select value={disputeFilter} onValueChange={setDisputeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Disputes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="disputed">Has Disputes</SelectItem>
                  <SelectItem value="no_dispute">No Disputes</SelectItem>
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

        {/* Hours List */}
        <div className="space-y-4">
          {filteredHours.length > 0 ? (
            filteredHours.map((hour) => (
              <Card key={hour.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{hour.volunteerName}</h3>
                        {getStatusBadge(hour.status)}
                        {getVerificationBadge(hour.verificationMethod)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span><strong>Event:</strong> {hour.eventTitle}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span><strong>Organization:</strong> {hour.organizationName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span><strong>Location:</strong> {hour.location.city}, {hour.location.emirate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span><strong>Submitted:</strong> {formatDateTime(hour.submissionDate)}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4" />
                            <span><strong>Hours Submitted:</strong> {hour.submittedHours}</span>
                          </div>
                          {hour.approvedHours !== undefined && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span><strong>Approved:</strong> {hour.approvedHours}</span>
                            </div>
                          )}
                          {hour.adjustedHours !== undefined && (
                            <div className="flex items-center space-x-2">
                              <Edit className="h-4 w-4 text-purple-600" />
                              <span><strong>Adjusted:</strong> {hour.adjustedHours}</span>
                            </div>
                          )}
                          {hour.checkInTime && hour.checkOutTime && (
                            <div className="flex items-center space-x-2">
                              <Activity className="h-4 w-4" />
                              <span><strong>Actual Time:</strong> {calculateActualHours(hour.checkInTime, hour.checkOutTime)}h</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700">Risk:</span>
                            <span className={`text-sm font-bold ${getRiskLevel(hour.riskScore).color}`}>
                              {getRiskLevel(hour.riskScore).label}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dispute Information */}
                      {hour.status === 'disputed' && hour.dispute.reason && (
                        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium text-yellow-800">Dispute</span>
                          </div>
                          <p className="text-sm text-yellow-700">{hour.dispute.reason}</p>
                          <div className="text-xs text-yellow-600 mt-1">
                            Submitted by {hour.dispute.submittedBy} on {hour.dispute.submissionDate && formatDateTime(hour.dispute.submissionDate)}
                          </div>
                        </div>
                      )}

                      {/* Flags */}
                      {hour.flags.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">{hour.flags.length} flags</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {hour.flags.map((flag, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Evidence Summary */}
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Evidence: </span>
                        {hour.evidence.photos && <span>{hour.evidence.photos.length} photos, </span>}
                        {hour.evidence.documents && <span>{hour.evidence.documents.length} documents, </span>}
                        {hour.evidence.witnessContact && <span>witness contact, </span>}
                        {hour.evidence.additionalNotes && <span>additional notes</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewHour(hour)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      
                      {hour.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApproveHours(hour)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAdjustHours(hour)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Adjust
                          </Button>
                        </>
                      )}

                      {(hour.status === 'pending' || hour.status === 'disputed') && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRejectHours(hour)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
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
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hour submissions found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' || emirateFilter !== 'all' || disputeFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'No volunteer hours have been submitted yet.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Hour Detail Dialog */}
        <Dialog open={showHourDialog} onOpenChange={setShowHourDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Hour Submission Details</DialogTitle>
              <DialogDescription>
                {selectedHour && `Detailed information for ${selectedHour.volunteerName}'s hour submission`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedHour && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Volunteer</Label>
                      <div className="text-lg font-medium">{selectedHour.volunteerName}</div>
                      <div className="text-sm text-gray-600">{selectedHour.volunteerEmail}</div>
                    </div>
                    <div>
                      <Label>Event</Label>
                      <div>{selectedHour.eventTitle}</div>
                    </div>
                    <div>
                      <Label>Organization</Label>
                      <div>{selectedHour.organizationName}</div>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <div>{selectedHour.location.address}</div>
                      <div className="text-sm text-gray-600">{selectedHour.location.city}, {selectedHour.location.emirate}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Submission Status</Label>
                      <div className="mt-1">{getStatusBadge(selectedHour.status)}</div>
                    </div>
                    <div>
                      <Label>Verification Method</Label>
                      <div className="mt-1">{getVerificationBadge(selectedHour.verificationMethod)}</div>
                    </div>
                    <div>
                      <Label>Risk Assessment</Label>
                      <div className="mt-1">
                        <span className={`text-lg font-bold ${getRiskLevel(selectedHour.riskScore).color}`}>
                          {selectedHour.riskScore}/10 ({getRiskLevel(selectedHour.riskScore).label})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hours Information */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedHour.submittedHours}</div>
                    <div className="text-sm text-gray-600">Submitted Hours</div>
                  </div>
                  {selectedHour.approvedHours !== undefined && (
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedHour.approvedHours}</div>
                      <div className="text-sm text-gray-600">Approved Hours</div>
                    </div>
                  )}
                  {selectedHour.adjustedHours !== undefined && (
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{selectedHour.adjustedHours}</div>
                      <div className="text-sm text-gray-600">Adjusted Hours</div>
                    </div>
                  )}
                  {selectedHour.checkInTime && selectedHour.checkOutTime && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-600">
                        {calculateActualHours(selectedHour.checkInTime, selectedHour.checkOutTime)}
                      </div>
                      <div className="text-sm text-gray-600">Actual Hours</div>
                    </div>
                  )}
                </div>

                {/* Time Tracking */}
                {selectedHour.checkInTime && selectedHour.checkOutTime && (
                  <div>
                    <Label>Time Tracking</Label>
                    <div className="grid md:grid-cols-3 gap-4 mt-2">
                      <div>
                        <div className="text-sm font-medium text-gray-700">Check-in Time</div>
                        <div>{formatDateTime(selectedHour.checkInTime)}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Check-out Time</div>
                        <div>{formatDateTime(selectedHour.checkOutTime)}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700">Event Completion</div>
                        <div>{formatDateTime(selectedHour.completionDate)}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Evidence */}
                <div>
                  <Label>Evidence Provided</Label>
                  <div className="mt-2 space-y-3">
                    {selectedHour.evidence.photos && selectedHour.evidence.photos.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Photos ({selectedHour.evidence.photos.length})</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedHour.evidence.photos.map((photo, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">{photo}</span>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedHour.evidence.documents && selectedHour.evidence.documents.length > 0 && (
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Documents ({selectedHour.evidence.documents.length})</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedHour.evidence.documents.map((doc, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">{doc}</span>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedHour.evidence.witnessContact && (
                      <div>
                        <div className="text-sm font-medium text-gray-700">Witness Contact</div>
                        <div className="text-sm">{selectedHour.evidence.witnessContact}</div>
                      </div>
                    )}
                    {selectedHour.evidence.additionalNotes && (
                      <div>
                        <div className="text-sm font-medium text-gray-700">Additional Notes</div>
                        <div className="text-sm p-2 bg-gray-50 rounded">{selectedHour.evidence.additionalNotes}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dispute Information */}
                {selectedHour.status === 'disputed' && selectedHour.dispute.reason && (
                  <div>
                    <Label>Dispute Details</Label>
                    <div className="mt-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-yellow-800">Reason: </span>
                          <span className="text-sm text-yellow-700">{selectedHour.dispute.reason}</span>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-yellow-800">Submitted by: </span>
                          <span className="text-sm text-yellow-700 capitalize">{selectedHour.dispute.submittedBy}</span>
                        </div>
                        {selectedHour.dispute.submissionDate && (
                          <div>
                            <span className="text-sm font-medium text-yellow-800">Date: </span>
                            <span className="text-sm text-yellow-700">{formatDateTime(selectedHour.dispute.submissionDate)}</span>
                          </div>
                        )}
                        {selectedHour.dispute.resolution && (
                          <div>
                            <span className="text-sm font-medium text-yellow-800">Resolution: </span>
                            <span className="text-sm text-yellow-700">{selectedHour.dispute.resolution}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="grid md:grid-cols-3 gap-4">
                  {selectedHour.adminNotes && (
                    <div>
                      <Label>Admin Notes</Label>
                      <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                        {selectedHour.adminNotes}
                      </div>
                    </div>
                  )}
                  {selectedHour.organizationNotes && (
                    <div>
                      <Label>Organization Notes</Label>
                      <div className="mt-2 p-3 bg-blue-50 rounded border text-sm">
                        {selectedHour.organizationNotes}
                      </div>
                    </div>
                  )}
                  {selectedHour.volunteerNotes && (
                    <div>
                      <Label>Volunteer Notes</Label>
                      <div className="mt-2 p-3 bg-green-50 rounded border text-sm">
                        {selectedHour.volunteerNotes}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowHourDialog(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Volunteer
                  </Button>
                  {selectedHour.status === 'pending' && (
                    <>
                      <Button 
                        onClick={() => {
                          setShowHourDialog(false);
                          handleAdjustHours(selectedHour);
                        }}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Adjust Hours
                      </Button>
                      <Button 
                        onClick={() => handleApproveHours(selectedHour)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Hours
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Adjust Hours Dialog */}
        <Dialog open={showAdjustDialog} onOpenChange={setShowAdjustDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adjust Volunteer Hours</DialogTitle>
              <DialogDescription>
                {selectedHour && `Adjust hours for ${selectedHour.volunteerName}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {selectedHour && (
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Original Submission:</strong> {selectedHour.submittedHours} hours<br />
                    {selectedHour.checkInTime && selectedHour.checkOutTime && (
                      <>
                        <strong>Actual Time Tracked:</strong> {calculateActualHours(selectedHour.checkInTime, selectedHour.checkOutTime)} hours
                      </>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="adjustmentHours">Adjusted Hours *</Label>
                <Input
                  id="adjustmentHours"
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={adjustmentHours}
                  onChange={(e) => setAdjustmentHours(e.target.value)}
                  placeholder="Enter adjusted hours"
                />
              </div>

              <div>
                <Label htmlFor="adjustmentReason">Reason for Adjustment *</Label>
                <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="late_arrival">Late Arrival</SelectItem>
                    <SelectItem value="early_departure">Early Departure</SelectItem>
                    <SelectItem value="break_time_deduction">Break Time Deduction</SelectItem>
                    <SelectItem value="incomplete_tasks">Incomplete Tasks</SelectItem>
                    <SelectItem value="time_tracking_error">Time Tracking Error</SelectItem>
                    <SelectItem value="organization_feedback">Organization Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAdjustDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmAdjustment}
                  disabled={!adjustmentHours || !adjustmentReason}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Adjust Hours
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}