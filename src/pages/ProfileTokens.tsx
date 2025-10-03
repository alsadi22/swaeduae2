import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Key, Copy, Eye, EyeOff, Trash2, Plus, 
  ArrowLeft, AlertCircle, CheckCircle, Clock,
  Smartphone, Shield, Code, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface APIToken {
  id: string;
  name: string;
  description: string;
  token: string;
  scopes: string[];
  createdAt: string;
  lastUsed?: string;
  expiresAt?: string;
  isActive: boolean;
  usageCount: number;
}

export default function ProfileTokens() {
  const [tokens, setTokens] = useState<APIToken[]>([
    {
      id: '1',
      name: 'Mobile App - Personal',
      description: 'Token for personal mobile app access',
      token: 'swaeduae_live_1234567890abcdef1234567890abcdef',
      scopes: ['profile:read', 'events:read', 'hours:read', 'certificates:read'],
      createdAt: '2024-02-15T10:30:00Z',
      lastUsed: '2024-03-20T08:45:00Z',
      expiresAt: '2025-02-15T10:30:00Z',
      isActive: true,
      usageCount: 1247
    },
    {
      id: '2',
      name: 'Third-party Integration',
      description: 'Token for external calendar sync',
      token: 'swaeduae_live_abcdef1234567890abcdef1234567890',
      scopes: ['events:read', 'hours:write'],
      createdAt: '2024-01-10T14:20:00Z',
      lastUsed: '2024-03-19T16:30:00Z',
      expiresAt: '2024-07-10T14:20:00Z',
      isActive: true,
      usageCount: 89
    },
    {
      id: '3',
      name: 'Development Testing',
      description: 'Token for testing API integrations',
      token: 'swaeduae_test_9876543210fedcba9876543210fedcba',
      scopes: ['profile:read'],
      createdAt: '2024-03-01T09:15:00Z',
      lastUsed: '2024-03-18T11:20:00Z',
      isActive: false,
      usageCount: 23
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('tokens');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newToken, setNewToken] = useState({
    name: '',
    description: '',
    scopes: [] as string[],
    expiresIn: '365' // days
  });
  const [generatedToken, setGeneratedToken] = useState('');
  const [visibleTokens, setVisibleTokens] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  const availableScopes = [
    { id: 'profile:read', name: 'Read Profile', description: 'Access basic profile information' },
    { id: 'profile:write', name: 'Write Profile', description: 'Update profile information' },
    { id: 'events:read', name: 'Read Events', description: 'Access event information and RSVPs' },
    { id: 'events:write', name: 'Write Events', description: 'Create and manage event RSVPs' },
    { id: 'hours:read', name: 'Read Hours', description: 'Access volunteer hours and history' },
    { id: 'hours:write', name: 'Write Hours', description: 'Submit and update volunteer hours' },
    { id: 'certificates:read', name: 'Read Certificates', description: 'Access certificates and achievements' },
    { id: 'notifications:read', name: 'Read Notifications', description: 'Access notification preferences' },
    { id: 'notifications:write', name: 'Write Notifications', description: 'Update notification settings' }
  ];

  const handleCreateToken = async () => {
    if (!newToken.name.trim() || newToken.scopes.length === 0) {
      alert('Please provide a name and select at least one scope');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const token = `swaeduae_live_${Math.random().toString(36).substring(2, 34)}`;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + parseInt(newToken.expiresIn));
    
    const newTokenObj: APIToken = {
      id: Date.now().toString(),
      name: newToken.name,
      description: newToken.description,
      token: token,
      scopes: newToken.scopes,
      createdAt: new Date().toISOString(),
      expiresAt: expiresAt.toISOString(),
      isActive: true,
      usageCount: 0
    };

    setTokens(prev => [newTokenObj, ...prev]);
    setGeneratedToken(token);
    setNewToken({ name: '', description: '', scopes: [], expiresIn: '365' });
    setLoading(false);
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (!confirm('Are you sure you want to delete this token? This action cannot be undone.')) {
      return;
    }

    setTokens(prev => prev.filter(token => token.id !== tokenId));
    alert('Token deleted successfully');
  };

  const handleToggleToken = async (tokenId: string) => {
    setTokens(prev => prev.map(token => 
      token.id === tokenId 
        ? { ...token, isActive: !token.isActive }
        : token
    ));
  };

  const handleScopeChange = (scopeId: string, checked: boolean) => {
    setNewToken(prev => ({
      ...prev,
      scopes: checked 
        ? [...prev.scopes, scopeId]
        : prev.scopes.filter(s => s !== scopeId)
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Token copied to clipboard');
  };

  const toggleTokenVisibility = (tokenId: string) => {
    setVisibleTokens(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tokenId)) {
        newSet.delete(tokenId);
      } else {
        newSet.add(tokenId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isTokenExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  const getTokenStatus = (token: APIToken) => {
    if (!token.isActive) {
      return <Badge variant="secondary">Inactive</Badge>;
    }
    if (isTokenExpired(token.expiresAt)) {
      return <Badge variant="destructive">Expired</Badge>;
    }
    return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
  };

  const maskToken = (token: string) => {
    if (token.length < 8) return token;
    return `${token.substring(0, 12)}${'*'.repeat(token.length - 16)}${token.substring(token.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">API Tokens</h1>
              <p className="text-gray-600">Manage tokens for mobile app and third-party integrations</p>
            </div>
          </div>
          <Button onClick={() => setShowCreateForm(true)} disabled={showCreateForm}>
            <Plus className="h-4 w-4 mr-2" />
            Create Token
          </Button>
        </div>

        {/* Generated Token Alert */}
        {generatedToken && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="space-y-2">
                <p><strong>Token Created Successfully!</strong></p>
                <div className="flex items-center space-x-2 bg-white p-2 rounded border">
                  <code className="flex-1 text-sm font-mono">{generatedToken}</code>
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(generatedToken)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm">
                  <strong>Important:</strong> Copy this token now. You won't be able to see it again for security reasons.
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Create Token Form */}
        {showCreateForm && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>Create New API Token</CardTitle>
              <CardDescription>
                Generate a new token for mobile app or third-party integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tokenName">Token Name *</Label>
                  <Input
                    id="tokenName"
                    value={newToken.name}
                    onChange={(e) => setNewToken(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Mobile App - Personal"
                  />
                </div>
                <div>
                  <Label htmlFor="expiresIn">Expires In</Label>
                  <select
                    id="expiresIn"
                    value={newToken.expiresIn}
                    onChange={(e) => setNewToken(prev => ({ ...prev, expiresIn: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">6 months</option>
                    <option value="365">1 year</option>
                    <option value="730">2 years</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="tokenDescription">Description</Label>
                <Textarea
                  id="tokenDescription"
                  value={newToken.description}
                  onChange={(e) => setNewToken(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of what this token will be used for..."
                  rows={2}
                />
              </div>

              <div>
                <Label>Scopes *</Label>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  {availableScopes.map((scope) => (
                    <div key={scope.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={scope.id}
                        checked={newToken.scopes.includes(scope.id)}
                        onCheckedChange={(checked) => handleScopeChange(scope.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={scope.id} className="text-sm font-medium">
                          {scope.name}
                        </Label>
                        <p className="text-xs text-gray-600">{scope.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Alert className="border-orange-200 bg-orange-50">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Security Note:</strong> Only grant the minimum scopes necessary for your use case. 
                  Tokens with write permissions should be used carefully and monitored regularly.
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateToken} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Token'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tokens Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tokens">Active Tokens</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="docs">API Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="tokens" className="space-y-4">
            {tokens.length > 0 ? (
              tokens.map((token) => (
                <Card key={token.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Key className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{token.name}</h3>
                            {getTokenStatus(token)}
                          </div>
                          {token.description && (
                            <p className="text-sm text-gray-600 mb-2">{token.description}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {token.scopes.map((scope) => (
                              <Badge key={scope} variant="outline" className="text-xs">
                                {scope}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>Created: {formatDate(token.createdAt)}</p>
                            {token.lastUsed && (
                              <p>Last used: {formatDate(token.lastUsed)}</p>
                            )}
                            {token.expiresAt && (
                              <p className={isTokenExpired(token.expiresAt) ? 'text-red-600' : ''}>
                                Expires: {formatDate(token.expiresAt)}
                              </p>
                            )}
                            <p>Usage: {token.usageCount} requests</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleToken(token.id)}
                        >
                          {token.isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteToken(token.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 flex-1">
                          <Code className="h-4 w-4 text-gray-400" />
                          <code className="text-sm font-mono flex-1">
                            {visibleTokens.has(token.id) ? token.token : maskToken(token.token)}
                          </code>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleTokenVisibility(token.id)}
                          >
                            {visibleTokens.has(token.id) ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(token.token)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No API Tokens</h3>
                  <p className="text-gray-600 mb-4">
                    Create your first API token to integrate with mobile apps or third-party services.
                  </p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Token
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Usage Analytics</CardTitle>
                <CardDescription>
                  Monitor API token usage and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{tokens.filter(t => t.isActive).length}</div>
                    <div className="text-sm text-gray-600">Active Tokens</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {tokens.reduce((sum, token) => sum + token.usageCount, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Total Requests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">
                      {tokens.filter(t => isTokenExpired(t.expiresAt)).length}
                    </div>
                    <div className="text-sm text-gray-600">Expired Tokens</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Activity</h4>
                  {tokens
                    .filter(token => token.lastUsed)
                    .sort((a, b) => new Date(b.lastUsed!).getTime() - new Date(a.lastUsed!).getTime())
                    .slice(0, 5)
                    .map((token) => (
                      <div key={token.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{token.name}</p>
                            <p className="text-sm text-gray-600">
                              Last used: {formatDate(token.lastUsed!)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{token.usageCount}</p>
                          <p className="text-sm text-gray-600">requests</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Learn how to use SwaedUAE API tokens in your applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Authentication</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">Include your token in the Authorization header:</p>
                    <code className="block bg-gray-800 text-green-400 p-3 rounded text-sm">
                      Authorization: Bearer your_token_here
                    </code>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Base URL</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <code className="text-sm">https://api.swaeduae.ae/v1/</code>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Available Endpoints</h4>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">GET</Badge>
                        <code className="text-sm">/profile</code>
                      </div>
                      <p className="text-sm text-gray-600">Get user profile information</p>
                      <p className="text-xs text-gray-500">Requires: profile:read</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">GET</Badge>
                        <code className="text-sm">/events</code>
                      </div>
                      <p className="text-sm text-gray-600">List volunteer opportunities</p>
                      <p className="text-xs text-gray-500">Requires: events:read</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">POST</Badge>
                        <code className="text-sm">/events/{'{id}'}/rsvp</code>
                      </div>
                      <p className="text-sm text-gray-600">RSVP to an event</p>
                      <p className="text-xs text-gray-500">Requires: events:write</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">GET</Badge>
                        <code className="text-sm">/hours</code>
                      </div>
                      <p className="text-sm text-gray-600">Get volunteer hours history</p>
                      <p className="text-xs text-gray-500">Requires: hours:read</p>
                    </div>

                    <div className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs">GET</Badge>
                        <code className="text-sm">/certificates</code>
                      </div>
                      <p className="text-sm text-gray-600">List earned certificates</p>
                      <p className="text-xs text-gray-500">Requires: certificates:read</p>
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Rate Limits:</strong> API requests are limited to 1000 requests per hour per token. 
                    Contact support if you need higher limits for your application.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}