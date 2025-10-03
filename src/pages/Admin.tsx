import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, Building2, Calendar, Award, AlertTriangle,
  TrendingUp, TrendingDown, Activity, Shield, Settings,
  FileText, MessageSquare, BarChart3, Clock, CheckCircle,
  XCircle, Eye, ArrowRight, RefreshCw, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SystemMetric {
  id: string;
  title: string;
  value: number;
  previousValue: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  format: 'number' | 'percentage';
  icon: React.ReactNode;
  color: string;
  status: 'healthy' | 'warning' | 'critical';
}

interface RecentActivity {
  id: string;
  type: 'user_registration' | 'org_verification' | 'event_creation' | 'certificate_issue' | 'system_alert';
  title: string;
  description: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  user?: string;
  organization?: string;
}

interface SystemAlert {
  id: string;
  type: 'security' | 'performance' | 'data' | 'integration';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  status: 'active' | 'investigating' | 'resolved';
  affectedUsers?: number;
}

export default function Admin() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  // Mock data
  const systemMetrics: SystemMetric[] = [
    {
      id: '1',
      title: 'Total Users',
      value: 15847,
      previousValue: 15234,
      change: 4.0,
      changeType: 'increase',
      format: 'number',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
      status: 'healthy'
    },
    {
      id: '2',
      title: 'Active Organizations',
      value: 234,
      previousValue: 228,
      change: 2.6,
      changeType: 'increase',
      format: 'number',
      icon: <Building2 className="h-6 w-6" />,
      color: 'text-green-600',
      status: 'healthy'
    },
    {
      id: '3',
      title: 'Active Events',
      value: 156,
      previousValue: 189,
      change: -17.5,
      changeType: 'decrease',
      format: 'number',
      icon: <Calendar className="h-6 w-6" />,
      color: 'text-orange-600',
      status: 'warning'
    },
    {
      id: '4',
      title: 'Certificates Issued',
      value: 2847,
      previousValue: 2456,
      change: 15.9,
      changeType: 'increase',
      format: 'number',
      icon: <Award className="h-6 w-6" />,
      color: 'text-purple-600',
      status: 'healthy'
    },
    {
      id: '5',
      title: 'System Uptime',
      value: 99.8,
      previousValue: 99.6,
      change: 0.2,
      changeType: 'increase',
      format: 'percentage',
      icon: <Activity className="h-6 w-6" />,
      color: 'text-green-600',
      status: 'healthy'
    },
    {
      id: '6',
      title: 'Security Score',
      value: 94.2,
      previousValue: 96.1,
      change: -2.0,
      changeType: 'decrease',
      format: 'percentage',
      icon: <Shield className="h-6 w-6" />,
      color: 'text-red-600',
      status: 'warning'
    }
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'user_registration',
      title: 'New User Registration Spike',
      description: '45 new users registered in the last hour',
      timestamp: '2024-03-25T14:30:00Z',
      severity: 'low',
      user: 'System'
    },
    {
      id: '2',
      type: 'org_verification',
      title: 'Organization Verification Pending',
      description: 'Dubai Environmental Foundation requires verification review',
      timestamp: '2024-03-25T13:45:00Z',
      severity: 'medium',
      organization: 'Dubai Environmental Foundation'
    },
    {
      id: '3',
      type: 'system_alert',
      title: 'High API Usage Detected',
      description: 'Certificate generation API usage exceeded 80% of daily limit',
      timestamp: '2024-03-25T12:15:00Z',
      severity: 'high'
    },
    {
      id: '4',
      type: 'event_creation',
      title: 'Large Event Created',
      description: 'UAE National Day Cleanup event created with 500+ volunteer capacity',
      timestamp: '2024-03-25T11:20:00Z',
      severity: 'low',
      organization: 'Emirates Environmental Group'
    },
    {
      id: '5',
      type: 'certificate_issue',
      title: 'Bulk Certificate Issuance',
      description: '127 certificates issued for Beach Cleanup Drive event',
      timestamp: '2024-03-25T10:30:00Z',
      severity: 'low',
      organization: 'Dubai Community Foundation'
    }
  ];

  const systemAlerts: SystemAlert[] = [
    {
      id: '1',
      type: 'security',
      title: 'Unusual Login Pattern Detected',
      description: 'Multiple failed login attempts from suspicious IP addresses',
      severity: 'high',
      timestamp: '2024-03-25T14:15:00Z',
      status: 'investigating',
      affectedUsers: 12
    },
    {
      id: '2',
      type: 'performance',
      title: 'Database Query Performance Degradation',
      description: 'Average query response time increased by 35% in the last 2 hours',
      severity: 'medium',
      timestamp: '2024-03-25T13:30:00Z',
      status: 'active'
    },
    {
      id: '3',
      type: 'integration',
      title: 'SMS Service Provider Timeout',
      description: 'SMS notifications experiencing delivery delays',
      severity: 'medium',
      timestamp: '2024-03-25T12:45:00Z',
      status: 'resolved'
    }
  ];

  const getStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = (changeType: SystemMetric['changeType']) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      low: { label: 'Low', className: 'bg-blue-100 text-blue-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800' },
      critical: { label: 'Critical', className: 'bg-red-100 text-red-800' }
    };
    
    const config = severityConfig[severity as keyof typeof severityConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-red-100 text-red-800' },
      investigating: { label: 'Investigating', className: 'bg-yellow-100 text-yellow-800' },
      resolved: { label: 'Resolved', className: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatValue = (value: number, format: SystemMetric['format']) => {
    switch (format) {
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'org_verification':
        return <Building2 className="h-4 w-4 text-green-600" />;
      case 'event_creation':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'certificate_issue':
        return <Award className="h-4 w-4 text-yellow-600" />;
      case 'system_alert':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
            <p className="text-gray-600">Monitor and manage the SwaedUAE volunteer platform</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Link to="/admin/settings">
              <Button>
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemMetrics.map((metric) => (
            <Card key={metric.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatValue(metric.value, metric.format)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 ${getStatusColor(metric.status)}`}>
                      {getChangeIcon(metric.changeType)}
                      <span className="text-sm font-medium">
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                    <div className={`w-2 h-2 rounded-full mt-1 ${
                      metric.status === 'healthy' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks and system management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/admin/users">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Manage Users</span>
                </Button>
              </Link>
              
              <Link to="/admin/organizations">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Building2 className="h-6 w-6" />
                  <span>Organizations</span>
                </Button>
              </Link>
              
              <Link to="/admin/events">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Event Oversight</span>
                </Button>
              </Link>
              
              <Link to="/admin/certificates">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Award className="h-6 w-6" />
                  <span>Certificates</span>
                </Button>
              </Link>
              
              <Link to="/admin/content">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>Content Management</span>
                </Button>
              </Link>
              
              <Link to="/admin/security">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Shield className="h-6 w-6" />
                  <span>Security & Audit</span>
                </Button>
              </Link>
              
              <Link to="/admin/translations">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <MessageSquare className="h-6 w-6" />
                  <span>Translations</span>
                </Button>
              </Link>
              
              <Link to="/admin/hours">
                <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                  <Clock className="h-6 w-6" />
                  <span>Hours Management</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* System Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Critical issues requiring attention</CardDescription>
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700">
                  {systemAlerts.filter(alert => alert.status === 'active').length} Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      alert.severity === 'critical' ? 'text-red-600' :
                      alert.severity === 'high' ? 'text-orange-600' :
                      alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <div className="flex items-center space-x-2">
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDateTime(alert.timestamp)}</span>
                        {alert.affectedUsers && (
                          <span>{alert.affectedUsers} users affected</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        {getSeverityBadge(activity.severity)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDateTime(activity.timestamp)}</span>
                        {activity.organization && (
                          <span>{activity.organization}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Activity Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Statistics */}
        <div className="grid lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage</CardTitle>
              <CardDescription>User engagement and platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Daily Active Users</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">3,247</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Events Created Today</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">23</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Registrations Today</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">156</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">+15%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Support Tickets</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">7</span>
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">-23%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>Technical metrics and system health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">245ms</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Error Rate</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">0.12%</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database Load</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">67%</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Usage</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">34%</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Overview</CardTitle>
              <CardDescription>Security status and threat monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Failed Login Attempts</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">23</span>
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blocked IPs</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">5</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">SSL Certificate</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Valid</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Security Scan</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">2h ago</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Actions Required */}
        {systemAlerts.filter(alert => alert.severity === 'critical' || alert.severity === 'high').length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Immediate Attention Required:</strong> {systemAlerts.filter(alert => alert.severity === 'critical' || alert.severity === 'high').length} critical/high severity alerts need your attention.
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Review Alerts
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}