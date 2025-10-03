import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Star, Award, Users, Calendar, MessageCircle, Share2, Download,
  ThumbsUp, Eye, Filter, Search, Plus, CheckCircle, Clock,
  Building2, Mail, Phone, ExternalLink, TrendingUp
} from 'lucide-react';

interface Endorsement {
  id: string;
  endorser: {
    name: string;
    title: string;
    organization: string;
    avatar: string;
    verified: boolean;
  };
  skill: string;
  rating: number;
  comment: string;
  date: string;
  eventName: string;
  eventId: string;
  public: boolean;
  helpful: number;
  category: string;
}

interface EndorsementRequest {
  id: string;
  requester: {
    name: string;
    organization: string;
    avatar: string;
  };
  skill: string;
  eventName: string;
  message: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'declined';
}

export default function VolunteerEndorsements() {
  const [activeTab, setActiveTab] = useState<'received' | 'requests' | 'given'>('received');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);

  // Mock endorsements data
  const endorsements: Endorsement[] = [
    {
      id: '1',
      endorser: {
        name: 'Sarah Al-Zahra',
        title: 'Volunteer Coordinator',
        organization: 'Green Initiative UAE',
        avatar: '/api/placeholder/50/50',
        verified: true
      },
      skill: 'Environmental Conservation',
      rating: 5,
      comment: 'Ahmed showed exceptional leadership during our beach cleanup initiative. His knowledge of marine ecosystems and ability to educate other volunteers was outstanding. He went above and beyond by organizing additional cleanup sessions.',
      date: '2024-03-15',
      eventName: 'Dubai Marina Beach Cleanup',
      eventId: 'event-1',
      public: true,
      helpful: 12,
      category: 'Environment'
    },
    {
      id: '2',
      endorser: {
        name: 'Mohammed Al-Rashid',
        title: 'Program Manager',
        organization: 'Emirates Food Bank',
        avatar: '/api/placeholder/50/50',
        verified: true
      },
      skill: 'Team Leadership',
      rating: 5,
      comment: 'Ahmed demonstrated excellent team coordination skills during our food distribution drive. He managed a team of 15 volunteers efficiently and ensured smooth operations throughout the event.',
      date: '2024-03-10',
      eventName: 'Ramadan Food Distribution',
      eventId: 'event-2',
      public: true,
      helpful: 8,
      category: 'Community'
    },
    {
      id: '3',
      endorser: {
        name: 'Fatima Al-Hashimi',
        title: 'Education Director',
        organization: 'Future Leaders Foundation',
        avatar: '/api/placeholder/50/50',
        verified: true
      },
      skill: 'Teaching & Mentoring',
      rating: 4,
      comment: 'Ahmed was patient and effective in teaching English to underprivileged children. His creative teaching methods kept the students engaged and motivated.',
      date: '2024-03-05',
      eventName: 'Children Education Workshop',
      eventId: 'event-3',
      public: true,
      helpful: 6,
      category: 'Education'
    },
    {
      id: '4',
      endorser: {
        name: 'Omar Al-Mansouri',
        title: 'Healthcare Coordinator',
        organization: 'UAE Red Crescent',
        avatar: '/api/placeholder/50/50',
        verified: true
      },
      skill: 'Emergency Response',
      rating: 5,
      comment: 'Ahmed showed remarkable composure and efficiency during emergency response training. His quick thinking and ability to follow protocols made him an asset to our team.',
      date: '2024-02-28',
      eventName: 'Emergency Response Training',
      eventId: 'event-4',
      public: false,
      helpful: 4,
      category: 'Healthcare'
    }
  ];

  const endorsementRequests: EndorsementRequest[] = [
    {
      id: '1',
      requester: {
        name: 'Layla Al-Zaabi',
        organization: 'Dubai Cares',
        avatar: '/api/placeholder/50/50'
      },
      skill: 'Project Management',
      eventName: 'Global Education Initiative',
      message: 'Hi Ahmed, I would appreciate an endorsement for project management skills based on your excellent coordination during our recent education project.',
      requestDate: '2024-03-18',
      status: 'pending'
    },
    {
      id: '2',
      requester: {
        name: 'Khalid Al-Nuaimi',
        organization: 'Sharjah Volunteer Center',
        avatar: '/api/placeholder/50/50'
      },
      skill: 'Communication Skills',
      eventName: 'Community Outreach Program',
      message: 'Your communication skills during our outreach program were exceptional. Would you be willing to provide an endorsement?',
      requestDate: '2024-03-16',
      status: 'pending'
    }
  ];

  const categories = ['all', 'Environment', 'Community', 'Education', 'Healthcare', 'Technology'];

  const filteredEndorsements = endorsements.filter(endorsement => {
    const matchesSearch = endorsement.skill.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endorsement.endorser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endorsement.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || endorsement.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const averageRating = endorsements.reduce((sum, endorsement) => sum + endorsement.rating, 0) / endorsements.length;
  const totalEndorsements = endorsements.length;
  const publicEndorsements = endorsements.filter(e => e.public).length;
  const topSkills = [...new Set(endorsements.map(e => e.skill))].slice(0, 5);

  const handleRequestEndorsement = () => {
    setShowRequestDialog(true);
  };

  const handleApproveRequest = (requestId: string) => {
    alert(`Endorsement request ${requestId} approved!`);
  };

  const handleDeclineRequest = (requestId: string) => {
    alert(`Endorsement request ${requestId} declined.`);
  };

  const handleShareEndorsement = (endorsement: Endorsement) => {
    if (navigator.share) {
      navigator.share({
        title: `Endorsement for ${endorsement.skill}`,
        text: `${endorsement.endorser.name} endorsed me for ${endorsement.skill}`,
        url: window.location.href
      });
    } else {
      alert('Endorsement link copied to clipboard!');
    }
  };

  const exportEndorsements = () => {
    alert('Endorsements exported to PDF successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Skill Endorsements</h1>
            <p className="text-gray-600">Manage and showcase your professional endorsements from volunteer work</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={exportEndorsements}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button onClick={handleRequestEndorsement}>
              <Plus className="h-4 w-4 mr-2" />
              Request Endorsement
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalEndorsements}</div>
              <div className="text-sm text-gray-600">Total Endorsements</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{publicEndorsements}</div>
              <div className="text-sm text-gray-600">Public Endorsements</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{topSkills.length}</div>
              <div className="text-sm text-gray-600">Skills Endorsed</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'received' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('received')}
            className="flex-1"
          >
            <Award className="h-4 w-4 mr-2" />
            Received ({endorsements.length})
          </Button>
          <Button
            variant={activeTab === 'requests' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('requests')}
            className="flex-1"
          >
            <Clock className="h-4 w-4 mr-2" />
            Requests ({endorsementRequests.length})
          </Button>
          <Button
            variant={activeTab === 'given' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('given')}
            className="flex-1"
          >
            <Users className="h-4 w-4 mr-2" />
            Given (5)
          </Button>
        </div>

        {/* Received Endorsements Tab */}
        {activeTab === 'received' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search endorsements by skill, endorser, or comment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category === 'all' ? 'All Categories' : category}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Skills Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Top Endorsed Skills</CardTitle>
                <CardDescription>Your most recognized volunteer skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {topSkills.map((skill, index) => {
                    const skillEndorsements = endorsements.filter(e => e.skill === skill);
                    const avgRating = skillEndorsements.reduce((sum, e) => sum + e.rating, 0) / skillEndorsements.length;
                    
                    return (
                      <div key={skill} className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                        <div className="text-sm font-medium text-blue-900">{skill}</div>
                        <Badge variant="secondary">{skillEndorsements.length}</Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-600">{avgRating.toFixed(1)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Endorsements List */}
            <div className="space-y-4">
              {filteredEndorsements.map(endorsement => (
                <Card key={endorsement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={endorsement.endorser.avatar} 
                        alt={endorsement.endorser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{endorsement.endorser.name}</h3>
                            {endorsement.endorser.verified && (
                              <CheckCircle className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${
                                    i < endorsement.rating 
                                      ? 'fill-yellow-400 text-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge className="bg-blue-100 text-blue-800">{endorsement.skill}</Badge>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          {endorsement.endorser.title} at {endorsement.endorser.organization}
                        </div>
                        
                        <blockquote className="text-gray-700 mb-3 italic">
                          "{endorsement.comment}"
                        </blockquote>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(endorsement.date).toLocaleDateString()}</span>
                            </span>
                            <span>Event: {endorsement.eventName}</span>
                            <span className="flex items-center space-x-1">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{endorsement.helpful} helpful</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleShareEndorsement(endorsement)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Endorsement Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Pending Endorsement Requests</h2>
              <p className="text-gray-600">Review and respond to endorsement requests from other volunteers</p>
            </div>

            <div className="space-y-4">
              {endorsementRequests.map(request => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={request.requester.avatar} 
                        alt={request.requester.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{request.requester.name}</h3>
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {request.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          {request.requester.organization}
                        </div>
                        
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-900">Skill: </span>
                          <Badge variant="outline">{request.skill}</Badge>
                        </div>
                        
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-900">Event: </span>
                          <span className="text-sm text-gray-600">{request.eventName}</span>
                        </div>
                        
                        <blockquote className="text-gray-700 mb-4 italic">
                          "{request.message}"
                        </blockquote>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Requested on {new Date(request.requestDate).toLocaleDateString()}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              size="sm"
                              onClick={() => handleApproveRequest(request.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeclineRequest(request.id)}
                            >
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Given Endorsements Tab */}
        {activeTab === 'given' && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Endorsements You've Given</h3>
            <p className="text-gray-600 mb-4">
              Track endorsements you've provided to fellow volunteers
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Give Endorsement
            </Button>
          </div>
        )}

        {/* Request Endorsement Dialog */}
        <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Request Endorsement</DialogTitle>
              <DialogDescription>
                Request a skill endorsement from someone you've volunteered with
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill</label>
                <Input placeholder="e.g., Project Management, Teaching, Leadership" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From (Email or Name)</label>
                <Input placeholder="Enter email or name of endorser" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event/Context</label>
                <Input placeholder="Which event or project did you work together on?" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Personal Message</label>
                <Textarea
                  placeholder="Add a personal message explaining why you'd like this endorsement"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  Send Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}