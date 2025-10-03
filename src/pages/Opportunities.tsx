import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import AdvancedSearch from '@/components/AdvancedSearch';
import { 
  Heart, MapPin, Calendar, Clock, Users, Star,
  Filter, Grid, List, ChevronDown, Bookmark
} from 'lucide-react';

export default function Opportunities() {
  const { t, isRTL } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');

  const opportunities = [
    {
      id: 1,
      title: 'Beach Cleanup Drive',
      organization: 'Emirates Environmental Group',
      category: 'Environment',
      location: 'Jumeirah Beach, Dubai',
      date: '2024-10-15',
      time: '08:00 AM',
      duration: '4 hours',
      volunteers: 45,
      maxVolunteers: 60,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=250&fit=crop',
      description: 'Join us for a community beach cleanup to protect marine life and keep our beaches pristine.',
      skills: ['Environmental Awareness', 'Teamwork'],
      requirements: 'No experience required. Bring sun protection and water.',
      featured: true
    },
    {
      id: 2,
      title: 'Food Distribution for Families',
      organization: 'Red Crescent UAE',
      category: 'Community Service',
      location: 'Al Ain Community Center',
      date: '2024-10-18',
      time: '06:00 PM',
      duration: '3 hours',
      volunteers: 28,
      maxVolunteers: 40,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop',
      description: 'Help distribute food packages to families in need during our weekly community outreach program.',
      skills: ['Communication', 'Organization'],
      requirements: 'Ability to lift packages up to 10kg. Training provided.',
      featured: false
    },
    {
      id: 3,
      title: 'Teaching Assistant for Children',
      organization: 'Future Leaders Academy',
      category: 'Education',
      location: 'Sharjah Education Zone',
      date: '2024-10-20',
      time: '02:00 PM',
      duration: '2 hours',
      volunteers: 12,
      maxVolunteers: 20,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=250&fit=crop',
      description: 'Support underprivileged children with homework help and educational activities.',
      skills: ['Teaching', 'Patience', 'Communication'],
      requirements: 'High school diploma minimum. Background check required.',
      featured: true
    },
    {
      id: 4,
      title: 'Blood Donation Drive Support',
      organization: 'UAE Health Authority',
      category: 'Healthcare',
      location: 'Dubai Healthcare City',
      date: '2024-10-22',
      time: '09:00 AM',
      duration: '6 hours',
      volunteers: 15,
      maxVolunteers: 25,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      description: 'Assist with registration and support during our monthly blood donation campaign.',
      skills: ['Healthcare Support', 'Customer Service'],
      requirements: 'Medical background preferred but not required. Training provided.',
      featured: false
    },
    {
      id: 5,
      title: 'Elderly Care Visit',
      organization: 'Golden Years Foundation',
      category: 'Community Service',
      location: 'Abu Dhabi Senior Center',
      date: '2024-10-25',
      time: '10:00 AM',
      duration: '3 hours',
      volunteers: 8,
      maxVolunteers: 15,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop',
      description: 'Spend quality time with elderly residents, engage in activities and provide companionship.',
      skills: ['Empathy', 'Communication', 'Patience'],
      requirements: 'Background check required. Orientation session mandatory.',
      featured: false
    },
    {
      id: 6,
      title: 'Tree Planting Initiative',
      organization: 'Green UAE Foundation',
      category: 'Environment',
      location: 'Al Barari, Dubai',
      date: '2024-10-28',
      time: '07:00 AM',
      duration: '5 hours',
      volunteers: 32,
      maxVolunteers: 50,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop',
      description: 'Help plant native trees and contribute to UAE\'s green initiative and environmental conservation.',
      skills: ['Physical Fitness', 'Environmental Awareness'],
      requirements: 'Comfortable with outdoor work. Gloves and tools provided.',
      featured: true
    }
  ];

  const categories = ['All', 'Environment', 'Education', 'Healthcare', 'Community Service'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredOpportunities = opportunities.filter(opp => 
    selectedCategory === 'All' || opp.category === selectedCategory
  );

  const handleSearch = (filters: any) => {
    console.log('Search filters:', filters);
    // Implement search logic here
  };

  const handleClearSearch = () => {
    console.log('Clear search filters');
    // Implement clear logic here
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environment': return 'bg-green-100 text-green-800';
      case 'Education': return 'bg-blue-100 text-blue-800';
      case 'Healthcare': return 'bg-red-100 text-red-800';
      case 'Community Service': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">SwaedUAE</span>
                <div className="text-xs text-green-600 font-medium">UAE Volunteer Platform</div>
              </div>
            </Link>
            
            <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/opportunities" className="text-blue-600 font-medium">Opportunities</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
              <Link to="/organizations" className="text-gray-700 hover:text-blue-600 font-medium">Organizations</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
            </div>

            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <LanguageToggle />
              <Button variant="outline" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Volunteer Opportunities</h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover meaningful ways to make a difference in your community
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Search Sidebar */}
          <div className="lg:col-span-1">
            <AdvancedSearch onSearch={handleSearch} onClear={handleClearSearch} />
            
            {/* Quick Categories */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className={`flex justify-between items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {filteredOpportunities.length} opportunities found
                </span>
              </div>
              
              <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="date">Date</option>
                    <option value="rating">Rating</option>
                    <option value="volunteers">Volunteers Needed</option>
                    <option value="location">Location</option>
                  </select>
                </div>
                
                <div className="flex border border-gray-300 rounded">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Opportunities Grid/List */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}>
              {filteredOpportunities.map(opportunity => (
                <Card key={opportunity.id} className={`hover:shadow-lg transition-shadow ${opportunity.featured ? 'ring-2 ring-blue-200' : ''}`}>
                  {opportunity.featured && (
                    <div className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-t-lg">
                      Featured Opportunity
                    </div>
                  )}
                  
                  <div className={viewMode === 'list' ? 'flex' : ''}>
                    <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                      <img
                        src={opportunity.image}
                        alt={opportunity.title}
                        className={`w-full object-cover ${viewMode === 'list' ? 'h-32' : 'h-48'} ${viewMode === 'grid' ? 'rounded-t-lg' : 'rounded-l-lg'}`}
                      />
                    </div>
                    
                    <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className={`flex justify-between items-start mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Badge className={getCategoryColor(opportunity.category)}>
                          {opportunity.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{opportunity.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                      <p className="text-blue-600 font-medium mb-3">{opportunity.organization}</p>
                      
                      <p className="text-gray-600 mb-4 text-sm line-clamp-2">{opportunity.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                          <MapPin className="h-4 w-4" />
                          <span>{opportunity.location}</span>
                        </div>
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(opportunity.date).toLocaleDateString()}</span>
                          <Clock className="h-4 w-4 ml-4" />
                          <span>{opportunity.time}</span>
                        </div>
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                          <Users className="h-4 w-4" />
                          <span>{opportunity.volunteers}/{opportunity.maxVolunteers} volunteers</span>
                        </div>
                      </div>
                      
                      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Button asChild>
                          <Link to={`/opportunities/${opportunity.id}`}>
                            Apply Now
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Opportunities
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className={`flex items-center space-x-3 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">SwaedUAE</span>
              </div>
              <p className="text-gray-400">Empowering communities across the UAE through meaningful volunteer opportunities.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/opportunities" className="hover:text-white">Opportunities</Link></li>
                <li><Link to="/organizations" className="hover:text-white">Organizations</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Volunteers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth/register" className="hover:text-white">Sign Up</Link></li>
                <li><Link to="/auth/login" className="hover:text-white">Sign In</Link></li>
                <li><Link to="/certificates" className="hover:text-white">Certificates</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/org/register" className="hover:text-white">Register Organization</Link></li>
                <li><Link to="/org/login" className="hover:text-white">Organization Login</Link></li>
                <li><Link to="/partners" className="hover:text-white">Partners</Link></li>
                <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-gray-400">&copy; 2024 SwaedUAE. All rights reserved.</p>
            <div className={`flex space-x-6 mt-4 md:mt-0 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}