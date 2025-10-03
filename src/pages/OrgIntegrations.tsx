import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Calendar, Mail, MessageSquare, Database, Globe, Smartphone,
  Settings, Key, Link, CheckCircle, AlertTriangle, Plus,
  ExternalLink, Trash2, RefreshCw, Eye, Copy, Zap
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: 'calendar' | 'email' | 'sms' | 'api' | 'webhook' | 'social';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  description: string;
  icon: React.ReactNode;
  lastSync?: string;
  config: {
    [key: string]: string | boolean | number;
  };
  features: string[];
  webhookUrl?: string;
  apiKey?: string;
}

interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  createdAt: string;
  lastUsed?: string;
  expiresAt?: string;
  status: 'active' | 'revoked' | 'expired';
}

export default function OrgIntegrations() {
  const [activeTab, setActiveTab] = useState<'integrations' | 'api' | 'webhooks'>('integrations');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showAPIDialog, setShowAPIDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  // Mock integrations data
  const integrations: Integration[] = [
    {
      id: '1',
      name: 'Google Calendar',
      type: 'calendar',
      status: 'connected',
      description: 'Sync volunteer events with Google Calendar for better scheduling',
      icon: <Calendar className="h-6 w-6 text-blue-600" />,
      lastSync: '2024-03-20T10:30:00Z',
      config: {
        calendarId: 'primary',
        syncDirection: 'bidirectional',
        autoCreateEvents: true,
        reminderMinutes: 60
      },
      features: ['Event sync', 'Automatic reminders', 'Conflict detection']
    },
    {
      id: '2',
      name: 'Microsoft Outlook',
      type: 'calendar',
      status: 'disconnected',
      description: 'Integrate with Outlook Calendar for enterprise scheduling',
      icon: <Calendar className="h-6 w-6 text-orange-600" />,
      config: {},
      features: ['Event sync', 'Meeting rooms', 'Team calendars']
    },
    {
      id: '3',
      name: 'Mailchimp',
      type: 'email',
      status: 'connected',
      description: 'Send newsletters and volunteer updates through Mailchimp',
      icon: <Mail className="h-6 w-6 text-yellow-600" />,
      lastSync: '2024-03-20T09:15:00Z',
      config: {
        listId: 'abc123def456',
        autoSubscribe: true,
        segmentBySkills: true
      },
      features: ['Email campaigns', 'Automated sequences', 'Analytics']
    },
    {
      id: '4',
      name: 'Twilio SMS',
      type: 'sms',
      status: 'connected',
      description: 'Send SMS notifications and reminders to volunteers',
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />,
      lastSync: '2024-03-20T11:45:00Z',
      config: {
        fromNumber: '+971501234567',
        enableReminders: true,
        enableUpdates: true
      },
      features: ['SMS notifications', 'Event reminders', 'Emergency alerts']
    },
    {
      id: '5',
      name: 'WhatsApp Business',
      type: 'sms',
      status: 'pending',
      description: 'Connect with volunteers through WhatsApp Business API',
      icon: <MessageSquare className="h-6 w-6 text-green-600" />,
      config: {
        businessNumber: '+971501234567',
        enableTemplates: true
      },
      features: ['Message templates', 'Group messaging', 'Media sharing']
    },
    {
      id: '6',
      name: 'Slack',
      type: 'api',
      status: 'error',
      description: 'Send notifications to Slack channels for team coordination',
      icon: <MessageSquare className="h-6 w-6 text-indigo-600" />,
      config: {
        webhookUrl: 'https://hooks.slack.com/services/...',
        channel: '#volunteers',
        enableAlerts: true
      },
      features: ['Channel notifications', 'Event alerts', 'Custom messages']
    },
    {
      id: '7',
      name: 'Zapier',
      type: 'webhook',
      status: 'connected',
      description: 'Connect with 5000+ apps through Zapier automation',
      icon: <Zap className="h-6 w-6 text-orange-500" />,
      lastSync: '2024-03-20T08:20:00Z',
      webhookUrl: 'https://hooks.zapier.com/hooks/catch/12345/abcdef/',
      config: {
        triggerEvents: ['volunteer_registered', 'event_created', 'hours_logged']
      },
      features: ['Workflow automation', 'Multi-app integration', 'Custom triggers']
    }
  ];

  // Mock API keys
  const apiKeys: APIKey[] = [
    {
      id: '1',
      name: 'Mobile App API',
      key: 'sk_live_51H7...',
      permissions: ['read:volunteers', 'write:events', 'read:analytics'],
      createdAt: '2024-01-15T10:00:00Z',
      lastUsed: '2024-03-20T14:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Third-party Integration',
      key: 'sk_test_49G6...',
      permissions: ['read:volunteers', 'read:events'],
      createdAt: '2024-02-20T15:30:00Z',
      lastUsed: '2024-03-18T09:15:00Z',
      expiresAt: '2024-06-20T15:30:00Z',
      status: 'active'
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      key: 'sk_live_38F5...',
      permissions: ['read:analytics', 'read:reports'],
      createdAt: '2024-01-10T12:00:00Z',
      status: 'revoked'
    }
  ];

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <RefreshCw className="h-4 w-4 text-yellow-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getStatusColor = (status: Integration['status'] | APIKey['status']) => {
    switch (status) {
      case 'connected':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'error':
      case 'revoked':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleConnect = (integrationId: string) => {
    alert(`Connecting to integration ${integrationId}...`);
  };

  const handleDisconnect = (integrationId: string) => {
    alert(`Disconnecting integration ${integrationId}...`);
  };

  const handleSync = (integrationId: string) => {
    alert(`Syncing integration ${integrationId}...`);
  };

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowAddDialog(true);
  };

  const generateAPIKey = () => {
    alert('New API key generated successfully!');
  };

  const revokeAPIKey = (keyId: string) => {
    alert(`API key ${keyId} revoked successfully!`);
  };

  const copyAPIKey = (key: string) => {
    navigator.clipboard.writeText(key);
    alert('API key copied to clipboard!');
  };

  const testWebhook = (integrationId: string) => {
    alert(`Testing webhook for integration ${integrationId}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Integrations & API</h1>
            <p className="text-gray-600">Connect with external services and manage API access</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Documentation
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Integration
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'integrations' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('integrations')}
            className="flex-1"
          >
            <Link className="h-4 w-4 mr-2" />
            Integrations
          </Button>
          <Button
            variant={activeTab === 'api' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('api')}
            className="flex-1"
          >
            <Key className="h-4 w-4 mr-2" />
            API Keys
          </Button>
          <Button
            variant={activeTab === 'webhooks' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('webhooks')}
            className="flex-1"
          >
            <Globe className="h-4 w-4 mr-2" />
            Webhooks
          </Button>
        </div>

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="space-y-6">
            {/* Popular Integrations */}
            <Card>
              <CardHeader>
                <CardTitle>Available Integrations</CardTitle>
                <CardDescription>Connect with popular services to enhance your volunteer management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {integrations.map(integration => (
                    <div key={integration.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {integration.icon}
                          <div>
                            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{integration.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(integration.status)}
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {integration.lastSync && (
                        <div className="text-xs text-gray-500 mb-4">
                          Last sync: {new Date(integration.lastSync).toLocaleString()}
                        </div>
                      )}

                      <div className="flex space-x-2">
                        {integration.status === 'connected' ? (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleConfigure(integration)}
                              className="flex-1"
                            >
                              <Settings className="h-4 w-4 mr-1" />
                              Configure
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleSync(integration.id)}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleDisconnect(integration.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <Button 
                            onClick={() => handleConnect(integration.id)}
                            className="flex-1"
                            disabled={integration.status === 'pending'}
                          >
                            {integration.status === 'pending' ? 'Connecting...' : 'Connect'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            {/* API Overview */}
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Manage API keys for programmatic access to your volunteer data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{apiKeys.filter(k => k.status === 'active').length}</div>
                    <div className="text-sm text-gray-600">Active Keys</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-gray-600">API Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">1.2M</div>
                    <div className="text-sm text-gray-600">Monthly Requests</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">API Endpoint</h4>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">https://api.swaed.ae/v1/</code>
                  </div>
                  <Button onClick={() => setShowAPIDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New Key
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API Keys List */}
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map(apiKey => (
                    <div key={apiKey.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                          <Badge className={getStatusColor(apiKey.status)}>
                            {apiKey.status}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <code className="bg-gray-100 px-2 py-1 rounded font-mono">
                            {apiKey.key}...
                          </code>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mb-2">
                          {apiKey.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                          {apiKey.lastUsed && (
                            <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                          )}
                          {apiKey.expiresAt && (
                            <span>Expires: {new Date(apiKey.expiresAt).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => copyAPIKey(apiKey.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {apiKey.status === 'active' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => revokeAPIKey(apiKey.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* API Documentation */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Start</CardTitle>
                <CardDescription>Get started with the SwaedUAE API</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Authentication</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <code className="text-sm">
                        curl -H "Authorization: Bearer YOUR_API_KEY" \<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;https://api.swaed.ae/v1/volunteers
                      </code>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Common Endpoints</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">GET</Badge>
                        <code>/volunteers</code>
                        <span className="text-gray-600">List all volunteers</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">GET</Badge>
                        <code>/events</code>
                        <span className="text-gray-600">List all events</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">POST</Badge>
                        <code>/events</code>
                        <span className="text-gray-600">Create new event</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">GET</Badge>
                        <code>/analytics</code>
                        <span className="text-gray-600">Get analytics data</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <div className="space-y-6">
            {/* Webhook Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>Configure webhooks to receive real-time notifications about events in your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Available Events</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="volunteer_registered" className="h-4 w-4" />
                          <label htmlFor="volunteer_registered">volunteer.registered</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="event_created" className="h-4 w-4" />
                          <label htmlFor="event_created">event.created</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="event_updated" className="h-4 w-4" />
                          <label htmlFor="event_updated">event.updated</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="hours_logged" className="h-4 w-4" />
                          <label htmlFor="hours_logged">hours.logged</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="certificate_issued" className="h-4 w-4" />
                          <label htmlFor="certificate_issued">certificate.issued</label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Webhook URL</h4>
                      <Input 
                        placeholder="https://your-app.com/webhooks/swaed"
                        className="mb-3"
                      />
                      <div className="flex space-x-2">
                        <Button size="sm">Save Webhook</Button>
                        <Button variant="outline" size="sm">Test Webhook</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Webhook Integrations</h4>
                    <div className="space-y-3">
                      {integrations.filter(i => i.type === 'webhook' || i.webhookUrl).map(integration => (
                        <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {integration.icon}
                            <div>
                              <h5 className="font-medium text-gray-900">{integration.name}</h5>
                              <p className="text-sm text-gray-600">{integration.webhookUrl}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(integration.status)}>
                              {integration.status}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => testWebhook(integration.id)}
                            >
                              Test
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Webhook Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Webhook Deliveries</CardTitle>
                <CardDescription>Monitor webhook delivery status and debug issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { event: 'volunteer.registered', status: 'success', timestamp: '2024-03-20T14:30:00Z', responseCode: 200 },
                    { event: 'event.created', status: 'success', timestamp: '2024-03-20T14:25:00Z', responseCode: 200 },
                    { event: 'hours.logged', status: 'failed', timestamp: '2024-03-20T14:20:00Z', responseCode: 500 },
                    { event: 'certificate.issued', status: 'success', timestamp: '2024-03-20T14:15:00Z', responseCode: 200 }
                  ].map((delivery, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {delivery.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{delivery.event}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(delivery.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={delivery.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {delivery.responseCode}
                        </Badge>
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

        {/* Add Integration Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedIntegration ? `Configure ${selectedIntegration.name}` : 'Add Integration'}
              </DialogTitle>
              <DialogDescription>
                {selectedIntegration ? 'Update integration settings' : 'Connect a new service to your organization'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {selectedIntegration ? (
                // Configuration form for existing integration
                <div className="space-y-4">
                  {selectedIntegration.type === 'calendar' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Calendar ID</label>
                        <Input defaultValue={selectedIntegration.config.calendarId as string} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sync Direction</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option value="bidirectional">Bidirectional</option>
                          <option value="to_calendar">To Calendar Only</option>
                          <option value="from_calendar">From Calendar Only</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked={selectedIntegration.config.autoCreateEvents as boolean} />
                        <label className="text-sm text-gray-700">Auto-create events</label>
                      </div>
                    </>
                  )}
                  
                  {selectedIntegration.type === 'email' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mailing List ID</label>
                        <Input defaultValue={selectedIntegration.config.listId as string} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked={selectedIntegration.config.autoSubscribe as boolean} />
                        <label className="text-sm text-gray-700">Auto-subscribe new volunteers</label>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // Add new integration form
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Integration</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="">Choose an integration...</option>
                    <option value="google_calendar">Google Calendar</option>
                    <option value="outlook">Microsoft Outlook</option>
                    <option value="mailchimp">Mailchimp</option>
                    <option value="twilio">Twilio SMS</option>
                    <option value="slack">Slack</option>
                    <option value="zapier">Zapier</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  {selectedIntegration ? 'Save Changes' : 'Connect'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Generate API Key Dialog */}
        <Dialog open={showAPIDialog} onOpenChange={setShowAPIDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate API Key</DialogTitle>
              <DialogDescription>Create a new API key for programmatic access</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
                <Input placeholder="e.g., Mobile App, Analytics Dashboard" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2">
                  {[
                    'read:volunteers',
                    'write:volunteers', 
                    'read:events',
                    'write:events',
                    'read:analytics',
                    'read:reports'
                  ].map(permission => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input type="checkbox" id={permission} className="h-4 w-4" />
                      <label htmlFor={permission} className="text-sm text-gray-700">{permission}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiration (Optional)</label>
                <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAPIDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={generateAPIKey}>
                  Generate Key
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}