import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Download, Eye, BookOpen, FileText, Video, Image,
  Users, Award, Shield, Heart, Leaf, Briefcase, Star, Clock,
  Filter, Share2, Bookmark, ExternalLink, Play, Calendar
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'template' | 'video' | 'infographic' | 'checklist' | 'policy';
  category: string;
  tags: string[];
  downloadUrl: string;
  viewUrl?: string;
  thumbnail: string;
  fileSize?: string;
  duration?: string;
  downloadCount: number;
  rating: number;
  lastUpdated: string;
  featured: boolean;
}

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Complete Volunteer Onboarding Guide',
      description: 'Comprehensive guide for new volunteers covering registration, safety protocols, and best practices',
      type: 'guide',
      category: 'Getting Started',
      tags: ['onboarding', 'safety', 'best-practices', 'new-volunteers'],
      downloadUrl: '/resources/volunteer-onboarding-guide.pdf',
      viewUrl: '/resources/view/volunteer-onboarding-guide',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '2.4 MB',
      downloadCount: 1247,
      rating: 4.8,
      lastUpdated: '2024-03-15',
      featured: true
    },
    {
      id: '2',
      title: 'Event Planning Checklist',
      description: 'Step-by-step checklist for organizations planning volunteer events',
      type: 'checklist',
      category: 'Event Management',
      tags: ['planning', 'checklist', 'organization', 'events'],
      downloadUrl: '/resources/event-planning-checklist.pdf',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '1.2 MB',
      downloadCount: 892,
      rating: 4.7,
      lastUpdated: '2024-03-10',
      featured: true
    },
    {
      id: '3',
      title: 'Volunteer Safety Training Video',
      description: 'Essential safety training for all volunteers participating in outdoor activities',
      type: 'video',
      category: 'Safety & Training',
      tags: ['safety', 'training', 'outdoor', 'video'],
      downloadUrl: '/resources/safety-training-video.mp4',
      viewUrl: '/resources/watch/safety-training',
      thumbnail: '/api/placeholder/300/200',
      duration: '15:30',
      downloadCount: 2156,
      rating: 4.9,
      lastUpdated: '2024-03-20',
      featured: true
    },
    {
      id: '4',
      title: 'Environmental Impact Assessment Template',
      description: 'Template for measuring and reporting environmental impact of volunteer activities',
      type: 'template',
      category: 'Environment',
      tags: ['environment', 'impact', 'assessment', 'template'],
      downloadUrl: '/resources/environmental-impact-template.xlsx',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '856 KB',
      downloadCount: 634,
      rating: 4.6,
      lastUpdated: '2024-03-08',
      featured: false
    },
    {
      id: '5',
      title: 'Volunteer Recognition Certificate Templates',
      description: 'Professional certificate templates for recognizing volunteer contributions',
      type: 'template',
      category: 'Recognition',
      tags: ['certificates', 'recognition', 'templates', 'awards'],
      downloadUrl: '/resources/certificate-templates.zip',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '5.2 MB',
      downloadCount: 1789,
      rating: 4.8,
      lastUpdated: '2024-03-12',
      featured: false
    },
    {
      id: '6',
      title: 'Community Engagement Best Practices',
      description: 'Infographic showing proven strategies for effective community engagement',
      type: 'infographic',
      category: 'Community',
      tags: ['community', 'engagement', 'best-practices', 'infographic'],
      downloadUrl: '/resources/community-engagement-infographic.png',
      viewUrl: '/resources/view/community-engagement',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '3.1 MB',
      downloadCount: 945,
      rating: 4.5,
      lastUpdated: '2024-03-05',
      featured: false
    },
    {
      id: '7',
      title: 'Child Protection Policy Template',
      description: 'Comprehensive child protection policy template for organizations working with minors',
      type: 'policy',
      category: 'Policies',
      tags: ['child-protection', 'policy', 'safeguarding', 'minors'],
      downloadUrl: '/resources/child-protection-policy.pdf',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '1.8 MB',
      downloadCount: 567,
      rating: 4.9,
      lastUpdated: '2024-03-18',
      featured: false
    },
    {
      id: '8',
      title: 'Digital Volunteer Management Guide',
      description: 'Complete guide to using digital tools for volunteer coordination and management',
      type: 'guide',
      category: 'Technology',
      tags: ['digital', 'management', 'technology', 'coordination'],
      downloadUrl: '/resources/digital-management-guide.pdf',
      viewUrl: '/resources/view/digital-management',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '4.7 MB',
      downloadCount: 723,
      rating: 4.7,
      lastUpdated: '2024-03-14',
      featured: false
    },
    {
      id: '9',
      title: 'Emergency Response Procedures',
      description: 'Step-by-step emergency response procedures for volunteer events',
      type: 'guide',
      category: 'Emergency',
      tags: ['emergency', 'response', 'procedures', 'safety'],
      downloadUrl: '/resources/emergency-procedures.pdf',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '2.1 MB',
      downloadCount: 1123,
      rating: 4.8,
      lastUpdated: '2024-03-16',
      featured: false
    },
    {
      id: '10',
      title: 'Volunteer Feedback Survey Template',
      description: 'Customizable survey template for collecting volunteer feedback and satisfaction data',
      type: 'template',
      category: 'Feedback',
      tags: ['feedback', 'survey', 'satisfaction', 'template'],
      downloadUrl: '/resources/feedback-survey-template.docx',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '645 KB',
      downloadCount: 834,
      rating: 4.4,
      lastUpdated: '2024-03-11',
      featured: false
    },
    {
      id: '11',
      title: 'How to Use SwaedUAE Platform',
      description: 'Video tutorial covering all features of the SwaedUAE volunteer platform',
      type: 'video',
      category: 'Platform Guide',
      tags: ['platform', 'tutorial', 'features', 'how-to'],
      downloadUrl: '/resources/platform-tutorial.mp4',
      viewUrl: '/resources/watch/platform-tutorial',
      thumbnail: '/api/placeholder/300/200',
      duration: '22:45',
      downloadCount: 2847,
      rating: 4.9,
      lastUpdated: '2024-03-22',
      featured: true
    },
    {
      id: '12',
      title: 'UAE Volunteer Laws and Regulations',
      description: 'Overview of UAE laws and regulations governing volunteer activities',
      type: 'guide',
      category: 'Legal',
      tags: ['legal', 'regulations', 'uae', 'compliance'],
      downloadUrl: '/resources/uae-volunteer-laws.pdf',
      thumbnail: '/api/placeholder/300/200',
      fileSize: '3.3 MB',
      downloadCount: 456,
      rating: 4.6,
      lastUpdated: '2024-03-09',
      featured: false
    }
  ];

  const categories = [
    'all', 'Getting Started', 'Event Management', 'Safety & Training', 'Environment',
    'Recognition', 'Community', 'Policies', 'Technology', 'Emergency', 'Feedback',
    'Platform Guide', 'Legal'
  ];

  const resourceTypes = [
    'all', 'guide', 'template', 'video', 'infographic', 'checklist', 'policy'
  ];

  const getTypeIcon = (type: Resource['type']) => {
    const icons = {
      guide: <BookOpen className="h-4 w-4" />,
      template: <FileText className="h-4 w-4" />,
      video: <Video className="h-4 w-4" />,
      infographic: <Image className="h-4 w-4" />,
      checklist: <Shield className="h-4 w-4" />,
      policy: <Award className="h-4 w-4" />
    };
    return icons[type];
  };

  const getTypeColor = (type: Resource['type']) => {
    const colors = {
      guide: 'bg-blue-100 text-blue-800',
      template: 'bg-green-100 text-green-800',
      video: 'bg-red-100 text-red-800',
      infographic: 'bg-purple-100 text-purple-800',
      checklist: 'bg-orange-100 text-orange-800',
      policy: 'bg-gray-100 text-gray-800'
    };
    return colors[type];
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const featuredResources = resources.filter(resource => resource.featured);

  const handleDownload = (resource: Resource) => {
    // Simulate download
    alert(`Downloading ${resource.title}...`);
  };

  const handleView = (resource: Resource) => {
    if (resource.viewUrl) {
      // Simulate opening view
      alert(`Opening ${resource.title} for viewing...`);
    }
  };

  const handleBookmark = (resourceId: string) => {
    // Simulate bookmark
    alert('Resource bookmarked!');
  };

  const handleShare = (resource: Resource) => {
    // Simulate sharing
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href + `#resource-${resource.id}`
      });
    } else {
      alert('Resource link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Resource Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access guides, templates, training materials, and tools to enhance your volunteer experience
          </p>
        </div>

        {/* Featured Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Featured Resources</span>
            </CardTitle>
            <CardDescription>Most popular and essential resources for volunteers and organizations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map(resource => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className={getTypeColor(resource.type)}>
                        <div className="flex items-center space-x-1">
                          {getTypeIcon(resource.type)}
                          <span className="capitalize">{resource.type}</span>
                        </div>
                      </Badge>
                    </div>
                    {resource.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <Play className="h-6 w-6 text-white ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{resource.downloadCount}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{resource.rating}</span>
                        </span>
                      </div>
                      <span>{resource.fileSize || resource.duration}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button size="sm" onClick={() => handleDownload(resource)}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      {resource.viewUrl && (
                        <Button variant="outline" size="sm" onClick={() => handleView(resource)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search resources by title, description, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    {resourceTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            All Resources ({filteredResources.length})
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map(resource => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2">
                  <Badge className={getTypeColor(resource.type)}>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(resource.type)}
                      <span className="capitalize">{resource.type}</span>
                    </div>
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 bg-white bg-opacity-80 hover:bg-opacity-100"
                    onClick={() => handleBookmark(resource.id)}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
                {resource.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    </div>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{resource.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {resource.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{resource.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>{resource.downloadCount}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{resource.rating}</span>
                      </span>
                    </div>
                    <span>{resource.fileSize || resource.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Updated {new Date(resource.lastUpdated).toLocaleDateString()}</span>
                    <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button size="sm" className="flex-1" onClick={() => handleDownload(resource)}>
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => handleShare(resource)}
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                    {resource.viewUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => handleView(resource)}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Popular resource categories and tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">For Volunteers</span>
                  </div>
                  <div className="text-sm text-gray-500">Guides and training materials</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <Briefcase className="h-4 w-4 text-green-600" />
                    <span className="font-medium">For Organizations</span>
                  </div>
                  <div className="text-sm text-gray-500">Management tools and templates</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <Shield className="h-4 w-4 text-red-600" />
                    <span className="font-medium">Safety Resources</span>
                  </div>
                  <div className="text-sm text-gray-500">Training and safety protocols</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span className="font-medium">Policies & Legal</span>
                  </div>
                  <div className="text-sm text-gray-500">Compliance and legal documents</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}