import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, ArrowLeft, Eye, Edit, Copy, Trash2, Download,
  Upload, Palette, Type, Image, Layout, Settings,
  CheckCircle, AlertCircle, Star, TrendingUp, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CertificateTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
  isDefault: boolean;
  usageCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  preview: string;
  design: {
    layout: 'portrait' | 'landscape';
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: number;
    logoPosition: 'top-left' | 'top-center' | 'top-right';
    signaturePosition: 'bottom-left' | 'bottom-center' | 'bottom-right';
    borderStyle: 'none' | 'simple' | 'decorative' | 'elegant';
    watermark: boolean;
    qrCode: boolean;
  };
  fields: Array<{
    id: string;
    type: 'text' | 'name' | 'event' | 'hours' | 'date' | 'signature' | 'logo' | 'qr';
    label: string;
    required: boolean;
    position: { x: number; y: number };
    style: {
      fontSize: number;
      fontWeight: 'normal' | 'bold';
      fontStyle: 'normal' | 'italic';
      color: string;
      alignment: 'left' | 'center' | 'right';
    };
  }>;
  languages: string[];
}

export default function OrgCertificateTemplates() {
  const [templates, setTemplates] = useState<CertificateTemplate[]>([
    {
      id: '1',
      name: 'Environmental Impact Certificate',
      description: 'Certificate for volunteers participating in environmental conservation activities',
      category: 'Environment',
      isActive: true,
      isDefault: false,
      usageCount: 45,
      rating: 4.8,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-03-10T14:30:00Z',
      createdBy: 'Sarah Ahmed',
      preview: '/api/placeholder/400/300',
      design: {
        layout: 'landscape',
        backgroundColor: '#ffffff',
        primaryColor: '#22c55e',
        secondaryColor: '#16a34a',
        fontFamily: 'Arial',
        fontSize: 14,
        logoPosition: 'top-left',
        signaturePosition: 'bottom-right',
        borderStyle: 'elegant',
        watermark: true,
        qrCode: true
      },
      fields: [
        {
          id: 'title',
          type: 'text',
          label: 'Certificate Title',
          required: true,
          position: { x: 50, y: 20 },
          style: {
            fontSize: 24,
            fontWeight: 'bold',
            fontStyle: 'normal',
            color: '#22c55e',
            alignment: 'center'
          }
        },
        {
          id: 'volunteer-name',
          type: 'name',
          label: 'Volunteer Name',
          required: true,
          position: { x: 50, y: 40 },
          style: {
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: 'normal',
            color: '#000000',
            alignment: 'center'
          }
        }
      ],
      languages: ['en', 'ar']
    },
    {
      id: '2',
      name: 'Community Service Certificate',
      description: 'General certificate for community service activities',
      category: 'Community',
      isActive: true,
      isDefault: true,
      usageCount: 78,
      rating: 4.6,
      createdAt: '2024-01-20T09:00:00Z',
      updatedAt: '2024-03-05T16:20:00Z',
      createdBy: 'Ahmed Al-Mansouri',
      preview: '/api/placeholder/400/300',
      design: {
        layout: 'portrait',
        backgroundColor: '#fef7ed',
        primaryColor: '#ea580c',
        secondaryColor: '#dc2626',
        fontFamily: 'Georgia',
        fontSize: 14,
        logoPosition: 'top-center',
        signaturePosition: 'bottom-center',
        borderStyle: 'decorative',
        watermark: false,
        qrCode: true
      },
      fields: [],
      languages: ['en']
    },
    {
      id: '3',
      name: 'Youth Development Certificate',
      description: 'Certificate for volunteers working with youth programs',
      category: 'Education',
      isActive: false,
      isDefault: false,
      usageCount: 23,
      rating: 4.2,
      createdAt: '2024-02-01T11:30:00Z',
      updatedAt: '2024-02-15T13:45:00Z',
      createdBy: 'Fatima Hassan',
      preview: '/api/placeholder/400/300',
      design: {
        layout: 'landscape',
        backgroundColor: '#eff6ff',
        primaryColor: '#3b82f6',
        secondaryColor: '#1d4ed8',
        fontFamily: 'Helvetica',
        fontSize: 14,
        logoPosition: 'top-right',
        signaturePosition: 'bottom-left',
        borderStyle: 'simple',
        watermark: true,
        qrCode: false
      },
      fields: [],
      languages: ['en', 'ar']
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('templates');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDesignDialog, setShowDesignDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: '',
    layout: 'landscape' as const
  });

  const categories = [
    'Environment & Sustainability',
    'Education & Literacy', 
    'Healthcare & Medical',
    'Community Development',
    'Youth & Children',
    'Senior Citizens',
    'Disability Support',
    'Animal Welfare',
    'Arts & Culture',
    'Sports & Recreation'
  ];

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.description || !newTemplate.category) {
      alert('Please fill in all required fields.');
      return;
    }

    const template: CertificateTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category,
      isActive: true,
      isDefault: false,
      usageCount: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Current User',
      preview: '/api/placeholder/400/300',
      design: {
        layout: newTemplate.layout,
        backgroundColor: '#ffffff',
        primaryColor: '#3b82f6',
        secondaryColor: '#1d4ed8',
        fontFamily: 'Arial',
        fontSize: 14,
        logoPosition: 'top-left',
        signaturePosition: 'bottom-right',
        borderStyle: 'simple',
        watermark: false,
        qrCode: true
      },
      fields: [],
      languages: ['en']
    };

    setTemplates(prev => [template, ...prev]);
    setShowCreateDialog(false);
    setNewTemplate({ name: '', description: '', category: '', layout: 'landscape' });
    alert('Template created successfully!');
  };

  const handleToggleActive = (templateId: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, isActive: !template.isActive }
        : template
    ));
  };

  const handleSetDefault = (templateId: string) => {
    setTemplates(prev => prev.map(template => ({
      ...template,
      isDefault: template.id === templateId
    })));
  };

  const handleDuplicateTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const duplicated: CertificateTemplate = {
        ...template,
        id: Date.now().toString(),
        name: `${template.name} (Copy)`,
        isDefault: false,
        usageCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'Current User'
      };
      setTemplates(prev => [duplicated, ...prev]);
      alert('Template duplicated successfully!');
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template?.usageCount > 0) {
      if (!confirm(`This template has been used ${template.usageCount} times. Are you sure you want to delete it?`)) {
        return;
      }
    }
    
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    alert('Template deleted successfully!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (template: CertificateTemplate) => {
    if (template.isDefault) {
      return <Badge className="bg-blue-100 text-blue-800">Default</Badge>;
    }
    if (template.isActive) {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-600">Inactive</Badge>;
  };

  const stats = {
    total: templates.length,
    active: templates.filter(t => t.isActive).length,
    inactive: templates.filter(t => !t.isActive).length,
    totalUsage: templates.reduce((sum, t) => sum + t.usageCount, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/org/certificates">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Certificates
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Certificate Templates</h1>
              <p className="text-gray-600">Create and manage certificate templates</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Template
            </Button>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Layout className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Templates</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.inactive}</div>
              <div className="text-sm text-gray-600">Inactive</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{stats.totalUsage}</div>
              <div className="text-sm text-gray-600">Total Usage</div>
            </CardContent>
          </Card>
        </div>

        {/* Template Management */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="templates">Templates ({stats.total})</TabsTrigger>
            <TabsTrigger value="designer">Template Designer</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Template Preview */}
                    <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={template.preview} 
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Template Info */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{template.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                        </div>
                        {getStatusBadge(template)}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{template.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{template.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Used {template.usageCount} times</span>
                        <span>Updated {formatDate(template.updatedAt)}</span>
                      </div>

                      {/* Languages */}
                      <div className="flex items-center space-x-1">
                        {template.languages.map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedTemplate(template);
                            setShowDesignDialog(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDuplicateTemplate(template.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex items-center space-x-2 pt-2 border-t">
                        <Button
                          variant={template.isActive ? "outline" : "default"}
                          size="sm"
                          onClick={() => handleToggleActive(template.id)}
                          className="flex-1"
                        >
                          {template.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        
                        {!template.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(template.id)}
                            className="flex-1"
                          >
                            Set Default
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="designer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Designer</CardTitle>
                <CardDescription>
                  Design and customize certificate templates with drag-and-drop interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Design Tools */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Design Tools</h3>
                    
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Type className="h-4 w-4 mr-2" />
                        Add Text
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Image className="h-4 w-4 mr-2" />
                        Add Image
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Add Signature
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Add QR Code
                      </Button>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-medium">Colors</h4>
                      <div className="grid grid-cols-6 gap-2">
                        {['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'].map((color) => (
                          <div
                            key={color}
                            className="w-8 h-8 rounded cursor-pointer border-2 border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-medium">Fonts</h4>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arial">Arial</SelectItem>
                          <SelectItem value="helvetica">Helvetica</SelectItem>
                          <SelectItem value="georgia">Georgia</SelectItem>
                          <SelectItem value="times">Times New Roman</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Canvas */}
                  <div className="lg:col-span-2">
                    <div className="aspect-[4/3] bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Layout className="h-16 w-16 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Certificate Designer</h3>
                        <p className="text-sm">
                          Drag and drop elements to design your certificate template
                        </p>
                        <Button className="mt-4">
                          <Plus className="h-4 w-4 mr-2" />
                          Start Designing
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Settings</CardTitle>
                  <CardDescription>Configure default template settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Default Layout</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="landscape">Landscape</SelectItem>
                        <SelectItem value="portrait">Portrait</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Default Font Family</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arial">Arial</SelectItem>
                        <SelectItem value="helvetica">Helvetica</SelectItem>
                        <SelectItem value="georgia">Georgia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Default Primary Color</Label>
                    <Input type="color" defaultValue="#3b82f6" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="watermark" defaultChecked />
                    <Label htmlFor="watermark">Include watermark by default</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="qrcode" defaultChecked />
                    <Label htmlFor="qrcode">Include QR code by default</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Library</CardTitle>
                  <CardDescription>Manage template library settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Templates
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Templates
                  </Button>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Template Categories</h4>
                    <div className="space-y-2">
                      {categories.slice(0, 5).map((category) => (
                        <div key={category} className="flex items-center justify-between text-sm">
                          <span>{category}</span>
                          <Badge variant="outline">
                            {templates.filter(t => t.category === category).length}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Template Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new certificate template from scratch
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Template Name *</Label>
                <Input
                  id="name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Environmental Impact Certificate"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Certificate for volunteers participating in environmental activities..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}>
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

              <div>
                <Label htmlFor="layout">Layout</Label>
                <Select value={newTemplate.layout} onValueChange={(value: 'landscape' | 'portrait') => setNewTemplate(prev => ({ ...prev, layout: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landscape">Landscape</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Design Dialog */}
        <Dialog open={showDesignDialog} onOpenChange={setShowDesignDialog}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Template Designer</DialogTitle>
              <DialogDescription>
                {selectedTemplate && `Editing ${selectedTemplate.name}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Palette className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Advanced Template Designer</h3>
                <p className="text-sm">
                  Full-featured template designer would be implemented here
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowDesignDialog(false)}>
                Cancel
              </Button>
              <Button>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}