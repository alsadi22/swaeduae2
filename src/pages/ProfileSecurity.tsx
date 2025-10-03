import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, Key, Smartphone, Eye, EyeOff, Copy, 
  CheckCircle, AlertCircle, ArrowLeft, Trash2,
  Download, RefreshCw, Clock, MapPin, Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'totp' | 'sms' | null;
  backupCodes: string[];
  lastPasswordChange: string;
  sessions: Array<{
    id: string;
    device: string;
    location: string;
    ipAddress: string;
    lastActive: string;
    current: boolean;
  }>;
  loginHistory: Array<{
    id: string;
    timestamp: string;
    device: string;
    location: string;
    ipAddress: string;
    success: boolean;
  }>;
}

export default function ProfileSecurity() {
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    twoFactorMethod: null,
    backupCodes: [],
    lastPasswordChange: '2024-02-15',
    sessions: [
      {
        id: '1',
        device: 'Chrome on MacBook Pro',
        location: 'Dubai, UAE',
        ipAddress: '192.168.1.100',
        lastActive: '2024-03-20T10:30:00Z',
        current: true
      },
      {
        id: '2',
        device: 'Safari on iPhone 14',
        location: 'Dubai, UAE',
        ipAddress: '192.168.1.101',
        lastActive: '2024-03-19T15:45:00Z',
        current: false
      },
      {
        id: '3',
        device: 'Chrome on Windows PC',
        location: 'Abu Dhabi, UAE',
        ipAddress: '10.0.0.50',
        lastActive: '2024-03-18T09:20:00Z',
        current: false
      }
    ],
    loginHistory: [
      {
        id: '1',
        timestamp: '2024-03-20T10:30:00Z',
        device: 'Chrome on MacBook Pro',
        location: 'Dubai, UAE',
        ipAddress: '192.168.1.100',
        success: true
      },
      {
        id: '2',
        timestamp: '2024-03-19T15:45:00Z',
        device: 'Safari on iPhone 14',
        location: 'Dubai, UAE',
        ipAddress: '192.168.1.101',
        success: true
      },
      {
        id: '3',
        timestamp: '2024-03-18T22:15:00Z',
        device: 'Unknown Device',
        location: 'Unknown Location',
        ipAddress: '203.0.113.1',
        success: false
      }
    ]
  });

  const [selectedTab, setSelectedTab] = useState('password');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [qrCode, setQrCode] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+971 50 123 4567');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSecurity(prev => ({
      ...prev,
      lastPasswordChange: new Date().toISOString()
    }));
    
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setLoading(false);
    alert('Password changed successfully!');
  };

  const handleEnable2FA = async (method: 'totp' | 'sms') => {
    setLoading(true);
    
    if (method === 'totp') {
      // Simulate QR code generation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setQrCode('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
    } else {
      // Simulate SMS sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Verification code sent to ${phoneNumber}`);
    }
    
    setLoading(false);
  };

  const handleConfirm2FA = async (method: 'totp' | 'sms') => {
    const code = method === 'totp' ? totpCode : smsCode;
    if (!code || code.length !== 6) {
      alert('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate backup codes
    const backupCodes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    
    setSecurity(prev => ({
      ...prev,
      twoFactorEnabled: true,
      twoFactorMethod: method,
      backupCodes
    }));
    
    setTotpCode('');
    setSmsCode('');
    setQrCode('');
    setLoading(false);
    
    alert('Two-factor authentication enabled successfully!');
  };

  const handleDisable2FA = async () => {
    if (!confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSecurity(prev => ({
      ...prev,
      twoFactorEnabled: false,
      twoFactorMethod: null,
      backupCodes: []
    }));
    
    setLoading(false);
    alert('Two-factor authentication disabled.');
  };

  const handleRevokeSession = async (sessionId: string) => {
    if (!confirm('Are you sure you want to revoke this session?')) {
      return;
    }

    setSecurity(prev => ({
      ...prev,
      sessions: prev.sessions.filter(session => session.id !== sessionId)
    }));
    
    alert('Session revoked successfully.');
  };

  const handleRevokeAllSessions = async () => {
    if (!confirm('Are you sure you want to revoke all other sessions? You will need to log in again on those devices.')) {
      return;
    }

    setSecurity(prev => ({
      ...prev,
      sessions: prev.sessions.filter(session => session.current)
    }));
    
    alert('All other sessions revoked successfully.');
  };

  const copyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Backup code copied to clipboard');
  };

  const downloadBackupCodes = () => {
    const content = security.backupCodes.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swaeduae-backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
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

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-blue-600', 'text-green-600'];
    
    return {
      level: levels[strength] || 'Very Weak',
      color: colors[strength] || 'text-red-600',
      percentage: (strength / 5) * 100
    };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

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
              <h1 className="text-3xl font-bold text-gray-900">Security Settings</h1>
              <p className="text-gray-600">Manage your account security and privacy</p>
            </div>
          </div>
        </div>

        {/* Security Status */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className={`h-8 w-8 ${security.twoFactorEnabled ? 'text-green-600' : 'text-orange-600'}`} />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Account Security: {security.twoFactorEnabled ? 'Strong' : 'Basic'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {security.twoFactorEnabled 
                      ? 'Two-factor authentication is enabled' 
                      : 'Consider enabling two-factor authentication for better security'
                    }
                  </p>
                </div>
              </div>
              {security.twoFactorEnabled && (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  2FA Enabled
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Security Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
            <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
            <TabsTrigger value="activity">Login Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="password" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Last changed: {formatDate(security.lastPasswordChange)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordForm.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className={passwordStrength.color}>
                          Password strength: {passwordStrength.level}
                        </span>
                        <span className="text-gray-500">{Math.round(passwordStrength.percentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            passwordStrength.percentage < 40 ? 'bg-red-500' :
                            passwordStrength.percentage < 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${passwordStrength.percentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
                  )}
                </div>

                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Password Requirements:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>At least 8 characters long</li>
                      <li>Contains uppercase and lowercase letters</li>
                      <li>Contains at least one number</li>
                      <li>Contains at least one special character</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handlePasswordChange} 
                  disabled={loading || !passwordForm.currentPassword || !passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword}
                  className="w-full"
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="2fa" className="space-y-6">
            {!security.twoFactorEnabled ? (
              <Card>
                <CardHeader>
                  <CardTitle>Enable Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* TOTP Setup */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="h-6 w-6 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Authenticator App (Recommended)</h4>
                          <p className="text-sm text-gray-600">Use Google Authenticator, Authy, or similar apps</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => handleEnable2FA('totp')}
                        disabled={loading}
                      >
                        {loading ? 'Setting up...' : 'Set Up'}
                      </Button>
                    </div>

                    {qrCode && (
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="bg-white p-4 rounded-lg inline-block">
                            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                              <p className="text-gray-500">QR Code</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Scan this QR code with your authenticator app
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="totpCode">Enter 6-digit code from your app</Label>
                          <Input
                            id="totpCode"
                            value={totpCode}
                            onChange={(e) => setTotpCode(e.target.value)}
                            placeholder="123456"
                            maxLength={6}
                          />
                        </div>

                        <Button 
                          onClick={() => handleConfirm2FA('totp')}
                          disabled={loading || totpCode.length !== 6}
                          className="w-full"
                        >
                          {loading ? 'Verifying...' : 'Verify & Enable'}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* SMS Setup */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Key className="h-6 w-6 text-green-600" />
                        <div>
                          <h4 className="font-medium">SMS Verification</h4>
                          <p className="text-sm text-gray-600">Receive codes via text message</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => handleEnable2FA('sms')}
                        disabled={loading}
                      >
                        {loading ? 'Sending...' : 'Set Up'}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="+971 50 123 4567"
                        />
                      </div>

                      <div>
                        <Label htmlFor="smsCode">Enter verification code</Label>
                        <Input
                          id="smsCode"
                          value={smsCode}
                          onChange={(e) => setSmsCode(e.target.value)}
                          placeholder="123456"
                          maxLength={6}
                        />
                      </div>

                      <Button 
                        onClick={() => handleConfirm2FA('sms')}
                        disabled={loading || smsCode.length !== 6}
                        className="w-full"
                      >
                        {loading ? 'Verifying...' : 'Verify & Enable'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* 2FA Status */}
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                        <div>
                          <h3 className="font-semibold text-green-900">
                            Two-Factor Authentication Enabled
                          </h3>
                          <p className="text-sm text-green-700">
                            Method: {security.twoFactorMethod === 'totp' ? 'Authenticator App' : 'SMS'}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={handleDisable2FA}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                      >
                        Disable 2FA
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Backup Codes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Backup Codes</CardTitle>
                    <CardDescription>
                      Save these codes in a safe place. You can use them to access your account if you lose your device.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-2">
                      {security.backupCodes.map((code, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded font-mono text-sm">
                          <span>{code}</span>
                          <button
                            onClick={() => copyBackupCode(code)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={downloadBackupCodes}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Codes
                      </Button>
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate New Codes
                      </Button>
                    </div>

                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        Each backup code can only be used once. Store them securely and don't share them with anyone.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>
                      Manage devices and browsers that are currently signed in to your account
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleRevokeAllSessions}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Revoke All Others
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {security.sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Monitor className="h-8 w-8 text-gray-400" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{session.device}</h4>
                            {session.current && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Current Session
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{session.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Last active: {formatDate(session.lastActive)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">IP: {session.ipAddress}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRevokeSession(session.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Login Activity</CardTitle>
                <CardDescription>
                  Recent login attempts and security events for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {security.loginHistory.map((login) => (
                    <div key={login.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${login.success ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{login.device}</h4>
                            <Badge variant={login.success ? 'default' : 'destructive'} className="text-xs">
                              {login.success ? 'Success' : 'Failed'}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{login.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(login.timestamp)}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">IP: {login.ipAddress}</p>
                        </div>
                      </div>
                      {!login.success && (
                        <Button variant="outline" size="sm">
                          Report Suspicious
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}