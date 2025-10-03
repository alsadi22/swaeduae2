import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, CheckCircle, XCircle, Search, Filter,
  Eye, MessageSquare, Download, Upload, MapPin,
  Calendar, User, FileText, AlertCircle, Camera,
  ThumbsUp, ThumbsDown, MoreHorizontal
} from 'lucide-react';

interface HoursApproval {
  id: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerAvatar?: string;
  eventTitle: string;
  eventId: string;
  hours: number;
  date: string;
  checkInTime: string;
  checkOutTime: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected' | 'disputed';
  submittedAt: string;
  evidence: {
    type: 'photo' | 'gps' | 'manual' | 'qr';
    description: string;
    attachments?: string[];
    gpsCoordinates?: { lat: number; lng: number };
    accuracy?: number;
  }[];
  notes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export default function OrgApprovals() {
  const [approvals, setApprovals] = useState<HoursApproval[]>([
    {
      id: '1',
      volunteerName: 'Ahmed Al-Mansouri',
      volunteerEmail: 'ahmed@example.com',
      volunteerAvatar: '/api/placeholder/40/40',
      eventTitle: 'Beach Cleanup Drive',
      eventId: 'event-1',
      hours: 4,
      date: '2024-03-20',
      checkInTime: '08:00',
      checkOutTime: '12:00',
      location: 'Jumeirah Beach, Dubai',
      status: 'pending',
      submittedAt: '2024-03-20T12:15:00Z',
      evidence: [
        {
          type: 'photo',
          description: 'Check-in photo at event location',
          attachments: ['/api/placeholder/200/150']
        },
        {
          type: 'gps',
          description: 'GPS verification at check-in',
          gpsCoordinates: { lat: 25.2048, lng: 55.2708 },
          accuracy: 15
        }
      ],
      notes: 'Participated in the morning cleanup session. Helped collect over 50kg of waste.'
    },
    {
      id: '2',
      volunteerName: 'Fatima Hassan',
      volunteerEmail: 'fatima@example.com',
      eventTitle: 'Food Distribution',
      eventId: 'event-2',
      hours: 3,
      date: '2024-03-19',
      checkInTime: '17:00',
      checkOutTime: '20:00',
      location: 'Al Karama Community Center',
      status: 'pending',
      submittedAt: '2024-03-19T20:30:00Z',
      evidence: [
        {
          type: 'qr',
          description: 'QR code scan at check-in and check-out'
        },
        {
          type: 'manual',
          description: 'Manual verification by supervisor',
          attachments: ['/api/placeholder/200/150']
        }
      ],
      notes: 'Helped distribute meals to 150 families. Assisted with packaging and serving.'
    },
    {
      id: '3',
      volunteerName: 'Mohammed Ali',
      volunteerEmail: 'mohammed@example.com',
      eventTitle: 'Tree Planting Initiative',
      eventId: 'event-3',
      hours: 5,
      date: '2024-03-18',
      checkInTime: '09:00',
      checkOutTime: '14:00',
      location: 'Dubai Miracle Garden',
      status: 'disputed',
      submittedAt: '2024-03-18T14:45:00Z',
      evidence: [
        {
          type: 'gps',
          description: 'GPS location verification',
          gpsCoordinates: { lat: 25.0657, lng: 55.2441 },
          accuracy: 45
        }
      ],
      notes: 'Planted 20 native trees. GPS accuracy was low due to weather conditions.',
      reviewedBy: 'Sarah Ahmed',
      reviewedAt: '2024-03-19T10:00:00Z',
      reviewNotes: 'GPS accuracy too low for automatic approval. Requires manual verification.'
    },
    {
      id: '4',
      volunteerName: 'Sarah Ahmed',
      volunteerEmail: 'sarah@example.com',
      eventTitle: 'Senior Care Visit',
      eventId: 'event-4',
      hours: 3,
      date: '2024-03-17',
      checkInTime: '14:00',
      checkOutTime: '17:00',
      location: 'Golden Years Care Home',
      status: 'approved',
      submittedAt: '2024-03-17T17:30:00Z',
      evidence: [
        {
          type: 'photo',
          description: 'Group photo with seniors',
          attachments: ['/api/placeholder/200/150', '/api/placeholder/200/150']
        },
        {
          type: 'manual',
          description: 'Signed attendance sheet'
        }
      ],
      notes: 'Spent quality time with residents, played games and shared stories.',
      reviewedBy: 'Ahmed Al-Mansouri',
      reviewedAt: '2024-03-18T09:00:00Z',
      reviewNotes: 'Excellent participation. Well documented with photos and attendance sheet.'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApprovals, setSelectedApprovals] = useState<string[]>([]);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [reviewingApproval, setReviewingApproval] = useState<HoursApproval | null>(null);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
  const [reviewNotes, setReviewNotes] = useState('');

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = approval.volunteerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         approval.eventTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = selectedTab === 'all' || approval.status === selectedTab;
    
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: HoursApproval['status']) => {
    const statusConfig = {
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800' },
      disputed: { label: 'Disputed', className: 'bg-orange-100 text-orange-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'photo':
        return <Camera className="h-4 w-4" />;
      case 'gps':
        return <MapPin className="h-4 w-4" />;
      case 'qr':
        return <FileText className="h-4 w-4" />;
      case 'manual':
        return <User className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleApprovalToggle = (approvalId: string) => {
    setSelectedApprovals(prev => 
      prev.includes(approvalId)
        ? prev.filter(id => id !== approvalId)
        : [...prev, approvalId]
    );
  };

  const handleBulkAction = (action: 'approve' | 'reject') => {
    if (selectedApprovals.length === 0) {
      alert('Please select approvals to process.');
      return;
    }

    const updatedApprovals = approvals.map(approval => 
      selectedApprovals.includes(approval.id)
        ? {
            ...approval,
            status: action === 'approve' ? 'approved' as const : 'rejected' as const,
            reviewedBy: 'Current User',
            reviewedAt: new Date().toISOString(),
            reviewNotes: `Bulk ${action}d`
          }
        : approval
    );

    setApprovals(updatedApprovals);
    setSelectedApprovals([]);
    alert(`${selectedApprovals.length} approvals ${action}d successfully.`);
  };

  const handleReviewApproval = (approval: HoursApproval, action: 'approve' | 'reject') => {
    setReviewingApproval(approval);
    setReviewAction(action);
    setReviewNotes('');
    setShowReviewDialog(true);
  };

  const submitReview = () => {
    if (!reviewingApproval) return;

    const updatedApprovals = approvals.map(approval => 
      approval.id === reviewingApproval.id
        ? {
            ...approval,
            status: reviewAction === 'approve' ? 'approved' as const : 'rejected' as const,
            reviewedBy: 'Current User',
            reviewedAt: new Date().toISOString(),
            reviewNotes
          }
        : approval
    );

    setApprovals(updatedApprovals);
    setShowReviewDialog(false);
    setReviewingApproval(null);
    alert(`Hours ${reviewAction}d successfully.`);
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-AE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    pending: approvals.filter(a => a.status === 'pending').length,
    approved: approvals.filter(a => a.status === 'approved').length,
    rejected: approvals.filter(a => a.status === 'rejected').length,
    disputed: approvals.filter(a => a.status === 'disputed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hours Approval</h1>
            <p className="text-gray-600">Review and approve volunteer hours submissions</p>
          </div>
          <div className="flex items-center space-x-3">
            {selectedApprovals.length > 0 && (
              <>
                <Button 
                  variant="outline"
                  onClick={() => handleBulkAction('approve')}
                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Approve Selected ({selectedApprovals.length})
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleBulkAction('reject')}
                  className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Reject Selected ({selectedApprovals.length})
                </Button>
              </>
            )}
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
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
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.disputed}</div>
              <div className="text-sm text-gray-600">Disputed</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by volunteer name or event..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Approvals Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({stats.approved})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
            <TabsTrigger value="disputed">Disputed ({stats.disputed})</TabsTrigger>
            <TabsTrigger value="all">All ({approvals.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="space-y-4">
              {filteredApprovals.length > 0 ? (
                filteredApprovals.map((approval) => (
                  <Card key={approval.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Checkbox
                            checked={selectedApprovals.includes(approval.id)}
                            onCheckedChange={() => handleApprovalToggle(approval.id)}
                            className="mt-1"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {approval.volunteerName}
                              </h3>
                              {getStatusBadge(approval.status)}
                              <Badge variant="outline" className="text-xs">
                                {approval.hours} hours
                              </Badge>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4" />
                                  <span><strong>Event:</strong> {approval.eventTitle}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span><strong>Date:</strong> {formatDate(approval.date)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span><strong>Time:</strong> {formatTime(approval.checkInTime)} - {formatTime(approval.checkOutTime)}</span>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4" />
                                  <span><strong>Location:</strong> {approval.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <User className="h-4 w-4" />
                                  <span><strong>Submitted:</strong> {formatDateTime(approval.submittedAt)}</span>
                                </div>
                                {approval.reviewedBy && (
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4" />
                                    <span><strong>Reviewed by:</strong> {approval.reviewedBy}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Evidence */}
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 mb-2">Evidence Provided:</h4>
                              <div className="flex flex-wrap gap-2">
                                {approval.evidence.map((evidence, index) => (
                                  <div key={index} className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full text-sm">
                                    {getEvidenceIcon(evidence.type)}
                                    <span>{evidence.description}</span>
                                    {evidence.attachments && (
                                      <Badge variant="outline" className="text-xs">
                                        {evidence.attachments.length} files
                                      </Badge>
                                    )}
                                    {evidence.accuracy && (
                                      <Badge variant="outline" className={`text-xs ${
                                        evidence.accuracy <= 20 ? 'bg-green-50 text-green-700' :
                                        evidence.accuracy <= 50 ? 'bg-yellow-50 text-yellow-700' :
                                        'bg-red-50 text-red-700'
                                      }`}>
                                        ±{evidence.accuracy}m
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Notes */}
                            {approval.notes && (
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-1">Volunteer Notes:</h4>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                  {approval.notes}
                                </p>
                              </div>
                            )}

                            {/* Review Notes */}
                            {approval.reviewNotes && (
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-1">Review Notes:</h4>
                                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                                  {approval.reviewNotes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          
                          {approval.status === 'pending' && (
                            <>
                              <Button 
                                size="sm"
                                onClick={() => handleReviewApproval(approval, 'approve')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={() => handleReviewApproval(approval, 'reject')}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}

                          {approval.status === 'disputed' && (
                            <Button 
                              size="sm"
                              onClick={() => handleReviewApproval(approval, 'approve')}
                              className="bg-orange-600 hover:bg-orange-700"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Resolve
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
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No approvals found</h3>
                    <p className="text-gray-600">
                      {searchTerm 
                        ? 'Try adjusting your search terms.'
                        : `No ${selectedTab === 'all' ? '' : selectedTab} hours submissions at the moment.`
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Review Dialog */}
        <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {reviewAction === 'approve' ? 'Approve' : 'Reject'} Hours Submission
              </DialogTitle>
              <DialogDescription>
                {reviewingApproval && (
                  <>
                    Review {reviewingApproval.hours} hours for {reviewingApproval.volunteerName} 
                    at {reviewingApproval.eventTitle}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Review Notes</label>
                <Textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder={`Add notes about your ${reviewAction} decision...`}
                  rows={3}
                />
              </div>

              <Alert className={reviewAction === 'approve' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <AlertCircle className={`h-4 w-4 ${reviewAction === 'approve' ? 'text-green-600' : 'text-red-600'}`} />
                <AlertDescription className={reviewAction === 'approve' ? 'text-green-800' : 'text-red-800'}>
                  {reviewAction === 'approve' 
                    ? 'This will approve the volunteer hours and add them to the volunteer\'s record.'
                    : 'This will reject the hours submission. The volunteer will be notified of the rejection.'
                  }
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={submitReview}
                  className={reviewAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
                >
                  {reviewAction === 'approve' ? 'Approve Hours' : 'Reject Hours'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}