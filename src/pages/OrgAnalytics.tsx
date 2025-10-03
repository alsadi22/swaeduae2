import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, TrendingDown, Users, Calendar, Award, Clock,
  Target, Star, BarChart3, PieChart, Download, Filter,
  ArrowUp, ArrowDown, Minus, RefreshCw, Eye, Share2
} from 'lucide-react';

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  description: string;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export default function OrgAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Mock analytics data
  const metrics: MetricCard[] = [
    {
      title: 'Total Volunteers',
      value: 1247,
      change: 12.5,
      changeType: 'increase',
      icon: <Users className="h-5 w-5" />,
      description: 'Active volunteers in the last 30 days'
    },
    {
      title: 'Events Hosted',
      value: 34,
      change: 8.3,
      changeType: 'increase',
      icon: <Calendar className="h-5 w-5" />,
      description: 'Events organized this month'
    },
    {
      title: 'Volunteer Hours',
      value: '3,456',
      change: 15.7,
      changeType: 'increase',
      icon: <Clock className="h-5 w-5" />,
      description: 'Total hours contributed'
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: -2.1,
      changeType: 'decrease',
      icon: <Target className="h-5 w-5" />,
      description: 'Events completed successfully'
    },
    {
      title: 'Average Rating',
      value: 4.8,
      change: 0.2,
      changeType: 'increase',
      icon: <Star className="h-5 w-5" />,
      description: 'Volunteer satisfaction rating'
    },
    {
      title: 'Retention Rate',
      value: '78.5%',
      change: 5.4,
      changeType: 'increase',
      icon: <TrendingUp className="h-5 w-5" />,
      description: 'Volunteers returning for more events'
    }
  ];

  const volunteerGrowth: ChartData[] = [
    { name: 'Jan', value: 850 },
    { name: 'Feb', value: 920 },
    { name: 'Mar', value: 1050 },
    { name: 'Apr', value: 1180 },
    { name: 'May', value: 1247 }
  ];

  const eventCategories: ChartData[] = [
    { name: 'Environment', value: 35, color: '#10B981' },
    { name: 'Education', value: 25, color: '#3B82F6' },
    { name: 'Community', value: 20, color: '#F59E0B' },
    { name: 'Healthcare', value: 12, color: '#EF4444' },
    { name: 'Emergency', value: 8, color: '#8B5CF6' }
  ];

  const topEvents = [
    {
      name: 'Beach Cleanup Initiative',
      volunteers: 156,
      hours: 624,
      rating: 4.9,
      completion: 98
    },
    {
      name: 'Food Distribution Drive',
      volunteers: 134,
      hours: 402,
      rating: 4.8,
      completion: 95
    },
    {
      name: 'Tree Planting Campaign',
      volunteers: 128,
      hours: 512,
      rating: 4.7,
      completion: 92
    },
    {
      name: 'Education Workshop',
      volunteers: 89,
      hours: 267,
      rating: 4.6,
      completion: 89
    },
    {
      name: 'Elderly Care Program',
      volunteers: 76,
      hours: 304,
      rating: 4.8,
      completion: 94
    }
  ];

  const volunteerDemographics = [
    { age: '18-25', count: 312, percentage: 25 },
    { age: '26-35', count: 374, percentage: 30 },
    { age: '36-45', count: 287, percentage: 23 },
    { age: '46-55', count: 187, percentage: 15 },
    { age: '55+', count: 87, percentage: 7 }
  ];

  const getChangeIcon = (changeType: MetricCard['changeType']) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'decrease':
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getChangeColor = (changeType: MetricCard['changeType']) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const exportReport = () => {
    // Simulate report export
    alert('Analytics report exported successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your organization's volunteer engagement and impact</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 3 months</option>
              <option value="1y">Last year</option>
            </select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {metric.icon}
                  </div>
                  <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                    {getChangeIcon(metric.changeType)}
                    <span className="text-sm font-medium">
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                  <p className="text-sm font-medium text-gray-900">{metric.title}</p>
                  <p className="text-xs text-gray-600">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Volunteer Growth Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Volunteer Growth</span>
              </CardTitle>
              <CardDescription>Monthly volunteer registration trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {volunteerGrowth.map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">{data.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(data.value / 1300) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                        {data.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Event Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Event Categories</span>
              </CardTitle>
              <CardDescription>Distribution of events by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-600">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            backgroundColor: category.color,
                            width: `${category.value * 2}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                        {category.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Events */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Events</CardTitle>
            <CardDescription>Your most successful volunteer events this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Event Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Volunteers</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Hours</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Completion</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topEvents.map((event, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{event.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{event.volunteers}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{event.hours}h</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{event.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            event.completion >= 95 ? 'bg-green-100 text-green-800' :
                            event.completion >= 90 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {event.completion}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Demographics</CardTitle>
            <CardDescription>Age distribution of your volunteer base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {volunteerDemographics.map((demo, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-600 w-12">{demo.age}</span>
                    <div className="w-48 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" 
                        style={{ width: `${demo.percentage * 4}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{demo.percentage}%</span>
                    <span className="text-sm font-semibold text-gray-900">{demo.count} volunteers</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights and Recommendations */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Strong Growth Trend</p>
                    <p className="text-xs text-gray-600">Volunteer registrations increased by 47% this quarter</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">High Engagement</p>
                    <p className="text-xs text-gray-600">Environmental events show the highest volunteer participation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Excellent Satisfaction</p>
                    <p className="text-xs text-gray-600">Average event rating of 4.8/5 shows strong volunteer satisfaction</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Expand Popular Categories</p>
                    <p className="text-xs text-gray-600">Consider hosting more environmental and education events</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Improve Completion Rate</p>
                    <p className="text-xs text-gray-600">Focus on better event planning to increase the 94.2% completion rate</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Engage Older Demographics</p>
                    <p className="text-xs text-gray-600">Create more events appealing to volunteers aged 45+</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}