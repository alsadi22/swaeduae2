import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, Server, Cloud, Shield, Key, Globe, Smartphone,
  Settings, CheckCircle, AlertTriangle, XCircle, RefreshCw,
  Plus, Trash2, Eye, Copy, ExternalLink, Activity, Zap
} from 'lucide-react';

interface SystemIntegration {
  id: string;
  name: string;
  type: 'database' | 'auth' | 'storage' | 'api' | 'monitoring' | 'payment' | 'notification';
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  description: string;
  icon: React.ReactNode;
  version: string;
  lastSync: string;
  uptime: number;
  requests: number;
  errorRate: number;
  config: {
    [key: string]: string | boolean | number;
  };
  healthCheck: {
    status: 'healthy' | 'warning' | 'critical';
    lastCheck: string;
    responseTime: number;
  };
}

interface APIEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  usage: number;
  avgResponseTime: number;
  errorRate: number;
  rateLimit: number;
  status: 'active' | 'deprecated' | 'maintenance';
}

export default function AdminIntegrations() {
  const [activeTab, setActiveTab] = useState<'systems' | 'apis' | 'webhooks' | 'monitoring'>('systems');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<SystemIntegration | null>(null);

  // Mock system integrations
  const systemIntegrations: SystemIntegration[] = [
    {
      id: '1',
      name: 'PostgreSQL Database',
      type: 'database',
      status: 'active',
      description: 'Primary database for volunteer and event data',
      icon: <Database className="h-6 w-6 text-blue-600" />,
      version: '14.9',
      lastSync: '2024-03-20T14:30:00Z',
      uptime: 99.98,
      requests: 45230,
      errorRate: 0.02,
      config: {
        host: 'db.swaed.ae',
        port: 5432,
        database: 'swaed_production',
        maxConnections: 100,
        sslMode: 'require'
      },
      healthCheck: {
        status: 'healthy',
        lastCheck: '2024-03-20T14:29:00Z',
        responseTime: 12
      }
    },
    {
      id: '2',
      name: 'Redis Cache',
      type: 'database',
      status: 'active',
      description: 'In-memory cache for session data and frequently accessed content',
      icon: <Database className="h-6 w-6 text-red-600" />,
      version: '7.0.11',
      lastSync: '2024-03-20T14:30:00Z',
      uptime: 99.95,
      requests: 128450,
      errorRate: 0.01,
      config: {
        host: 'cache.swaed.ae',
        port: 6379,
        maxMemory: '2GB',
        evictionPolicy: 'allkeys-lru'
      },
      healthCheck: {
        status: 'healthy',
        lastCheck: '2024-03-20T14:29:30Z',
        responseTime: 3
      }
    },
    {
      id: '3',
      name: 'Auth0 Authentication',
      type: 'auth',
      status: 'active',
      description: 'Identity and access management service',
      icon: <Shield className="h-6 w-6 text-green-600" />,
      version: '4.2.1',
      lastSync: '2024-03-20T14:25:00Z',
      uptime: 99.99,
      requests: 23180,
      errorRate: 0.005,
      config: {
        domain: 'swaed.auth0.com',
        clientId: 'abc123def456',
        audience: 'https://api.swaed.ae',
        tokenExpiry: 3600
      },
      healthCheck: {
        status: 'healthy',
        lastCheck: '2024-03-20T14:28:00Z',
        responseTime: 156
      }
    },
    {
      id: '4',
      name: 'AWS S3 Storage',
      type: 'storage',
      status: 'active',
      description: 'File storage for documents, images, and certificates',
      icon: <Cloud className="h-6 w-6 text-orange-600" />,
      version: 'Latest',
      lastSync: '2024-03-20T14:20:00Z',
      uptime: 99.999,
      requests: 8940,
      errorRate: 0.001,
      config: {
        bucket: 'swaed-storage',
        region: 'me-south-1',
        encryption: 'AES256',
        versioning: true
      },
      healthCheck: {
        status: 'healthy',
        lastCheck: '2024-03-20T14:27:00Z',
        responseTime: 89
      }
    },
    {
      id: '5',
      name: 'Stripe Payment Gateway',
      type: 'payment',
      status: 'active',
      description: 'Payment processing for premium features and donations',
      icon: <Key className="h-6 w-6 text-purple-600" />,
      version: '2023-10-16',
      lastSync: '2024-03-20T14:15:00Z',
      uptime: 99.97,
      requests: 1240,
      errorRate: 0.08,
      config: {
        publishableKey: 'pk_live_...',
        webhookEndpoint: 'https://api.swaed.ae/webhooks/stripe',
        currency: 'AED'
      },
      healthCheck: {
        status: 'healthy',
        lastCheck: '2024-03-20T14:26:00Z',
        responseTime: 234
      }
    },
    {
      id: '6',
      name: 'Twilio Notifications',
      type: 'notification',
      status: 'active',
      description: 'SMS and WhatsApp messaging service',
      icon: <Smartphone className="h-6 w-6 text-indigo-600" />,
      version: '2010-04-01',
      lastSync: '2024-03-20T14:10:00Z',
      uptime: 99.92,
      requests: 5670,
      errorRate: 0.15,
      config: {
        accountSid: 'AC123456789',
        fromNumber: '+971501234567',
        webhookUrl: 'https://api.swaed.ae/webhooks/twilio'
      },
      healthCheck: {
        status: 'warning',
        lastCheck: '2024-03-20T14:25:30Z',
        responseTime: 567
      }
    },
    {
      id: '7',
      name: 'Datadog Monitoring',
      type: 'monitoring',
      status: 'active',
      description: 'Application performance monitoring and logging',
      icon: <Activity className="h-6 w-6 text-pink-600" />,
      version: '7.48.0',
      lastSync: '2024-03-20T14:30:00Z',
      uptime: 99.98,
      requests: 156780,
      errorRate: 0.01,
      config: {
        apiKey: 'dd_api_key_...',
        site: 'datadoghq.eu',
        service: 'swaed-api',
        environment: 'production'
      },
      healthCheck: {
        status: 'healthy',
        lastCheck: '2024-03-20T14:29:45Z',
        responseTime: 45
      }
    },
    {
      id: '8',
      name: 'Elasticsearch Search',
      type: 'database',
      status: 'maintenance',
      description: 'Full-text search engine for volunteers and events',
      icon: <Database className="h-6 w-6 text-yellow-600" />,
      version: '8.11.0',
      lastSync: '2024-03-20T12:00:00Z',
      uptime: 99.85,
      requests: 34560,
      errorRate: 0.05,
      config: {
        host: 'search.swaed.ae',
        port: 9200,
        index: 'swaed_search',
        replicas: 2
      },
      healthCheck: {
        status: 'warning',
        lastCheck: '2024-03-20T14:00:00Z',
        responseTime: 234
      }
    }
  ];

  // Mock API endpoints
  const apiEndpoints: APIEndpoint[] = [
    {
      id: '1',
      path: '/api/v1/volunteers',
      method: 'GET',
      description: 'List all volunteers with pagination and filtering',
      usage: 12450,
      avgResponseTime: 156,
      errorRate: 0.02,
      rateLimit: 1000,
      status: 'active'
    },
    {
      id: '2',
      path: '/api/v1/events',
      method: 'GET',
      description: 'Retrieve events with search and filter capabilities',
      usage: 8930,
      avgResponseTime: 234,
      errorRate: 0.01,
      rateLimit: 1000,
      status: 'active'
    },
    {
      id: '3',
      path: '/api/v1/volunteers',
      method: 'POST',
      description: 'Create new volunteer registration',
      usage: 2340,
      avgResponseTime: 567,
      errorRate: 0.08,
      rateLimit: 100,
      status: 'active'
    },
    {
      id: '4',
      path: '/api/v1/events/{id}/register',
      method: 'POST',
      description: 'Register volunteer for specific event',
      usage: 5670,
      avgResponseTime: 345,
      errorRate: 0.05,
      rateLimit: 500,
      status: 'active'
    },
    {
      id: '5',
      path: '/api/v1/analytics',
      method: 'GET',
      description: 'Get analytics and reporting data',
      usage: 890,
      avgResponseTime: 1234,
      errorRate: 0.03,
      rateLimit: 100,
      status: 'active'
    },
    {
      id: '6',
      path: '/api/v1/certificates',
      method: 'GET',
      description: 'Generate and retrieve volunteer certificates',
      usage: 1560,
      avgResponseTime: 2345,
      errorRate: 0.12,
      rateLimit: 50,
      status: 'active'
    }
  ];

  const getStatusIcon = (status: SystemIntegration['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'maintenance':
        return <RefreshCw className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getStatusColor = (status: SystemIntegration['status'] | APIEndpoint['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'deprecated':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthStatusColor = (status: SystemIntegration['healthCheck']['status']) => {
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

  const handleRestartIntegration = (integrationId: string) => {
    alert(`Restarting integration ${integrationId}...`);
  };

  const handleTestConnection = (integrationId: string) => {
    alert(`Testing connection for integration ${integrationId}...`);
  };

  const handleViewLogs = (integrationId: string) => {
    alert(`Viewing logs for integration ${integrationId}...`);
  };

  const handleConfigureIntegration = (integration: SystemIntegration) => {
    setSelectedIntegration(integration);
    setShowAddDialog(true);
  };

  const runHealthCheck = () => {
    alert('Running health check on all integrations...');
  };

  const exportConfiguration = () => {
    alert('Exporting system configuration...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Integrations</h1>
            <p className="text-gray-600">Monitor and manage all system integrations and APIs</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={runHealthCheck}>
              <Activity className="h-4 w-4 mr-2" />
              Health Check
            </Button>
            <Button variant="outline" onClick={exportConfiguration}>
              <Settings className="h-4 w-4 mr-2" />
              Export Config
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </div>
        </div>

        {/* System Status Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {systemIntegrations.filter(i => i.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Services</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">99.96%</div>
              <div className="text-sm text-gray-600">Overall Uptime</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2.1M</div>
              <div className="text-sm text-gray-600">API Requests/Month</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {systemIntegrations.filter(i => i.healthCheck.status !== 'healthy').length}
              </div>
              <div className="text-sm text-gray-600">Warnings</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'systems' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('systems')}
            className="flex-1"
          >
            <Server className="h-4 w-4 mr-2" />
            System Services
          </Button>
          <Button
            variant={activeTab === 'apis' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('apis')}
            className="flex-1"
          >
            <Globe className="h-4 w-4 mr-2" />
            API Endpoints
          </Button>
          <Button
            variant={activeTab === 'webhooks' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('webhooks')}
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Webhooks
          </Button>
          <Button
            variant={activeTab === 'monitoring' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('monitoring')}
            className="flex-1"
          >
            <Activity className="h-4 w-4 mr-2" />
            Monitoring
          </Button>
        </div>

        {/* System Services Tab */}
        {activeTab === 'systems' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {systemIntegrations.map(integration => (
                <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {integration.icon}
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <CardDescription className="capitalize">{integration.type} • v{integration.version}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(integration.status)}
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                    
                    {/* Health Check Status */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Health Status</span>
                        <span className={`text-sm font-medium ${getHealthStatusColor(integration.healthCheck.status)}`}>
                          {integration.healthCheck.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                        <div>Response Time: {integration.healthCheck.responseTime}ms</div>
                        <div>Last Check: {new Date(integration.healthCheck.lastCheck).toLocaleTimeString()}</div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{integration.uptime}%</div>
                        <div className="text-gray-600">Uptime</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{integration.requests.toLocaleString()}</div>
                        <div className="text-gray-600">Requests</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{integration.errorRate}%</div>
                        <div className="text-gray-600">Error Rate</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleConfigureIntegration(integration)}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTestConnection(integration.id)}
                      >
                        <Activity className="h-4 w-4 mr-1" />
                        Test
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewLogs(integration.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Logs
                      </Button>
                      {integration.status === 'error' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRestartIntegration(integration.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Restart
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'apis' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
                <CardDescription>Monitor API performance and usage statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Endpoint</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Usage</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Avg Response</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Error Rate</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Rate Limit</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiEndpoints.map(endpoint => (
                        <tr key={endpoint.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{endpoint.path}</div>
                            <div className="text-sm text-gray-600">{endpoint.description}</div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              className={
                                endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                                endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }
                            >
                              {endpoint.method}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            {endpoint.usage.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {endpoint.avgResponseTime}ms
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-medium ${
                              endpoint.errorRate > 0.1 ? 'text-red-600' :
                              endpoint.errorRate > 0.05 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {endpoint.errorRate}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {endpoint.rateLimit}/min
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(endpoint.status)}>
                              {endpoint.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* API Usage Analytics */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Usage Trends</CardTitle>
                  <CardDescription>Request volume over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-2" />
                      <p>API usage trends chart</p>
                      <p className="text-sm">Showing 30-day request volume</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Time Distribution</CardTitle>
                  <CardDescription>Performance metrics by endpoint</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiEndpoints.slice(0, 4).map(endpoint => (
                      <div key={endpoint.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge 
                            className={
                              endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                              endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }
                            size="sm"
                          >
                            {endpoint.method}
                          </Badge>
                          <span className="text-sm font-medium text-gray-700">{endpoint.path}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                endpoint.avgResponseTime > 1000 ? 'bg-red-500' :
                                endpoint.avgResponseTime > 500 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((endpoint.avgResponseTime / 2000) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                            {endpoint.avgResponseTime}ms
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            <Alert>
              <ExternalLink className="h-4 w-4" />
              <AlertDescription>
                Webhooks allow external systems to receive real-time notifications about events in your SwaedUAE platform.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>Configure outgoing webhooks for system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Available Events</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        'volunteer.registered',
                        'volunteer.updated',
                        'event.created',
                        'event.updated',
                        'event.cancelled',
                        'registration.created',
                        'registration.cancelled',
                        'hours.logged',
                        'certificate.issued',
                        'feedback.submitted'
                      ].map(event => (
                        <div key={event} className="flex items-center space-x-2">
                          <input type="checkbox" id={event} className="h-4 w-4" />
                          <label htmlFor={event} className="text-sm text-gray-700 font-mono">
                            {event}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                      <Input placeholder="https://your-app.com/webhooks/swaed" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
                      <div className="flex space-x-2">
                        <Input placeholder="webhook_secret_key" type="password" />
                        <Button variant="outline" size="sm">
                          Generate
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button>Save Webhook Configuration</Button>
                    <Button variant="outline">Test Webhook</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Webhook Delivery Log */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Webhook Deliveries</CardTitle>
                <CardDescription>Monitor webhook delivery status and debug issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { event: 'volunteer.registered', status: 'success', timestamp: '2024-03-20T14:30:00Z', responseCode: 200, responseTime: 156 },
                    { event: 'event.created', status: 'success', timestamp: '2024-03-20T14:25:00Z', responseCode: 200, responseTime: 234 },
                    { event: 'hours.logged', status: 'failed', timestamp: '2024-03-20T14:20:00Z', responseCode: 500, responseTime: 5000 },
                    { event: 'certificate.issued', status: 'success', timestamp: '2024-03-20T14:15:00Z', responseCode: 200, responseTime: 345 },
                    { event: 'registration.created', status: 'retry', timestamp: '2024-03-20T14:10:00Z', responseCode: 429, responseTime: 1000 }
                  ].map((delivery, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {delivery.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : delivery.status === 'failed' ? (
                          <XCircle className="h-4 w-4 text-red-600" />
                        ) : (
                          <RefreshCw className="h-4 w-4 text-yellow-600" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900 font-mono text-sm">{delivery.event}</div>
                          <div className="text-xs text-gray-600">
                            {new Date(delivery.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <Badge className={
                          delivery.status === 'success' ? 'bg-green-100 text-green-800' :
                          delivery.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }>
                          {delivery.responseCode}
                        </Badge>
                        <span className="text-gray-600">{delivery.responseTime}ms</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Real-time system metrics and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-2" />
                      <p>System performance dashboard</p>
                      <p className="text-sm">CPU, Memory, Network metrics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error Tracking</CardTitle>
                  <CardDescription>Application errors and exceptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { error: 'Database connection timeout', count: 3, lastSeen: '2024-03-20T14:25:00Z' },
                      { error: 'API rate limit exceeded', count: 12, lastSeen: '2024-03-20T14:20:00Z' },
                      { error: 'File upload validation failed', count: 5, lastSeen: '2024-03-20T14:15:00Z' },
                      { error: 'Email delivery failed', count: 2, lastSeen: '2024-03-20T14:10:00Z' }
                    ].map((error, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{error.error}</div>
                          <div className="text-sm text-gray-600">
                            Last seen: {new Date(error.lastSeen).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{error.count}</Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
                <CardDescription>Configure monitoring alerts and thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Performance Alerts</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">High CPU usage (&gt;80%)</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">High memory usage (&gt;85%)</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Slow response time (&gt;2s)</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">High error rate (&gt;5%)</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Service Alerts</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Service downtime</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Database connection issues</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Payment gateway errors</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Storage quota exceeded</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Notification Channels</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <Input placeholder="admin@swaed.ae" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slack Webhook</label>
                        <Input placeholder="https://hooks.slack.com/..." />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SMS Number</label>
                        <Input placeholder="+971501234567" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Configure Integration Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {selectedIntegration ? `Configure ${selectedIntegration.name}` : 'Add Integration'}
              </DialogTitle>
              <DialogDescription>
                {selectedIntegration ? 'Update integration configuration' : 'Add a new system integration'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {selectedIntegration ? (
                // Configuration form for existing integration
                <div className="space-y-4">
                  {Object.entries(selectedIntegration.config).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <Input 
                        defaultValue={typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)}
                        type={typeof value === 'number' ? 'number' : 'text'}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Add new integration form
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Integration Type</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="">Select integration type...</option>
                      <option value="database">Database</option>
                      <option value="auth">Authentication</option>
                      <option value="storage">Storage</option>
                      <option value="payment">Payment</option>
                      <option value="notification">Notification</option>
                      <option value="monitoring">Monitoring</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                    <Input placeholder="e.g., Custom Database" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Connection URL</label>
                    <Input placeholder="e.g., https://api.service.com" />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  {selectedIntegration ? 'Save Changes' : 'Add Integration'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}