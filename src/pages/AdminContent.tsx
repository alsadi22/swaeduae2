import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, Search, Filter, MoreHorizontal, Eye, Edit, Plus,
  CheckCircle, XCircle, AlertTriangle, Calendar, Globe, ArrowLeft,
  Download, MessageSquare, Save, Trash2, Copy, Image, Video,
  Link as LinkIcon, Type, Layout, Code, Languages
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentPage {
  id: string;
  title: string;
  slug: string;
  type: 'page' | 'post' | 'faq' | 'policy' | 'guide' | 'announcement';
  status: 'published' | 'draft' | 'archived' | 'scheduled';
  language: 'en' | 'ar' | 'both';
  content: string;
  excerpt: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  viewCount: number;
  isHomepage: boolean;
  isPublic: boolean;
  requiresAuth: boolean;
  lastEditedBy: string;
  version: number;
  parentId?: string;
  sortOrder: number;
}

export default function AdminContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState<ContentPage | null>(null);
  const [showContentDialog, setShowContentDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [newContent, setNewContent] = useState({
    title: '',
    slug: '',
    type: 'page' as const,
    language: 'en' as const,
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    isPublic: true,
    requiresAuth: false
  });

  // Mock data
  const contentPages: ContentPage[] = [
    {
      id: '1',
      title: 'About SwaedUAE',
      slug: 'about',
      type: 'page',
      status: 'published',
      language: 'both',
      content: `<h1>About SwaedUAE</h1>
      <p>SwaedUAE is the premier volunteer platform in the United Arab Emirates, connecting passionate individuals with meaningful opportunities to make a difference in their communities.</p>
      
      <h2>Our Mission</h2>
      <p>To foster a culture of volunteerism across the UAE by providing a comprehensive platform that connects volunteers with organizations, tracks contributions, and recognizes achievements.</p>
      
      <h2>Our Vision</h2>
      <p>To become the leading volunteer ecosystem in the Middle East, empowering every individual to contribute to their community's growth and development.</p>`,
      excerpt: 'Learn about SwaedUAE, the premier volunteer platform connecting individuals with meaningful opportunities across the UAE.',
      author: 'Admin Team',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-03-20T14:30:00Z',
      publishedAt: '2024-01-16T09:00:00Z',
      seoTitle: 'About SwaedUAE - Premier Volunteer Platform in UAE',
      seoDescription: 'Discover SwaedUAE, the leading volunteer platform in the UAE connecting passionate individuals with meaningful community opportunities.',
      seoKeywords: 'volunteer UAE, community service, SwaedUAE, volunteering platform',
      featuredImage: '/images/about-hero.jpg',
      category: 'Company',
      tags: ['about', 'mission', 'vision', 'company'],
      viewCount: 2847,
      isHomepage: false,
      isPublic: true,
      requiresAuth: false,
      lastEditedBy: 'Sarah Admin',
      version: 3,
      sortOrder: 1
    },
    {
      id: '2',
      title: 'Frequently Asked Questions',
      slug: 'faq',
      type: 'faq',
      status: 'published',
      language: 'both',
      content: `<div class="faq-section">
        <h2>Getting Started</h2>
        <div class="faq-item">
          <h3>How do I register as a volunteer?</h3>
          <p>Registration is simple! Click the "Sign Up" button, fill in your details, verify your email, and complete your profile. You can start browsing opportunities immediately.</p>
        </div>
        
        <div class="faq-item">
          <h3>Is there an age requirement for volunteering?</h3>
          <p>Most opportunities are open to volunteers aged 16 and above. Some specialized events may have different age requirements, which will be clearly stated in the event description.</p>
        </div>
        
        <h2>Events & Opportunities</h2>
        <div class="faq-item">
          <h3>How do I find volunteer opportunities?</h3>
          <p>Browse our opportunities page, use filters to find events that match your interests, location, and availability. You can also set up alerts for new opportunities in your preferred categories.</p>
        </div>
      </div>`,
      excerpt: 'Find answers to common questions about volunteering, registration, events, certificates, and more.',
      author: 'Content Team',
      createdAt: '2024-01-20T11:00:00Z',
      updatedAt: '2024-03-25T16:45:00Z',
      publishedAt: '2024-01-21T08:00:00Z',
      seoTitle: 'FAQ - Frequently Asked Questions | SwaedUAE',
      seoDescription: 'Get answers to common questions about volunteering, registration, events, and certificates on SwaedUAE platform.',
      seoKeywords: 'FAQ, volunteer questions, help, support, SwaedUAE',
      category: 'Support',
      tags: ['faq', 'help', 'questions', 'support'],
      viewCount: 1923,
      isHomepage: false,
      isPublic: true,
      requiresAuth: false,
      lastEditedBy: 'Ahmed Content',
      version: 8,
      sortOrder: 2
    },
    {
      id: '3',
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      type: 'policy',
      status: 'published',
      language: 'both',
      content: `<h1>Privacy Policy</h1>
      <p><strong>Last updated:</strong> March 1, 2024</p>
      
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create an account, register for events, or contact us for support.</p>
      
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
      
      <h2>Information Sharing</h2>
      <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>`,
      excerpt: 'Our privacy policy explains how we collect, use, and protect your personal information on SwaedUAE.',
      author: 'Legal Team',
      createdAt: '2024-02-01T09:00:00Z',
      updatedAt: '2024-03-01T10:30:00Z',
      publishedAt: '2024-02-01T12:00:00Z',
      seoTitle: 'Privacy Policy | SwaedUAE',
      seoDescription: 'Read our privacy policy to understand how SwaedUAE collects, uses, and protects your personal information.',
      seoKeywords: 'privacy policy, data protection, personal information, SwaedUAE',
      category: 'Legal',
      tags: ['privacy', 'policy', 'legal', 'data protection'],
      viewCount: 856,
      isHomepage: false,
      isPublic: true,
      requiresAuth: false,
      lastEditedBy: 'Legal Admin',
      version: 2,
      sortOrder: 10
    },
    {
      id: '4',
      title: 'Volunteer Guide: Getting Started',
      slug: 'volunteer-guide-getting-started',
      type: 'guide',
      status: 'published',
      language: 'en',
      content: `<h1>Getting Started as a Volunteer</h1>
      
      <h2>Step 1: Complete Your Profile</h2>
      <p>After registration, take time to complete your profile with your skills, interests, and availability. This helps us match you with suitable opportunities.</p>
      
      <h2>Step 2: Browse Opportunities</h2>
      <p>Explore our diverse range of volunteer opportunities across different categories like environment, education, healthcare, and community development.</p>
      
      <h2>Step 3: Register for Events</h2>
      <p>Once you find an opportunity that interests you, click "Register" and follow the instructions. Make sure to read all requirements carefully.</p>`,
      excerpt: 'A comprehensive guide to help new volunteers get started on the SwaedUAE platform.',
      author: 'Community Team',
      createdAt: '2024-02-15T14:00:00Z',
      updatedAt: '2024-03-10T11:20:00Z',
      publishedAt: '2024-02-16T08:00:00Z',
      seoTitle: 'Volunteer Guide: Getting Started | SwaedUAE',
      seoDescription: 'Learn how to get started as a volunteer on SwaedUAE with our comprehensive step-by-step guide.',
      seoKeywords: 'volunteer guide, getting started, how to volunteer, SwaedUAE tutorial',
      category: 'Guides',
      tags: ['guide', 'getting started', 'tutorial', 'volunteers'],
      viewCount: 1456,
      isHomepage: false,
      isPublic: true,
      requiresAuth: false,
      lastEditedBy: 'Community Manager',
      version: 4,
      sortOrder: 3
    },
    {
      id: '5',
      title: 'New Partnership with Dubai Municipality',
      slug: 'partnership-dubai-municipality',
      type: 'announcement',
      status: 'scheduled',
      language: 'both',
      content: `<h1>Exciting Partnership Announcement</h1>
      
      <p>We're thrilled to announce our new partnership with Dubai Municipality to launch the "Green Dubai 2024" initiative.</p>
      
      <h2>What This Means for Volunteers</h2>
      <ul>
        <li>New environmental conservation opportunities</li>
        <li>Specialized training programs</li>
        <li>Official recognition from Dubai Municipality</li>
        <li>Enhanced volunteer certificates</li>
      </ul>`,
      excerpt: 'SwaedUAE partners with Dubai Municipality for the Green Dubai 2024 initiative, bringing new opportunities for environmental volunteers.',
      author: 'Communications Team',
      createdAt: '2024-03-25T16:00:00Z',
      updatedAt: '2024-03-25T16:00:00Z',
      scheduledAt: '2024-04-01T09:00:00Z',
      seoTitle: 'New Partnership with Dubai Municipality | SwaedUAE',
      seoDescription: 'SwaedUAE announces exciting partnership with Dubai Municipality for Green Dubai 2024 environmental initiative.',
      seoKeywords: 'Dubai Municipality, partnership, Green Dubai 2024, environmental volunteering',
      category: 'News',
      tags: ['partnership', 'Dubai Municipality', 'environment', 'announcement'],
      viewCount: 0,
      isHomepage: false,
      isPublic: true,
      requiresAuth: false,
      lastEditedBy: 'Communications Manager',
      version: 1,
      sortOrder: 0
    },
    {
      id: '6',
      title: 'Organization Dashboard Help',
      slug: 'organization-dashboard-help',
      type: 'guide',
      status: 'draft',
      language: 'en',
      content: `<h1>Organization Dashboard Guide</h1>
      
      <p>This guide is currently being developed to help organizations make the most of their dashboard features.</p>
      
      <h2>Coming Soon</h2>
      <ul>
        <li>Event management tutorials</li>
        <li>Volunteer communication best practices</li>
        <li>Certificate issuance guidelines</li>
        <li>Analytics and reporting features</li>
      </ul>`,
      excerpt: 'Comprehensive guide for organizations to effectively use their dashboard and manage volunteer programs.',
      author: 'Product Team',
      createdAt: '2024-03-26T10:00:00Z',
      updatedAt: '2024-03-26T10:00:00Z',
      category: 'Guides',
      tags: ['organization', 'dashboard', 'help', 'guide'],
      viewCount: 0,
      isHomepage: false,
      isPublic: false,
      requiresAuth: true,
      lastEditedBy: 'Product Manager',
      version: 1,
      sortOrder: 5
    }
  ];

  const categories = ['Company', 'Support', 'Legal', 'Guides', 'News', 'Resources'];

  const filteredContent = contentPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    const matchesType = typeFilter === 'all' || page.type === typeFilter;
    const matchesLanguage = languageFilter === 'all' || page.language === languageFilter;
    
    return matchesSearch && matchesStatus && matchesType && matchesLanguage;
  });

  const getStatusBadge = (status: ContentPage['status']) => {
    const statusConfig = {
      published: { label: 'Published', className: 'bg-green-100 text-green-800' },
      draft: { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      archived: { label: 'Archived', className: 'bg-yellow-100 text-yellow-800' },
      scheduled: { label: 'Scheduled', className: 'bg-blue-100 text-blue-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeBadge = (type: ContentPage['type']) => {
    const typeConfig = {
      page: { label: 'Page', className: 'bg-blue-100 text-blue-800', icon: <FileText className="h-3 w-3" /> },
      post: { label: 'Post', className: 'bg-purple-100 text-purple-800', icon: <MessageSquare className="h-3 w-3" /> },
      faq: { label: 'FAQ', className: 'bg-orange-100 text-orange-800', icon: <MessageSquare className="h-3 w-3" /> },
      policy: { label: 'Policy', className: 'bg-red-100 text-red-800', icon: <FileText className="h-3 w-3" /> },
      guide: { label: 'Guide', className: 'bg-green-100 text-green-800', icon: <FileText className="h-3 w-3" /> },
      announcement: { label: 'Announcement', className: 'bg-yellow-100 text-yellow-800', icon: <MessageSquare className="h-3 w-3" /> }
    };
    
    const config = typeConfig[type];
    return (
      <Badge variant="outline" className={config.className}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getLanguageBadge = (language: ContentPage['language']) => {
    const languageConfig = {
      en: { label: 'EN', className: 'bg-blue-100 text-blue-800' },
      ar: { label: 'AR', className: 'bg-green-100 text-green-800' },
      both: { label: 'EN/AR', className: 'bg-purple-100 text-purple-800' }
    };
    
    const config = languageConfig[language];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const handleViewContent = (content: ContentPage) => {
    setSelectedContent(content);
    setIsEditing(false);
    setShowContentDialog(true);
  };

  const handleEditContent = (content: ContentPage) => {
    setSelectedContent(content);
    setIsEditing(true);
    setShowContentDialog(true);
  };

  const handleCreateContent = () => {
    setNewContent({
      title: '',
      slug: '',
      type: 'page',
      language: 'en',
      content: '',
      excerpt: '',
      category: '',
      tags: '',
      seoTitle: '',
      seoDescription: '',
      isPublic: true,
      requiresAuth: false
    });
    setShowCreateDialog(true);
  };

  const handleSaveContent = () => {
    if (isEditing && selectedContent) {
      // Simulate saving existing content
      alert(`Content "${selectedContent.title}" has been updated.`);
    } else {
      // Simulate creating new content
      if (newContent.title && newContent.content) {
        alert(`New content "${newContent.title}" has been created.`);
        setShowCreateDialog(false);
      }
    }
  };

  const handlePublishContent = (content: ContentPage) => {
    if (confirm(`Publish "${content.title}"?`)) {
      alert(`Content "${content.title}" has been published.`);
    }
  };

  const handleArchiveContent = (content: ContentPage) => {
    if (confirm(`Archive "${content.title}"?`)) {
      alert(`Content "${content.title}" has been archived.`);
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const stats = {
    total: contentPages.length,
    published: contentPages.filter(p => p.status === 'published').length,
    draft: contentPages.filter(p => p.status === 'draft').length,
    scheduled: contentPages.filter(p => p.status === 'scheduled').length,
    archived: contentPages.filter(p => p.status === 'archived').length,
    totalViews: contentPages.reduce((sum, p) => sum + p.viewCount, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-600">Manage website pages, policies, guides, and announcements</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Content
            </Button>
            <Button onClick={handleCreateContent}>
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Pages</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.published}</div>
              <div className="text-sm text-gray-600">Published</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Edit className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.draft}</div>
              <div className="text-sm text-gray-600">Drafts</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.scheduled}</div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.archived}</div>
              <div className="text-sm text-gray-600">Archived</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search content, titles, slugs..."
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
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="page">Pages</SelectItem>
                  <SelectItem value="post">Posts</SelectItem>
                  <SelectItem value="faq">FAQ</SelectItem>
                  <SelectItem value="policy">Policies</SelectItem>
                  <SelectItem value="guide">Guides</SelectItem>
                  <SelectItem value="announcement">Announcements</SelectItem>
                </SelectContent>
              </Select>

              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content List */}
        <div className="space-y-4">
          {filteredContent.length > 0 ? (
            filteredContent.map((content) => (
              <Card key={content.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
                        {getStatusBadge(content.status)}
                        {getTypeBadge(content.type)}
                        {getLanguageBadge(content.language)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <LinkIcon className="h-4 w-4" />
                            <span><strong>Slug:</strong> /{content.slug}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Type className="h-4 w-4" />
                            <span><strong>Category:</strong> {content.category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span><strong>Updated:</strong> {formatDateTime(content.updatedAt)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Edit className="h-4 w-4" />
                            <span><strong>By:</strong> {content.lastEditedBy}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {content.publishedAt && (
                            <div className="flex items-center space-x-2">
                              <Globe className="h-4 w-4" />
                              <span><strong>Published:</strong> {formatDateTime(content.publishedAt)}</span>
                            </div>
                          )}
                          {content.scheduledAt && (
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span><strong>Scheduled:</strong> {formatDateTime(content.scheduledAt)}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <Eye className="h-4 w-4" />
                            <span><strong>Views:</strong> {content.viewCount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Code className="h-4 w-4" />
                            <span><strong>Version:</strong> {content.version}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {content.tags.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {content.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Excerpt */}
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{content.excerpt}</p>

                      {/* Visibility & Access */}
                      <div className="flex items-center space-x-4 text-xs">
                        <Badge variant="outline" className={content.isPublic ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}>
                          {content.isPublic ? 'Public' : 'Private'}
                        </Badge>
                        {content.requiresAuth && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            Requires Auth
                          </Badge>
                        )}
                        {content.isHomepage && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            Homepage
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewContent(content)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      
                      <Button variant="outline" size="sm" onClick={() => handleEditContent(content)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>

                      {content.status === 'draft' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePublishContent(content)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Publish
                        </Button>
                      )}

                      {content.status === 'published' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleArchiveContent(content)}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Archive
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
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || languageFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'Create your first content page to get started.'
                  }
                </p>
                <Button onClick={handleCreateContent}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Content
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Content Detail/Edit Dialog */}
        <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Content' : 'View Content'}</DialogTitle>
              <DialogDescription>
                {selectedContent && `${isEditing ? 'Edit' : 'View'} "${selectedContent.title}"`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedContent && (
              <div className="space-y-6">
                {!isEditing ? (
                  // View Mode
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Title</Label>
                          <div className="text-lg font-medium">{selectedContent.title}</div>
                        </div>
                        <div>
                          <Label>Slug</Label>
                          <div className="font-mono text-sm">/{selectedContent.slug}</div>
                        </div>
                        <div>
                          <Label>Type & Status</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            {getTypeBadge(selectedContent.type)}
                            {getStatusBadge(selectedContent.status)}
                            {getLanguageBadge(selectedContent.language)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label>Category</Label>
                          <div>{selectedContent.category}</div>
                        </div>
                        <div>
                          <Label>Author</Label>
                          <div>{selectedContent.author}</div>
                        </div>
                        <div>
                          <Label>Last Updated</Label>
                          <div>{formatDateTime(selectedContent.updatedAt)} by {selectedContent.lastEditedBy}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Excerpt</Label>
                      <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                        {selectedContent.excerpt}
                      </div>
                    </div>

                    <div>
                      <Label>Content</Label>
                      <div className="mt-2 p-4 bg-gray-50 rounded border prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: selectedContent.content }} />
                      </div>
                    </div>

                    {selectedContent.tags.length > 0 && (
                      <div>
                        <Label>Tags</Label>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedContent.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SEO Information */}
                    {selectedContent.seoTitle && (
                      <div className="space-y-4">
                        <Label>SEO Information</Label>
                        <div className="grid md:grid-cols-1 gap-4 p-4 bg-blue-50 rounded-lg">
                          <div>
                            <div className="text-sm font-medium text-blue-800">SEO Title</div>
                            <div className="text-sm text-blue-700">{selectedContent.seoTitle}</div>
                          </div>
                          {selectedContent.seoDescription && (
                            <div>
                              <div className="text-sm font-medium text-blue-800">SEO Description</div>
                              <div className="text-sm text-blue-700">{selectedContent.seoDescription}</div>
                            </div>
                          )}
                          {selectedContent.seoKeywords && (
                            <div>
                              <div className="text-sm font-medium text-blue-800">Keywords</div>
                              <div className="text-sm text-blue-700">{selectedContent.seoKeywords}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="editTitle">Title *</Label>
                        <Input
                          id="editTitle"
                          defaultValue={selectedContent.title}
                          placeholder="Content title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="editSlug">Slug *</Label>
                        <Input
                          id="editSlug"
                          defaultValue={selectedContent.slug}
                          placeholder="url-slug"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label>Type</Label>
                        <Select defaultValue={selectedContent.type}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="page">Page</SelectItem>
                            <SelectItem value="post">Post</SelectItem>
                            <SelectItem value="faq">FAQ</SelectItem>
                            <SelectItem value="policy">Policy</SelectItem>
                            <SelectItem value="guide">Guide</SelectItem>
                            <SelectItem value="announcement">Announcement</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Language</Label>
                        <Select defaultValue={selectedContent.language}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select defaultValue={selectedContent.category}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="editExcerpt">Excerpt</Label>
                      <Textarea
                        id="editExcerpt"
                        defaultValue={selectedContent.excerpt}
                        placeholder="Brief description of the content"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="editContent">Content *</Label>
                      <Textarea
                        id="editContent"
                        defaultValue={selectedContent.content}
                        placeholder="Content body (HTML supported)"
                        rows={12}
                        className="font-mono text-sm"
                      />
                    </div>

                    <div>
                      <Label htmlFor="editTags">Tags</Label>
                      <Input
                        id="editTags"
                        defaultValue={selectedContent.tags.join(', ')}
                        placeholder="tag1, tag2, tag3"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowContentDialog(false)}>
                    {isEditing ? 'Cancel' : 'Close'}
                  </Button>
                  {!isEditing && (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Content
                    </Button>
                  )}
                  {isEditing && (
                    <Button onClick={handleSaveContent}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Content Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Content</DialogTitle>
              <DialogDescription>
                Create a new page, post, guide, or other content
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newTitle">Title *</Label>
                  <Input
                    id="newTitle"
                    value={newContent.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setNewContent(prev => ({ 
                        ...prev, 
                        title,
                        slug: generateSlug(title)
                      }));
                    }}
                    placeholder="Content title"
                  />
                </div>
                <div>
                  <Label htmlFor="newSlug">Slug *</Label>
                  <Input
                    id="newSlug"
                    value={newContent.slug}
                    onChange={(e) => setNewContent(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-slug"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select value={newContent.type} onValueChange={(value: ContentPage['type']) => setNewContent(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="page">Page</SelectItem>
                      <SelectItem value="post">Post</SelectItem>
                      <SelectItem value="faq">FAQ</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Language</Label>
                  <Select value={newContent.language} onValueChange={(value: ContentPage['language']) => setNewContent(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Select value={newContent.category} onValueChange={(value) => setNewContent(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="newExcerpt">Excerpt</Label>
                <Textarea
                  id="newExcerpt"
                  value={newContent.excerpt}
                  onChange={(e) => setNewContent(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the content"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="newContent">Content *</Label>
                <Textarea
                  id="newContent"
                  value={newContent.content}
                  onChange={(e) => setNewContent(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Content body (HTML supported)"
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              <div>
                <Label htmlFor="newTags">Tags</Label>
                <Input
                  id="newTags"
                  value={newContent.tags}
                  onChange={(e) => setNewContent(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newSeoTitle">SEO Title</Label>
                  <Input
                    id="newSeoTitle"
                    value={newContent.seoTitle}
                    onChange={(e) => setNewContent(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimized title"
                  />
                </div>
                <div>
                  <Label htmlFor="newSeoDescription">SEO Description</Label>
                  <Input
                    id="newSeoDescription"
                    value={newContent.seoDescription}
                    onChange={(e) => setNewContent(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="SEO meta description"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newIsPublic"
                    checked={newContent.isPublic}
                    onChange={(e) => setNewContent(prev => ({ ...prev, isPublic: e.target.checked }))}
                  />
                  <Label htmlFor="newIsPublic">Public (visible to all users)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="newRequiresAuth"
                    checked={newContent.requiresAuth}
                    onChange={(e) => setNewContent(prev => ({ ...prev, requiresAuth: e.target.checked }))}
                  />
                  <Label htmlFor="newRequiresAuth">Requires Authentication</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button variant="outline" onClick={handleSaveContent}>
                  <Save className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
                <Button onClick={handleSaveContent}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create & Publish
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}