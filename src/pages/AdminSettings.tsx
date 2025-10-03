import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, ArrowLeft, Save, RefreshCw, AlertTriangle, CheckCircle,
  Globe, Shield, Mail, MessageSquare, MapPin, Clock, Users,
  Database, Server, Key, Bell, Eye, EyeOff, Copy, TestTube
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SystemSettings {
  general: {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    adminEmail: string;
    supportEmail: string;
    defaultLanguage: 'en' | 'ar';
    timezone: string;
    dateFormat: string;
    currency: string;
  };
  geofencing: {
    defaultRadius: number;
    strictMode: boolean;
    allowManualOverride: boolean;
    fraudDetectionEnabled: boolean;
    speedThreshold: number;
    locationAccuracy: number;
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
    emailProvider: 'sendgrid' | 'ses' | 'mailgun';
    smsProvider: 'twilio' | 'nexmo' | 'local';
    emailApiKey: string;
    smsApiKey: string;
    fromEmail: string;
    fromName: string;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
    requireTwoFactor: boolean;
    allowedDomains: string[];
    ipWhitelist: string[];
    encryptionEnabled: boolean;
    auditLogRetention: number;
  };
  certificates: {
    autoIssue: boolean;
    requireApproval: boolean;
    watermarkEnabled: boolean;
    blockchainEnabled: boolean;
    serialNumberPrefix: string;
    validityPeriod: number;
    reminderDays: number;
  };
  integrations: {
    uaePassEnabled: boolean;
    emiratesIdEnabled: boolean;
    googleMapsApiKey: string;
    analyticsEnabled: boolean;
    analyticsId: string;
    socialLoginEnabled: boolean;
    backupEnabled: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
  };
  maintenance: {
    maintenanceMode: boolean;
    maintenanceMessage: string;
    allowedIps: string[];
    scheduledMaintenance?: string;
  };
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [testType, setTestType] = useState<'email' | 'sms' | 'geofence' | ''>('');

  // Mock current settings
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      siteName: 'SwaedUAE',
      siteDescription: 'Premier volunteer platform connecting individuals with meaningful opportunities across the UAE',
      siteUrl: 'https://swaed.ae',
      adminEmail: 'admin@swaed.ae',
      supportEmail: 'support@swaed.ae',
      defaultLanguage: 'en',
      timezone: 'Asia/Dubai',
      dateFormat: 'DD/MM/YYYY',
      currency: 'AED'
    },
    geofencing: {
      defaultRadius: 150,
      strictMode: true,
      allowManualOverride: true,
      fraudDetectionEnabled: true,
      speedThreshold: 50,
      locationAccuracy: 10
    },
    notifications: {
      emailEnabled: true,
      smsEnabled: true,
      pushEnabled: true,
      emailProvider: 'sendgrid',
      smsProvider: 'twilio',
      emailApiKey: 'SG.***************************',
      smsApiKey: 'AC***************************',
      fromEmail: 'noreply@swaed.ae',
      fromName: 'SwaedUAE'
    },
    security: {
      sessionTimeout: 120,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireTwoFactor: false,
      allowedDomains: ['swaed.ae', 'gov.ae'],
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      encryptionEnabled: true,
      auditLogRetention: 365
    },
    certificates: {
      autoIssue: false,
      requireApproval: true,
      watermarkEnabled: true,
      blockchainEnabled: true,
      serialNumberPrefix: 'UAE',
      validityPeriod: 0,
      reminderDays: 30
    },
    integrations: {
      uaePassEnabled: true,
      emiratesIdEnabled: true,
      googleMapsApiKey: 'AIza***************************',
      analyticsEnabled: true,
      analyticsId: 'GA-***********',
      socialLoginEnabled: true,
      backupEnabled: true,
      backupFrequency: 'daily'
    },
    maintenance: {
      maintenanceMode: false,
      maintenanceMessage: 'SwaedUAE is currently undergoing scheduled maintenance. We will be back shortly.',
      allowedIps: ['192.168.1.100', '10.0.0.1'],
      scheduledMaintenance: '2024-04-01T02:00:00Z'
    }
  });

  const handleSettingChange = (section: keyof SystemSettings, field: string, value: string | number | boolean | string[]) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    alert('Settings have been saved successfully!');
    setHasUnsavedChanges(false);
  };

  const handleTestService = (type: 'email' | 'sms' | 'geofence') => {
    setTestType(type);
    setShowTestDialog(true);
  };

  const handleRunTest = () => {
    // Simulate running test
    alert(`${testType} service test completed successfully!`);
    setShowTestDialog(false);
    setTestType('');
  };

  const toggleApiKeyVisibility = (key: string) => {
    setShowApiKey(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const maskApiKey = (key: string) => {
    if (!key) return '';
    const visibleChars = 4;
    return key.substring(0, visibleChars) + '*'.repeat(Math.max(0, key.length - visibleChars));
  };

  const timezones = [
    'Asia/Dubai',
    'Asia/Riyadh',
    'UTC',
    'Europe/London',
    'America/New_York'
  ];

  const currencies = ['AED', 'USD', 'EUR', 'GBP', 'SAR'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
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
              <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
              <p className="text-gray-600">Configure platform settings and integrations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasUnsavedChanges && (
              <Badge variant="destructive">Unsaved Changes</Badge>
            )}
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings} disabled={!hasUnsavedChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="geofencing">Geofencing</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              </TabsList>

              {/* General Settings */}
              <TabsContent value="general" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="siteName">Site Name</Label>
                        <Input
                          id="siteName"
                          value={settings.general.siteName}
                          onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="siteUrl">Site URL</Label>
                        <Input
                          id="siteUrl"
                          value={settings.general.siteUrl}
                          onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="adminEmail">Admin Email</Label>
                        <Input
                          id="adminEmail"
                          type="email"
                          value={settings.general.adminEmail}
                          onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="supportEmail">Support Email</Label>
                        <Input
                          id="supportEmail"
                          type="email"
                          value={settings.general.supportEmail}
                          onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="defaultLanguage">Default Language</Label>
                        <Select value={settings.general.defaultLanguage} onValueChange={(value: 'en' | 'ar') => handleSettingChange('general', 'defaultLanguage', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ar">Arabic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={settings.general.timezone} onValueChange={(value) => handleSettingChange('general', 'timezone', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {timezones.map((tz) => (
                              <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="dateFormat">Date Format</Label>
                        <Select value={settings.general.dateFormat} onValueChange={(value) => handleSettingChange('general', 'dateFormat', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={settings.general.currency} onValueChange={(value) => handleSettingChange('general', 'currency', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.general.siteDescription}
                      onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Geofencing Settings */}
              <TabsContent value="geofencing" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Geofencing & Location Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="defaultRadius">Default Radius (meters)</Label>
                        <Input
                          id="defaultRadius"
                          type="number"
                          value={settings.geofencing.defaultRadius}
                          onChange={(e) => handleSettingChange('geofencing', 'defaultRadius', parseInt(e.target.value))}
                        />
                        <p className="text-sm text-gray-600 mt-1">Default geofence radius for events</p>
                      </div>
                      <div>
                        <Label htmlFor="speedThreshold">Speed Threshold (km/h)</Label>
                        <Input
                          id="speedThreshold"
                          type="number"
                          value={settings.geofencing.speedThreshold}
                          onChange={(e) => handleSettingChange('geofencing', 'speedThreshold', parseInt(e.target.value))}
                        />
                        <p className="text-sm text-gray-600 mt-1">Maximum travel speed for fraud detection</p>
                      </div>
                      <div>
                        <Label htmlFor="locationAccuracy">Required Location Accuracy (meters)</Label>
                        <Input
                          id="locationAccuracy"
                          type="number"
                          value={settings.geofencing.locationAccuracy}
                          onChange={(e) => handleSettingChange('geofencing', 'locationAccuracy', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="strictMode"
                            checked={settings.geofencing.strictMode}
                            onChange={(e) => handleSettingChange('geofencing', 'strictMode', e.target.checked)}
                          />
                          <Label htmlFor="strictMode">Strict Mode</Label>
                        </div>
                        <p className="text-sm text-gray-600">Enforce strict geofencing rules</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="allowManualOverride"
                            checked={settings.geofencing.allowManualOverride}
                            onChange={(e) => handleSettingChange('geofencing', 'allowManualOverride', e.target.checked)}
                          />
                          <Label htmlFor="allowManualOverride">Allow Manual Override</Label>
                        </div>
                        <p className="text-sm text-gray-600">Allow admins to override geofencing restrictions</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="fraudDetectionEnabled"
                            checked={settings.geofencing.fraudDetectionEnabled}
                            onChange={(e) => handleSettingChange('geofencing', 'fraudDetectionEnabled', e.target.checked)}
                          />
                          <Label htmlFor="fraudDetectionEnabled">Fraud Detection</Label>
                        </div>
                        <p className="text-sm text-gray-600">Enable automatic fraud detection based on location and speed</p>
                      </div>
                      <Button variant="outline" onClick={() => handleTestService('geofence')}>
                        <TestTube className="h-4 w-4 mr-2" />
                        Test Geofencing
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                  <div className="space-y-6">
                    {/* Email Settings */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4 flex items-center">
                        <Mail className="h-5 w-5 mr-2" />
                        Email Notifications
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="emailEnabled"
                              checked={settings.notifications.emailEnabled}
                              onChange={(e) => handleSettingChange('notifications', 'emailEnabled', e.target.checked)}
                            />
                            <Label htmlFor="emailEnabled">Enable Email Notifications</Label>
                          </div>
                          <div>
                            <Label htmlFor="emailProvider">Email Provider</Label>
                            <Select value={settings.notifications.emailProvider} onValueChange={(value: 'sendgrid' | 'ses' | 'mailgun') => handleSettingChange('notifications', 'emailProvider', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sendgrid">SendGrid</SelectItem>
                                <SelectItem value="ses">Amazon SES</SelectItem>
                                <SelectItem value="mailgun">Mailgun</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="fromEmail">From Email</Label>
                            <Input
                              id="fromEmail"
                              type="email"
                              value={settings.notifications.fromEmail}
                              onChange={(e) => handleSettingChange('notifications', 'fromEmail', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fromName">From Name</Label>
                            <Input
                              id="fromName"
                              value={settings.notifications.fromName}
                              onChange={(e) => handleSettingChange('notifications', 'fromName', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="emailApiKey">API Key</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="emailApiKey"
                                type={showApiKey.email ? 'text' : 'password'}
                                value={showApiKey.email ? settings.notifications.emailApiKey : maskApiKey(settings.notifications.emailApiKey)}
                                onChange={(e) => handleSettingChange('notifications', 'emailApiKey', e.target.value)}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleApiKeyVisibility('email')}
                              >
                                {showApiKey.email ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => handleTestService('email')}>
                            <TestTube className="h-4 w-4 mr-2" />
                            Test Email
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* SMS Settings */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4 flex items-center">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        SMS Notifications
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="smsEnabled"
                              checked={settings.notifications.smsEnabled}
                              onChange={(e) => handleSettingChange('notifications', 'smsEnabled', e.target.checked)}
                            />
                            <Label htmlFor="smsEnabled">Enable SMS Notifications</Label>
                          </div>
                          <div>
                            <Label htmlFor="smsProvider">SMS Provider</Label>
                            <Select value={settings.notifications.smsProvider} onValueChange={(value: 'twilio' | 'nexmo' | 'local') => handleSettingChange('notifications', 'smsProvider', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="twilio">Twilio</SelectItem>
                                <SelectItem value="nexmo">Vonage (Nexmo)</SelectItem>
                                <SelectItem value="local">Local Provider</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="smsApiKey">SMS API Key</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="smsApiKey"
                                type={showApiKey.sms ? 'text' : 'password'}
                                value={showApiKey.sms ? settings.notifications.smsApiKey : maskApiKey(settings.notifications.smsApiKey)}
                                onChange={(e) => handleSettingChange('notifications', 'smsApiKey', e.target.value)}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleApiKeyVisibility('sms')}
                              >
                                {showApiKey.sms ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => handleTestService('sms')}>
                            <TestTube className="h-4 w-4 mr-2" />
                            Test SMS
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4 flex items-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Push Notifications
                      </h4>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="pushEnabled"
                          checked={settings.notifications.pushEnabled}
                          onChange={(e) => handleSettingChange('notifications', 'pushEnabled', e.target.checked)}
                        />
                        <Label htmlFor="pushEnabled">Enable Push Notifications</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={settings.security.sessionTimeout}
                          onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                        <Input
                          id="maxLoginAttempts"
                          type="number"
                          value={settings.security.maxLoginAttempts}
                          onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                        <Input
                          id="passwordMinLength"
                          type="number"
                          value={settings.security.passwordMinLength}
                          onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="auditLogRetention">Audit Log Retention (days)</Label>
                        <Input
                          id="auditLogRetention"
                          type="number"
                          value={settings.security.auditLogRetention}
                          onChange={(e) => handleSettingChange('security', 'auditLogRetention', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="requireTwoFactor"
                            checked={settings.security.requireTwoFactor}
                            onChange={(e) => handleSettingChange('security', 'requireTwoFactor', e.target.checked)}
                          />
                          <Label htmlFor="requireTwoFactor">Require Two-Factor Authentication</Label>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="encryptionEnabled"
                            checked={settings.security.encryptionEnabled}
                            onChange={(e) => handleSettingChange('security', 'encryptionEnabled', e.target.checked)}
                          />
                          <Label htmlFor="encryptionEnabled">Enable Data Encryption</Label>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="allowedDomains">Allowed Email Domains</Label>
                        <Textarea
                          id="allowedDomains"
                          value={settings.security.allowedDomains.join('\n')}
                          onChange={(e) => handleSettingChange('security', 'allowedDomains', e.target.value.split('\n').filter(Boolean))}
                          rows={3}
                          placeholder="swaed.ae&#10;gov.ae"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                        <Textarea
                          id="ipWhitelist"
                          value={settings.security.ipWhitelist.join('\n')}
                          onChange={(e) => handleSettingChange('security', 'ipWhitelist', e.target.value.split('\n').filter(Boolean))}
                          rows={3}
                          placeholder="192.168.1.0/24&#10;10.0.0.0/8"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Certificate Settings */}
              <TabsContent value="certificates" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Certificate Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="serialNumberPrefix">Serial Number Prefix</Label>
                        <Input
                          id="serialNumberPrefix"
                          value={settings.certificates.serialNumberPrefix}
                          onChange={(e) => handleSettingChange('certificates', 'serialNumberPrefix', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="validityPeriod">Validity Period (years, 0 = no expiry)</Label>
                        <Input
                          id="validityPeriod"
                          type="number"
                          value={settings.certificates.validityPeriod}
                          onChange={(e) => handleSettingChange('certificates', 'validityPeriod', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="reminderDays">Expiry Reminder (days before)</Label>
                        <Input
                          id="reminderDays"
                          type="number"
                          value={settings.certificates.reminderDays}
                          onChange={(e) => handleSettingChange('certificates', 'reminderDays', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="autoIssue"
                            checked={settings.certificates.autoIssue}
                            onChange={(e) => handleSettingChange('certificates', 'autoIssue', e.target.checked)}
                          />
                          <Label htmlFor="autoIssue">Auto-Issue Certificates</Label>
                        </div>
                        <p className="text-sm text-gray-600">Automatically issue certificates when events are completed</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="requireApproval"
                            checked={settings.certificates.requireApproval}
                            onChange={(e) => handleSettingChange('certificates', 'requireApproval', e.target.checked)}
                          />
                          <Label htmlFor="requireApproval">Require Admin Approval</Label>
                        </div>
                        <p className="text-sm text-gray-600">Require admin approval before issuing certificates</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="watermarkEnabled"
                            checked={settings.certificates.watermarkEnabled}
                            onChange={(e) => handleSettingChange('certificates', 'watermarkEnabled', e.target.checked)}
                          />
                          <Label htmlFor="watermarkEnabled">Enable Watermarks</Label>
                        </div>
                        <p className="text-sm text-gray-600">Add security watermarks to certificates</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="blockchainEnabled"
                            checked={settings.certificates.blockchainEnabled}
                            onChange={(e) => handleSettingChange('certificates', 'blockchainEnabled', e.target.checked)}
                          />
                          <Label htmlFor="blockchainEnabled">Blockchain Verification</Label>
                        </div>
                        <p className="text-sm text-gray-600">Store certificate hashes on blockchain for verification</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Integrations Settings */}
              <TabsContent value="integrations" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Third-Party Integrations</h3>
                  <div className="space-y-6">
                    {/* UAE Government Integrations */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">UAE Government Services</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="uaePassEnabled"
                              checked={settings.integrations.uaePassEnabled}
                              onChange={(e) => handleSettingChange('integrations', 'uaePassEnabled', e.target.checked)}
                            />
                            <Label htmlFor="uaePassEnabled">UAE Pass Integration</Label>
                          </div>
                          <p className="text-sm text-gray-600">Enable login via UAE Pass</p>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="emiratesIdEnabled"
                              checked={settings.integrations.emiratesIdEnabled}
                              onChange={(e) => handleSettingChange('integrations', 'emiratesIdEnabled', e.target.checked)}
                            />
                            <Label htmlFor="emiratesIdEnabled">Emirates ID Verification</Label>
                          </div>
                          <p className="text-sm text-gray-600">Verify user identity using Emirates ID</p>
                        </div>
                      </div>
                    </div>

                    {/* External Services */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">External Services</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="googleMapsApiKey">Google Maps API Key</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="googleMapsApiKey"
                                type={showApiKey.maps ? 'text' : 'password'}
                                value={showApiKey.maps ? settings.integrations.googleMapsApiKey : maskApiKey(settings.integrations.googleMapsApiKey)}
                                onChange={(e) => handleSettingChange('integrations', 'googleMapsApiKey', e.target.value)}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => toggleApiKeyVisibility('maps')}
                              >
                                {showApiKey.maps ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="analyticsId">Google Analytics ID</Label>
                            <Input
                              id="analyticsId"
                              value={settings.integrations.analyticsId}
                              onChange={(e) => handleSettingChange('integrations', 'analyticsId', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="analyticsEnabled"
                                checked={settings.integrations.analyticsEnabled}
                                onChange={(e) => handleSettingChange('integrations', 'analyticsEnabled', e.target.checked)}
                              />
                              <Label htmlFor="analyticsEnabled">Enable Analytics</Label>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="socialLoginEnabled"
                                checked={settings.integrations.socialLoginEnabled}
                                onChange={(e) => handleSettingChange('integrations', 'socialLoginEnabled', e.target.checked)}
                              />
                              <Label htmlFor="socialLoginEnabled">Social Media Login</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Backup Settings */}
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-4">Backup & Recovery</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="backupEnabled"
                              checked={settings.integrations.backupEnabled}
                              onChange={(e) => handleSettingChange('integrations', 'backupEnabled', e.target.checked)}
                            />
                            <Label htmlFor="backupEnabled">Enable Automated Backups</Label>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="backupFrequency">Backup Frequency</Label>
                          <Select value={settings.integrations.backupFrequency} onValueChange={(value: 'daily' | 'weekly' | 'monthly') => handleSettingChange('integrations', 'backupFrequency', value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Maintenance Settings */}
              <TabsContent value="maintenance" className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Maintenance Mode</h3>
                  <div className="space-y-6">
                    <Alert className={settings.maintenance.maintenanceMode ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}>
                      <AlertTriangle className={`h-4 w-4 ${settings.maintenance.maintenanceMode ? 'text-red-600' : 'text-blue-600'}`} />
                      <AlertDescription className={settings.maintenance.maintenanceMode ? 'text-red-800' : 'text-blue-800'}>
                        {settings.maintenance.maintenanceMode 
                          ? 'Maintenance mode is currently ENABLED. Only whitelisted IPs can access the platform.'
                          : 'Maintenance mode is currently disabled. The platform is accessible to all users.'
                        }
                      </AlertDescription>
                    </Alert>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="maintenanceMode"
                              checked={settings.maintenance.maintenanceMode}
                              onChange={(e) => handleSettingChange('maintenance', 'maintenanceMode', e.target.checked)}
                            />
                            <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                          </div>
                          <p className="text-sm text-gray-600">Restrict access to the platform during maintenance</p>
                        </div>
                        <div>
                          <Label htmlFor="scheduledMaintenance">Scheduled Maintenance</Label>
                          <Input
                            id="scheduledMaintenance"
                            type="datetime-local"
                            value={settings.maintenance.scheduledMaintenance ? settings.maintenance.scheduledMaintenance.slice(0, 16) : ''}
                            onChange={(e) => handleSettingChange('maintenance', 'scheduledMaintenance', e.target.value + ':00Z')}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="allowedIps">Allowed IPs During Maintenance</Label>
                          <Textarea
                            id="allowedIps"
                            value={settings.maintenance.allowedIps.join('\n')}
                            onChange={(e) => handleSettingChange('maintenance', 'allowedIps', e.target.value.split('\n').filter(Boolean))}
                            rows={4}
                            placeholder="192.168.1.100&#10;10.0.0.1"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="maintenanceMessage">Maintenance Message</Label>
                      <Textarea
                        id="maintenanceMessage"
                        value={settings.maintenance.maintenanceMessage}
                        onChange={(e) => handleSettingChange('maintenance', 'maintenanceMessage', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Test Service Dialog */}
        <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Test {testType} Service</DialogTitle>
              <DialogDescription>
                Run a test to verify the {testType} service configuration
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <TestTube className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  This will send a test {testType === 'geofence' ? 'geofence validation' : testType} to verify your configuration is working correctly.
                </AlertDescription>
              </Alert>

              {testType === 'email' && (
                <div>
                  <Label htmlFor="testEmail">Test Email Address</Label>
                  <Input
                    id="testEmail"
                    type="email"
                    placeholder="test@example.com"
                    defaultValue={settings.general.adminEmail}
                  />
                </div>
              )}

              {testType === 'sms' && (
                <div>
                  <Label htmlFor="testPhone">Test Phone Number</Label>
                  <Input
                    id="testPhone"
                    type="tel"
                    placeholder="+971501234567"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowTestDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleRunTest}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Run Test
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}