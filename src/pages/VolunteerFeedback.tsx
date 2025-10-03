import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Star, MessageCircle, Calendar, Users, TrendingUp, Eye,
  Filter, Search, Plus, CheckCircle, Clock, AlertTriangle,
  ThumbsUp, ThumbsDown, Building2, Award, BarChart3
} from 'lucide-react';

interface EventFeedback {
  id: string;
  event: {
    name: string;
    organization: string;
    date: string;
    id: string;
  };
  ratings: {
    overall: number;
    organization: number;
    coordination: number;
    impact: number;
    communication: number;
  };
  feedback: {
    positive: string;
    improvements: string;
    recommend: boolean;
    anonymous: boolean;
  };
  submittedDate: string;
  status: 'submitted' | 'acknowledged' | 'responded';
  response?: string;
  helpful: number;
}

interface FeedbackSummary {
  totalFeedbacks: number;
  averageRating: number;
  recommendationRate: number;
  responseRate: number;
  categories: {
    [key: string]: {
      average: number;
      count: number;
    };
  };
}

interface PendingEvent {
  id: string;
  name: string;
  organization: string;
  date: string;
  status: string;
}

export default function VolunteerFeedback() {
  const [activeTab, setActiveTab] = useState<'submitted' | 'pending' | 'analytics'>('submitted');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PendingEvent | null>(null);

  // Mock feedback data
  const feedbacks: EventFeedback[] = [
    {
      id: '1',
      event: {
        name: 'Dubai Marina Beach Cleanup',
        organization: 'Green Initiative UAE',
        date: '2024-03-15',
        id: 'event-1'
      },
      ratings: {
        overall: 5,
        organization: 5,
        coordination: 4,
        impact: 5,
        communication: 4
      },
      feedback: {
        positive: 'Excellent organization and clear impact on the environment. The team was well-coordinated and the materials were provided efficiently. Great to see immediate results of our work.',
        improvements: 'Could benefit from more frequent water breaks and perhaps starting 30 minutes earlier to avoid the heat.',
        recommend: true,
        anonymous: false
      },
      submittedDate: '2024-03-16',
      status: 'responded',
      response: 'Thank you for your valuable feedback! We\'ve implemented earlier start times and increased water break frequency based on your suggestion.',
      helpful: 8
    },
    {
      id: '2',
      event: {
        name: 'Ramadan Food Distribution',
        organization: 'Emirates Food Bank',
        date: '2024-03-10',
        id: 'event-2'
      },
      ratings: {
        overall: 4,
        organization: 5,
        coordination: 3,
        impact: 5,
        communication: 4
      },
      feedback: {
        positive: 'Meaningful work helping families during Ramadan. The impact was clearly visible and the beneficiaries were very grateful. Well-organized distribution system.',
        improvements: 'Initial coordination was a bit chaotic with volunteers not knowing their specific roles. Better briefing session would help.',
        recommend: true,
        anonymous: false
      },
      submittedDate: '2024-03-11',
      status: 'acknowledged',
      helpful: 5
    },
    {
      id: '3',
      event: {
        name: 'Children Education Workshop',
        organization: 'Future Leaders Foundation',
        date: '2024-03-05',
        id: 'event-3'
      },
      ratings: {
        overall: 4,
        organization: 4,
        coordination: 4,
        impact: 4,
        communication: 3
      },
      feedback: {
        positive: 'Working with children was rewarding and the educational materials were well-prepared. Kids were engaged and learning was visible.',
        improvements: 'Communication about the workshop objectives could be clearer. Some volunteers seemed unsure about the teaching approach.',
        recommend: true,
        anonymous: true
      },
      submittedDate: '2024-03-06',
      status: 'submitted',
      helpful: 3
    },
    {
      id: '4',
      event: {
        name: 'Emergency Response Training',
        organization: 'UAE Red Crescent',
        date: '2024-02-28',
        id: 'event-4'
      },
      ratings: {
        overall: 5,
        organization: 5,
        coordination: 5,
        impact: 5,
        communication: 5
      },
      feedback: {
        positive: 'Outstanding training program with professional instructors. Hands-on practice was excellent and the knowledge gained is invaluable. Perfect organization throughout.',
        improvements: 'No major improvements needed. Maybe provide take-home reference materials for future review.',
        recommend: true,
        anonymous: false
      },
      submittedDate: '2024-03-01',
      status: 'responded',
      response: 'We\'re delighted you found the training valuable! We\'re working on developing take-home reference materials as suggested.',
      helpful: 12
    }
  ];

  const pendingEvents: PendingEvent[] = [
    {
      id: 'pending-1',
      name: 'Tree Planting Initiative',
      organization: 'Green UAE Foundation',
      date: '2024-03-20',
      status: 'completed'
    },
    {
      id: 'pending-2',
      name: 'Senior Care Visit',
      organization: 'Elderly Care Society',
      date: '2024-03-18',
      status: 'completed'
    }
  ];

  // Calculate feedback summary
  const feedbackSummary: FeedbackSummary = {
    totalFeedbacks: feedbacks.length,
    averageRating: feedbacks.reduce((sum, f) => sum + f.ratings.overall, 0) / feedbacks.length,
    recommendationRate: (feedbacks.filter(f => f.feedback.recommend).length / feedbacks.length) * 100,
    responseRate: (feedbacks.filter(f => f.status === 'responded').length / feedbacks.length) * 100,
    categories: {
      organization: {
        average: feedbacks.reduce((sum, f) => sum + f.ratings.organization, 0) / feedbacks.length,
        count: feedbacks.length
      },
      coordination: {
        average: feedbacks.reduce((sum, f) => sum + f.ratings.coordination, 0) / feedbacks.length,
        count: feedbacks.length
      },
      impact: {
        average: feedbacks.reduce((sum, f) => sum + f.ratings.impact, 0) / feedbacks.length,
        count: feedbacks.length
      },
      communication: {
        average: feedbacks.reduce((sum, f) => sum + f.ratings.communication, 0) / feedbacks.length,
        count: feedbacks.length
      }
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.event.organization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = selectedRating === 'all' || 
                         (selectedRating === '5' && feedback.ratings.overall === 5) ||
                         (selectedRating === '4' && feedback.ratings.overall === 4) ||
                         (selectedRating === '3' && feedback.ratings.overall <= 3);
    
    return matchesSearch && matchesRating;
  });

  const handleSubmitFeedback = (eventId: string) => {
    setSelectedEvent(pendingEvents.find(e => e.id === eventId) || null);
    setShowFeedbackDialog(true);
  };

  const handleMarkHelpful = (feedbackId: string) => {
    alert(`Feedback ${feedbackId} marked as helpful!`);
  };

  const getStatusBadge = (status: EventFeedback['status']) => {
    const statusConfig = {
      submitted: { label: 'Submitted', className: 'bg-blue-100 text-blue-800' },
      acknowledged: { label: 'Acknowledged', className: 'bg-yellow-100 text-yellow-800' },
      responded: { label: 'Responded', className: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const renderStarRating = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`${starSize} ${
              i < rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Feedback</h1>
            <p className="text-gray-600">Share your volunteer experience and help improve future events</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Trends
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{feedbackSummary.totalFeedbacks}</div>
              <div className="text-sm text-gray-600">Total Feedbacks</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{feedbackSummary.averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <ThumbsUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{feedbackSummary.recommendationRate.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Recommend Rate</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{feedbackSummary.responseRate.toFixed(0)}%</div>
              <div className="text-sm text-gray-600">Response Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'submitted' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('submitted')}
            className="flex-1"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Submitted ({feedbacks.length})
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('pending')}
            className="flex-1"
          >
            <Clock className="h-4 w-4 mr-2" />
            Pending ({pendingEvents.length})
          </Button>
          <Button
            variant={activeTab === 'analytics' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('analytics')}
            className="flex-1"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>

        {/* Submitted Feedbacks Tab */}
        {activeTab === 'submitted' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search by event name or organization..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedRating === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedRating('all')}
                    >
                      All Ratings
                    </Button>
                    <Button
                      variant={selectedRating === '5' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedRating('5')}
                    >
                      5 Stars
                    </Button>
                    <Button
                      variant={selectedRating === '4' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedRating('4')}
                    >
                      4 Stars
                    </Button>
                    <Button
                      variant={selectedRating === '3' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedRating('3')}
                    >
                      ≤3 Stars
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback List */}
            <div className="space-y-4">
              {filteredFeedbacks.map(feedback => (
                <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{feedback.event.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span>{feedback.event.organization}</span>
                          <span>•</span>
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(feedback.event.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(feedback.status)}
                        {renderStarRating(feedback.ratings.overall)}
                      </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Organization</div>
                        {renderStarRating(feedback.ratings.organization)}
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Coordination</div>
                        {renderStarRating(feedback.ratings.coordination)}
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Impact</div>
                        {renderStarRating(feedback.ratings.impact)}
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Communication</div>
                        {renderStarRating(feedback.ratings.communication)}
                      </div>
                    </div>

                    {/* Feedback Content */}
                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">What went well:</h4>
                        <p className="text-sm text-gray-700">{feedback.feedback.positive}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Suggestions for improvement:</h4>
                        <p className="text-sm text-gray-700">{feedback.feedback.improvements}</p>
                      </div>
                    </div>

                    {/* Organization Response */}
                    {feedback.response && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <h4 className="text-sm font-medium text-blue-900 mb-1">Organization Response:</h4>
                        <p className="text-sm text-blue-800">{feedback.response}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Submitted: {new Date(feedback.submittedDate).toLocaleDateString()}</span>
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{feedback.helpful} found helpful</span>
                        </span>
                        {feedback.feedback.recommend && (
                          <span className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Would recommend</span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleMarkHelpful(feedback.id)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pending Feedbacks Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Events Awaiting Feedback</h2>
              <p className="text-gray-600">Share your experience to help improve future volunteer opportunities</p>
            </div>

            <div className="space-y-4">
              {pendingEvents.map(event => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Building2 className="h-4 w-4" />
                          <span>{event.organization}</span>
                          <span>•</span>
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <Button onClick={() => handleSubmitFeedback(event.id)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {pendingEvents.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
                <p className="text-gray-600">You've provided feedback for all your recent events.</p>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Analytics</CardTitle>
                <CardDescription>Your feedback patterns and impact over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Rating Categories</h4>
                    <div className="space-y-3">
                      {Object.entries(feedbackSummary.categories).map(([category, data]) => (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                            <span className="text-sm text-gray-600">{data.average.toFixed(1)}/5</span>
                          </div>
                          <Progress value={(data.average / 5) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Feedback Impact</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Responses Received</span>
                        <span className="font-semibold">{feedbacks.filter(f => f.status === 'responded').length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Average Response Time</span>
                        <span className="font-semibold">2.3 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Improvements Implemented</span>
                        <span className="font-semibold">7</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Feedback Helpfulness Score</span>
                        <span className="font-semibold">4.2/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Feedback Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <BarChart3 className="h-12 w-12 mb-2" />
                  <div className="text-center">
                    <p>Feedback trends chart would be displayed here</p>
                    <p className="text-sm">Showing rating trends over the past 12 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Submit Feedback Dialog */}
        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit Event Feedback</DialogTitle>
              <DialogDescription>
                {selectedEvent && `Share your experience for ${selectedEvent.name}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating *</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button key={rating} className="p-1">
                      <Star className="h-6 w-6 text-gray-300 hover:text-yellow-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Ratings */}
              <div className="grid md:grid-cols-2 gap-4">
                {['Organization', 'Coordination', 'Impact', 'Communication'].map(category => (
                  <div key={category}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{category}</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button key={rating} className="p-1">
                          <Star className="h-4 w-4 text-gray-300 hover:text-yellow-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Written Feedback */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">What went well? *</label>
                <Textarea
                  placeholder="Share what you enjoyed about this volunteer experience..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Suggestions for improvement</label>
                <Textarea
                  placeholder="How could this event be improved for future volunteers?"
                  rows={3}
                />
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="recommend" className="h-4 w-4" />
                  <label htmlFor="recommend" className="text-sm text-gray-700">
                    I would recommend this volunteer opportunity to others
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="anonymous" className="h-4 w-4" />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    Submit feedback anonymously
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="followUp" className="h-4 w-4" />
                  <label htmlFor="followUp" className="text-sm text-gray-700">
                    Allow organization to contact me about this feedback
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  Submit Feedback
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}