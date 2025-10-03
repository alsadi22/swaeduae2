import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, Users, Award, Globe, Star, ExternalLink, Mail,
  Phone, MapPin, Calendar, TrendingUp, Heart, Handshake,
  Target, Zap, Shield, BookOpen, Briefcase, Search
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'government' | 'corporate' | 'ngo' | 'educational' | 'international';
  description: string;
  website: string;
  email: string;
  phone: string;
  location: string;
  partnershipSince: string;
  eventsHosted: number;
  volunteersEngaged: number;
  hoursContributed: number;
  impactAreas: string[];
  featured: boolean;
  testimonial?: string;
  contactPerson: string;
  achievements: string[];
}

export default function Partners() {
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const partners: Partner[] = [
    {
      id: '1',
      name: 'Dubai Municipality',
      logo: '/api/placeholder/120/120',
      type: 'government',
      description: 'Leading environmental conservation and urban development initiatives across Dubai through comprehensive volunteer programs.',
      website: 'https://dm.gov.ae',
      email: 'volunteers@dm.gov.ae',
      phone: '+971 4 221 5555',
      location: 'Dubai, UAE',
      partnershipSince: '2020-01-15',
      eventsHosted: 156,
      volunteersEngaged: 12450,
      hoursContributed: 48600,
      impactAreas: ['Environment', 'Urban Development', 'Community Services'],
      featured: true,
      testimonial: 'SwaedUAE has been instrumental in mobilizing volunteers for our environmental initiatives. Their platform has helped us engage thousands of passionate individuals in making Dubai greener.',
      contactPerson: 'Ahmed Al-Rashid',
      achievements: ['Green Dubai Initiative Partner', 'Environmental Excellence Award 2023', 'Community Impact Recognition']
    },
    {
      id: '2',
      name: 'Emirates Foundation',
      logo: '/api/placeholder/120/120',
      type: 'ngo',
      description: 'Empowering UAE youth through education, entrepreneurship, and community engagement programs with dedicated volunteer support.',
      website: 'https://emiratesfoundation.ae',
      email: 'partnerships@emiratesfoundation.ae',
      phone: '+971 2 401 0000',
      location: 'Abu Dhabi, UAE',
      partnershipSince: '2019-06-20',
      eventsHosted: 89,
      volunteersEngaged: 8750,
      hoursContributed: 35200,
      impactAreas: ['Education', 'Youth Development', 'Entrepreneurship'],
      featured: true,
      testimonial: 'The volunteer network through SwaedUAE has amplified our reach and impact in youth development programs across the Emirates.',
      contactPerson: 'Fatima Al-Zahra',
      achievements: ['Youth Empowerment Partner', 'Education Excellence Award', 'Innovation in Community Engagement']
    },
    {
      id: '3',
      name: 'ADNOC Group',
      logo: '/api/placeholder/120/120',
      type: 'corporate',
      description: 'Driving corporate social responsibility through employee volunteer programs and community investment initiatives.',
      website: 'https://adnoc.ae',
      email: 'csr@adnoc.ae',
      phone: '+971 2 202 0000',
      location: 'Abu Dhabi, UAE',
      partnershipSince: '2021-03-10',
      eventsHosted: 67,
      volunteersEngaged: 5600,
      hoursContributed: 22400,
      impactAreas: ['Corporate Volunteering', 'Environmental Sustainability', 'Education'],
      featured: true,
      testimonial: 'SwaedUAE has transformed our employee engagement in community service, making it easier for our workforce to contribute meaningfully to society.',
      contactPerson: 'Mohammed Al-Mansouri',
      achievements: ['Corporate Volunteer Excellence', 'Sustainability Leadership Award', 'Employee Engagement Champion']
    },
    {
      id: '4',
      name: 'American University of Sharjah',
      logo: '/api/placeholder/120/120',
      type: 'educational',
      description: 'Integrating community service into higher education through student volunteer programs and academic service-learning.',
      website: 'https://aus.edu',
      email: 'community@aus.edu',
      phone: '+971 6 515 0000',
      location: 'Sharjah, UAE',
      partnershipSince: '2020-09-01',
      eventsHosted: 45,
      volunteersEngaged: 3200,
      hoursContributed: 12800,
      impactAreas: ['Education', 'Student Engagement', 'Academic Service-Learning'],
      featured: false,
      testimonial: 'Our students have found meaningful ways to apply their learning through volunteer opportunities facilitated by SwaedUAE.',
      contactPerson: 'Dr. Sarah Johnson',
      achievements: ['Academic Excellence in Service', 'Student Engagement Award', 'Community Partnership Recognition']
    },
    {
      id: '5',
      name: 'United Nations Development Programme',
      logo: '/api/placeholder/120/120',
      type: 'international',
      description: 'Supporting sustainable development goals through volunteer mobilization and capacity building programs in the UAE.',
      website: 'https://undp.org',
      email: 'uae@undp.org',
      phone: '+971 2 304 2300',
      location: 'Abu Dhabi, UAE',
      partnershipSince: '2019-11-15',
      eventsHosted: 34,
      volunteersEngaged: 2800,
      hoursContributed: 11200,
      impactAreas: ['Sustainable Development', 'Capacity Building', 'Global Citizenship'],
      featured: false,
      contactPerson: 'Maria Rodriguez',
      achievements: ['SDG Implementation Partner', 'Global Volunteer Recognition', 'Sustainable Development Champion']
    },
    {
      id: '6',
      name: 'Dubai Cares',
      logo: '/api/placeholder/120/120',
      type: 'ngo',
      description: 'Improving access to quality education in developing countries through volunteer-supported programs and initiatives.',
      website: 'https://dubaicares.ae',
      email: 'volunteers@dubaicares.ae',
      phone: '+971 4 329 9999',
      location: 'Dubai, UAE',
      partnershipSince: '2020-04-22',
      eventsHosted: 52,
      volunteersEngaged: 4100,
      hoursContributed: 16400,
      impactAreas: ['Global Education', 'International Development', 'Humanitarian Aid'],
      featured: false,
      contactPerson: 'Layla Al-Hashimi',
      achievements: ['Global Education Partner', 'Humanitarian Excellence Award', 'International Impact Recognition']
    },
    {
      id: '7',
      name: 'Sharjah Department of Social Services',
      logo: '/api/placeholder/120/120',
      type: 'government',
      description: 'Enhancing social welfare and community support services through dedicated volunteer programs and community outreach.',
      website: 'https://ssd.gov.ae',
      email: 'volunteers@ssd.gov.ae',
      phone: '+971 6 556 0000',
      location: 'Sharjah, UAE',
      partnershipSince: '2021-01-08',
      eventsHosted: 73,
      volunteersEngaged: 6200,
      hoursContributed: 24800,
      impactAreas: ['Social Services', 'Community Welfare', 'Family Support'],
      featured: false,
      contactPerson: 'Omar Al-Zaabi',
      achievements: ['Social Impact Excellence', 'Community Service Award', 'Volunteer Coordination Recognition']
    },
    {
      id: '8',
      name: 'Masdar City',
      logo: '/api/placeholder/120/120',
      type: 'corporate',
      description: 'Pioneering sustainable urban development through community engagement and environmental volunteer initiatives.',
      website: 'https://masdar.ae',
      email: 'community@masdar.ae',
      phone: '+971 2 653 3333',
      location: 'Abu Dhabi, UAE',
      partnershipSince: '2020-07-12',
      eventsHosted: 38,
      volunteersEngaged: 2900,
      hoursContributed: 11600,
      impactAreas: ['Sustainability', 'Clean Energy', 'Smart Cities'],
      featured: false,
      contactPerson: 'Khalid Al-Nuaimi',
      achievements: ['Sustainability Innovation Award', 'Clean Energy Champion', 'Smart City Partnership']
    }
  ];

  const partnerTypes = [
    { id: 'all', name: 'All Partners', icon: <Building2 className="h-4 w-4" /> },
    { id: 'government', name: 'Government', icon: <Shield className="h-4 w-4" /> },
    { id: 'corporate', name: 'Corporate', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'ngo', name: 'NGO', icon: <Heart className="h-4 w-4" /> },
    { id: 'educational', name: 'Educational', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'international', name: 'International', icon: <Globe className="h-4 w-4" /> }
  ];

  const filteredPartners = partners.filter(partner => {
    const matchesType = selectedType === 'all' || partner.type === selectedType;
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.impactAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  const featuredPartners = partners.filter(partner => partner.featured);
  const totalVolunteers = partners.reduce((sum, partner) => sum + partner.volunteersEngaged, 0);
  const totalHours = partners.reduce((sum, partner) => sum + partner.hoursContributed, 0);
  const totalEvents = partners.reduce((sum, partner) => sum + partner.eventsHosted, 0);

  const getTypeColor = (type: Partner['type']) => {
    const colors = {
      government: 'bg-blue-100 text-blue-800',
      corporate: 'bg-purple-100 text-purple-800',
      ngo: 'bg-green-100 text-green-800',
      educational: 'bg-orange-100 text-orange-800',
      international: 'bg-red-100 text-red-800'
    };
    return colors[type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Our Partners</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Working together with leading organizations across the UAE to create meaningful volunteer opportunities and lasting community impact
          </p>
        </div>

        {/* Partnership Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Handshake className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{partners.length}</div>
              <div className="text-sm text-gray-600">Active Partners</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{totalVolunteers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Volunteers Engaged</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{totalEvents}</div>
              <div className="text-sm text-gray-600">Events Hosted</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">{(totalHours / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Hours Contributed</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Partners */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Featured Partners</span>
            </CardTitle>
            <CardDescription>Our key strategic partners driving significant community impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredPartners.map(partner => (
                <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                        <Badge className={getTypeColor(partner.type)}>
                          {partner.type.charAt(0).toUpperCase() + partner.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{partner.description}</p>
                    
                    <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-600 mb-4">
                      <div>
                        <div className="font-semibold text-gray-900">{partner.eventsHosted}</div>
                        <div>Events</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{partner.volunteersEngaged.toLocaleString()}</div>
                        <div>Volunteers</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{(partner.hoursContributed / 1000).toFixed(0)}K</div>
                        <div>Hours</div>
                      </div>
                    </div>

                    {partner.testimonial && (
                      <blockquote className="text-sm italic text-gray-700 border-l-4 border-blue-200 pl-3 mb-4">
                        "{partner.testimonial}"
                      </blockquote>
                    )}
                    
                    <Button size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search partners by name, description, or impact areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {partnerTypes.map(type => (
                  <Button
                    key={type.id}
                    variant={selectedType === type.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType(type.id)}
                    className="flex items-center space-x-2"
                  >
                    {type.icon}
                    <span>{type.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Partners */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Partners ({filteredPartners.length})
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {filteredPartners.map(partner => (
              <Card key={partner.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                        <Badge className={getTypeColor(partner.type)}>
                          {partner.type.charAt(0).toUpperCase() + partner.type.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{partner.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {partner.impactAreas.map((area, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-center text-sm mb-4">
                    <div>
                      <div className="font-semibold text-gray-900">{partner.eventsHosted}</div>
                      <div className="text-xs text-gray-600">Events</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{partner.volunteersEngaged.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Volunteers</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{(partner.hoursContributed / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-600">Hours</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {new Date().getFullYear() - new Date(partner.partnershipSince).getFullYear()}
                      </div>
                      <div className="text-xs text-gray-600">Years</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{partner.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Contact: {partner.contactPerson}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Partner since {new Date(partner.partnershipSince).getFullYear()}</span>
                    </div>
                  </div>

                  {partner.achievements.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Achievements</h4>
                      <div className="space-y-1">
                        {partner.achievements.slice(0, 2).map((achievement, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                            <Award className="h-3 w-3 text-yellow-500" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Become a Partner</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Join our network of leading organizations and amplify your community impact through strategic volunteer partnerships
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Target className="h-12 w-12 mx-auto mb-3 opacity-90" />
                  <h3 className="text-lg font-semibold mb-2">Expand Your Reach</h3>
                  <p className="text-sm opacity-80">Access our network of 47,000+ skilled volunteers</p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 mx-auto mb-3 opacity-90" />
                  <h3 className="text-lg font-semibold mb-2">Streamline Operations</h3>
                  <p className="text-sm opacity-80">Use our platform to manage events and track impact</p>
                </div>
                <div className="text-center">
                  <Award className="h-12 w-12 mx-auto mb-3 opacity-90" />
                  <h3 className="text-lg font-semibold mb-2">Measure Impact</h3>
                  <p className="text-sm opacity-80">Get detailed analytics and impact reporting</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <Button size="lg" variant="secondary">
                  <Handshake className="h-5 w-5 mr-2" />
                  Become a Partner
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Partnerships Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}