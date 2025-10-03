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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Languages, Search, Filter, MoreHorizontal, Eye, Edit, Plus,
  CheckCircle, XCircle, AlertTriangle, ArrowLeft, Download, Upload,
  Save, RefreshCw, FileText, Globe, Copy, Trash2, Flag
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface TranslationString {
  id: string;
  key: string;
  category: string;
  context: string;
  englishText: string;
  arabicText: string;
  status: 'translated' | 'pending' | 'needs_review' | 'approved';
  lastUpdated: string;
  updatedBy: string;
  notes: string;
  isPlural: boolean;
  pluralForms?: {
    en: { one: string; other: string };
    ar: { zero?: string; one: string; two?: string; few?: string; many?: string; other: string };
  };
  tags: string[];
  characterCount: {
    en: number;
    ar: number;
  };
  usageCount: number;
  locations: string[];
}

interface TranslationStats {
  totalStrings: number;
  translated: number;
  pending: number;
  needsReview: number;
  approved: number;
  completionPercentage: number;
}

export default function AdminTranslations() {
  const [activeTab, setActiveTab] = useState('strings');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedString, setSelectedString] = useState<TranslationString | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock translation statistics
  const stats: TranslationStats = {
    totalStrings: 1247,
    translated: 1089,
    pending: 98,
    needsReview: 45,
    approved: 1015,
    completionPercentage: 87.3
  };

  // Mock translation strings
  const translationStrings: TranslationString[] = [
    {
      id: '1',
      key: 'common.welcome',
      category: 'Common',
      context: 'General welcome message displayed on homepage',
      englishText: 'Welcome to SwaedUAE',
      arabicText: 'مرحباً بكم في سواعد الإمارات',
      status: 'approved',
      lastUpdated: '2024-03-25T14:30:00Z',
      updatedBy: 'Translation Team',
      notes: 'Approved by Arabic language specialist',
      isPlural: false,
      tags: ['homepage', 'greeting'],
      characterCount: { en: 19, ar: 24 },
      usageCount: 156,
      locations: ['Home.tsx', 'Header.tsx', 'WelcomeModal.tsx']
    },
    {
      id: '2',
      key: 'volunteer.hours.count',
      category: 'Volunteer',
      context: 'Display volunteer hours with proper plural forms',
      englishText: '{count} hours',
      arabicText: '{count} ساعات',
      status: 'needs_review',
      lastUpdated: '2024-03-24T16:45:00Z',
      updatedBy: 'Auto Translation',
      notes: 'Needs review for Arabic plural forms',
      isPlural: true,
      pluralForms: {
        en: { one: '{count} hour', other: '{count} hours' },
        ar: { 
          zero: 'لا توجد ساعات',
          one: 'ساعة واحدة', 
          two: 'ساعتان',
          few: '{count} ساعات',
          many: '{count} ساعة',
          other: '{count} ساعات'
        }
      },
      tags: ['hours', 'plural', 'dashboard'],
      characterCount: { en: 13, ar: 12 },
      usageCount: 89,
      locations: ['VolunteerDashboard.tsx', 'HoursCard.tsx', 'ProfileStats.tsx']
    },
    {
      id: '3',
      key: 'events.register.button',
      category: 'Events',
      context: 'Button text for event registration',
      englishText: 'Register for Event',
      arabicText: 'التسجيل في الفعالية',
      status: 'translated',
      lastUpdated: '2024-03-23T11:20:00Z',
      updatedBy: 'Ahmed Translator',
      notes: 'Standard registration button text',
      isPlural: false,
      tags: ['button', 'registration', 'events'],
      characterCount: { en: 18, ar: 17 },
      usageCount: 234,
      locations: ['EventCard.tsx', 'EventDetail.tsx', 'OpportunityDetail.tsx']
    },
    {
      id: '4',
      key: 'certificates.download.success',
      category: 'Certificates',
      context: 'Success message after certificate download',
      englishText: 'Certificate downloaded successfully',
      arabicText: 'تم تحميل الشهادة بنجاح',
      status: 'approved',
      lastUpdated: '2024-03-22T09:15:00Z',
      updatedBy: 'Fatima Reviewer',
      notes: 'Approved - clear and concise message',
      isPlural: false,
      tags: ['success', 'download', 'certificates'],
      characterCount: { en: 32, ar: 21 },
      usageCount: 67,
      locations: ['CertificateDetail.tsx', 'DownloadManager.tsx']
    },
    {
      id: '5',
      key: 'validation.email.invalid',
      category: 'Validation',
      context: 'Error message for invalid email format',
      englishText: 'Please enter a valid email address',
      arabicText: 'يرجى إدخال عنوان بريد إلكتروني صحيح',
      status: 'pending',
      lastUpdated: '2024-03-21T15:30:00Z',
      updatedBy: 'System',
      notes: 'Auto-generated, needs human review',
      isPlural: false,
      tags: ['validation', 'error', 'email'],
      characterCount: { en: 35, ar: 32 },
      usageCount: 145,
      locations: ['LoginForm.tsx', 'RegisterForm.tsx', 'ProfileForm.tsx']
    },
    {
      id: '6',
      key: 'organizations.verification.status',
      category: 'Organizations',
      context: 'Organization verification status labels',
      englishText: 'Verification Status',
      arabicText: 'حالة التحقق',
      status: 'approved',
      lastUpdated: '2024-03-20T13:45:00Z',
      updatedBy: 'Mohammed Reviewer',
      notes: 'Standard terminology for verification',
      isPlural: false,
      tags: ['status', 'verification', 'organizations'],
      characterCount: { en: 19, ar: 11 },
      usageCount: 78,
      locations: ['OrgProfile.tsx', 'AdminOrganizations.tsx', 'VerificationCard.tsx']
    },
    {
      id: '7',
      key: 'navigation.dashboard',
      category: 'Navigation',
      context: 'Dashboard menu item in navigation',
      englishText: 'Dashboard',
      arabicText: 'لوحة التحكم',
      status: 'approved',
      lastUpdated: '2024-03-19T10:20:00Z',
      updatedBy: 'Sarah Translator',
      notes: 'Standard dashboard translation',
      isPlural: false,
      tags: ['navigation', 'menu', 'dashboard'],
      characterCount: { en: 9, ar: 11 },
      usageCount: 312,
      locations: ['Header.tsx', 'Sidebar.tsx', 'MobileNav.tsx']
    },
    {
      id: '8',
      key: 'geofencing.outside.radius',
      category: 'Geofencing',
      context: 'Error when user is outside event geofence',
      englishText: 'You are outside the event location radius',
      arabicText: '',
      status: 'pending',
      lastUpdated: '2024-03-26T14:00:00Z',
      updatedBy: 'System',
      notes: 'New string, needs Arabic translation',
      isPlural: false,
      tags: ['geofencing', 'error', 'location'],
      characterCount: { en: 42, ar: 0 },
      usageCount: 23,
      locations: ['CheckIn.tsx', 'GeofenceValidator.tsx']
    }
  ];

  const categories = [
    'Common', 'Navigation', 'Authentication', 'Events', 'Volunteer', 
    'Organizations', 'Certificates', 'Validation', 'Geofencing', 'Admin'
  ];

  const filteredStrings = translationStrings.filter(str => {
    const matchesSearch = str.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         str.englishText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         str.arabicText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         str.context.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || str.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || str.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: TranslationString['status']) => {
    const statusConfig = {
      translated: { label: 'Translated', className: 'bg-blue-100 text-blue-800' },
      pending: { label: 'Pending', className: 'bg-gray-100 text-gray-800' },
      needs_review: { label: 'Needs Review', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Approved', className: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleEditString = (str: TranslationString) => {
    setSelectedString(str);
    setShowEditDialog(true);
  };

  const handleSaveString = () => {
    if (selectedString) {
      // Simulate saving translation
      alert(`Translation for "${selectedString.key}" has been saved.`);
      setShowEditDialog(false);
      setSelectedString(null);
      setHasUnsavedChanges(false);
    }
  };

  const handleExportTranslations = (format: 'json' | 'csv' | 'xlsx') => {
    // Simulate export
    alert(`Exporting translations as ${format.toUpperCase()}...`);
  };

  const handleImportTranslations = () => {
    setShowImportDialog(true);
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
              <h1 className="text-3xl font-bold text-gray-900">Translation Management</h1>
              <p className="text-gray-600">Manage English and Arabic translations for the platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <Badge variant="destructive">Unsaved Changes</Badge>
            )}
            <Button variant="outline" onClick={handleImportTranslations}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" onClick={() => handleExportTranslations('json')}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Translation Statistics */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Languages className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalStrings}</div>
              <div className="text-sm text-gray-600">Total Strings</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.approved}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.translated}</div>
              <div className="text-sm text-gray-600">Translated</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.needsReview}</div>
              <div className="text-sm text-gray-600">Needs Review</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{stats.completionPercentage}%</div>
              <div className="text-sm text-gray-600">Complete</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${stats.completionPercentage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="strings">Translation Strings</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Translation Strings Tab */}
              <TabsContent value="strings" className="space-y-6">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search translations, keys, context..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="translated">Translated</SelectItem>
                      <SelectItem value="needs_review">Needs Review</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                {/* Translation Strings List */}
                <div className="space-y-4">
                  {filteredStrings.length > 0 ? (
                    filteredStrings.map((str) => (
                      <Card key={str.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 font-mono">{str.key}</h3>
                                {getStatusBadge(str.status)}
                                <Badge variant="outline">{str.category}</Badge>
                                {str.isPlural && (
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                    Plural
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="grid md:grid-cols-2 gap-4 mb-3">
                                <div className="space-y-2">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700">English</Label>
                                    <div className="text-sm bg-gray-50 p-2 rounded border">
                                      {str.englishText || <span className="text-gray-400 italic">Not translated</span>}
                                    </div>
                                    <div className="text-xs text-gray-500">{str.characterCount.en} characters</div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-700">Arabic</Label>
                                    <div className="text-sm bg-gray-50 p-2 rounded border text-right" dir="rtl">
                                      {str.arabicText || <span className="text-gray-400 italic">غير مترجم</span>}
                                    </div>
                                    <div className="text-xs text-gray-500">{str.characterCount.ar} characters</div>
                                  </div>
                                </div>
                              </div>

                              <div className="text-sm text-gray-600 mb-2">
                                <strong>Context:</strong> {str.context}
                              </div>

                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <div>
                                  <span>Used in {str.usageCount} places</span>
                                  <span className="mx-2">•</span>
                                  <span>Updated {formatDateTime(str.lastUpdated)} by {str.updatedBy}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {str.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {str.notes && (
                                <div className="mt-2 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                                  <strong>Notes:</strong> {str.notes}
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 ml-4">
                              <Button variant="outline" size="sm" onClick={() => handleEditString(str)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              
                              <Button variant="outline" size="sm">
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                              </Button>

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
                        <Languages className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No translations found</h3>
                        <p className="text-gray-600">
                          {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                            ? 'Try adjusting your search or filters.'
                            : 'No translation strings have been added yet.'
                          }
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Bulk Operations Tab */}
              <TabsContent value="bulk" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Export Translations</CardTitle>
                      <CardDescription>Download translations in various formats</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleExportTranslations('json')}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export as JSON
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleExportTranslations('csv')}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export as CSV
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => handleExportTranslations('xlsx')}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export as Excel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Import Translations</CardTitle>
                      <CardDescription>Upload translation files to update strings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Importing will overwrite existing translations. Make sure to backup first.
                        </AlertDescription>
                      </Alert>
                      <Button onClick={handleImportTranslations}>
                        <Upload className="h-4 w-4 mr-2" />
                        Import Translations
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Bulk Actions</CardTitle>
                    <CardDescription>Perform actions on multiple translation strings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Button variant="outline">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Selected
                      </Button>
                      <Button variant="outline">
                        <Flag className="h-4 w-4 mr-2" />
                        Mark for Review
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Auto-Translate Missing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Translation Settings</CardTitle>
                      <CardDescription>Configure translation preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Default Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Fallback Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="autoTranslate" defaultChecked />
                        <Label htmlFor="autoTranslate">Enable auto-translation for new strings</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="rtlSupport" defaultChecked />
                        <Label htmlFor="rtlSupport">Enable RTL support for Arabic</Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quality Control</CardTitle>
                      <CardDescription>Translation quality and review settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="requireReview" defaultChecked />
                        <Label htmlFor="requireReview">Require review for auto-translations</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="flagLongText" defaultChecked />
                        <Label htmlFor="flagLongText">Flag translations longer than original</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="validatePlurals" defaultChecked />
                        <Label htmlFor="validatePlurals">Validate plural form completeness</Label>
                      </div>
                      <div className="space-y-2">
                        <Label>Maximum character difference (%)</Label>
                        <Input type="number" defaultValue="50" min="0" max="200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Edit Translation Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Translation</DialogTitle>
              <DialogDescription>
                {selectedString && `Edit translation for "${selectedString.key}"`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedString && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Translation Key</Label>
                    <Input value={selectedString.key} readOnly className="font-mono" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select defaultValue={selectedString.category}>
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
                  <Label>Context</Label>
                  <Textarea
                    defaultValue={selectedString.context}
                    placeholder="Describe where and how this text is used"
                    rows={2}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>English Text</Label>
                      <Textarea
                        defaultValue={selectedString.englishText}
                        placeholder="Enter English text"
                        rows={3}
                      />
                    </div>
                    {selectedString.isPlural && selectedString.pluralForms && (
                      <div className="space-y-2">
                        <Label>English Plural Forms</Label>
                        <div className="space-y-2">
                          <div>
                            <Label className="text-xs">One</Label>
                            <Input defaultValue={selectedString.pluralForms.en.one} />
                          </div>
                          <div>
                            <Label className="text-xs">Other</Label>
                            <Input defaultValue={selectedString.pluralForms.en.other} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Arabic Text</Label>
                      <Textarea
                        defaultValue={selectedString.arabicText}
                        placeholder="أدخل النص العربي"
                        rows={3}
                        dir="rtl"
                        className="text-right"
                      />
                    </div>
                    {selectedString.isPlural && selectedString.pluralForms && (
                      <div className="space-y-2">
                        <Label>Arabic Plural Forms</Label>
                        <div className="space-y-2">
                          <div>
                            <Label className="text-xs">Zero</Label>
                            <Input defaultValue={selectedString.pluralForms.ar.zero} dir="rtl" />
                          </div>
                          <div>
                            <Label className="text-xs">One</Label>
                            <Input defaultValue={selectedString.pluralForms.ar.one} dir="rtl" />
                          </div>
                          <div>
                            <Label className="text-xs">Two</Label>
                            <Input defaultValue={selectedString.pluralForms.ar.two} dir="rtl" />
                          </div>
                          <div>
                            <Label className="text-xs">Few</Label>
                            <Input defaultValue={selectedString.pluralForms.ar.few} dir="rtl" />
                          </div>
                          <div>
                            <Label className="text-xs">Many</Label>
                            <Input defaultValue={selectedString.pluralForms.ar.many} dir="rtl" />
                          </div>
                          <div>
                            <Label className="text-xs">Other</Label>
                            <Input defaultValue={selectedString.pluralForms.ar.other} dir="rtl" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Notes</Label>
                  <Textarea
                    defaultValue={selectedString.notes}
                    placeholder="Add notes about this translation"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <Input
                    defaultValue={selectedString.tags.join(', ')}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <Select defaultValue={selectedString.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="translated">Translated</SelectItem>
                      <SelectItem value="needs_review">Needs Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveString}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Translation
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Import Dialog */}
        <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Import Translations</DialogTitle>
              <DialogDescription>
                Upload a file containing translations to import
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>File Format</Label>
                <Select defaultValue="json">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Upload File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop your translation file
                  </p>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Importing will overwrite existing translations with the same keys.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}