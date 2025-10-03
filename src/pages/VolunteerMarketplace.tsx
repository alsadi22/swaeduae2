import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowUpDown, Clock, MapPin, Users, Star, Calendar, Filter,
  Search, Plus, MessageCircle, CheckCircle, AlertTriangle,
  Heart, Bookmark, Share2, Eye, RefreshCw, Zap, Target
} from 'lucide-react';

interface ShiftListing {
  id: string;
  eventName: string;
  organizationName: string;
  organizationLogo: string;
  shiftName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: {
    name: string;
    city: string;
    emirate: string;
  };
  category: string;
  skillsNeeded: string[];
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  compensation: {
    type: 'volunteer_hours' | 'certificate' | 'meal' | 'transport' | 'gift';
    value: string;
  };
  requirements: string[];
  description: string;
  postedBy: {
    name: string;
    rating: number;
    completedShifts: number;
  };
  postedDate: string;
  status: 'available' | 'pending' | 'taken' | 'expired';
  interestedCount: number;
  isBookmarked: boolean;
}

interface ShiftRequest {
  id: string;
  requesterName: string;
  requesterRating: number;
  eventName: string;
  originalShift: string;
  requestedShift: string;
  reason: string;
  urgency: 'low' | 'medium' | 'high';
  postedDate: string;
  status: 'open' | 'accepted' | 'declined' | 'expired';
  compensation?: string;
}

