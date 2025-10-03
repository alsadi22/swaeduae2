import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart3, TrendingUp, TrendingDown, Users, Calendar,
  Download, Share2, Filter, RefreshCw, Eye, FileText,
  Award, Clock, MapPin, Star, CheckCircle, AlertCircle
} from 'lucide-react';

interface ReportMetric {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  format: 'number' | 'percentage' | 'hours' | 'currency';
  icon: React.ReactNode;
  color: string;
}

interface EventReport {
  id: string;
  title: string;
  date: string;
  volunteersRegistered: number;
  volunteersAttended: number;
  hoursLogged: number;
  attendanceRate: number;
  noShowRate: number;
  rating: number;
  category: string;
  location: string;
  impact: {
    metric: string;
    value: number;
    unit: string;
  }[];
}

interface VolunteerReport {
  id: string;
  name: string;
  email: string;
  totalHours: number;
  eventsAttended: number;
  certificatesEarned: number;
  reliability: number;
  averageRating: number;
  lastActivity: string;
  skills: string[];
  preferredCategories: string[];
}

export default function OrgReports() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [dateRange, setDateRange] = useState('last30days');
  const [reportType, setReportType] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data
  const metrics: ReportMetric[] = [
    {
      id: '1',
      title: 'Total Volunteers',
      value: 1247,
      previousValue: 1156,
      change: 7.9,
      changeType: 'increase',
      format: 'number',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600'
    },
    {
      id: '2',
      title: 'Active Events',
      value: 23,
      previousValue: 19,
      change: 21.1,
      changeType: 'increase',
      format: 'number',
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-green-600'
    },
    {
      id: '3',
      title: 'Hours Volunteered',
      value: 4856,
      previousValue: 4234,
      change: 14.7,
      changeType: 'increase',
      format: 'hours',
      icon: <Clock className="h-6 w-6" />,
      color: 'text-purple-600'
    },
    {
      id: '4',
      title: 'Certificates Issued',
      value: 342,
      previousValue: 298,
      change: 14.8,
      changeType: 'increase',
      format: 'number',
      icon: <Award className="h-6 w-6" />,
      color: 'text-yellow-600'
    },
    {
      id: '5',
      title: 'Attendance Rate',
      value: 87.3,
      previousValue: 84.1,
      change: 3.8,
      changeType: 'increase',
      format: 'percentage',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-green-600'
    },
    {
      id: '6',
      title: 'Average Rating',
      value: 4.6,
      previousValue: 4.4,
      change: 4.5,
      changeType: 'increase',
      format: 'number',
      icon: <Star className="h-6 w-6" />,
      color: 'text-orange-600'
    }
  ];

  const eventReports: EventReport[] = [
    {
      id: '1',
      title: 'Beach Cleanup Drive',
      date: '2024-03-25',
      volunteersRegistered: 50,
      volunteersAttended: 42,
      hoursLogged: 168,
      attendanceRate: 84,
      noShowRate: 16,
      rating: 4.8,
      category: 'Environment',
      location: 'Jumeirah Beach',
      impact: [
        { metric: 'Waste Collected', value: 127, unit: 'kg' },
        { metric: 'Beach Area Cleaned', value: 2.5, unit: 'km' },
        { metric: 'CO₂ Impact Prevented', value: 45, unit: 'kg CO₂' }
      ]
    },
    {
      id: '2',
      title: 'Food Distribution',
      date: '2024-03-24',
      volunteersRegistered: 35,
      volunteersAttended: 32,
      hoursLogged: 96,
      attendanceRate: 91,
      noShowRate: 9,
      rating: 4.6,
      category: 'Community',
      location: 'Al Karama Community Center',
      impact: [
        { metric: 'Meals Distributed', value: 450, unit: 'meals' },
        { metric: 'Families Served', value: 150, unit: 'families' },
        { metric: 'Food Waste Prevented', value: 85, unit: 'kg' }
      ]
    },
    {
      id: '3',
      title: 'Tree Planting Initiative',
      date: '2024-03-23',
      volunteersRegistered: 28,
      volunteersAttended: 25,
      hoursLogged: 125,
      attendanceRate: 89,
      noShowRate: 11,
      rating: 4.7,
      category: 'Environment',
      location: 'Dubai Miracle Garden',
      impact: [
        { metric: 'Trees Planted', value: 200, unit: 'trees' },
        { metric: 'Area Covered', value: 1.2, unit: 'hectares' },
        { metric: 'Future CO₂ Absorption', value: 2400, unit: 'kg CO₂/year' }
      ]
    }
  ];

  const volunteerReports: VolunteerReport[] = [
    {
      id: '1',
      name: 'Ahmed Al-Mansouri',
      email: 'ahmed@example.com',
      totalHours: 156,
      eventsAttended: 23,
      certificatesEarned: 12,
      reliability: 95,
      averageRating: 4.9,
      lastActivity: '2024-03-25',
      skills: ['Environmental Conservation', 'Leadership', 'First Aid'],
      preferredCategories: ['Environment', 'Community Development']
    },
    {
      id: '2',
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      totalHours: 134,
      eventsAttended: 19,
      certificatesEarned: 8,
      reliability: 88,
      averageRating: 4.7,
      lastActivity: '2024-03-24',
      skills: ['Community Service', 'Event Coordination', 'Translation'],
      preferredCategories: ['Community', 'Education']
    },
    {
      id: '3',
      name: 'Mohammed Ali',
      email: 'mohammed@example.com',
      totalHours: 89,
      eventsAttended: 12,
      certificatesEarned: 5,
      reliability: 75,
      averageRating: 4.3,
      lastActivity: '2024-03-22',
      skills: ['Gardening', 'Physical Activity', 'Photography'],
      preferredCategories: ['Environment', 'Sports']
    }
  ];

  const formatValue = (value: number, format: ReportMetric['format']) => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      case 'hours':
        return `${value.toLocaleString()} hrs`;
      case 'currency':
        return `AED ${value.toLocaleString()}`;
      default:
        return value.toLocaleString();
    }
  };

  const getChangeIcon = (changeType: ReportMetric['changeType']) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getChangeColor = (changeType: ReportMetric['changeType']) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleExportReport = (type: string) => {
    // Simulate report export
    alert(`Exporting ${type} report...`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive insights into volunteer activities and impact</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share Dashboard
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div>
                <Label>Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="last90days">Last 90 days</SelectItem>
                    <SelectItem value="last6months">Last 6 months</SelectItem>
                    <SelectItem value="lastyear">Last year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Reports</SelectItem>
                    <SelectItem value="events">Events Only</SelectItem>
                    <SelectItem value="volunteers">Volunteers Only</SelectItem>
                    <SelectItem value="impact">Impact Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports Dashboard */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Event Reports</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteer Reports</TabsTrigger>
            <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((metric) => (
                <Card key={metric.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={metric.color}>
                          {metric.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatValue(metric.value, metric.format)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                          {getChangeIcon(metric.changeType)}
                          <span className="text-sm font-medium">
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">vs last period</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Registration Trends</CardTitle>
                  <CardDescription>Monthly volunteer registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Registration trends chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Attendance Rates</CardTitle>
                  <CardDescription>Attendance vs registration by event category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Attendance rates chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hours by Category</CardTitle>
                  <CardDescription>Volunteer hours distribution across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Environment</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="text-sm font-medium">1,856 hrs</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Community</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm font-medium">1,234 hrs</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Education</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <span className="text-sm font-medium">987 hrs</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Healthcare</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div className="bg-red-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-sm font-medium">779 hrs</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Events</CardTitle>
                  <CardDescription>Events with highest attendance and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eventReports.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{event.volunteersAttended} volunteers</span>
                            <span>{event.attendanceRate}% attendance</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{event.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Event Performance Reports</h2>
              <Button onClick={() => handleExportReport('events')}>
                <Download className="h-4 w-4 mr-2" />
                Export Event Reports
              </Button>
            </div>

            <div className="space-y-4">
              {eventReports.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{event.rating}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{event.volunteersRegistered}</div>
                        <div className="text-sm text-gray-600">Registered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{event.volunteersAttended}</div>
                        <div className="text-sm text-gray-600">Attended</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{event.hoursLogged}</div>
                        <div className="text-sm text-gray-600">Hours Logged</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{event.attendanceRate}%</div>
                        <div className="text-sm text-gray-600">Attendance Rate</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Impact Metrics</h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {event.impact.map((impact, index) => (
                          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-lg font-bold text-gray-900">{impact.value.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">{impact.metric}</div>
                            <div className="text-xs text-gray-500">{impact.unit}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Volunteer Performance Reports</h2>
              <Button onClick={() => handleExportReport('volunteers')}>
                <Download className="h-4 w-4 mr-2" />
                Export Volunteer Reports
              </Button>
            </div>

            <div className="space-y-4">
              {volunteerReports.map((volunteer) => (
                <Card key={volunteer.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{volunteer.name}</h3>
                        <p className="text-sm text-gray-600">{volunteer.email}</p>
                        <p className="text-sm text-gray-500">Last active: {formatDate(volunteer.lastActivity)}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{volunteer.averageRating}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{volunteer.totalHours}</div>
                        <div className="text-sm text-gray-600">Total Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{volunteer.eventsAttended}</div>
                        <div className="text-sm text-gray-600">Events Attended</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{volunteer.certificatesEarned}</div>
                        <div className="text-sm text-gray-600">Certificates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{volunteer.reliability}%</div>
                        <div className="text-sm text-gray-600">Reliability</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{volunteer.averageRating}</div>
                        <div className="text-sm text-gray-600">Avg Rating</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Preferred Categories</h4>
                        <div className="flex flex-wrap gap-1">
                          {volunteer.preferredCategories.map((category, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Impact Analysis</h2>
              <Button onClick={() => handleExportReport('impact')}>
                <Download className="h-4 w-4 mr-2" />
                Export Impact Report
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Impact</CardTitle>
                  <CardDescription>Cumulative environmental contributions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">Waste Collected</span>
                      <span className="text-lg font-bold text-green-600">2,847 kg</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">Trees Planted</span>
                      <span className="text-lg font-bold text-green-600">1,456 trees</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">CO₂ Prevented</span>
                      <span className="text-lg font-bold text-green-600">18,234 kg</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">Area Cleaned</span>
                      <span className="text-lg font-bold text-green-600">45.7 km²</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Impact</CardTitle>
                  <CardDescription>Social contributions and community support</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">People Served</span>
                      <span className="text-lg font-bold text-blue-600">12,456 people</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">Meals Distributed</span>
                      <span className="text-lg font-bold text-blue-600">8,934 meals</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">Educational Sessions</span>
                      <span className="text-lg font-bold text-blue-600">234 sessions</span>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">Healthcare Checkups</span>
                      <span className="text-lg font-bold text-blue-600">1,567 checkups</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Impact Over Time</CardTitle>
                  <CardDescription>Monthly impact metrics progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Impact progression chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Trends Analysis</h2>
              <Button onClick={() => handleExportReport('trends')}>
                <Download className="h-4 w-4 mr-2" />
                Export Trends Report
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Growth Trends</CardTitle>
                  <CardDescription>Monthly volunteer registration and retention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Volunteer growth trends chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Popularity Trends</CardTitle>
                  <CardDescription>Event categories gaining or losing popularity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Event popularity trends chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                  <CardDescription>Volunteer activity patterns throughout the year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <p>Seasonal patterns chart would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>Volunteer engagement and satisfaction trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Session Duration</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium">4.2 hours</span>
                        <span className="text-sm text-green-600">+12%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Return Rate</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium">73%</span>
                        <span className="text-sm text-green-600">+8%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Satisfaction Score</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-medium">4.6/5</span>
                        <span className="text-sm text-green-600">+5%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Referral Rate</span>
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <span className="font-medium">18%</span>
                        <span className="text-sm text-red-600">-3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Trend Insights:</strong> Volunteer engagement is increasing with longer session durations and higher satisfaction scores. 
                Consider implementing referral programs to boost the referral rate.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}