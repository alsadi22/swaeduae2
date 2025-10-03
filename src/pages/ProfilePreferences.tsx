import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, Palette, Clock, Eye, Moon, Sun, 
  Monitor, Languages, MapPin, Calendar,
  ArrowLeft, Settings, Accessibility, Volume2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserPreferences {
  language: {
    primary: 'en' | 'ar';
    fallback: 'en' | 'ar';
    autoDetect: boolean;
  };
  region: {
    country: string;
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    currency: string;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    fontSize: number;
    density: 'comfortable' | 'compact' | 'spacious';
    animations: boolean;
    reducedMotion: boolean;
  };
  accessibility: {
    highContrast: boolean;
    screenReader: boolean;
    keyboardNavigation: boolean;
    focusIndicators: boolean;
    soundEffects: boolean;
    vibration: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'volunteers' | 'private';
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
    allowOrganizationContact: boolean;
    shareStatistics: boolean;
  };
  volunteer: {
    defaultRadius: number;
    autoRSVP: boolean;
    reminderDefault: number;
    weekendAvailability: boolean;
    eveningAvailability: boolean;
    transportationPreference: string[];
    skillsVisibility: boolean;
  };
}

export default function ProfilePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    language: {
      primary: 'en',
      fallback: 'ar',
      autoDetect: true
    },
    region: {
      country: 'AE',
      timezone: 'Asia/Dubai',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      currency: 'AED'
    },
    display: {
      theme: 'system',
      fontSize: 16,
      density: 'comfortable',
      animations: true,
      reducedMotion: false
    },
    accessibility: {
      highContrast: false,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicators: true,
      soundEffects: true,
      vibration: true
    },
    privacy: {
      profileVisibility: 'volunteers',
      showEmail: false,
      showPhone: false,
      showLocation: true,
      allowOrganizationContact: true,
      shareStatistics: true
    },
    volunteer: {
      defaultRadius: 25,
      autoRSVP: false,
      reminderDefault: 2,
      weekendAvailability: true,
      eveningAvailability: false,
      transportationPreference: ['car', 'metro'],
      skillsVisibility: true
    }
  });

  const [selectedTab, setSelectedTab] = useState('language');
  const [saving, setSaving] = useState(false);

  const handleLanguageChange = (key: keyof typeof preferences.language, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      language: {
        ...prev.language,
        [key]: value
      }
    }));
  };

  const handleRegionChange = (key: keyof typeof preferences.region, value: string) => {
    setPreferences(prev => ({
      ...prev,
      region: {
        ...prev.region,
        [key]: value
      }
    }));
  };

  const handleDisplayChange = (key: keyof typeof preferences.display, value: string | number | boolean) => {
    setPreferences(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [key]: value
      }
    }));
  };

  const handleAccessibilityChange = (key: keyof typeof preferences.accessibility, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key: keyof typeof preferences.privacy, value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const handleVolunteerChange = (key: keyof typeof preferences.volunteer, value: string | number | boolean | string[]) => {
    setPreferences(prev => ({
      ...prev,
      volunteer: {
        ...prev.volunteer,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSaving(false);
    alert('Preferences saved successfully!');
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all preferences to default values?')) {
      // Reset logic would go here
      alert('Preferences reset to defaults');
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
              <h1 className="text-3xl font-bold text-gray-900">Preferences</h1>
              <p className="text-gray-600">Customize your SwaedUAE experience</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Preferences Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="region">Region</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
          </TabsList>

          <TabsContent value="language" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Languages className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle>Language & Localization</CardTitle>
                    <CardDescription>Choose your preferred language and localization settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Primary Language</Label>
                  <Select 
                    value={preferences.language.primary} 
                    onValueChange={(value) => handleLanguageChange('primary', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-1">Main language for the interface</p>
                </div>

                <div>
                  <Label>Fallback Language</Label>
                  <Select 
                    value={preferences.language.fallback} 
                    onValueChange={(value) => handleLanguageChange('fallback', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية (Arabic)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-1">Used when content is not available in primary language</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-detect Language</Label>
                    <p className="text-sm text-gray-600">Automatically detect language from browser settings</p>
                  </div>
                  <Switch
                    checked={preferences.language.autoDetect}
                    onCheckedChange={(checked) => handleLanguageChange('autoDetect', checked)}
                  />
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>RTL Support:</strong> Arabic language includes full right-to-left text direction and layout support.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="region" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <div>
                    <CardTitle>Regional Settings</CardTitle>
                    <CardDescription>Configure location, timezone, and format preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Country/Region</Label>
                    <Select 
                      value={preferences.region.country} 
                      onValueChange={(value) => handleRegionChange('country', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AE">United Arab Emirates</SelectItem>
                        <SelectItem value="SA">Saudi Arabia</SelectItem>
                        <SelectItem value="QA">Qatar</SelectItem>
                        <SelectItem value="KW">Kuwait</SelectItem>
                        <SelectItem value="BH">Bahrain</SelectItem>
                        <SelectItem value="OM">Oman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Timezone</Label>
                    <Select 
                      value={preferences.region.timezone} 
                      onValueChange={(value) => handleRegionChange('timezone', value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Dubai">Asia/Dubai (GMT+4)</SelectItem>
                        <SelectItem value="Asia/Riyadh">Asia/Riyadh (GMT+3)</SelectItem>
                        <SelectItem value="Asia/Qatar">Asia/Qatar (GMT+3)</SelectItem>
                        <SelectItem value="Asia/Kuwait">Asia/Kuwait (GMT+3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Date Format</Label>
                    <RadioGroup 
                      value={preferences.region.dateFormat} 
                      onValueChange={(value) => handleRegionChange('dateFormat', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="DD/MM/YYYY" id="date1" />
                        <Label htmlFor="date1">DD/MM/YYYY (15/03/2024)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="MM/DD/YYYY" id="date2" />
                        <Label htmlFor="date2">MM/DD/YYYY (03/15/2024)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="YYYY-MM-DD" id="date3" />
                        <Label htmlFor="date3">YYYY-MM-DD (2024-03-15)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Time Format</Label>
                    <RadioGroup 
                      value={preferences.region.timeFormat} 
                      onValueChange={(value) => handleRegionChange('timeFormat', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="12h" id="time1" />
                        <Label htmlFor="time1">12-hour (2:30 PM)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="24h" id="time2" />
                        <Label htmlFor="time2">24-hour (14:30)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Label>Currency</Label>
                  <Select 
                    value={preferences.region.currency} 
                    onValueChange={(value) => handleRegionChange('currency', value)}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AED">AED (د.إ) - UAE Dirham</SelectItem>
                      <SelectItem value="SAR">SAR (ر.س) - Saudi Riyal</SelectItem>
                      <SelectItem value="QAR">QAR (ر.ق) - Qatari Riyal</SelectItem>
                      <SelectItem value="USD">USD ($) - US Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Palette className="h-6 w-6 text-purple-600" />
                  <div>
                    <CardTitle>Display & Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the interface</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Theme</Label>
                  <RadioGroup 
                    value={preferences.display.theme} 
                    onValueChange={(value) => handleDisplayChange('theme', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="theme1" />
                      <Sun className="h-4 w-4" />
                      <Label htmlFor="theme1">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="theme2" />
                      <Moon className="h-4 w-4" />
                      <Label htmlFor="theme2">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="theme3" />
                      <Monitor className="h-4 w-4" />
                      <Label htmlFor="theme3">System (Auto)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Font Size</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={[preferences.display.fontSize]}
                      onValueChange={(value) => handleDisplayChange('fontSize', value[0])}
                      min={12}
                      max={24}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Small (12px)</span>
                      <span>Current: {preferences.display.fontSize}px</span>
                      <span>Large (24px)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Interface Density</Label>
                  <RadioGroup 
                    value={preferences.display.density} 
                    onValueChange={(value) => handleDisplayChange('density', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="density1" />
                      <Label htmlFor="density1">Compact - More content, less spacing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="comfortable" id="density2" />
                      <Label htmlFor="density2">Comfortable - Balanced spacing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="spacious" id="density3" />
                      <Label htmlFor="spacious3">Spacious - More spacing, easier reading</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Animations</Label>
                      <p className="text-sm text-gray-600">Enable smooth transitions and animations</p>
                    </div>
                    <Switch
                      checked={preferences.display.animations}
                      onCheckedChange={(checked) => handleDisplayChange('animations', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Reduced Motion</Label>
                      <p className="text-sm text-gray-600">Minimize motion for accessibility</p>
                    </div>
                    <Switch
                      checked={preferences.display.reducedMotion}
                      onCheckedChange={(checked) => handleDisplayChange('reducedMotion', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Accessibility className="h-6 w-6 text-orange-600" />
                  <div>
                    <CardTitle>Accessibility Options</CardTitle>
                    <CardDescription>Configure accessibility features for better usability</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>High Contrast Mode</Label>
                      <p className="text-sm text-gray-600">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      checked={preferences.accessibility.highContrast}
                      onCheckedChange={(checked) => handleAccessibilityChange('highContrast', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Screen Reader Support</Label>
                      <p className="text-sm text-gray-600">Optimize for screen reading software</p>
                    </div>
                    <Switch
                      checked={preferences.accessibility.screenReader}
                      onCheckedChange={(checked) => handleAccessibilityChange('screenReader', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Keyboard Navigation</Label>
                      <p className="text-sm text-gray-600">Enable full keyboard navigation</p>
                    </div>
                    <Switch
                      checked={preferences.accessibility.keyboardNavigation}
                      onCheckedChange={(checked) => handleAccessibilityChange('keyboardNavigation', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Focus Indicators</Label>
                      <p className="text-sm text-gray-600">Show clear focus outlines</p>
                    </div>
                    <Switch
                      checked={preferences.accessibility.focusIndicators}
                      onCheckedChange={(checked) => handleAccessibilityChange('focusIndicators', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Sound Effects</Label>
                      <p className="text-sm text-gray-600">Audio feedback for actions</p>
                    </div>
                    <Switch
                      checked={preferences.accessibility.soundEffects}
                      onCheckedChange={(checked) => handleAccessibilityChange('soundEffects', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Vibration Feedback</Label>
                      <p className="text-sm text-gray-600">Haptic feedback on mobile devices</p>
                    </div>
                    <Switch
                      checked={preferences.accessibility.vibration}
                      onCheckedChange={(checked) => handleAccessibilityChange('vibration', checked)}
                    />
                  </div>
                </div>

                <Alert className="border-orange-200 bg-orange-50">
                  <Accessibility className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>WCAG 2.1 AA Compliance:</strong> These settings help ensure the platform meets accessibility standards.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Eye className="h-6 w-6 text-red-600" />
                  <div>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control what information is visible to others</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Profile Visibility</Label>
                  <RadioGroup 
                    value={preferences.privacy.profileVisibility} 
                    onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="privacy1" />
                      <Label htmlFor="privacy1">Public - Visible to everyone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="volunteers" id="privacy2" />
                      <Label htmlFor="privacy2">Volunteers Only - Visible to other volunteers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="privacy3" />
                      <Label htmlFor="privacy3">Private - Only visible to you</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Contact Information Visibility</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Email Address</Label>
                        <p className="text-sm text-gray-600">Allow others to see your email</p>
                      </div>
                      <Switch
                        checked={preferences.privacy.showEmail}
                        onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Phone Number</Label>
                        <p className="text-sm text-gray-600">Allow others to see your phone</p>
                      </div>
                      <Switch
                        checked={preferences.privacy.showPhone}
                        onCheckedChange={(checked) => handlePrivacyChange('showPhone', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Location</Label>
                        <p className="text-sm text-gray-600">Show your city/emirate</p>
                      </div>
                      <Switch
                        checked={preferences.privacy.showLocation}
                        onCheckedChange={(checked) => handlePrivacyChange('showLocation', checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Communication & Data</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Organization Contact</Label>
                        <p className="text-sm text-gray-600">Organizations can contact you directly</p>
                      </div>
                      <Switch
                        checked={preferences.privacy.allowOrganizationContact}
                        onCheckedChange={(checked) => handlePrivacyChange('allowOrganizationContact', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Share Statistics</Label>
                        <p className="text-sm text-gray-600">Include your stats in platform analytics</p>
                      </div>
                      <Switch
                        checked={preferences.privacy.shareStatistics}
                        onCheckedChange={(checked) => handlePrivacyChange('shareStatistics', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteer" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Settings className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle>Volunteer Preferences</CardTitle>
                    <CardDescription>Configure your volunteer activity preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Default Search Radius</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={[preferences.volunteer.defaultRadius]}
                      onValueChange={(value) => handleVolunteerChange('defaultRadius', value[0])}
                      min={5}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>5 km</span>
                      <span>Current: {preferences.volunteer.defaultRadius} km</span>
                      <span>100 km</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Default Reminder Time</Label>
                  <Select 
                    value={preferences.volunteer.reminderDefault.toString()} 
                    onValueChange={(value) => handleVolunteerChange('reminderDefault', parseInt(value))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour before</SelectItem>
                      <SelectItem value="2">2 hours before</SelectItem>
                      <SelectItem value="4">4 hours before</SelectItem>
                      <SelectItem value="24">1 day before</SelectItem>
                      <SelectItem value="48">2 days before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Availability</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekend Availability</Label>
                        <p className="text-sm text-gray-600">Available for weekend events</p>
                      </div>
                      <Switch
                        checked={preferences.volunteer.weekendAvailability}
                        onCheckedChange={(checked) => handleVolunteerChange('weekendAvailability', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Evening Availability</Label>
                        <p className="text-sm text-gray-600">Available for evening events</p>
                      </div>
                      <Switch
                        checked={preferences.volunteer.eveningAvailability}
                        onCheckedChange={(checked) => handleVolunteerChange('eveningAvailability', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto-RSVP</Label>
                        <p className="text-sm text-gray-600">Automatically RSVP to matching events</p>
                      </div>
                      <Switch
                        checked={preferences.volunteer.autoRSVP}
                        onCheckedChange={(checked) => handleVolunteerChange('autoRSVP', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Skills Publicly</Label>
                        <p className="text-sm text-gray-600">Display your skills on your profile</p>
                      </div>
                      <Switch
                        checked={preferences.volunteer.skillsVisibility}
                        onCheckedChange={(checked) => handleVolunteerChange('skillsVisibility', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <Settings className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Smart Matching:</strong> These preferences help us recommend the most relevant volunteer opportunities for you.
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