export default function VolunteerMarketplace() {
  const [activeTab, setActiveTab] = useState<'browse' | 'my-listings' | 'requests'>('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');
  const [showCreateListingDialog, setShowCreateListingDialog] = useState(false);
  const [showShiftDetailDialog, setShowShiftDetailDialog] = useState(false);
  const [selectedShift, setSelectedShift] = useState<ShiftListing | null>(null);

  // Mock data
  const shiftListings: ShiftListing[] = [
    {
      id: '1',
      eventName: 'Beach Cleanup Initiative',
      organizationName: 'Green Initiative UAE',
      organizationLogo: '/api/placeholder/50/50',
      shiftName: 'Morning Cleanup Shift',
      date: '2024-04-20',
      startTime: '08:00',
      endTime: '12:00',
      location: {
        name: 'Dubai Marina Beach',
        city: 'Dubai',
        emirate: 'Dubai'
      },
      category: 'Environment',
      skillsNeeded: ['Physical Fitness', 'Teamwork'],
      urgency: 'high',
      compensation: {
        type: 'volunteer_hours',
        value: '4 hours + Certificate'
      },
      requirements: ['Comfortable walking on sand', 'Sun protection'],
      description: 'Help clean Dubai Marina Beach and protect marine life. Great opportunity for environmental enthusiasts!',
      postedBy: {
        name: 'Sarah Al-Zahra',
        rating: 4.8,
        completedShifts: 23
      },
      postedDate: '2024-04-15',
      status: 'available',
      interestedCount: 8,
      isBookmarked: false
    },
    {
      id: '2',
      eventName: 'Food Distribution Drive',
      organizationName: 'Emirates Food Bank',
      organizationLogo: '/api/placeholder/50/50',
      shiftName: 'Evening Distribution',
      date: '2024-04-18',
      startTime: '17:00',
      endTime: '20:00',
      location: {
        name: 'Al Karama Community Center',
        city: 'Dubai',
        emirate: 'Dubai'
      },
      category: 'Community',
      skillsNeeded: ['Arabic Language', 'Customer Service'],
      urgency: 'urgent',
      compensation: {
        type: 'meal',
        value: 'Dinner + Transport'
      },
      requirements: ['Ability to lift 10kg boxes', 'Friendly demeanor'],
      description: 'Urgent need for volunteers to help distribute food packages to families in need.',
      postedBy: {
        name: 'Ahmed Hassan',
        rating: 4.9,
        completedShifts: 45
      },
      postedDate: '2024-04-16',
      status: 'available',
      interestedCount: 12,
      isBookmarked: true
    },
    {
      id: '3',
      eventName: 'Children\'s Education Workshop',
      organizationName: 'Future Leaders Foundation',
      organizationLogo: '/api/placeholder/50/50',
      shiftName: 'Teaching Assistant',
      date: '2024-04-22',
      startTime: '14:00',
      endTime: '17:00',
      location: {
        name: 'Sharjah Public Library',
        city: 'Sharjah',
        emirate: 'Sharjah'
      },
      category: 'Education',
      skillsNeeded: ['Teaching', 'English Language', 'Patience'],
      urgency: 'medium',
      compensation: {
        type: 'certificate',
        value: 'Teaching Certificate + 3 hours'
      },
      requirements: ['Experience with children', 'Background check required'],
      description: 'Help teach basic English and math skills to underprivileged children.',
      postedBy: {
        name: 'Fatima Al-Rashid',
        rating: 4.7,
        completedShifts: 31
      },
      postedDate: '2024-04-14',
      status: 'pending',
      interestedCount: 5,
      isBookmarked: false
    }
  ];

  const shiftRequests: ShiftRequest[] = [
    {
      id: '1',
      requesterName: 'Mohammed Ali',
      requesterRating: 4.6,
      eventName: 'Community Health Fair',
      originalShift: 'Morning Registration (9:00-12:00)',
      requestedShift: 'Afternoon Setup (14:00-17:00)',
      reason: 'Family emergency came up in the morning. Happy to help with afternoon setup instead.',
      urgency: 'high',
      postedDate: '2024-04-16',
      status: 'open',
      compensation: 'Will provide lunch for the person who takes my morning shift'
    },
    {
      id: '2',
      requesterName: 'Aisha Abdullah',
      requesterRating: 4.9,
      eventName: 'Tree Planting Initiative',
      originalShift: 'Saturday Morning (8:00-11:00)',
      requestedShift: 'Sunday Morning (8:00-11:00)',
      reason: 'Work commitment conflict. Very passionate about this cause and don\'t want to miss it.',
      urgency: 'medium',
      postedDate: '2024-04-15',
      status: 'open'
    }
  ];

  const categories = ['all', 'Environment', 'Community', 'Education', 'Healthcare', 'Emergency'];
  const urgencyLevels = ['all', 'low', 'medium', 'high', 'urgent'];

  const getUrgencyBadge = (urgency: ShiftListing['urgency']) => {
    const urgencyConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Medium', className: 'bg-blue-100 text-blue-800' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800' },
      urgent: { label: 'URGENT', className: 'bg-red-100 text-red-800 animate-pulse' }
    };
    
    const config = urgencyConfig[urgency];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: ShiftListing['status']) => {
    const statusConfig = {
      available: { label: 'Available', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      taken: { label: 'Taken', className: 'bg-gray-100 text-gray-800' },
      expired: { label: 'Expired', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredShifts = shiftListings.filter(shift => {
    const matchesSearch = shift.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shift.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shift.skillsNeeded.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || shift.category === selectedCategory;
    const matchesUrgency = selectedUrgency === 'all' || shift.urgency === selectedUrgency;
    
    return matchesSearch && matchesCategory && matchesUrgency;
  });

  const handleExpressInterest = (shiftId: string) => {
    alert('Interest expressed! The shift poster will be notified and may contact you.');
  };

  const handleBookmark = (shiftId: string) => {
    // In real app, this would update the bookmark status
    alert('Shift bookmarked!');
  };

  const handleAcceptRequest = (requestId: string) => {
    alert('Shift swap request accepted! Both parties will be notified.');
  };

  const handleDeclineRequest = (requestId: string) => {
    alert('Shift swap request declined.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Shift Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find available volunteer shifts, swap your commitments, and help fellow volunteers
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <ArrowUpDown className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Available Shifts</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">Urgent Requests</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-sm text-gray-600">Successful Swaps</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-sm text-gray-600">Active Volunteers</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'browse' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('browse')}
            className="flex-1"
          >
            Browse Shifts
          </Button>
          <Button
            variant={activeTab === 'my-listings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('my-listings')}
            className="flex-1"
          >
            My Listings
          </Button>
          <Button
            variant={activeTab === 'requests' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('requests')}
            className="flex-1"
          >
            Swap Requests
          </Button>
        </div>

        {/* Browse Shifts Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search shifts by event, organization, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <Label>Category</Label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label>Urgency</Label>
                      <select
                        value={selectedUrgency}
                        onChange={(e) => setSelectedUrgency(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md"
                      >
                        {urgencyLevels.map(level => (
                          <option key={level} value={level}>
                            {level === 'all' ? 'All Urgency Levels' : level.charAt(0).toUpperCase() + level.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shift Listings */}
            <div className="space-y-4">
              {filteredShifts.map(shift => (
                <Card key={shift.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={shift.organizationLogo} 
                          alt={shift.organizationName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{shift.eventName}</h3>
                            {getUrgencyBadge(shift.urgency)}
                            {getStatusBadge(shift.status)}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>{shift.organizationName}</div>
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(shift.date).toLocaleDateString()} • {shift.startTime} - {shift.endTime}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{shift.location.city}, {shift.location.emirate}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(shift.id)}
                        >
                          <Bookmark className={`h-4 w-4 ${shift.isBookmarked ? 'fill-current text-blue-600' : ''}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedShift(shift);
                            setShowShiftDetailDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{shift.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">{shift.category}</Badge>
                      {shift.skillsNeeded.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{shift.postedBy.rating}</span>
                          </span>
                          <span>{shift.postedBy.completedShifts} completed shifts</span>
                          <span>{shift.interestedCount} interested</span>
                        </div>
                        <div className="mt-1">
                          Compensation: {shift.compensation.value}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleExpressInterest(shift.id)}
                          disabled={shift.status !== 'available'}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Express Interest
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* My Listings Tab */}
        {activeTab === 'my-listings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Shift Listings</h2>
              <Button onClick={() => setShowCreateListingDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Listing
              </Button>
            </div>

            <div className="text-center py-12 text-gray-500">
              <ArrowUpDown className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active listings</h3>
              <p className="mb-4">You haven't created any shift listings yet.</p>
              <Button onClick={() => setShowCreateListingDialog(true)}>
                Create Your First Listing
              </Button>
            </div>
          </div>
        )}

        {/* Swap Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Shift Swap Requests</h2>

            <div className="space-y-4">
              {shiftRequests.map(request => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{request.eventName}</h3>
                          <Badge className={
                            request.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                            request.urgency === 'medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {request.urgency} priority
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>Requested by: {request.requesterName} ({request.requesterRating} ⭐)</div>
                          <div>Wants to swap: <strong>{request.originalShift}</strong> → <strong>{request.requestedShift}</strong></div>
                          <div>Posted: {new Date(request.postedDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 italic">"{request.reason}"</p>

                    {request.compensation && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <div className="text-sm text-green-800">
                          <strong>Compensation offered:</strong> {request.compensation}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept Swap
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeclineRequest(request.id)}
                      >
                        Decline
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Create Listing Dialog */}
        <Dialog open={showCreateListingDialog} onOpenChange={setShowCreateListingDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Shift Listing</DialogTitle>
              <DialogDescription>
                List a shift you can't attend to help other volunteers
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Event</Label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                  <option>Select your registered event</option>
                  <option>Beach Cleanup Initiative - April 20</option>
                  <option>Food Distribution Drive - April 18</option>
                </select>
              </div>

              <div>
                <Label>Reason for listing</Label>
                <Textarea
                  placeholder="Explain why you can't attend this shift"
                  rows={3}
                />
              </div>

              <div>
                <Label>Compensation offered (optional)</Label>
                <Input placeholder="e.g., Will provide lunch, transport reimbursement" />
              </div>

              <div>
                <Label>Urgency</Label>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-md">
                  <option value="low">Low - Flexible timing</option>
                  <option value="medium">Medium - Prefer soon</option>
                  <option value="high">High - Need replacement ASAP</option>
                  <option value="urgent">Urgent - Emergency situation</option>
                </select>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Listing a shift doesn't guarantee a replacement. Contact the organization if you can't find someone.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateListingDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  Create Listing
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Shift Detail Dialog */}
        <Dialog open={showShiftDetailDialog} onOpenChange={setShowShiftDetailDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedShift?.eventName}</DialogTitle>
              <DialogDescription>
                {selectedShift?.shiftName} • {selectedShift?.organizationName}
              </DialogDescription>
            </DialogHeader>
            
            {selectedShift && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {getUrgencyBadge(selectedShift.urgency)}
                  {getStatusBadge(selectedShift.status)}
                  <Badge variant="outline">{selectedShift.category}</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Event Details</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Date: {new Date(selectedShift.date).toLocaleDateString()}</div>
                      <div>Time: {selectedShift.startTime} - {selectedShift.endTime}</div>
                      <div>Location: {selectedShift.location.name}</div>
                      <div>City: {selectedShift.location.city}, {selectedShift.location.emirate}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Posted By</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{selectedShift.postedBy.name}</div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedShift.postedBy.rating} rating</span>
                      </div>
                      <div>{selectedShift.postedBy.completedShifts} completed shifts</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-gray-700">{selectedShift.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Skills Needed</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedShift.skillsNeeded.map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {selectedShift.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Compensation</h4>
                  <div className="text-sm text-gray-700">{selectedShift.compensation.value}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    {selectedShift.interestedCount} people interested
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" onClick={() => handleExpressInterest(selectedShift.id)}>
                      <Heart className="h-4 w-4 mr-1" />
                      Express Interest
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}