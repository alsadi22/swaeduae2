import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, Calendar, MapPin, Download, Filter, Search, 
  CheckCircle, XCircle, AlertCircle, FileText, 
  TrendingUp, Award, Target, BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HourEntry {
  id: number;
  eventId: number;
  eventTitle: string;
  organization: string;
  organizationLogo: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  status: string;
  location: string;
  checkInTime: string;
  checkOutTime: string;
  notes: string;
  approvedBy?: string;
  approvedDate?: string;
  category: string;
  correctionReason?: string;
}

export default function Hours() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('timeline');

  // Mock hours data
  const hoursData: HourEntry[] = [
    {
      id: 1,
      eventId: 1,
      eventTitle: 'Beach Cleanup Drive - Dubai Marina',
      organization: 'Emirates Environmental Group',
      organizationLogo: '/api/placeholder/40/40',
      date: '2024-03-15',
      startTime: '08:00',
      endTime: '12:00',
      duration: 4,
      status: 'approved',
      location: 'Dubai Marina Beach',
      checkInTime: '08:05',
      checkOutTime: '11:58',
      notes: 'Excellent participation in coastal conservation',
      approvedBy: 'Sarah Al-Mansouri',
      approvedDate: '2024-03-16',
      category: 'Environment'
    },
    {
      id: 2,
      eventId: 2,
      eventTitle: 'Food Distribution - Ramadan Initiative',
      organization: 'UAE Red Crescent',
      organizationLogo: '/api/placeholder/40/40',
      date: '2024-03-10',
      startTime: '18:00',
      endTime: '21:00',
      duration: 3,
      status: 'approved',
      location: 'Al Wasl Community Center',
      checkInTime: '17:55',
      checkOutTime: '21:10',
      notes: 'Helped distribute 200+ meals to families',
      approvedBy: 'Ahmed Hassan',
      approvedDate: '2024-03-11',
      category: 'Community Service'
    },
    {
      id: 3,
      eventId: 3,
      eventTitle: 'Children\'s Reading Program',
      organization: 'Dubai Public Library',
      organizationLogo: '/api/placeholder/40/40',
      date: '2024-03-08',
      startTime: '14:00',
      endTime: '17:00',
      duration: 3,
      status: 'pending',
      location: 'Dubai Public Library - Main Branch',
      checkInTime: '13:58',
      checkOutTime: '17:05',
      notes: 'Pending organization review',
      category: 'Education'
    },
    {
      id: 4,
      eventId: 4,
      eventTitle: 'Senior Care Visit',
      organization: 'Helping Hands UAE',
      organizationLogo: '/api/placeholder/40/40',
      date: '2024-03-05',
      startTime: '10:00',
      endTime: '13:00',
      duration: 3,
      status: 'correction_requested',
      location: 'Al Noor Care Home',
      checkInTime: '10:15',
      checkOutTime: '12:45',
      notes: 'Duration adjustment requested - left 15 minutes early',
      correctionReason: 'Check-out time discrepancy',
      category: 'Healthcare'
    },
    {
      id: 5,
      eventId: 5,
      eventTitle: 'Tree Planting Campaign',
      organization: 'Green UAE Initiative',
      organizationLogo: '/api/placeholder/40/40',
      date: '2024-02-28',
      startTime: '07:00',
      endTime: '11:00',
      duration: 4,
      status: 'approved',
      location: 'Al Barsha Park',
      checkInTime: '06:55',
      checkOutTime: '11:02',
      notes: 'Planted 50+ trees, excellent dedication',
      approvedBy: 'Fatima Al-Zahra',
      approvedDate: '2024-03-01',
      category: 'Environment'
    }
  ];

  // Calculate statistics
  const totalHours = hoursData.reduce((sum, entry) => sum + entry.duration, 0);
  const approvedHours = hoursData.filter(entry => entry.status === 'approved').reduce((sum, entry) => sum + entry.duration, 0);
  const pendingHours = hoursData.filter(entry => entry.status === 'pending').reduce((sum, entry) => sum + entry.duration, 0);
  const thisMonthHours = hoursData.filter(entry => new Date(entry.date).getMonth() === new Date().getMonth()).reduce((sum, entry) => sum + entry.duration, 0);

  // Filter data
  const filteredHours = hoursData.filter(entry => {
    const matchesSearch = searchQuery === '' || 
      entry.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || (() => {
      const entryDate = new Date(entry.date);
      const now = new Date();
      switch (dateFilter) {
        case 'this_month': {
          return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
        }
        case 'last_month': {
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
          return entryDate.getMonth() === lastMonth.getMonth() && entryDate.getFullYear() === lastMonth.getFullYear();
        }
        case 'this_year': {
          return entryDate.getFullYear() === now.getFullYear();
        }
        default:
          return true;
      }
    })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><AlertCircle className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'correction_requested':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="h-3 w-3 mr-1" />Correction Needed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Simulate export functionality
    alert(`Exporting hours data as ${format.toUpperCase()}...`);
  };

  const handleRequestCorrection = (entryId: number) => {
    alert(`Opening correction request form for entry ${entryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Volunteer Hours</h1>
            <p className="text-gray-600">Track your volunteer contributions and impact</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Hours</p>
                  <p className="text-3xl font-bold text-gray-900">{totalHours}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">All time contribution</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved Hours</p>
                  <p className="text-3xl font-bold text-green-600">{approvedHours}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Verified contributions</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-3xl font-bold text-blue-600">{thisMonthHours}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Current month progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{pendingHours}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timeline">Hours Timeline</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="goals">Goals & Milestones</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search events, organizations, or locations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="correction_requested">Correction Needed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="this_month">This Month</SelectItem>
                      <SelectItem value="last_month">Last Month</SelectItem>
                      <SelectItem value="this_year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Hours Timeline */}
            <div className="space-y-4">
              {filteredHours.length > 0 ? (
                filteredHours.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={entry.organizationLogo} alt={entry.organization} />
                            <AvatarFallback>{entry.organization.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <Link to={`/hours/${entry.id}`}>
                                <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                                  {entry.eventTitle}
                                </h3>
                              </Link>
                              {getStatusBadge(entry.status)}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">{entry.organization}</p>
                            
                            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(entry.date)}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{entry.startTime} - {entry.endTime} ({entry.duration}h)</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>{entry.location}</span>
                              </div>
                            </div>
                            
                            {entry.notes && (
                              <p className="text-sm text-gray-700 mt-2 italic">"{entry.notes}"</p>
                            )}
                            
                            {entry.status === 'approved' && entry.approvedBy && (
                              <p className="text-xs text-green-600 mt-2">
                                Approved by {entry.approvedBy} on {formatDate(entry.approvedDate!)}
                              </p>
                            )}
                            
                            {entry.status === 'correction_requested' && (
                              <Alert className="mt-3 border-red-200 bg-red-50">
                                <XCircle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-800">
                                  <strong>Correction Needed:</strong> {entry.correctionReason}
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="ml-2 text-red-600 hover:text-red-800"
                                    onClick={() => handleRequestCorrection(entry.id)}
                                  >
                                    Submit Correction
                                  </Button>
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{entry.duration}h</div>
                          <Badge variant="outline">{entry.category}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Hours Found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchQuery || statusFilter !== 'all' || dateFilter !== 'all' 
                        ? 'Try adjusting your filters to see more results.'
                        : 'Start volunteering to track your hours and impact!'
                      }
                    </p>
                    <Link to="/opportunities">
                      <Button>Find Opportunities</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hours by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Hours by Category</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Environment', 'Community Service', 'Education', 'Healthcare'].map((category) => {
                      const categoryHours = hoursData.filter(entry => entry.category === category).reduce((sum, entry) => sum + entry.duration, 0);
                      const percentage = totalHours > 0 ? (categoryHours / totalHours) * 100 : 0;
                      return (
                        <div key={category}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{category}</span>
                            <span className="text-sm text-gray-600">{categoryHours}h ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Monthly Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Monthly Trend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['January', 'February', 'March'].map((month, index) => {
                      const monthHours = [8, 12, 17][index]; // Mock data
                      return (
                        <div key={month}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">{month} 2024</span>
                            <span className="text-sm text-gray-600">{monthHours}h</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(monthHours / 20) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Top Organizations */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Organizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from(new Set(hoursData.map(entry => entry.organization)))
                      .map(org => ({
                        name: org,
                        hours: hoursData.filter(entry => entry.organization === org).reduce((sum, entry) => sum + entry.duration, 0)
                      }))
                      .sort((a, b) => b.hours - a.hours)
                      .slice(0, 5)
                      .map((org, index) => (
                        <div key={org.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                              {index + 1}
                            </div>
                            <span className="text-sm font-medium">{org.name}</span>
                          </div>
                          <span className="text-sm text-gray-600">{org.hours}h</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Impact Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Impact Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{hoursData.length}</div>
                      <div className="text-sm text-gray-600">Events Participated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">{Array.from(new Set(hoursData.map(entry => entry.organization))).length}</div>
                      <div className="text-sm text-gray-600">Organizations Supported</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{Array.from(new Set(hoursData.map(entry => entry.category))).length}</div>
                      <div className="text-sm text-gray-600">Categories Involved</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            {/* Current Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>My Volunteer Goals</span>
                </CardTitle>
                <CardDescription>
                  Track your progress towards volunteer milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Annual Goal */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Annual Goal: 100 Hours</h4>
                    <span className="text-sm text-gray-600">{totalHours}/100 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full" 
                      style={{ width: `${Math.min((totalHours / 100) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {100 - totalHours > 0 ? `${100 - totalHours} hours remaining` : 'Goal achieved! 🎉'}
                  </p>
                </div>

                {/* Monthly Goal */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Monthly Goal: 10 Hours</h4>
                    <span className="text-sm text-gray-600">{thisMonthHours}/10 hours</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-600 h-3 rounded-full" 
                      style={{ width: `${Math.min((thisMonthHours / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {10 - thisMonthHours > 0 ? `${10 - thisMonthHours} hours remaining this month` : 'Monthly goal achieved! 🎉'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Milestones & Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { hours: 25, title: 'Getting Started', achieved: totalHours >= 25, icon: '🌟' },
                    { hours: 50, title: 'Dedicated Volunteer', achieved: totalHours >= 50, icon: '🏆' },
                    { hours: 100, title: 'Community Champion', achieved: totalHours >= 100, icon: '👑' },
                    { hours: 250, title: 'Impact Leader', achieved: totalHours >= 250, icon: '🚀' },
                    { hours: 500, title: 'Volunteer Hero', achieved: totalHours >= 500, icon: '💎' },
                    { hours: 1000, title: 'Legend Status', achieved: totalHours >= 1000, icon: '🌟' }
                  ].map((milestone) => (
                    <div 
                      key={milestone.hours}
                      className={`p-4 rounded-lg border-2 ${
                        milestone.achieved 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{milestone.icon}</span>
                          <div>
                            <h4 className={`font-medium ${milestone.achieved ? 'text-green-800' : 'text-gray-700'}`}>
                              {milestone.title}
                            </h4>
                            <p className="text-sm text-gray-600">{milestone.hours} hours</p>
                          </div>
                        </div>
                        {milestone.achieved && (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                      {!milestone.achieved && (
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${Math.min((totalHours / milestone.hours) * 100, 100)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}