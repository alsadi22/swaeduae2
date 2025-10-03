import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, Search, Filter, MoreHorizontal, Eye, Download, ArrowLeft,
  AlertTriangle, CheckCircle, XCircle, Clock, Users, Activity,
  Key, Lock, Globe, Smartphone, Monitor, FileText, Calendar,
  MapPin, Trash2, Ban, RefreshCw, Settings, Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SecurityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  category: 'authentication' | 'authorization' | 'data_access' | 'system_change' | 'security_event';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress: string;
  userAgent: string;
  location: {
    country: string;
    city: string;
    coordinates?: { lat: number; lng: number };
  };
  deviceInfo: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
    fingerprint: string;
  };
  details: string;
  outcome: 'success' | 'failure' | 'blocked' | 'flagged';
  riskScore: number;
  sessionId?: string;
  affectedResources?: string[];
  flags: string[];
}

interface SecurityMetrics {
  totalLogins: number;
  failedLogins: number;
  blockedAttempts: number;
  suspiciousActivity: number;
  activeUsers: number;
  activeSessions: number;
  highRiskEvents: number;
  securityIncidents: number;
}

export default function AdminSecurity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [outcomeFilter, setOutcomeFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedLog, setSelectedLog] = useState<SecurityLog | null>(null);
  const [showLogDialog, setShowLogDialog] = useState(false);

  // Mock security metrics
  const metrics: SecurityMetrics = {
    totalLogins: 2847,
    failedLogins: 156,
    blockedAttempts: 23,
    suspiciousActivity: 8,
    activeUsers: 1234,
    activeSessions: 892,
    highRiskEvents: 12,
    securityIncidents: 3
  };

  // Mock security logs
  const securityLogs: SecurityLog[] = [
    {
      id: '1',
      timestamp: '2024-03-27T14:30:15Z',
      userId: '1',
      userName: 'Ahmed Al-Mansouri',
      userEmail: 'ahmed@example.com',
      action: 'User Login',
      category: 'authentication',
      severity: 'low',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: {
        country: 'UAE',
        city: 'Dubai',
        coordinates: { lat: 25.2048, lng: 55.2708 }
      },
      deviceInfo: {
        type: 'desktop',
        os: 'Windows 10',
        browser: 'Chrome 122',
        fingerprint: 'fp_abc123def456'
      },
      details: 'Successful login from registered device',
      outcome: 'success',
      riskScore: 2,
      sessionId: 'sess_789xyz',
      flags: []
    },
    {
      id: '2',
      timestamp: '2024-03-27T14:25:42Z',
      userId: '2',
      userName: 'Unknown User',
      userEmail: 'suspicious@fake.com',
      action: 'Failed Login Attempt',
      category: 'authentication',
      severity: 'high',
      ipAddress: '45.123.45.67',
      userAgent: 'curl/7.68.0',
      location: {
        country: 'Unknown',
        city: 'Unknown'
      },
      deviceInfo: {
        type: 'desktop',
        os: 'Linux',
        browser: 'curl',
        fingerprint: 'fp_suspicious001'
      },
      details: 'Multiple failed login attempts with invalid credentials from suspicious IP',
      outcome: 'blocked',
      riskScore: 9,
      flags: ['Brute Force', 'Suspicious IP', 'Invalid User Agent', 'Rate Limited']
    },
    {
      id: '3',
      timestamp: '2024-03-27T14:20:18Z',
      userId: '3',
      userName: 'Fatima Hassan',
      userEmail: 'fatima@example.com',
      action: 'Role Change',
      category: 'authorization',
      severity: 'medium',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      location: {
        country: 'UAE',
        city: 'Abu Dhabi',
        coordinates: { lat: 24.4539, lng: 54.3773 }
      },
      deviceInfo: {
        type: 'mobile',
        os: 'iOS 17',
        browser: 'Safari',
        fingerprint: 'fp_mobile789'
      },
      details: 'User role changed from Volunteer to Organization Admin by system administrator',
      outcome: 'success',
      riskScore: 5,
      sessionId: 'sess_456abc',
      affectedResources: ['user_roles', 'permissions'],
      flags: ['Role Elevation']
    },
    {
      id: '4',
      timestamp: '2024-03-27T14:15:33Z',
      userId: '4',
      userName: 'Mohammed Ali',
      userEmail: 'mohammed@example.com',
      action: 'Data Export',
      category: 'data_access',
      severity: 'medium',
      ipAddress: '172.16.0.25',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: {
        country: 'UAE',
        city: 'Sharjah',
        coordinates: { lat: 25.3463, lng: 55.4209 }
      },
      deviceInfo: {
        type: 'desktop',
        os: 'macOS Sonoma',
        browser: 'Safari 17',
        fingerprint: 'fp_mac456'
      },
      details: 'Exported volunteer hours data (CSV format) - 500 records',
      outcome: 'success',
      riskScore: 4,
      sessionId: 'sess_mac789',
      affectedResources: ['volunteer_hours', 'export_logs'],
      flags: ['Data Export']
    },
    {
      id: '5',
      timestamp: '2024-03-27T14:10:07Z',
      userId: '5',
      userName: 'Sarah Ahmed',
      userEmail: 'sarah@example.com',
      action: 'System Configuration Change',
      category: 'system_change',
      severity: 'high',
      ipAddress: '192.168.1.200',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      location: {
        country: 'UAE',
        city: 'Dubai',
        coordinates: { lat: 25.2048, lng: 55.2708 }
      },
      deviceInfo: {
        type: 'desktop',
        os: 'Windows 11',
        browser: 'Edge 122',
        fingerprint: 'fp_admin001'
      },
      details: 'Modified geofencing settings: default radius changed from 100m to 150m',
      outcome: 'success',
      riskScore: 6,
      sessionId: 'sess_admin123',
      affectedResources: ['system_settings', 'geofencing_config'],
      flags: ['System Change', 'Admin Action']
    },
    {
      id: '6',
      timestamp: '2024-03-27T14:05:21Z',
      userId: '6',
      userName: 'Suspicious Actor',
      userEmail: 'hacker@malicious.com',
      action: 'Unauthorized Access Attempt',
      category: 'security_event',
      severity: 'critical',
      ipAddress: '198.51.100.42',
      userAgent: 'python-requests/2.28.1',
      location: {
        country: 'Unknown',
        city: 'Unknown'
      },
      deviceInfo: {
        type: 'desktop',
        os: 'Linux',
        browser: 'Python Script',
        fingerprint: 'fp_malicious999'
      },
      details: 'Attempted to access admin panel with stolen session token',
      outcome: 'blocked',
      riskScore: 10,
      flags: ['Session Hijacking', 'Malicious IP', 'Automated Attack', 'Blocked by WAF']
    },
    {
      id: '7',
      timestamp: '2024-03-27T14:00:45Z',
      userId: '7',
      userName: 'Omar Hassan',
      userEmail: 'omar@example.com',
      action: 'Two-Factor Authentication Setup',
      category: 'authentication',
      severity: 'low',
      ipAddress: '10.0.1.75',
      userAgent: 'Mozilla/5.0 (Android 14; Mobile; rv:122.0)',
      location: {
        country: 'UAE',
        city: 'Ajman',
        coordinates: { lat: 25.4052, lng: 55.5136 }
      },
      deviceInfo: {
        type: 'mobile',
        os: 'Android 14',
        browser: 'Firefox Mobile',
        fingerprint: 'fp_android123'
      },
      details: 'Successfully enabled TOTP-based two-factor authentication',
      outcome: 'success',
      riskScore: 1,
      sessionId: 'sess_2fa456',
      affectedResources: ['user_security_settings'],
      flags: ['Security Enhancement']
    }
  ];

  const filteredLogs = securityLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress.includes(searchTerm);
    
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
    const matchesOutcome = outcomeFilter === 'all' || log.outcome === outcomeFilter;
    
    return matchesSearch && matchesCategory && matchesSeverity && matchesOutcome;
  });

  const getSeverityBadge = (severity: SecurityLog['severity']) => {
    const severityConfig = {
      low: { label: 'Low', className: 'bg-green-100 text-green-800' },
      medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'High', className: 'bg-orange-100 text-orange-800' },
      critical: { label: 'Critical', className: 'bg-red-100 text-red-800' }
    };
    
    const config = severityConfig[severity];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getOutcomeBadge = (outcome: SecurityLog['outcome']) => {
    const outcomeConfig = {
      success: { label: 'Success', className: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> },
      failure: { label: 'Failure', className: 'bg-red-100 text-red-800', icon: <XCircle className="h-3 w-3" /> },
      blocked: { label: 'Blocked', className: 'bg-red-100 text-red-800', icon: <Ban className="h-3 w-3" /> },
      flagged: { label: 'Flagged', className: 'bg-yellow-100 text-yellow-800', icon: <AlertTriangle className="h-3 w-3" /> }
    };
    
    const config = outcomeConfig[outcome];
    return (
      <Badge variant="outline" className={config.className}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </Badge>
    );
  };

  const getCategoryIcon = (category: SecurityLog['category']) => {
    const categoryIcons = {
      authentication: <Key className="h-4 w-4" />,
      authorization: <Lock className="h-4 w-4" />,
      data_access: <Database className="h-4 w-4" />,
      system_change: <Settings className="h-4 w-4" />,
      security_event: <Shield className="h-4 w-4" />
    };
    
    return categoryIcons[category];
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { label: 'Low', color: 'text-green-600' };
    if (score <= 6) return { label: 'Medium', color: 'text-yellow-600' };
    if (score <= 8) return { label: 'High', color: 'text-orange-600' };
    return { label: 'Critical', color: 'text-red-600' };
  };

  const handleViewLog = (log: SecurityLog) => {
    setSelectedLog(log);
    setShowLogDialog(true);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
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
              <h1 className="text-3xl font-bold text-gray-900">Security & Audit</h1>
              <p className="text-gray-600">Monitor security events and audit system activity</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{metrics.totalLogins.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Logins</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{metrics.failedLogins}</div>
              <div className="text-sm text-gray-600">Failed Logins</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Ban className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{metrics.blockedAttempts}</div>
              <div className="text-sm text-gray-600">Blocked</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{metrics.suspiciousActivity}</div>
              <div className="text-sm text-gray-600">Suspicious</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{metrics.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Monitor className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{metrics.activeSessions}</div>
              <div className="text-sm text-gray-600">Active Sessions</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{metrics.highRiskEvents}</div>
              <div className="text-sm text-gray-600">High Risk</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{metrics.securityIncidents}</div>
              <div className="text-sm text-gray-600">Incidents</div>
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
                    placeholder="Search users, actions, IPs..."
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
                  <SelectItem value="authentication">Authentication</SelectItem>
                  <SelectItem value="authorization">Authorization</SelectItem>
                  <SelectItem value="data_access">Data Access</SelectItem>
                  <SelectItem value="system_change">System Changes</SelectItem>
                  <SelectItem value="security_event">Security Events</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outcomes</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Logs */}
        <div className="space-y-4">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <Card key={log.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getCategoryIcon(log.category)}
                        <h3 className="text-lg font-semibold text-gray-900">{log.action}</h3>
                        {getSeverityBadge(log.severity)}
                        {getOutcomeBadge(log.outcome)}
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span><strong>User:</strong> {log.userName} ({log.userEmail})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span><strong>Time:</strong> {formatDateTime(log.timestamp)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4" />
                            <span><strong>IP:</strong> {log.ipAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span><strong>Location:</strong> {log.location.city}, {log.location.country}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Smartphone className="h-4 w-4" />
                            <span><strong>Device:</strong> {log.deviceInfo.type} ({log.deviceInfo.os})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Monitor className="h-4 w-4" />
                            <span><strong>Browser:</strong> {log.deviceInfo.browser}</span>
                          </div>
                          {log.sessionId && (
                            <div className="flex items-center space-x-2">
                              <Key className="h-4 w-4" />
                              <span><strong>Session:</strong> {log.sessionId}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4" />
                            <span className={`font-bold ${getRiskLevel(log.riskScore).color}`}>
                              Risk: {log.riskScore}/10 ({getRiskLevel(log.riskScore).label})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Flags */}
                      {log.flags.length > 0 && (
                        <div className="mb-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-600">{log.flags.length} security flags</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {log.flags.map((flag, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {flag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Details */}
                      <p className="text-sm text-gray-600 mb-3">{log.details}</p>

                      {/* Affected Resources */}
                      {log.affectedResources && log.affectedResources.length > 0 && (
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Affected Resources: </span>
                          <span className="text-gray-600">{log.affectedResources.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleViewLog(log)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                      
                      {log.severity === 'critical' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Block IP
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
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No security logs found</h3>
                <p className="text-gray-600">
                  {searchTerm || categoryFilter !== 'all' || severityFilter !== 'all' || outcomeFilter !== 'all'
                    ? 'Try adjusting your search or filters.'
                    : 'No security events have been logged yet.'
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Security Log Detail Dialog */}
        <Dialog open={showLogDialog} onOpenChange={setShowLogDialog}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Security Log Details</DialogTitle>
              <DialogDescription>
                {selectedLog && `Detailed information for security event: ${selectedLog.action}`}
              </DialogDescription>
            </DialogHeader>
            
            {selectedLog && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Action</Label>
                      <div className="text-lg font-medium flex items-center space-x-2">
                        {getCategoryIcon(selectedLog.category)}
                        <span>{selectedLog.action}</span>
                      </div>
                    </div>
                    <div>
                      <Label>User</Label>
                      <div>{selectedLog.userName}</div>
                      <div className="text-sm text-gray-600">{selectedLog.userEmail}</div>
                    </div>
                    <div>
                      <Label>Timestamp</Label>
                      <div>{formatDateTime(selectedLog.timestamp)}</div>
                    </div>
                    <div>
                      <Label>Category & Severity</Label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline">{selectedLog.category.replace('_', ' ')}</Badge>
                        {getSeverityBadge(selectedLog.severity)}
                        {getOutcomeBadge(selectedLog.outcome)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Risk Assessment</Label>
                      <div className="mt-1">
                        <span className={`text-2xl font-bold ${getRiskLevel(selectedLog.riskScore).color}`}>
                          {selectedLog.riskScore}/10
                        </span>
                        <span className={`ml-2 text-sm ${getRiskLevel(selectedLog.riskScore).color}`}>
                          ({getRiskLevel(selectedLog.riskScore).label} Risk)
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label>IP Address</Label>
                      <div className="font-mono">{selectedLog.ipAddress}</div>
                    </div>
                    <div>
                      <Label>Location</Label>
                      <div>{selectedLog.location.city}, {selectedLog.location.country}</div>
                      {selectedLog.location.coordinates && (
                        <div className="text-sm text-gray-600">
                          {selectedLog.location.coordinates.lat}, {selectedLog.location.coordinates.lng}
                        </div>
                      )}
                    </div>
                    {selectedLog.sessionId && (
                      <div>
                        <Label>Session ID</Label>
                        <div className="font-mono text-sm">{selectedLog.sessionId}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Device Information */}
                <div>
                  <Label>Device Information</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-700">Device Type</div>
                      <div className="capitalize">{selectedLog.deviceInfo.type}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Operating System</div>
                      <div>{selectedLog.deviceInfo.os}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Browser</div>
                      <div>{selectedLog.deviceInfo.browser}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Device Fingerprint</div>
                      <div className="font-mono text-xs">{selectedLog.deviceInfo.fingerprint}</div>
                    </div>
                  </div>
                </div>

                {/* User Agent */}
                <div>
                  <Label>User Agent</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded border font-mono text-sm">
                    {selectedLog.userAgent}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <Label>Event Details</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded border text-sm">
                    {selectedLog.details}
                  </div>
                </div>

                {/* Affected Resources */}
                {selectedLog.affectedResources && selectedLog.affectedResources.length > 0 && (
                  <div>
                    <Label>Affected Resources</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedLog.affectedResources.map((resource, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Security Flags */}
                {selectedLog.flags.length > 0 && (
                  <div>
                    <Label>Security Flags</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedLog.flags.map((flag, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowLogDialog(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Export Log
                  </Button>
                  {selectedLog.severity === 'critical' && (
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Ban className="h-4 w-4 mr-2" />
                      Block IP Address
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}