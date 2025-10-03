import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, Plus, Search, Filter, Download, Share2,
  Eye, Edit, Copy, Trash2, MoreHorizontal,
  Calendar, User, FileText, CheckCircle, AlertCircle,
  TrendingUp, Users, Clock, Star
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Certificate {
  id: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerAvatar?: string;
  eventTitle: string;
  eventId: string;
  hours: number;
  issueDate: string;
  certificateNumber: string;
  templateId: string;
  templateName: string;
  status: 'issued' | 'pending' | 'revoked';
  downloadCount: number;
  sharedCount: number;
  issuedBy: string;
  verificationCode: string;
  expiryDate?: string;
  skills: string[];
  achievements: string[];
}

interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  preview: string;
}

export default function OrgCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      volunteerName: 'Ahmed Al-Mansouri',
      volunteerEmail: 'ahmed@example.com',
      volunteerAvatar: '/api/placeholder/40/40',
      eventTitle: 'Beach Cleanup Drive',
      eventId: 'event-1',
      hours: 4,
      issueDate: '2024-03-20',
      certificateNumber: 'DCF-2024-001',
      templateId: 'template-1',
      templateName: 'Environmental Impact Certificate',
      status: 'issued',
      downloadCount: 3,
      sharedCount: 1,
      issuedBy: 'Sarah Ahmed',
      verificationCode: 'VER-ABC123',
      skills: ['Environmental Conservation', 'Community Service'],
      achievements: ['Beach Cleanup Champion', 'Waste Reduction Advocate']
    },
    {
      id: '2',
      volunteerName: 'Fatima Hassan',
      volunteerEmail: 'fatima@example.com',
      eventTitle: 'Food Distribution',
      eventId: 'event-2',
      hours: 3,
      issueDate: '2024-03-19',
      certificateNumber: 'DCF-2024-002',
      templateId: 'template-2',
      templateName: 'Community Service Certificate',
      status: 'issued',
      downloadCount: 2,
      sharedCount: 2,
      issuedBy: 'Ahmed Al-Mansouri',
      verificationCode: 'VER-DEF456',
      skills: ['Food Service', 'Community Outreach'],
      achievements: ['Hunger Relief Supporter']
    },
    {
      id: '3',
      volunteerName: 'Mohammed Ali',
      volunteerEmail: 'mohammed@example.com',
      eventTitle: 'Tree Planting Initiative',
      eventId: 'event-3',
      hours: 5,
      issueDate: '2024-03-18',
      certificateNumber: 'DCF-2024-003',
      templateId: 'template-1',
      templateName: 'Environmental Impact Certificate',
      status: 'pending',
      downloadCount: 0,
      sharedCount: 0,
      issuedBy: 'Sarah Ahmed',
      verificationCode: 'VER-GHI789',
      skills: ['Gardening', 'Environmental Conservation'],
      achievements: ['Green Warrior', 'Tree Planting Expert']
    }
  ]);

  const [templates, setTemplates] = useState<CertificateTemplate[]>([
    {
      id: 'template-1',
      name: 'Environmental Impact Certificate',
      description: 'For volunteers participating in environmental conservation activities',
      category: 'Environment',
      isActive: true,
      usageCount: 15,
      createdAt: '2024-01-15',
      updatedAt: '2024-03-10',
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'template-2',
      name: 'Community Service Certificate',
      description: 'General certificate for community service activities',
      category: 'Community',
      isActive: true,
      usageCount: 28,
      createdAt: '2024-01-20',
      updatedAt: '2024-03-05',
      preview: '/api/placeholder/300/400'
    },
    {
      id: 'template-3',
      name: 'Youth Development Certificate',
      description: 'For volunteers working with youth programs',
      category: 'Education',
      isActive: false,
      usageCount: 7,
      createdAt: '2024-02-01',
      updatedAt: '2024-02-15',
      preview: '/api/placeholder/300/400'
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('certificates');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [templateFilter, setTemplateFilter] = useState('all');

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.volunteerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || cert.status === statusFilter;
    const matchesTemplate = templateFilter === 'all' || cert.templateId === templateFilter;
    
    return matchesSearch && matchesStatus && matchesTemplate;
  });

  const getStatusBadge = (status: Certificate['status']) => {
    const statusConfig = {
      issued: { label: 'Issued', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      revoked: { label: 'Revoked', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleRevokeCertificate = (certificateId: string) => {
    if (confirm('Are you sure you want to revoke this certificate? This action cannot be undone.')) {
      setCertificates(prev => prev.map(cert => 
        cert.id === certificateId 
          ? { ...cert, status: 'revoked' as const }
          : cert
      ));
      alert('Certificate revoked successfully.');
    }
  };

  const handleBulkIssue = () => {
    const pendingCerts = certificates.filter(cert => cert.status === 'pending');
    if (pendingCerts.length === 0) {
      alert('No pending certificates to issue.');
      return;
    }

    setCertificates(prev => prev.map(cert => 
      cert.status === 'pending' 
        ? { ...cert, status: 'issued' as const }
        : cert
    ));
    alert(`${pendingCerts.length} certificates issued successfully.`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const stats = {
    total: certificates.length,
    issued: certificates.filter(c => c.status === 'issued').length,
    pending: certificates.filter(c => c.status === 'pending').length,
    revoked: certificates.filter(c => c.status === 'revoked').length,
    totalDownloads: certificates.reduce((sum, cert) => sum + cert.downloadCount, 0),
    totalShares: certificates.reduce((sum, cert) => sum + cert.sharedCount, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Certificate Management</h1>
            <p className="text-gray-600">Issue and manage volunteer certificates</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Link to="/org/certificates/issue">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Issue Certificates
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Certificates</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.issued}</div>
              <div className="text-sm text-gray-600">Issued</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.revoked}</div>
              <div className="text-sm text-gray-600">Revoked</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Download className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalDownloads}</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Share2 className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalShares}</div>
              <div className="text-sm text-gray-600">Shares</div>
            </CardContent>
          </Card>
        </div>

        {/* Certificate Management Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="certificates">Certificates ({stats.total})</TabsTrigger>
            <TabsTrigger value="templates">Templates ({templates.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="certificates" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search certificates..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                      <SelectItem value="issued">Issued</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="revoked">Revoked</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={templateFilter} onValueChange={setTemplateFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Templates</SelectItem>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {stats.pending > 0 && (
                    <Button onClick={handleBulkIssue} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Issue All Pending ({stats.pending})
                    </Button>
                  )}

                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Certificates List */}
            <div className="space-y-4">
              {filteredCertificates.length > 0 ? (
                filteredCertificates.map((certificate) => (
                  <Card key={certificate.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {certificate.volunteerName}
                            </h3>
                            {getStatusBadge(certificate.status)}
                            <Badge variant="outline" className="text-xs">
                              {certificate.certificateNumber}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4" />
                                <span><strong>Event:</strong> {certificate.eventTitle}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span><strong>Hours:</strong> {certificate.hours}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span><strong>Issued:</strong> {formatDate(certificate.issueDate)}</span>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Award className="h-4 w-4" />
                                <span><strong>Template:</strong> {certificate.templateName}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="h-4 w-4" />
                                <span><strong>Issued by:</strong> {certificate.issuedBy}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4" />
                                <span><strong>Downloads:</strong> {certificate.downloadCount} | <strong>Shares:</strong> {certificate.sharedCount}</span>
                              </div>
                            </div>
                          </div>

                          {/* Skills and Achievements */}
                          <div className="space-y-2">
                            {certificate.skills.length > 0 && (
                              <div>
                                <span className="text-sm font-medium text-gray-700 mr-2">Skills:</span>
                                <div className="inline-flex flex-wrap gap-1">
                                  {certificate.skills.map((skill, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {certificate.achievements.length > 0 && (
                              <div>
                                <span className="text-sm font-medium text-gray-700 mr-2">Achievements:</span>
                                <div className="inline-flex flex-wrap gap-1">
                                  {certificate.achievements.map((achievement, index) => (
                                    <Badge key={index} variant="outline" className="text-xs text-yellow-700 border-yellow-300">
                                      <Star className="h-3 w-3 mr-1" />
                                      {achievement}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>

                          {certificate.status === 'issued' && (
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          )}

                          {certificate.status === 'pending' && (
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Issue
                            </Button>
                          )}

                          {certificate.status === 'issued' && (
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeCertificate(certificate.id)}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              Revoke
                            </Button>
                          )}

                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || statusFilter !== 'all' || templateFilter !== 'all'
                        ? 'Try adjusting your search or filters.'
                        : 'Issue your first certificate to get started.'
                      }
                    </p>
                    {!searchTerm && statusFilter === 'all' && templateFilter === 'all' && (
                      <Link to="/org/certificates/issue">
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Issue First Certificate
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Certificate Templates</h2>
              <Link to="/org/certificates/templates">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <img 
                        src={template.preview} 
                        alt={template.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{template.name}</h3>
                        <Badge className={template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}>
                          {template.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600">{template.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Used {template.usageCount} times</span>
                        <span>Updated {formatDate(template.updatedAt)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certificate Issuance Trends</CardTitle>
                  <CardDescription>Monthly certificate issuance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Certificate issuance chart would be displayed here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Usage</CardTitle>
                  <CardDescription>Most popular certificate templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-gray-600">{template.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{template.usageCount}</p>
                          <p className="text-sm text-gray-600">certificates</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Download & Share Stats</CardTitle>
                  <CardDescription>Certificate engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Downloads</span>
                      <span className="font-semibold">{stats.totalDownloads}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Shares</span>
                      <span className="font-semibold">{stats.totalShares}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Avg Downloads per Certificate</span>
                      <span className="font-semibold">
                        {stats.total > 0 ? (stats.totalDownloads / stats.total).toFixed(1) : '0'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Share Rate</span>
                      <span className="font-semibold">
                        {stats.totalDownloads > 0 ? ((stats.totalShares / stats.totalDownloads) * 100).toFixed(1) : '0'}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Verification Activity</CardTitle>
                  <CardDescription>Certificate verification requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-32 flex items-center justify-center text-gray-500">
                    Verification activity chart would be displayed here
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}