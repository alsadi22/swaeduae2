import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Building2, Calendar, FileText, Settings, 
  Shield, BarChart3, AlertTriangle, CheckCircle,
  Heart, LogOut, Bell, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 2847,
    totalOrganizations: 156,
    pendingApprovals: 23,
    totalEvents: 189,
    totalHours: 45672,
    activeCertificates: 1234
  };

  const recentActivity = [
    { id: 1, type: 'user_registration', message: 'New volunteer registered: Sarah Al-Zahra', time: '2 minutes ago' },
    { id: 2, type: 'org_approval', message: 'Organization approved: Dubai Cares Foundation', time: '15 minutes ago' },
    { id: 3, type: 'event_created', message: 'New event: Beach Cleanup Drive - Jumeirah', time: '1 hour ago' },
    { id: 4, type: 'certificate_issued', message: 'Certificate issued to Ahmed Al-Mansouri', time: '2 hours ago' },
  ];

  const pendingApprovals = [
    { id: 1, type: 'organization', name: 'Green UAE Initiative', submitted: '2 days ago' },
    { id: 2, type: 'event', name: 'Community Garden Project', submitted: '1 day ago' },
    { id: 3, type: 'certificate', name: 'Environmental Champion Badge', submitted: '3 hours ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-red-500" />
                <div>
                  <span className="text-xl font-bold text-gray-900">SwaedUAE</span>
                  <div className="text-xs text-green-600 font-medium">Admin Portal</div>
                </div>
              </Link>
              <Badge variant="destructive" className="ml-4">
                <Shield className="h-3 w-3 mr-1" />
                Administrator
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || 'Admin User'}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name}. Here's what's happening on your platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Organizations</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalOrganizations}</p>
                </div>
                <Building2 className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingApprovals}</p>
                </div>
                <AlertTriangle className="h-12 w-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Events</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalEvents}</p>
                </div>
                <Calendar className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Volunteer Hours</p>
                  <p className="text-3xl font-bold text-indigo-600">{stats.totalHours.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-12 w-12 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Certificates</p>
                  <p className="text-3xl font-bold text-pink-600">{stats.activeCertificates.toLocaleString()}</p>
                </div>
                <FileText className="h-12 w-12 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <Link to="/admin/users">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to="/admin/organizations">
                      <Building2 className="h-4 w-4 mr-2" />
                      Review Organizations
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to="/admin/events">
                      <Calendar className="h-4 w-4 mr-2" />
                      Monitor Events
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to="/admin/reports">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Reports
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Items requiring your review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Type: {item.type} • Submitted {item.submitted}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Review</Button>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>Detailed activity log</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.concat([
                    { id: 5, type: 'system', message: 'System backup completed successfully', time: '4 hours ago' },
                    { id: 6, type: 'security', message: 'Security scan completed - no issues found', time: '6 hours ago' },
                    { id: 7, type: 'update', message: 'Platform updated to version 2.1.3', time: '1 day ago' },
                  ]).map(activity => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    General Settings
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/security">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/integrations">
                    <Settings className="h-4 w-4 mr-2" />
                    Integrations
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}