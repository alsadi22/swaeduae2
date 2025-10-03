import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, Server, Database, Wifi, Users, Clock, AlertTriangle,
  CheckCircle, XCircle, Zap, HardDrive, Cpu, MemoryStick, Globe,
  RefreshCw, Download, Settings, Bell, TrendingUp, TrendingDown,
  BarChart3, Eye, Shield, Smartphone, Monitor, Router
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  threshold: {
    warning: number;
    critical: number;
  };
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface ServiceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  endpoint: string;
  dependencies: string[];
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
  source: string;
}

export default function AdminMonitoring() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock system metrics
  const systemMetrics: SystemMetric[] = [
    {
      id: '1',
      name: 'CPU Usage',
      value: 45,
      unit: '%',
      status: 'healthy',
      threshold: { warning: 70, critical: 90 },
      trend: 'stable',
      lastUpdated: '2024-03-20T10:30:00Z'
    },
    {
      id: '2',
      name: 'Memory Usage',
      value: 68,
      unit: '%',
      status: 'warning',
      threshold: { warning: 70, critical: 85 },
      trend: 'up',
      lastUpdated: '2024-03-20T10:30:00Z'
    },
    {
      id: '3',
      name: 'Disk Usage',
      value: 34,
      unit: '%',
      status: 'healthy',
      threshold: { warning: 80, critical: 95 },
      trend: 'stable',
      lastUpdated: '2024-03-20T10:30:00Z'
    },
    {
      id: '4',
      name: 'Network I/O',
      value: 156,
      unit: 'MB/s',
      status: 'healthy',
      threshold: { warning: 500, critical: 800 },
      trend: 'down',
      lastUpdated: '2024-03-20T10:30:00Z'
    },
    {
      id: '5',
      name: 'Database Connections',
      value: 23,
      unit: 'active',
      status: 'healthy',
      threshold: { warning: 80, critical: 100 },
      trend: 'stable',
      lastUpdated: '2024-03-20T10:30:00Z'
    },
    {
      id: '6',
      name: 'Response Time',
      value: 245,
      unit: 'ms',
      status: 'healthy',
      threshold: { warning: 500, critical: 1000 },
      trend: 'stable',
      lastUpdated: '2024-03-20T10:30:00Z'
    }
  ];

  const services: ServiceStatus[] = [
    {
      id: '1',
      name: 'Web Application',
      status: 'online',
      uptime: 99.98,
      responseTime: 234,
      lastCheck: '2024-03-20T10:29:45Z',
      endpoint: 'https://swaed.ae',
      dependencies: ['Database', 'Redis Cache']
    },
    {
      id: '2',
      name: 'API Gateway',
      status: 'online',
      uptime: 99.95,
      responseTime: 156,
      lastCheck: '2024-03-20T10:29:50Z',
      endpoint: 'https://api.swaed.ae',
      dependencies: ['Authentication Service', 'Database']
    },
    {
      id: '3',
      name: 'Database',
      status: 'online',
      uptime: 99.99,
      responseTime: 12,
      lastCheck: '2024-03-20T10:29:55Z',
      endpoint: 'postgres://db.swaed.ae:5432',
      dependencies: []
    },
    {
      id: '4',
      name: 'Redis Cache',
      status: 'online',
      uptime: 99.97,
      responseTime: 3,
      lastCheck: '2024-03-20T10:29:58Z',
      endpoint: 'redis://cache.swaed.ae:6379',
      dependencies: []
    },
    {
      id: '5',
      name: 'File Storage',
      status: 'degraded',
      uptime: 98.45,
      responseTime: 890,
      lastCheck: '2024-03-20T10:29:40Z',
      endpoint: 'https://storage.swaed.ae',
      dependencies: []
    },
    {
      id: '6',
      name: 'Email Service',
      status: 'online',
      uptime: 99.89,
      responseTime: 567,
      lastCheck: '2024-03-20T10:29:30Z',
      endpoint: 'smtp://mail.swaed.ae:587',
      dependencies: []
    },
    {
      id: '7',
      name: 'SMS Gateway',
      status: 'offline',
      uptime: 95.23,
      responseTime: 0,
      lastCheck: '2024-03-20T10:25:00Z',
      endpoint: 'https://sms.swaed.ae',
      dependencies: []
    },
    {
      id: '8',
      name: 'Push Notifications',
      status: 'online',
      uptime: 99.92,
      responseTime: 123,
      lastCheck: '2024-03-20T10:29:52Z',
      endpoint: 'https://push.swaed.ae',
      dependencies: []
    }
  ];

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'critical',
      title: 'SMS Gateway Offline',
      message: 'SMS Gateway service is not responding. Volunteer notifications may be affected.',
      timestamp: '2024-03-20T10:25:00Z',
      resolved: false,
      source: 'SMS Service Monitor'
    },
    {
      id: '2',
      type: 'warning',
      title: 'High Memory Usage',
      message: 'Memory usage has exceeded 70% threshold on web server.',
      timestamp: '2024-03-20T10:15:00Z',
      resolved: false,
      source: 'System Monitor'
    },
    {
      id: '3',
      type: 'warning',
      title: 'File Storage Performance',
      message: 'File storage response time is higher than normal (890ms avg).',
      timestamp: '2024-03-20T10:10:00Z',
      resolved: false,
      source: 'Performance Monitor'
    },
    {
      id: '4',
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Database maintenance window scheduled for tonight 2:00-4:00 AM.',
      timestamp: '2024-03-20T09:00:00Z',
      resolved: false,
      source: 'Maintenance Scheduler'
    }
  ];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
        // In real app, this would fetch fresh data
      }, refreshInterval * 1000);

      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const getMetricStatusColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getServiceStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'offline':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getServiceStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4" />;
      case 'offline':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: SystemMetric['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In real app, this would trigger data refresh
  };

  const handleResolveAlert = (alertId: string) => {
    // In real app, this would mark alert as resolved
    alert(`Alert ${alertId} marked as resolved`);
  };

  const exportSystemReport = () => {
    // In real app, this would generate and download system report
    alert('System report exported successfully!');
  };

  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && !alert.resolved);
  const warningAlerts = alerts.filter(alert => alert.type === 'warning' && !alert.resolved);
  const onlineServices = services.filter(service => service.status === 'online');
  const offlineServices = services.filter(service => service.status === 'offline');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
            <p className="text-gray-600">Real-time system health and performance monitoring</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Activity className="h-4 w-4" />
              <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportSystemReport}>
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* System Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Server className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{onlineServices.length}/{services.length}</div>
              <div className="text-sm text-gray-600">Services Online</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{criticalAlerts.length}</div>
              <div className="text-sm text-gray-600">Critical Alerts</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Bell className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{warningAlerts.length}</div>
              <div className="text-sm text-gray-600">Warnings</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">99.8%</div>
              <div className="text-sm text-gray-600">Overall Uptime</div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <Alert className="border-red-200 bg-red-50">
            <XCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <div className="flex items-center justify-between">
                <span><strong>{criticalAlerts.length} critical alert(s)</strong> require immediate attention</span>
                <Button size="sm" variant="destructive">
                  View All Alerts
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>System Metrics</span>
            </CardTitle>
            <CardDescription>Real-time system performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemMetrics.map(metric => (
                <div key={metric.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {metric.name === 'CPU Usage' && <Cpu className="h-4 w-4 text-blue-600" />}
                        {metric.name === 'Memory Usage' && <MemoryStick className="h-4 w-4 text-purple-600" />}
                        {metric.name === 'Disk Usage' && <HardDrive className="h-4 w-4 text-green-600" />}
                        {metric.name === 'Network I/O' && <Wifi className="h-4 w-4 text-orange-600" />}
                        {metric.name === 'Database Connections' && <Database className="h-4 w-4 text-red-600" />}
                        {metric.name === 'Response Time' && <Zap className="h-4 w-4 text-yellow-600" />}
                      </div>
                      <span className="font-medium text-gray-900">{metric.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(metric.trend)}
                      <Badge className={getMetricStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Current: <strong>{metric.value}{metric.unit}</strong></span>
                      <span className="text-gray-500">
                        Warn: {metric.threshold.warning}{metric.unit}
                      </span>
                    </div>
                    <Progress 
                      value={metric.name === 'Response Time' ? 
                        (metric.value / metric.threshold.critical) * 100 :
                        metric.value
                      } 
                      className={`h-2 ${
                        metric.status === 'critical' ? '[&>div]:bg-red-500' :
                        metric.status === 'warning' ? '[&>div]:bg-yellow-500' :
                        '[&>div]:bg-green-500'
                      }`}
                    />
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Updated: {new Date(metric.lastUpdated).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="h-5 w-5" />
              <span>Service Status</span>
            </CardTitle>
            <CardDescription>Status of all system services and dependencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {services.map(service => (
                <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getServiceStatusColor(service.status)}`}>
                      {getServiceStatusIcon(service.status)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <div className="text-sm text-gray-600">
                        {service.endpoint}
                      </div>
                      {service.dependencies.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Depends on: {service.dependencies.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge className={getServiceStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      <div>Uptime: {service.uptime}%</div>
                      <div>Response: {service.responseTime}ms</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Alerts</span>
            </CardTitle>
            <CardDescription>System alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <Badge 
                          className={
                            alert.type === 'critical' ? 'bg-red-100 text-red-800' :
                            alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }
                        >
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Source: {alert.source}</span>
                        <span>Time: {new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!alert.resolved && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleResolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Monitoring Configuration</CardTitle>
            <CardDescription>Configure monitoring settings and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-3">Auto Refresh</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="autoRefresh"
                      checked={autoRefresh}
                      onChange={(e) => setAutoRefresh(e.target.checked)}
                    />
                    <label htmlFor="autoRefresh" className="text-sm">Enable auto refresh</label>
                  </div>
                  <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                    disabled={!autoRefresh}
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value={15}>Every 15 seconds</option>
                    <option value={30}>Every 30 seconds</option>
                    <option value={60}>Every minute</option>
                    <option value={300}>Every 5 minutes</option>
                  </select>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Time Range</h4>
                <select
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="1h">Last hour</option>
                  <option value="6h">Last 6 hours</option>
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                </select>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Scan
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Database Health Check
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Network Diagnostics
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}