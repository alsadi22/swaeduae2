import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Award, Calendar, Download, Search, Filter, Share2, 
  ExternalLink, Eye, CheckCircle, Star, Trophy, 
  Medal, Crown, Zap, Target, BarChart3, TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Certificate {
  id: number;
  title: string;
  organization: string;
  organizationLogo: string;
  type: 'completion' | 'milestone' | 'achievement' | 'recognition';
  category: string;
  issuedDate: string;
  hours: number;
  description: string;
  certificateNumber: string;
  skills: string[];
  verified: boolean;
  shared: boolean;
  downloads: number;
  linkedInShared: boolean;
}

export default function Certificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedCertificates, setSelectedCertificates] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock certificates data
  const certificates: Certificate[] = [
    {
      id: 1,
      title: '50 Hours Milestone Achievement',
      organization: 'SwaedUAE Platform',
      organizationLogo: '/api/placeholder/60/60',
      type: 'milestone',
      category: 'General',
      issuedDate: '2024-03-15',
      hours: 50,
      description: 'Recognizing exceptional dedication with 50+ volunteer hours',
      certificateNumber: 'SWD-MLS-50-2024-001234',
      skills: ['Commitment', 'Community Service', 'Leadership'],
      verified: true,
      shared: true,
      downloads: 12,
      linkedInShared: true
    },
    {
      id: 2,
      title: 'Environmental Conservation Champion',
      organization: 'Emirates Environmental Group',
      organizationLogo: '/api/placeholder/60/60',
      type: 'achievement',
      category: 'Environment',
      issuedDate: '2024-03-10',
      hours: 25,
      description: 'Outstanding contribution to environmental protection initiatives',
      certificateNumber: 'EEG-ENV-2024-005678',
      skills: ['Environmental Awareness', 'Project Management', 'Teamwork'],
      verified: true,
      shared: false,
      downloads: 8,
      linkedInShared: false
    },
    {
      id: 3,
      title: 'Community Service Excellence',
      organization: 'UAE Red Crescent',
      organizationLogo: '/api/placeholder/60/60',
      type: 'recognition',
      category: 'Community Service',
      issuedDate: '2024-02-28',
      hours: 35,
      description: 'Exceptional service in community outreach programs',
      certificateNumber: 'URC-COM-2024-009876',
      skills: ['Communication', 'Empathy', 'Cultural Sensitivity'],
      verified: true,
      shared: true,
      downloads: 15,
      linkedInShared: true
    },
    {
      id: 4,
      title: 'Youth Education Program Completion',
      organization: 'Dubai Public Library',
      organizationLogo: '/api/placeholder/60/60',
      type: 'completion',
      category: 'Education',
      issuedDate: '2024-02-15',
      hours: 20,
      description: 'Successful completion of youth literacy program',
      certificateNumber: 'DPL-EDU-2024-012345',
      skills: ['Teaching', 'Patience', 'Creativity'],
      verified: true,
      shared: false,
      downloads: 5,
      linkedInShared: false
    },
    {
      id: 5,
      title: '100 Hours Milestone Achievement',
      organization: 'SwaedUAE Platform',
      organizationLogo: '/api/placeholder/60/60',
      type: 'milestone',
      category: 'General',
      issuedDate: '2024-01-20',
      hours: 100,
      description: 'Remarkable dedication achieving 100+ volunteer hours',
      certificateNumber: 'SWD-MLS-100-2024-001235',
      skills: ['Dedication', 'Leadership', 'Community Impact'],
      verified: true,
      shared: true,
      downloads: 25,
      linkedInShared: true
    }
  ];

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = searchQuery === '' || 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || cert.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || cert.category === categoryFilter;
    
    const matchesTab = selectedTab === 'all' || 
      (selectedTab === 'shared' && cert.shared) ||
      (selectedTab === 'milestones' && cert.type === 'milestone') ||
      (selectedTab === 'achievements' && cert.type === 'achievement');

    return matchesSearch && matchesType && matchesCategory && matchesTab;
  });

  // Statistics
  const totalCertificates = certificates.length;
  const totalHours = certificates.reduce((sum, cert) => sum + cert.hours, 0);
  const sharedCertificates = certificates.filter(cert => cert.shared).length;
  const totalDownloads = certificates.reduce((sum, cert) => sum + cert.downloads, 0);

  const getCertificateIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return <Trophy className="h-5 w-5 text-yellow-600" />;
      case 'achievement':
        return <Medal className="h-5 w-5 text-blue-600" />;
      case 'recognition':
        return <Crown className="h-5 w-5 text-purple-600" />;
      case 'completion':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Award className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      milestone: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      achievement: 'bg-blue-100 text-blue-800 border-blue-200',
      recognition: 'bg-purple-100 text-purple-800 border-purple-200',
      completion: 'bg-green-100 text-green-800 border-green-200'
    };
    return <Badge className={colors[type as keyof typeof colors]}>{type}</Badge>;
  };

  const handleSelectCertificate = (certId: number) => {
    setSelectedCertificates(prev => 
      prev.includes(certId) 
        ? prev.filter(id => id !== certId)
        : [...prev, certId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCertificates.length === filteredCertificates.length) {
      setSelectedCertificates([]);
    } else {
      setSelectedCertificates(filteredCertificates.map(cert => cert.id));
    }
  };

  const handleBulkDownload = () => {
    alert(`Downloading ${selectedCertificates.length} certificates as ZIP file...`);
  };

  const handleBulkShare = () => {
    alert(`Sharing ${selectedCertificates.length} certificates to LinkedIn...`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
            <p className="text-gray-600">Manage and share your volunteer achievements</p>
          </div>
          <div className="flex items-center space-x-2">
            {selectedCertificates.length > 0 && (
              <>
                <Button variant="outline" onClick={handleBulkDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download ({selectedCertificates.length})
                </Button>
                <Button variant="outline" onClick={handleBulkShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share to LinkedIn
                </Button>
              </>
            )}
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                  <p className="text-3xl font-bold text-gray-900">{totalCertificates}</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">All achievements earned</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Hours</p>
                  <p className="text-3xl font-bold text-green-600">{totalHours}</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Hours represented</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Shared</p>
                  <p className="text-3xl font-bold text-purple-600">{sharedCertificates}</p>
                </div>
                <Share2 className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Public certificates</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Downloads</p>
                  <p className="text-3xl font-bold text-orange-600">{totalDownloads}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Total downloads</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Certificates</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search certificates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="milestone">Milestones</SelectItem>
                      <SelectItem value="achievement">Achievements</SelectItem>
                      <SelectItem value="recognition">Recognition</SelectItem>
                      <SelectItem value="completion">Completion</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Environment">Environment</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Community Service">Community Service</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedCertificates.length === filteredCertificates.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <span className="text-sm text-gray-600">Select All</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificates Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((certificate) => (
                <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedCertificates.includes(certificate.id)}
                          onCheckedChange={() => handleSelectCertificate(certificate.id)}
                        />
                        {getCertificateIcon(certificate.type)}
                      </div>
                      <div className="flex items-center space-x-1">
                        {certificate.verified && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {certificate.shared && (
                          <Share2 className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={certificate.organizationLogo} alt={certificate.organization} />
                        <AvatarFallback>{certificate.organization.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {certificate.title}
                        </h3>
                        <p className="text-sm text-gray-600">{certificate.organization}</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        {getTypeBadge(certificate.type)}
                        <Badge variant="outline">{certificate.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{formatDate(certificate.issuedDate)}</span>
                        <span>{certificate.hours} hours</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {certificate.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {certificate.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {certificate.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{certificate.skills.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Link to={`/certificates/${certificate.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                      <div className="text-xs text-gray-500">
                        {certificate.downloads} downloads
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCertificates.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchQuery || typeFilter !== 'all' || categoryFilter !== 'all' 
                      ? 'Try adjusting your filters to see more results.'
                      : 'Start volunteering to earn your first certificate!'
                    }
                  </p>
                  <Link to="/opportunities">
                    <Button>Find Opportunities</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-900 mb-2">Share Your Achievements</h3>
                <p className="text-blue-700 text-sm">
                  Showcase your volunteer work on professional networks and build your portfolio.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="border-blue-300 text-blue-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  LinkedIn Portfolio
                </Button>
                <Button variant="outline" className="border-blue-300 text-blue-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Public Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}