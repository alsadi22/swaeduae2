import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, Users, Clock, Award, Heart, Leaf, BookOpen,
  Target, Globe, Star, Calendar, MapPin, ArrowUp, ArrowDown,
  BarChart3, PieChart, Download, Share2, Eye, Zap
} from 'lucide-react';

interface ImpactMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  description: string;
  color: string;
}

interface ImpactStory {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  impact: string;
  location: string;
  date: string;
  volunteers: number;
  hours: number;
}

interface SDGGoal {
  id: number;
  title: string;
  description: string;
  progress: number;
  projects: number;
  color: string;
}

export default function Impact() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const impactMetrics: ImpactMetric[] = [
    {
      id: '1',
      title: 'Total Volunteers',
      value: '47,832',
      change: 23.5,
      changeType: 'increase',
      icon: <Users className="h-6 w-6" />,
      description: 'Active volunteers across all programs',
      color: 'text-blue-600'
    },
    {
      id: '2',
      title: 'Volunteer Hours',
      value: '1.2M',
      change: 18.7,
      changeType: 'increase',
      icon: <Clock className="h-6 w-6" />,
      description: 'Total hours contributed to community',
      color: 'text-green-600'
    },
    {
      id: '3',
      title: 'Lives Impacted',
      value: '2.8M',
      change: 31.2,
      changeType: 'increase',
      icon: <Heart className="h-6 w-6" />,
      description: 'People directly benefited from programs',
      color: 'text-red-600'
    },
    {
      id: '4',
      title: 'Events Completed',
      value: '3,456',
      change: 15.3,
      changeType: 'increase',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Successful volunteer events organized',
      color: 'text-purple-600'
    },
    {
      id: '5',
      title: 'CO2 Reduced',
      value: '450 tons',
      change: 28.9,
      changeType: 'increase',
      icon: <Leaf className="h-6 w-6" />,
      description: 'Carbon footprint reduced through initiatives',
      color: 'text-green-600'
    },
    {
      id: '6',
      title: 'Trees Planted',
      value: '125,000',
      change: 42.1,
      changeType: 'increase',
      icon: <Leaf className="h-6 w-6" />,
      description: 'Trees planted across UAE',
      color: 'text-green-600'
    },
    {
      id: '7',
      title: 'Students Educated',
      value: '89,500',
      change: 19.6,
      changeType: 'increase',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Students reached through education programs',
      color: 'text-blue-600'
    },
    {
      id: '8',
      title: 'Waste Collected',
      value: '2,340 tons',
      change: 35.4,
      changeType: 'increase',
      icon: <Target className="h-6 w-6" />,
      description: 'Waste collected and properly disposed',
      color: 'text-orange-600'
    }
  ];

  const impactStories: ImpactStory[] = [
    {
      id: '1',
      title: 'Dubai Marina Beach Transformation',
      description: 'A year-long initiative that transformed Dubai Marina Beach into a pristine coastal environment through regular cleanup drives and community education.',
      image: '/api/placeholder/400/300',
      category: 'Environment',
      impact: '2.5km of coastline restored, 45 tons of waste removed',
      location: 'Dubai Marina, Dubai',
      date: '2024',
      volunteers: 1250,
      hours: 5000
    },
    {
      id: '2',
      title: 'Digital Literacy for Seniors',
      description: 'Empowering elderly residents across the UAE with essential digital skills to stay connected with family and access government services.',
      image: '/api/placeholder/400/300',
      category: 'Education',
      impact: '3,500 seniors trained, 85% now use digital services independently',
      location: 'UAE-wide',
      date: '2024',
      volunteers: 450,
      hours: 2800
    },
    {
      id: '3',
      title: 'Food Security Initiative',
      description: 'Addressing food insecurity by distributing nutritious meals and establishing community gardens in underserved areas.',
      image: '/api/placeholder/400/300',
      category: 'Community',
      impact: '150,000 meals distributed, 25 community gardens established',
      location: 'Sharjah & Ajman',
      date: '2024',
      volunteers: 890,
      hours: 4200
    },
    {
      id: '4',
      title: 'Healthcare Access Program',
      description: 'Providing free health screenings and medical support to migrant workers and low-income families across the Emirates.',
      image: '/api/placeholder/400/300',
      category: 'Healthcare',
      impact: '12,000 health screenings, 95% early detection rate',
      location: 'Abu Dhabi & Dubai',
      date: '2024',
      volunteers: 320,
      hours: 1600
    }
  ];

  const sdgGoals: SDGGoal[] = [
    {
      id: 3,
      title: 'Good Health and Well-being',
      description: 'Ensuring healthy lives and promoting well-being for all',
      progress: 78,
      projects: 45,
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Quality Education',
      description: 'Ensuring inclusive and equitable quality education',
      progress: 85,
      projects: 67,
      color: 'bg-red-500'
    },
    {
      id: 11,
      title: 'Sustainable Cities and Communities',
      description: 'Making cities inclusive, safe, resilient and sustainable',
      progress: 72,
      projects: 89,
      color: 'bg-orange-500'
    },
    {
      id: 13,
      title: 'Climate Action',
      description: 'Taking urgent action to combat climate change',
      progress: 68,
      projects: 34,
      color: 'bg-green-600'
    },
    {
      id: 15,
      title: 'Life on Land',
      description: 'Protecting, restoring and promoting sustainable use of terrestrial ecosystems',
      progress: 81,
      projects: 28,
      color: 'bg-green-400'
    },
    {
      id: 17,
      title: 'Partnerships for the Goals',
      description: 'Strengthening the means of implementation and revitalizing partnerships',
      progress: 92,
      projects: 156,
      color: 'bg-blue-600'
    }
  ];

  const getChangeIcon = (changeType: ImpactMetric['changeType']) => {
    switch (changeType) {
      case 'increase':
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'decrease':
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getChangeColor = (changeType: ImpactMetric['changeType']) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredStories = selectedCategory === 'all' 
    ? impactStories 
    : impactStories.filter(story => story.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Our Impact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measuring the positive change we're creating together across the UAE through volunteer action
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center justify-center space-x-2">
          {['2024', '2023', '2022', 'All Time'].map(period => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactMetrics.map(metric => (
            <Card key={metric.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gray-100 ${metric.color}`}>
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
                  <h3 className="text-3xl font-bold text-gray-900">{metric.value}</h3>
                  <p className="text-sm font-medium text-gray-900">{metric.title}</p>
                  <p className="text-xs text-gray-600">{metric.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Visualization */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Monthly Volunteer Growth</span>
              </CardTitle>
              <CardDescription>Volunteer registration trends over the past year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => {
                  const value = Math.floor(Math.random() * 2000) + 1000;
                  return (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 w-8">{month}</span>
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-3 mx-4">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" 
                            style={{ width: `${(value / 3000) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Impact by Category</span>
              </CardTitle>
              <CardDescription>Distribution of volunteer efforts across focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Environment', value: 35, color: '#10B981' },
                  { name: 'Education', value: 28, color: '#3B82F6' },
                  { name: 'Community', value: 22, color: '#F59E0B' },
                  { name: 'Healthcare', value: 15, color: '#EF4444' }
                ].map((category, index) => (
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
                            width: `${category.value * 2.5}%` 
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

        {/* UN SDG Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>UN Sustainable Development Goals</span>
            </CardTitle>
            <CardDescription>Our contribution to the United Nations Sustainable Development Goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sdgGoals.map(goal => (
                <div key={goal.id} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${goal.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {goal.id}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{goal.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">{goal.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-xs text-gray-500">
                      {goal.projects} active projects
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Stories */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Impact Stories</h2>
            <div className="flex items-center space-x-2">
              {['all', 'environment', 'education', 'community', 'healthcare'].map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredStories.map(story => (
              <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-gray-800">{story.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.description}</p>
                  
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Impact Achieved</span>
                      </div>
                      <p className="text-sm text-green-700">{story.impact}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{story.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{story.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{story.volunteers} volunteers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{story.hours.toLocaleString()} hours</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Read Full Story
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold">Be Part of the Impact</h2>
              <p className="text-xl opacity-90">
                Join thousands of volunteers who are making a real difference in communities across the UAE
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                <Button size="lg" variant="secondary">
                  <Users className="h-5 w-5 mr-2" />
                  Start Volunteering
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  <Download className="h-5 w-5 mr-2" />
                  Download Impact Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recognition */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Recognition & Awards</span>
            </CardTitle>
            <CardDescription>Acknowledgments for our community impact efforts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'UAE National Volunteer Award',
                  year: '2024',
                  description: 'Outstanding contribution to community development',
                  icon: <Star className="h-8 w-8 text-yellow-500" />
                },
                {
                  title: 'Environmental Excellence Award',
                  year: '2023',
                  description: 'Leading environmental conservation efforts',
                  icon: <Leaf className="h-8 w-8 text-green-500" />
                },
                {
                  title: 'Digital Innovation in Volunteering',
                  year: '2023',
                  description: 'Pioneering digital volunteer management',
                  icon: <Zap className="h-8 w-8 text-blue-500" />
                }
              ].map((award, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="flex justify-center">{award.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{award.title}</h4>
                    <p className="text-sm text-gray-600">{award.year}</p>
                    <p className="text-xs text-gray-500 mt-1">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}