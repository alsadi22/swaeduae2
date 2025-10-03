import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Heart, Search, MapPin, Users, Star, Globe, Phone, Mail,
  Shield, Award, Calendar, ArrowRight, Filter
} from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  website?: string;
  email: string;
  phone: string;
  rating: number;
  totalVolunteers: number;
  activeEvents: number;
  verified: boolean;
  logo?: string;
  established: string;
  specialties: string[];
}

export default function Organizations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const organizations: Organization[] = [
    {
      id: '1',
      name: 'Red Crescent UAE',
      description: 'The UAE Red Crescent is a humanitarian organization that provides emergency relief, healthcare, and social services to communities in need.',
      category: 'Healthcare',
      location: 'Abu Dhabi, UAE',
      website: 'https://www.redcrescent.ae',
      email: 'contact@redcrescent.ae',
      phone: '+971 2 666 4444',
      rating: 4.9,
      totalVolunteers: 2500,
      activeEvents: 15,
      verified: true,
      logo: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=100&h=100&fit=crop&crop=center',
      established: '1983',
      specialties: ['Emergency Relief', 'Healthcare', 'Blood Donation', 'Disaster Response']
    },
    {
      id: '2',
      name: 'Emirates Environmental Group',
      description: 'Leading environmental NGO in the UAE working towards environmental protection, conservation, and sustainable development.',
      category: 'Environment',
      location: 'Dubai, UAE',
      website: 'https://www.eeg-uae.org',
      email: 'info@eeg-uae.org',
      phone: '+971 4 344 8622',
      rating: 4.8,
      totalVolunteers: 1800,
      activeEvents: 12,
      verified: true,
      logo: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&crop=center',
      established: '1991',
      specialties: ['Beach Cleanup', 'Tree Planting', 'Recycling', 'Environmental Education']
    },
    {
      id: '3',
      name: 'Make-A-Wish UAE',
      description: 'Granting wishes to children with critical illnesses, bringing hope, strength, and joy to their lives and families.',
      category: 'Children & Youth',
      location: 'Dubai, UAE',
      website: 'https://www.makeawish.ae',
      email: 'info@makeawish.ae',
      phone: '+971 4 447 9470',
      rating: 4.9,
      totalVolunteers: 650,
      activeEvents: 8,
      verified: true,
      logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=100&fit=crop&crop=center',
      established: '2007',
      specialties: ['Wish Granting', 'Hospital Visits', 'Family Support', 'Fundraising']
    },
    {
      id: '4',
      name: 'Dubai Cares',
      description: 'A UAE-based philanthropic organization working to improve access to quality education in developing countries.',
      category: 'Education',
      location: 'Dubai, UAE',
      website: 'https://www.dubaicares.ae',
      email: 'info@dubaicares.ae',
      phone: '+971 4 564 7777',
      rating: 4.7,
      totalVolunteers: 1200,
      activeEvents: 10,
      verified: true,
      logo: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=100&h=100&fit=crop&crop=center',
      established: '2007',
      specialties: ['Education Programs', 'School Building', 'Teacher Training', 'Student Support']
    },
    {
      id: '5',
      name: 'Al Jalila Foundation',
      description: 'A global philanthropic organization dedicated to transforming lives through medical education, research and treatment.',
      category: 'Healthcare',
      location: 'Dubai, UAE',
      website: 'https://www.aljalilafoundation.ae',
      email: 'info@aljalilafoundation.ae',
      phone: '+971 4 584 6400',
      rating: 4.8,
      totalVolunteers: 950,
      activeEvents: 7,
      verified: true,
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center',
      established: '2013',
      specialties: ['Medical Research', 'Healthcare Access', 'Medical Education', 'Patient Support']
    },
    {
      id: '6',
      name: 'Beit Al Khair Society',
      description: 'Charitable organization providing social services, healthcare, and support to underprivileged families in the UAE.',
      category: 'Community Service',
      location: 'Dubai, UAE',
      website: 'https://www.bak.ae',
      email: 'info@bak.ae',
      phone: '+971 4 267 8999',
      rating: 4.6,
      totalVolunteers: 1400,
      activeEvents: 18,
      verified: true,
      logo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&h=100&fit=crop&crop=center',
      established: '1989',
      specialties: ['Food Distribution', 'Family Support', 'Healthcare', 'Education Support']
    }
  ];

  const categories = [
    'all',
    'Healthcare',
    'Environment',
    'Education',
    'Children & Youth',
    'Community Service',
    'Animal Welfare',
    'Disability Support'
  ];

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         org.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || org.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Partner Organizations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover verified organizations across the UAE that are making a positive impact in their communities. 
            Find the perfect match for your volunteer interests and skills.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search organizations, specialties, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
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
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredOrganizations.length} of {organizations.length} organizations
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredOrganizations.map(org => (
            <Card key={org.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    {org.logo && (
                      <img
                        src={org.logo}
                        alt={`${org.name} logo`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-xl">{org.name}</CardTitle>
                        {org.verified && (
                          <Shield className="h-5 w-5 text-green-600" title="Verified Organization" />
                        )}
                      </div>
                      <CardDescription className="flex items-center space-x-4 mt-1">
                        <Badge variant="outline">{org.category}</Badge>
                        <span className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {org.location}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{org.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">Est. {org.established}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">{org.description}</p>

                {/* Specialties */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {org.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {org.specialties.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{org.specialties.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="font-semibold text-gray-900">{org.totalVolunteers.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Volunteers</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{org.activeEvents}</div>
                    <div className="text-xs text-gray-500">Active Events</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{org.rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{org.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{org.phone}</span>
                  </div>
                  {org.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button className="flex-1" asChild>
                    <Link to="/opportunities">
                      View Opportunities
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/organizations/${org.id}`}>Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrganizations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No organizations found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Want to Partner with Us?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            If you're an organization looking to connect with passionate volunteers, 
            join our platform and start making a greater impact together.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/org/register">Register Your Organization</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}