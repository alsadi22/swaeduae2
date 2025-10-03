import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, Download, FileText, Users, Calendar, CheckCircle,
  AlertTriangle, XCircle, RefreshCw, Eye, Trash2, History,
  FileSpreadsheet, Database, ArrowRight, Clock, Settings
} from 'lucide-react';

interface ImportJob {
  id: string;
  type: 'volunteers' | 'events' | 'hours' | 'organizations';
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  totalRecords: number;
  processedRecords: number;
  successfulRecords: number;
  failedRecords: number;
  startTime: string;
  endTime?: string;
  errors: string[];
  warnings: string[];
}

interface ExportJob {
  id: string;
  type: 'volunteers' | 'events' | 'hours' | 'reports';
  format: 'csv' | 'xlsx' | 'json';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileName: string;
  fileSize?: string;
  recordCount: number;
  createdAt: string;
  expiresAt: string;
}

export default function OrgImports() {
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'templates' | 'history'>('import');
  const [selectedImportType, setSelectedImportType] = useState('volunteers');
  const [selectedExportType, setSelectedExportType] = useState('volunteers');
  const [selectedFormat, setSelectedFormat] = useState('csv');

  // Mock import jobs
  const importJobs: ImportJob[] = [
    {
      id: '1',
      type: 'volunteers',
      fileName: 'volunteers_march_2024.csv',
      status: 'completed',
      progress: 100,
      totalRecords: 150,
      processedRecords: 150,
      successfulRecords: 147,
      failedRecords: 3,
      startTime: '2024-03-20T10:30:00Z',
      endTime: '2024-03-20T10:32:15Z',
      errors: [
        'Row 23: Invalid email format (john.doe@invalid)',
        'Row 67: Missing required field: phone number',
        'Row 134: Duplicate volunteer ID: V12345'
      ],
      warnings: [
        'Row 45: Phone number format standardized',
        'Row 89: Address field truncated to fit database limits'
      ]
    },
    {
      id: '2',
      type: 'events',
      fileName: 'upcoming_events.xlsx',
      status: 'processing',
      progress: 65,
      totalRecords: 45,
      processedRecords: 29,
      successfulRecords: 28,
      failedRecords: 1,
      startTime: '2024-03-20T14:15:00Z',
      errors: [
        'Row 15: Invalid date format for event start time'
      ],
      warnings: []
    },
    {
      id: '3',
      type: 'hours',
      fileName: 'volunteer_hours_q1.csv',
      status: 'failed',
      progress: 0,
      totalRecords: 0,
      processedRecords: 0,
      successfulRecords: 0,
      failedRecords: 0,
      startTime: '2024-03-20T09:00:00Z',
      endTime: '2024-03-20T09:00:30Z',
      errors: [
        'File format not recognized',
        'Missing required headers: volunteer_id, event_id, hours'
      ],
      warnings: []
    }
  ];

  // Mock export jobs
  const exportJobs: ExportJob[] = [
    {
      id: '1',
      type: 'volunteers',
      format: 'csv',
      status: 'completed',
      fileName: 'volunteers_export_2024-03-20.csv',
      fileSize: '2.3 MB',
      recordCount: 1247,
      createdAt: '2024-03-20T11:00:00Z',
      expiresAt: '2024-03-27T11:00:00Z'
    },
    {
      id: '2',
      type: 'events',
      format: 'xlsx',
      status: 'processing',
      fileName: 'events_export_2024-03-20.xlsx',
      recordCount: 89,
      createdAt: '2024-03-20T14:30:00Z',
      expiresAt: '2024-03-27T14:30:00Z'
    },
    {
      id: '3',
      type: 'reports',
      format: 'json',
      status: 'completed',
      fileName: 'analytics_report_2024-03-20.json',
      fileSize: '856 KB',
      recordCount: 1,
      createdAt: '2024-03-20T08:45:00Z',
      expiresAt: '2024-03-27T08:45:00Z'
    }
  ];

  const importTypes = [
    { id: 'volunteers', name: 'Volunteers', icon: <Users className="h-4 w-4" /> },
    { id: 'events', name: 'Events', icon: <Calendar className="h-4 w-4" /> },
    { id: 'hours', name: 'Volunteer Hours', icon: <Clock className="h-4 w-4" /> },
    { id: 'organizations', name: 'Partner Organizations', icon: <Database className="h-4 w-4" /> }
  ];

  const exportTypes = [
    { id: 'volunteers', name: 'Volunteer Data' },
    { id: 'events', name: 'Event Data' },
    { id: 'hours', name: 'Hours & Attendance' },
    { id: 'reports', name: 'Analytics Reports' }
  ];

  const getStatusIcon = (status: ImportJob['status'] | ExportJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: ImportJob['status'] | ExportJob['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFileUpload = () => {
    alert('File upload initiated! Processing will begin shortly.');
  };

  const handleExport = () => {
    alert(`Export job created for ${selectedExportType} in ${selectedFormat} format!`);
  };

  const downloadTemplate = (type: string) => {
    alert(`Downloading ${type} template...`);
  };

  const downloadExport = (jobId: string) => {
    alert(`Downloading export file for job ${jobId}...`);
  };

  const retryImport = (jobId: string) => {
    alert(`Retrying import job ${jobId}...`);
  };

  const deleteJob = (jobId: string) => {
    alert(`Deleting job ${jobId}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Import & Export</h1>
            <p className="text-gray-600">Bulk import and export data with CSV, Excel, and JSON support</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <History className="h-4 w-4 mr-2" />
              View History
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'import' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('import')}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          <Button
            variant={activeTab === 'export' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('export')}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button
            variant={activeTab === 'templates' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('templates')}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('history')}
            className="flex-1"
          >
            <History className="h-4 w-4 mr-2" />
            Job History
          </Button>
        </div>

        {/* Import Tab */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            {/* Import Form */}
            <Card>
              <CardHeader>
                <CardTitle>Import Data</CardTitle>
                <CardDescription>Upload CSV, Excel, or JSON files to bulk import data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Data Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Data Type</label>
                  <div className="grid md:grid-cols-4 gap-3">
                    {importTypes.map(type => (
                      <Button
                        key={type.id}
                        variant={selectedImportType === type.id ? 'default' : 'outline'}
                        onClick={() => setSelectedImportType(type.id)}
                        className="flex items-center space-x-2 justify-start"
                      >
                        {type.icon}
                        <span>{type.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Upload File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-lg font-medium text-gray-900">Drop your file here or click to browse</p>
                      <p className="text-sm text-gray-600">Supports CSV, XLSX, and JSON files up to 10MB</p>
                      <Button onClick={handleFileUpload}>
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Import Options */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Import Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="skipDuplicates" className="h-4 w-4" defaultChecked />
                        <label htmlFor="skipDuplicates" className="text-sm text-gray-700">
                          Skip duplicate records
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="validateData" className="h-4 w-4" defaultChecked />
                        <label htmlFor="validateData" className="text-sm text-gray-700">
                          Validate data before import
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="sendNotifications" className="h-4 w-4" />
                        <label htmlFor="sendNotifications" className="text-sm text-gray-700">
                          Send notifications to imported volunteers
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Error Handling</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">On Error</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                          <option value="continue">Continue processing</option>
                          <option value="stop">Stop on first error</option>
                          <option value="skip">Skip invalid records</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Errors</label>
                        <input 
                          type="number" 
                          defaultValue={10}
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Import Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Active Import Jobs</CardTitle>
                <CardDescription>Monitor the progress of your import operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {importJobs.filter(job => job.status === 'processing' || job.status === 'pending').map(job => (
                    <div key={job.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(job.status)}
                          <div>
                            <h4 className="font-medium text-gray-900">{job.fileName}</h4>
                            <p className="text-sm text-gray-600 capitalize">{job.type} import</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{job.processedRecords} / {job.totalRecords} records</span>
                        </div>
                        <Progress value={job.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-green-600">{job.successfulRecords}</div>
                          <div className="text-gray-600">Successful</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-red-600">{job.failedRecords}</div>
                          <div className="text-gray-600">Failed</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-900">{job.totalRecords}</div>
                          <div className="text-gray-600">Total</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            {/* Export Form */}
            <Card>
              <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Generate and download data exports in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
                    <select
                      value={selectedExportType}
                      onChange={(e) => setSelectedExportType(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {exportTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select
                      value={selectedFormat}
                      onChange={(e) => setSelectedFormat(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="csv">CSV</option>
                      <option value="xlsx">Excel (XLSX)</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <Button onClick={handleExport} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Export
                    </Button>
                  </div>
                </div>

                {/* Export Options */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Export Options</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="includeHeaders" className="h-4 w-4" defaultChecked />
                        <label htmlFor="includeHeaders" className="text-sm text-gray-700">
                          Include column headers
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="includeArchived" className="h-4 w-4" />
                        <label htmlFor="includeArchived" className="text-sm text-gray-700">
                          Include archived records
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="anonymizeData" className="h-4 w-4" />
                        <label htmlFor="anonymizeData" className="text-sm text-gray-700">
                          Anonymize personal data
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input type="date" className="p-2 border border-gray-300 rounded-md text-sm" />
                          <input type="date" className="p-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Record Limit</label>
                        <input 
                          type="number" 
                          placeholder="Leave empty for all records"
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Exports</CardTitle>
                <CardDescription>Download your generated export files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exportJobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">{job.fileName}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="capitalize">{job.type} • {job.format.toUpperCase()}</span>
                            <span>{job.recordCount} records</span>
                            {job.fileSize && <span>{job.fileSize}</span>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        {job.status === 'completed' && (
                          <Button size="sm" onClick={() => downloadExport(job.id)}>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteJob(job.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import Templates</CardTitle>
                <CardDescription>Download CSV templates with the correct format and required fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {importTypes.map(type => (
                    <div key={type.id} className="border rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        {type.icon}
                        <h3 className="text-lg font-semibold text-gray-900">{type.name}</h3>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <p className="text-sm text-gray-600">
                          {type.id === 'volunteers' && 'Import volunteer profiles with contact information, skills, and preferences.'}
                          {type.id === 'events' && 'Bulk create events with dates, locations, and volunteer requirements.'}
                          {type.id === 'hours' && 'Import volunteer hours and attendance records for events.'}
                          {type.id === 'organizations' && 'Add partner organizations with contact details and collaboration history.'}
                        </p>
                        
                        <div className="text-xs text-gray-500">
                          <div className="font-medium mb-1">Required fields:</div>
                          <div>
                            {type.id === 'volunteers' && 'name, email, phone, skills'}
                            {type.id === 'events' && 'title, date, location, max_volunteers'}
                            {type.id === 'hours' && 'volunteer_id, event_id, hours, date'}
                            {type.id === 'organizations' && 'name, contact_email, type, location'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => downloadTemplate(type.id)}
                          className="flex-1"
                        >
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          Download CSV
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => downloadTemplate(type.id + '_xlsx')}
                          className="flex-1"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Download Excel
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Field Mapping Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Field Mapping Guide</CardTitle>
                <CardDescription>Understanding the required and optional fields for each data type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Important:</strong> Make sure your CSV files use UTF-8 encoding and comma separators. 
                      Date fields should be in YYYY-MM-DD format.
                    </AlertDescription>
                  </Alert>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-3 text-left">Field Name</th>
                          <th className="border border-gray-300 p-3 text-left">Type</th>
                          <th className="border border-gray-300 p-3 text-left">Required</th>
                          <th className="border border-gray-300 p-3 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 font-mono text-sm">name</td>
                          <td className="border border-gray-300 p-3">Text</td>
                          <td className="border border-gray-300 p-3">
                            <Badge className="bg-red-100 text-red-800">Required</Badge>
                          </td>
                          <td className="border border-gray-300 p-3">Full name of the volunteer</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-mono text-sm">email</td>
                          <td className="border border-gray-300 p-3">Email</td>
                          <td className="border border-gray-300 p-3">
                            <Badge className="bg-red-100 text-red-800">Required</Badge>
                          </td>
                          <td className="border border-gray-300 p-3">Valid email address</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-mono text-sm">phone</td>
                          <td className="border border-gray-300 p-3">Text</td>
                          <td className="border border-gray-300 p-3">
                            <Badge className="bg-blue-100 text-blue-800">Optional</Badge>
                          </td>
                          <td className="border border-gray-300 p-3">Phone number with country code</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-mono text-sm">skills</td>
                          <td className="border border-gray-300 p-3">Text</td>
                          <td className="border border-gray-300 p-3">
                            <Badge className="bg-blue-100 text-blue-800">Optional</Badge>
                          </td>
                          <td className="border border-gray-300 p-3">Comma-separated list of skills</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import/Export History</CardTitle>
                <CardDescription>Complete history of all import and export operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...importJobs, ...exportJobs].map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(job.status)}
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {'fileName' in job ? job.fileName : job.fileName}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="capitalize">
                              {job.type} • {'totalRecords' in job ? 'Import' : 'Export'}
                            </span>
                            <span>
                              {'totalRecords' in job 
                                ? `${job.successfulRecords}/${job.totalRecords} records`
                                : `${job.recordCount} records`
                              }
                            </span>
                            <span>
                              {new Date('startTime' in job ? job.startTime : job.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        {'errors' in job && job.status === 'failed' && (
                          <Button variant="outline" size="sm" onClick={() => retryImport(job.id)}>
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Retry
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteJob(job.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}