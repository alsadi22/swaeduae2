import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, Building, Palette, Bell, Shield, 
  Users, FileText, BarChart, MessageSquare,
  ChevronRight, CheckCircle, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  status: 'complete' | 'incomplete' | 'warning';
  items: string[];
}

export default function OrgSettings() {
  const settingSections: SettingSection[] = [
    {
      id: 'profile',
      title: 'Organization Profile',
      description: 'Manage your organization information, branding, and contact details',
      icon: Building,
      path: '/org/settings/profile',
      status: 'incomplete',
      items: ['Basic Information', 'Logo & Branding', 'Contact Details', 'Legal Information']
    },
    {
      id: 'team',
      title: 'Team Management',
      description: 'Manage team members, roles, and permissions',
      icon: Users,
      path: '/org/team',
      status: 'complete',
      items: ['Team Members', 'Role Permissions', 'Invitations', 'Access Control']
    },
    {
      id: 'notifications',
      title: 'Notification Settings',
      description: 'Configure email, SMS, and push notification preferences',
      icon: Bell,
      path: '/org/settings/notifications',
      status: 'complete',
      items: ['Email Notifications', 'SMS Settings', 'Push Notifications', 'Digest Options']
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      description: 'Manage security settings, 2FA, and privacy controls',
      icon: Shield,
      path: '/org/settings/security',
      status: 'warning',
      items: ['Two-Factor Authentication', 'API Keys', 'Session Management', 'Privacy Settings']
    },
    {
      id: 'branding',
      title: 'Branding & Appearance',
      description: 'Customize colors, themes, and certificate templates',
      icon: Palette,
      path: '/org/settings/branding',
      status: 'incomplete',
      items: ['Color Scheme', 'Logo Upload', 'Certificate Templates', 'Email Templates']
    },
    {
      id: 'integrations',
      title: 'Integrations & API',
      description: 'Manage third-party integrations and API access',
      icon: Settings,
      path: '/org/settings/integrations',
      status: 'incomplete',
      items: ['API Keys', 'Webhooks', 'Calendar Sync', 'External Systems']
    },
    {
      id: 'compliance',
      title: 'Compliance & Legal',
      description: 'Manage legal documents, compliance settings, and audit trails',
      icon: FileText,
      path: '/org/settings/compliance',
      status: 'warning',
      items: ['Legal Documents', 'Compliance Checks', 'Audit Logs', 'Data Retention']
    },
    {
      id: 'reporting',
      title: 'Reporting & Analytics',
      description: 'Configure reporting preferences and data export settings',
      icon: BarChart,
      path: '/org/settings/reporting',
      status: 'complete',
      items: ['Report Scheduling', 'Data Export', 'Analytics Dashboard', 'Custom Reports']
    },
    {
      id: 'communications',
      title: 'Communications',
      description: 'Manage messaging templates and communication preferences',
      icon: MessageSquare,
      path: '/org/settings/communications',
      status: 'incomplete',
      items: ['Message Templates', 'Automated Messages', 'Communication Channels', 'Language Settings']
    }
  ];

  const getStatusIcon = (status: SettingSection['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      default:
        return <Settings className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: SettingSection['status']) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800">Complete</Badge>;
      case 'warning':
        return <Badge className="bg-orange-100 text-orange-800">Needs Attention</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600">Setup Required</Badge>;
    }
  };

  const completedSections = settingSections.filter(s => s.status === 'complete').length;
  const completionPercentage = Math.round((completedSections / settingSections.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organization Settings</h1>
            <p className="text-gray-600">Configure your organization preferences and settings</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
            <div className="text-sm text-gray-600">Setup Complete</div>
          </div>
        </div>

        {/* Setup Progress */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-blue-900">Organization Setup Progress</h3>
                <p className="text-sm text-blue-700">
                  Complete your organization setup to unlock all features
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-900">
                  {completedSections} of {settingSections.length} sections
                </div>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.id} to={section.path}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{section.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusIcon(section.status)}
                            {getStatusBadge(section.status)}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4">
                      {section.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {section.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common settings and actions for your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/org/settings/profile">
                <Button variant="outline" className="w-full justify-start">
                  <Building className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </Link>
              
              <Link to="/org/team">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </Link>
              
              <Link to="/org/settings/security">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
              </Link>
              
              <Link to="/org/settings/branding">
                <Button variant="outline" className="w-full justify-start">
                  <Palette className="h-4 w-4 mr-2" />
                  Customize Branding
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Account Verified</h3>
              <p className="text-sm text-gray-600">Your organization is fully verified and active</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Setup Incomplete</h3>
              <p className="text-sm text-gray-600">Complete your profile setup for full access</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-1">Security Active</h3>
              <p className="text-sm text-gray-600">Your account security settings are configured</p>
            </CardContent>
          </Card>
        </div>

        {/* Help & Support */}
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our support team is here to help you configure your organization settings.
                </p>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    View Documentation
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Available 24/7</p>
                <p className="text-sm font-medium text-gray-700">support@swaeduae.ae</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}