import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, Mail, MessageSquare, Calendar, Award, 
  AlertCircle, CheckCircle, ArrowLeft, Smartphone,
  Clock, Users, MapPin, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationSettings {
  email: {
    enabled: boolean;
    frequency: 'immediate' | 'daily' | 'weekly';
    eventReminders: boolean;
    eventUpdates: boolean;
    hoursApproval: boolean;
    certificates: boolean;
    newsletter: boolean;
    marketing: boolean;
    organizationMessages: boolean;
    systemUpdates: boolean;
  };
  push: {
    enabled: boolean;
    eventReminders: boolean;
    eventUpdates: boolean;
    hoursApproval: boolean;
    certificates: boolean;
    organizationMessages: boolean;
    systemUpdates: boolean;
    reminderTiming: number; // hours before event
  };
  sms: {
    enabled: boolean;
    eventReminders: boolean;
    emergencyOnly: boolean;
    reminderTiming: number; // hours before event
  };
  digest: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    includeStats: boolean;
    includeOpportunities: boolean;
    includeCertificates: boolean;
  };
}

export default function ProfileNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      enabled: true,
      frequency: 'immediate',
      eventReminders: true,
      eventUpdates: true,
      hoursApproval: true,
      certificates: true,
      newsletter: true,
      marketing: false,
      organizationMessages: true,
      systemUpdates: true
    },
    push: {
      enabled: true,
      eventReminders: true,
      eventUpdates: false,
      hoursApproval: true,
      certificates: true,
      organizationMessages: false,
      systemUpdates: true,
      reminderTiming: 2
    },
    sms: {
      enabled: false,
      eventReminders: false,
      emergencyOnly: true,
      reminderTiming: 24
    },
    digest: {
      enabled: true,
      frequency: 'weekly',
      time: '09:00',
      includeStats: true,
      includeOpportunities: true,
      includeCertificates: true
    }
  });

  const [selectedTab, setSelectedTab] = useState('email');
  const [saving, setSaving] = useState(false);
  const [testingNotification, setTestingNotification] = useState(false);

  const handleEmailSettingChange = (key: keyof typeof settings.email, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      email: {
        ...prev.email,
        [key]: value
      }
    }));
  };

  const handlePushSettingChange = (key: keyof typeof settings.push, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      push: {
        ...prev.push,
        [key]: value
      }
    }));
  };

  const handleSmsSettingChange = (key: keyof typeof settings.sms, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      sms: {
        ...prev.sms,
        [key]: value
      }
    }));
  };

  const handleDigestSettingChange = (key: keyof typeof settings.digest, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      digest: {
        ...prev.digest,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    alert('Notification preferences saved successfully!');
  };

  const handleTestNotification = async (type: 'email' | 'push' | 'sms') => {
    setTestingNotification(true);
    // Simulate sending test notification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestingNotification(false);
    alert(`Test ${type} notification sent!`);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'push':
        return <Smartphone className="h-5 w-5" />;
      case 'sms':
        return <MessageSquare className="h-5 w-5" />;
      case 'digest':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Notification Preferences</h1>
              <p className="text-gray-600">Manage how and when you receive notifications</p>
            </div>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {/* Notification Status Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                settings.email.enabled ? 'bg-blue-100' : 'bg-gray-100'
              }`}>
                <Mail className={`h-6 w-6 ${settings.email.enabled ? 'text-blue-600' : 'text-gray-400'}`} />
              </div>
              <h3 className="font-medium">Email</h3>
              <Badge variant={settings.email.enabled ? 'default' : 'secondary'} className="text-xs">
                {settings.email.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                settings.push.enabled ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Smartphone className={`h-6 w-6 ${settings.push.enabled ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
              <h3 className="font-medium">Push</h3>
              <Badge variant={settings.push.enabled ? 'default' : 'secondary'} className="text-xs">
                {settings.push.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                settings.sms.enabled ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <MessageSquare className={`h-6 w-6 ${settings.sms.enabled ? 'text-purple-600' : 'text-gray-400'}`} />
              </div>
              <h3 className="font-medium">SMS</h3>
              <Badge variant={settings.sms.enabled ? 'default' : 'secondary'} className="text-xs">
                {settings.sms.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                settings.digest.enabled ? 'bg-orange-100' : 'bg-gray-100'
              }`}>
                <Calendar className={`h-6 w-6 ${settings.digest.enabled ? 'text-orange-600' : 'text-gray-400'}`} />
              </div>
              <h3 className="font-medium">Digest</h3>
              <Badge variant={settings.digest.enabled ? 'default' : 'secondary'} className="text-xs">
                {settings.digest.enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Notification Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="push">Push</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="digest">Digest</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <div>
                      <CardTitle>Email Notifications</CardTitle>
                      <CardDescription>Receive notifications via email</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.email.enabled}
                      onCheckedChange={(checked) => handleEmailSettingChange('enabled', checked)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTestNotification('email')}
                      disabled={!settings.email.enabled || testingNotification}
                    >
                      {testingNotification ? 'Sending...' : 'Test'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Email Frequency</Label>
                  <Select 
                    value={settings.email.frequency} 
                    onValueChange={(value) => handleEmailSettingChange('frequency', value)}
                    disabled={!settings.email.enabled}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Event Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Event Reminders</p>
                          <p className="text-sm text-gray-600">Upcoming events you've registered for</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email.eventReminders}
                        onCheckedChange={(checked) => handleEmailSettingChange('eventReminders', checked)}
                        disabled={!settings.email.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Event Updates</p>
                          <p className="text-sm text-gray-600">Changes to events you've registered for</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email.eventUpdates}
                        onCheckedChange={(checked) => handleEmailSettingChange('eventUpdates', checked)}
                        disabled={!settings.email.enabled}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Volunteer Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Hours Approval</p>
                          <p className="text-sm text-gray-600">When your volunteer hours are approved</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email.hoursApproval}
                        onCheckedChange={(checked) => handleEmailSettingChange('hoursApproval', checked)}
                        disabled={!settings.email.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Award className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Certificates</p>
                          <p className="text-sm text-gray-600">New certificates and achievements</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email.certificates}
                        onCheckedChange={(checked) => handleEmailSettingChange('certificates', checked)}
                        disabled={!settings.email.enabled}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Communication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Organization Messages</p>
                          <p className="text-sm text-gray-600">Messages from organizations you volunteer with</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email.organizationMessages}
                        onCheckedChange={(checked) => handleEmailSettingChange('organizationMessages', checked)}
                        disabled={!settings.email.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-gray-600">SwaedUAE newsletter and volunteer stories</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email.newsletter}
                        onCheckedChange={(checked) => handleEmailSettingChange('newsletter', checked)}
                        disabled={!settings.email.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">System Updates</p>
                          <p className="text-sm text-gray-600">Platform updates and maintenance notices</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email.systemUpdates}
                        onCheckedChange={(checked) => handleEmailSettingChange('systemUpdates', checked)}
                        disabled={!settings.email.enabled}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Marketing</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Marketing Communications</p>
                          <p className="text-sm text-gray-600">Promotional content and partner opportunities</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.email.marketing}
                        onCheckedChange={(checked) => handleEmailSettingChange('marketing', checked)}
                        disabled={!settings.email.enabled}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="push" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-6 w-6 text-green-600" />
                    <div>
                      <CardTitle>Push Notifications</CardTitle>
                      <CardDescription>Receive notifications on your mobile device</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.push.enabled}
                      onCheckedChange={(checked) => handlePushSettingChange('enabled', checked)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTestNotification('push')}
                      disabled={!settings.push.enabled || testingNotification}
                    >
                      {testingNotification ? 'Sending...' : 'Test'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-blue-200 bg-blue-50">
                  <Smartphone className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    Push notifications require the SwaedUAE mobile app. Download it from the App Store or Google Play.
                  </AlertDescription>
                </Alert>

                <div>
                  <Label>Event Reminder Timing</Label>
                  <Select 
                    value={settings.push.reminderTiming.toString()} 
                    onValueChange={(value) => handlePushSettingChange('reminderTiming', parseInt(value))}
                    disabled={!settings.push.enabled}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour before</SelectItem>
                      <SelectItem value="2">2 hours before</SelectItem>
                      <SelectItem value="4">4 hours before</SelectItem>
                      <SelectItem value="24">1 day before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Push Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Event Reminders</p>
                          <p className="text-sm text-gray-600">Upcoming events you've registered for</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.push.eventReminders}
                        onCheckedChange={(checked) => handlePushSettingChange('eventReminders', checked)}
                        disabled={!settings.push.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Event Updates</p>
                          <p className="text-sm text-gray-600">Changes to events you've registered for</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.push.eventUpdates}
                        onCheckedChange={(checked) => handlePushSettingChange('eventUpdates', checked)}
                        disabled={!settings.push.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Hours Approval</p>
                          <p className="text-sm text-gray-600">When your volunteer hours are approved</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.push.hoursApproval}
                        onCheckedChange={(checked) => handlePushSettingChange('hoursApproval', checked)}
                        disabled={!settings.push.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Award className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Certificates</p>
                          <p className="text-sm text-gray-600">New certificates and achievements</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.push.certificates}
                        onCheckedChange={(checked) => handlePushSettingChange('certificates', checked)}
                        disabled={!settings.push.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Users className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Organization Messages</p>
                          <p className="text-sm text-gray-600">Messages from organizations you volunteer with</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.push.organizationMessages}
                        onCheckedChange={(checked) => handlePushSettingChange('organizationMessages', checked)}
                        disabled={!settings.push.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">System Updates</p>
                          <p className="text-sm text-gray-600">Platform updates and maintenance notices</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.push.systemUpdates}
                        onCheckedChange={(checked) => handlePushSettingChange('systemUpdates', checked)}
                        disabled={!settings.push.enabled}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sms" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                    <div>
                      <CardTitle>SMS Notifications</CardTitle>
                      <CardDescription>Receive notifications via text message</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.sms.enabled}
                      onCheckedChange={(checked) => handleSmsSettingChange('enabled', checked)}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleTestNotification('sms')}
                      disabled={!settings.sms.enabled || testingNotification}
                    >
                      {testingNotification ? 'Sending...' : 'Test'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    SMS notifications may incur charges from your mobile provider. We recommend using SMS only for critical notifications.
                  </AlertDescription>
                </Alert>

                <div>
                  <Label>SMS Reminder Timing</Label>
                  <Select 
                    value={settings.sms.reminderTiming.toString()} 
                    onValueChange={(value) => handleSmsSettingChange('reminderTiming', parseInt(value))}
                    disabled={!settings.sms.enabled}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 hours before</SelectItem>
                      <SelectItem value="4">4 hours before</SelectItem>
                      <SelectItem value="24">1 day before</SelectItem>
                      <SelectItem value="48">2 days before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">SMS Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Event Reminders</p>
                          <p className="text-sm text-gray-600">Critical reminders for upcoming events</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.sms.eventReminders}
                        onCheckedChange={(checked) => handleSmsSettingChange('eventReminders', checked)}
                        disabled={!settings.sms.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Emergency Only</p>
                          <p className="text-sm text-gray-600">Only critical system alerts and emergencies</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.sms.emergencyOnly}
                        onCheckedChange={(checked) => handleSmsSettingChange('emergencyOnly', checked)}
                        disabled={!settings.sms.enabled}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="digest" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-6 w-6 text-orange-600" />
                    <div>
                      <CardTitle>Digest Notifications</CardTitle>
                      <CardDescription>Receive periodic summaries of your volunteer activity</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={settings.digest.enabled}
                    onCheckedChange={(checked) => handleDigestSettingChange('enabled', checked)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Digest Frequency</Label>
                    <Select 
                      value={settings.digest.frequency} 
                      onValueChange={(value) => handleDigestSettingChange('frequency', value)}
                      disabled={!settings.digest.enabled}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Delivery Time</Label>
                    <Select 
                      value={settings.digest.time} 
                      onValueChange={(value) => handleDigestSettingChange('time', value)}
                      disabled={!settings.digest.enabled}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="06:00">6:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Digest Content</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Volunteer Statistics</p>
                          <p className="text-sm text-gray-600">Hours completed, events attended, achievements</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.digest.includeStats}
                        onCheckedChange={(checked) => handleDigestSettingChange('includeStats', checked)}
                        disabled={!settings.digest.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">New Opportunities</p>
                          <p className="text-sm text-gray-600">Recommended volunteer opportunities</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.digest.includeOpportunities}
                        onCheckedChange={(checked) => handleDigestSettingChange('includeOpportunities', checked)}
                        disabled={!settings.digest.enabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Award className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">Certificates & Achievements</p>
                          <p className="text-sm text-gray-600">New certificates and milestone progress</p>
                        </div>
                      </div>
                      <Switch
                        checked={settings.digest.includeCertificates}
                        onCheckedChange={(checked) => handleDigestSettingChange('includeCertificates', checked)}
                        disabled={!settings.digest.enabled}
                      />
                    </div>
                  </div>
                </div>

                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Digest emails are a great way to stay updated on your volunteer journey without being overwhelmed by individual notifications.
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