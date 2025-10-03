import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, Download, Calendar, Users, TrendingUp, BarChart3,
  PieChart, Filter, RefreshCw, Eye, Share2, Settings,
  Clock, Award, Building2, Target, AlertTriangle, CheckCircle
} from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: 'executive' | 'operational' | 'financial' | 'impact' | 'compliance';
  description: string;
  lastGenerated: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual' | 'on-demand';
  status: 'ready' | 'generating' | 'scheduled' | 'error';
  recipients: string[];
  format: 'pdf' | 'excel' | 'csv' | 'dashboard';
  metrics: string[];
}

interface ReportMetric {
  id: string;
  name: string;
  value: number | string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target?: number;
  unit: string;
  category: string;
}

export default function AdminReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      name: 'Executive Summary',
      type: 'executive',
      description: 'High-level overview of volunteer program performance and key metrics',
      lastGenerated: '2024-03-20T08:00:00Z',
      frequency: 'monthly',
      status: 'ready',
      recipients: ['ceo@organization.ae', 'board@organization.ae'],
      format: 'pdf',
      metrics: ['Total Volunteers', 'Events Completed', 'Impact Score', 'Budget Utilization']
    },
    {
      id: '2',
      name: 'Volunteer Engagement Report',
      type: 'operational',
      description: 'Detailed analysis of volunteer participation, retention, and satisfaction',
      lastGenerated: '2024-03-19T18:00:00Z',
      frequency: 'weekly',
      status: 'ready',
      recipients: ['hr@organization.ae', 'volunteer-manager@organization.ae'],
      format: 'excel',
      metrics: ['Retention Rate', 'Satisfaction Score', 'Event Attendance', 'New Registrations']
    },
    {
      id: '3',
      name: 'Financial Impact Analysis',
      type: 'financial',
      description: 'Cost analysis and ROI of volunteer programs with budget tracking',
      lastGenerated: '2024-03-18T09:00:00Z',
      frequency: 'monthly',
      status: 'generating',
      recipients: ['finance@organization.ae', 'cfo@organization.ae'],
      format: 'pdf',
      metrics: ['Cost per Hour', 'Budget vs Actual', 'ROI', 'Cost Savings']
    },
    {
      id: '4',
      name: 'Community Impact Report',
      type: 'impact',
      description: 'Measurement of social impact and community outcomes from volunteer activities',
      lastGenerated: '2024-03-17T14:30:00Z',
      frequency: 'quarterly',
      status: 'ready',
      recipients: ['impact@organization.ae', 'communications@organization.ae'],
      format: 'pdf',
      metrics: ['Beneficiaries Served', 'Hours Contributed', 'Projects Completed', 'SDG Alignment']
    },
    {
      id: '5',
      name: 'Compliance & Audit Report',
      type: 'compliance',
      description: 'Regulatory compliance status and audit trail for volunteer programs',
      lastGenerated: '2024-03-15T10:00:00Z',
      frequency: 'quarterly',
      status: 'scheduled',
      recipients: ['legal@organization.ae', 'audit@organization.ae'],
      format: 'excel',
      metrics: ['Compliance Score', 'Policy Adherence', 'Risk Assessment', 'Documentation Status']
    },
    {
      id: '6',
      name: 'Partner Organization Report',
      type: 'operational',
      description: 'Performance analysis of partner organizations and collaboration effectiveness',
      lastGenerated: '2024-03-16T16:00:00Z',
      frequency: 'monthly',
      status: 'ready',
      recipients: ['partnerships@organization.ae'],
      format: 'dashboard',
      metrics: ['Partner Satisfaction', 'Collaboration Score', 'Event Success Rate', 'Volunteer Feedback']
    }
  ];

  // Mock key metrics
  const keyMetrics: ReportMetric[] = [
    {
      id: '1',
      name: 'Total Active Volunteers',
      value: 2847,
      change: 12.5,
      trend: 'up',
      target: 3000,
      unit: 'volunteers',
      category: 'Engagement'
    },
    {
      id: '2',
      name: 'Monthly Events Completed',
      value: 156,
      change: 8.3,
      trend: 'up',
      target: 150,
      unit: 'events',
      category: 'Operations'
    },
    {
      id: '3',
      name: 'Volunteer Satisfaction',
      value: 4.7,
      change: 2.1,
      trend: 'up',
      target: 4.5,
      unit: '/5',
      category: 'Quality'
    },
    {
      id: '4',
      name: 'Cost per Volunteer Hour',
      value: 12.50,
      change: -5.2,
      trend: 'down',
      target: 15.00,
      unit: 'AED',
      category: 'Financial'
    },
    {
      id: '5',
      name: 'Community Impact Score',
      value: 8.9,
      change: 6.7,
      trend: 'up',
      target: 8.5,
      unit: '/10',
      category: 'Impact'
    },
    {
      id: '6',
      name: 'Compliance Rating',
      value: 96,
      change: 1.1,
      trend: 'up',
      target: 95,
      unit: '%',
      category: 'Compliance'
    }
  ];

  const reportTypes = [
    { id: 'all', name: 'All Reports', icon: <FileText className="h-4 w-4" /> },
    { id: 'executive', name: 'Executive', icon: <Target className="h-4 w-4" /> },
    { id: 'operational', name: 'Operational', icon: <Users className="h-4 w-4" /> },
    { id: 'financial', name: 'Financial', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'impact', name: 'Impact', icon: <Award className="h-4 w-4" /> },
    { id: 'compliance', name: 'Compliance', icon: <CheckCircle className="h-4 w-4" /> }
  ];

  const filteredReports = reports.filter(report => 
    selectedReportType === 'all' || report.type === selectedReportType
  );

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'generating':
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'generating':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: ReportMetric['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const handleGenerateReport = (reportId: string) => {
    alert(`Generating report ${reportId}...`);
  };

  const handleDownloadReport = (reportId: string) => {
    alert(`Downloading report ${reportId}...`);
  };

  const handleScheduleReport = (reportId: string) => {
    alert(`Scheduling report ${reportId}...`);
  };

  const handleShareReport = (reportId: string) => {
    alert(`Sharing report ${reportId}...`);
  };

  const exportAllData = () => {
    alert('Exporting all data to comprehensive report...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Executive Reports</h1>
            <p className="text-gray-600">Generate comprehensive reports and analytics for stakeholders</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
              <option value="current-quarter">Current Quarter</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="current-year">Current Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <Button variant="outline" onClick={exportAllData}>
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
            <Button onClick={() => setShowScheduleDialog(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {keyMetrics.map(metric => (
            <Card key={metric.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                    <span className="text-sm text-gray-600 ml-1">{metric.unit}</span>
                  </div>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="text-sm text-gray-600 mb-2">{metric.name}</div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className={`font-medium ${
                    metric.change > 0 ? 'text-green-600' : 
                    metric.change < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  {metric.target && (
                    <span className="text-gray-500">
                      Target: {metric.target}{metric.unit}
                    </span>
                  )}
                </div>
                {metric.target && (
                  <Progress 
                    value={typeof metric.value === 'number' ? (metric.value / metric.target) * 100 : 0} 
                    className="h-1 mt-2" 
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Type Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {reportTypes.map(type => (
                <Button
                  key={type.id}
                  variant={selectedReportType === type.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedReportType(type.id)}
                  className="flex items-center space-x-2"
                >
                  {type.icon}
                  <span>{type.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredReports.map(report => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(report.status)}
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Report Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Type:</span>
                      <span className="ml-2 capitalize">{report.type}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Format:</span>
                      <span className="ml-2 uppercase">{report.format}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Frequency:</span>
                      <span className="ml-2 capitalize">{report.frequency}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Last Generated:</span>
                      <span className="ml-2">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Metrics:</h4>
                    <div className="flex flex-wrap gap-1">
                      {report.metrics.map((metric, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Recipients */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recipients:</h4>
                    <div className="text-sm text-gray-600">
                      {report.recipients.length} recipient{report.recipients.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-2 border-t">
                    {report.status === 'ready' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleDownloadReport(report.id)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleGenerateReport(report.id)}
                      disabled={report.status === 'generating'}
                    >
                      <RefreshCw className={`h-4 w-4 mr-1 ${report.status === 'generating' ? 'animate-spin' : ''}`} />
                      {report.status === 'generating' ? 'Generating...' : 'Generate'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShareReport(report.id)}
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleScheduleReport(report.id)}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Generation Trends</CardTitle>
              <CardDescription>Monthly report generation and download statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>Report generation trends chart</p>
                  <p className="text-sm">Showing monthly statistics</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Distribution</CardTitle>
              <CardDescription>Breakdown of report types and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTypes.slice(1).map(type => {
                  const count = reports.filter(r => r.type === type.id).length;
                  const percentage = (count / reports.length) * 100;
                  
                  return (
                    <div key={type.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {type.icon}
                        <span className="text-sm font-medium text-gray-700 capitalize">{type.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Report Activity</CardTitle>
            <CardDescription>Latest report generations and downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Generated', report: 'Executive Summary', user: 'Admin', time: '2024-03-20T08:00:00Z' },
                { action: 'Downloaded', report: 'Volunteer Engagement Report', user: 'HR Manager', time: '2024-03-19T18:30:00Z' },
                { action: 'Scheduled', report: 'Financial Impact Analysis', user: 'Finance Director', time: '2024-03-19T14:15:00Z' },
                { action: 'Shared', report: 'Community Impact Report', user: 'Communications Lead', time: '2024-03-18T16:45:00Z' },
                { action: 'Generated', report: 'Compliance & Audit Report', user: 'Legal Team', time: '2024-03-18T10:20:00Z' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-600"> {activity.action.toLowerCase()} </span>
                      <span className="font-medium">{activity.report}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(activity.time).toLocaleString()}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Custom Report Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Report Builder</CardTitle>
            <CardDescription>Create custom reports with specific metrics and filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Data Sources</h4>
                <div className="space-y-2">
                  {['Volunteers', 'Events', 'Organizations', 'Hours', 'Feedback', 'Certificates'].map(source => (
                    <div key={source} className="flex items-center space-x-2">
                      <input type="checkbox" id={source} className="h-4 w-4" />
                      <label htmlFor={source} className="text-sm text-gray-700">{source}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Metrics</h4>
                <div className="space-y-2">
                  {['Count', 'Average', 'Sum', 'Percentage', 'Growth Rate', 'Trend'].map(metric => (
                    <div key={metric} className="flex items-center space-x-2">
                      <input type="checkbox" id={metric} className="h-4 w-4" />
                      <label htmlFor={metric} className="text-sm text-gray-700">{metric}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Filters</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                      <option>Last year</option>
                      <option>Custom range</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                      <option>All Organizations</option>
                      <option>Green Initiative UAE</option>
                      <option>Emirates Food Bank</option>
                      <option>Future Leaders Foundation</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate Custom Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}