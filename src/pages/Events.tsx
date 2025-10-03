import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Heart, Search, MapPin, Users, Calendar, Clock, Filter,
  ArrowRight, Star, Building, User
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  organization: string;
  organizationLogo?: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  skills: string[];
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export default function Events() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('upcoming');

  const events: Event[] = [
    {
      id: '1',
      title: 'Beach Cleanup Drive - Dubai Marina',
      description: 'Join us for a comprehensive beach cleanup initiative to protect marine life and keep our beaches pristine. We will provide all necessary equipment and refreshments.',
      organization: 'Emirates Environmental Group',
      organizationLogo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=50&h=50&fit=crop&crop=center',
      category: 'Environment',
      date: '2024-03-25',
      time: '08:00 AM',
      duration: '4 hours',
      location: 'Dubai Marina Beach, Dubai',
      volunteersNeeded: 60,
      volunteersRegistered: 45,
      difficulty: 'Easy',
      skills: ['Physical Activity', 'Environmental Awareness'],
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=200&fit=crop',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Food Distribution for Families in Need',
      description: 'Help distribute food packages to underprivileged families across Al Ain. This is a weekly initiative that makes a direct impact on community welfare.',
      organization: 'Red Crescent UAE',
      organizationLogo: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=50&h=50&fit=crop&crop=center',
      category: 'Community Service',
      date: '2024-03-28',
      time: '06:00 PM',
      duration: '3 hours',
      location: 'Al Ain Community Center, Al Ain',
      volunteersNeeded: 40,
      volunteersRegistered: 28,
      difficulty: 'Medium',
      skills: ['Communication', 'Physical Activity', 'Empathy'],
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=200&fit=crop',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Children\'s Hospital Visit & Entertainment',
      description: 'Bring joy to young patients through storytelling, games, and interactive activities. Special training will be provided for hospital protocols.',
      organization: 'Make-A-Wish UAE',
      organizationLogo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=50&h=50&fit=crop&crop=center',
      category: 'Healthcare',
      date: '2024-03-30',
      time: '02:00 PM',
      duration: '2 hours',
      location: 'Sheikh Khalifa Medical City, Abu Dhabi',
      volunteersNeeded: 20,
      volunteersRegistered: 12,
      difficulty: 'Medium',
      skills: ['Communication', 'Creativity', 'Patience'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'Digital Literacy Workshop for Seniors',
      description: 'Teach basic computer and smartphone skills to elderly community members. Help bridge the digital divide and empower seniors with technology.',
      organization: 'Dubai Cares',
      organizationLogo: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=50&h=50&fit=crop&crop=center',
      category: 'Education',
      date: '2024-04-02',
      time: '10:00 AM',
      duration: '5 hours',
      location: 'Dubai Community Center, Dubai',
      volunteersNeeded: 15,
      volunteersRegistered: 8,
      difficulty: 'Hard',
      skills: ['Technology', 'Teaching', 'Patience', 'Communication'],
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
      status: 'upcoming'
    },
    {
      id: '5',
      title: 'Tree Planting Initiative - Al Ain Oasis',
      description: 'Participate in expanding the green cover of Al Ain Oasis. Learn about local flora and contribute to environmental conservation.',
      organization: 'Emirates Environmental Group',
      organizationLogo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=50&h=50&fit=crop&crop=center',
      category: 'Environment',
      date: '2024-04-05',
      time: '07:00 AM',
      duration: '6 hours',
      location: 'Al Ain Oasis, Al Ain',
      volunteersNeeded: 80,
      volunteersRegistered: 23,
      difficulty: 'Medium',
      skills: ['Physical Activity', 'Environmental Awareness', 'Teamwork'],
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop',
      status: 'upcoming'
    },
    {
      id: '6',
      title: 'Blood Donation Drive',
      description: 'Support our monthly blood donation campaign. Help save lives by encouraging donations and assisting with registration and coordination.',
      organization: 'Red Crescent UAE',
      organizationLogo: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=50&h=50&fit=crop&crop=center',
      category: 'Healthcare',
      date: '2024-04-08',
      time: '09:00 AM',
      duration: '8 hours',
      location: 'Dubai Mall, Dubai',
      volunteersNeeded: 25,
      volunteersRegistered: 18,
      difficulty: 'Easy',
      skills: ['Communication', 'Organization', 'Empathy'],
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=400&h=200&fit=crop',
      status: 'upcoming'
    }
  ];

  const categories = [
    'all',
    'Environment',
    'Community Service',
    'Healthcare',
    'Education',
    'Children & Youth',
    'Animal Welfare',
    'Disaster Relief'
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesStatus = event.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getDifficultyColor = (difficulty: Event['difficulty']) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <span className="text-xl font-bold text-gray-900">SwaedUAE</span>
                <div className="text-xs text-green-600 font-medium">UAE Volunteer Platform</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/opportunities" className="text-gray-600 hover:text-gray-900">Opportunities</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link to="/verify-certificate" className="text-gray-600 hover:text-gray-900">Verify Certificate</Link>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Volunteer Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover meaningful volunteer opportunities across the UAE. Make a difference in your community 
            by joining events that match your interests and skills.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search events, organizations, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="upcoming">Upcoming Events</option>
                <option value="ongoing">Ongoing Events</option>
                <option value="completed">Completed Events</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              {event.image && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline">{event.category}</Badge>
                      <Badge className={getDifficultyColor(event.difficulty)}>
                        {event.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      {event.organizationLogo && (
                        <img
                          src={event.organizationLogo}
                          alt={event.organization}
                          className="w-5 h-5 rounded-full"
                        />
                      )}
                      <Building className="h-4 w-4" />
                      <span>{event.organization}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                {/* Event Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{event.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{event.volunteersRegistered}/{event.volunteersNeeded} volunteers</span>
                  </div>
                </div>

                {/* Skills Required */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Skills Required:</div>
                  <div className="flex flex-wrap gap-1">
                    {event.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Registration Progress</span>
                    <span>{Math.round((event.volunteersRegistered / event.volunteersNeeded) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((event.volunteersRegistered / event.volunteersNeeded) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1" asChild>
                    <Link to="/register">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/events/${event.id}`}>Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No events found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of volunteers across the UAE who are creating positive change in their communities. 
            Every hour you contribute makes a meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Start Volunteering Today</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/opportunities">Browse All Opportunities</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}