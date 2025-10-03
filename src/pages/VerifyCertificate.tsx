import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, Search, Shield, CheckCircle, XCircle, Calendar, 
  User, Building, Clock, Award, QrCode, Download, Share2
} from 'lucide-react';

interface Certificate {
  id: string;
  volunteerName: string;
  organizationName: string;
  eventTitle: string;
  hoursCompleted: number;
  dateIssued: string;
  dateCompleted: string;
  certificateType: 'completion' | 'appreciation' | 'achievement';
  status: 'valid' | 'revoked' | 'expired';
  qrCode: string;
  verificationCode: string;
}

export default function VerifyCertificate() {
  const [searchCode, setSearchCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [error, setError] = useState('');

  // Mock certificate data
  const mockCertificates: Certificate[] = [
    {
      id: '1',
      volunteerName: 'Ahmed Al-Mansouri',
      organizationName: 'Red Crescent UAE',
      eventTitle: 'Community Health Awareness Campaign',
      hoursCompleted: 25,
      dateIssued: '2024-03-15T10:00:00Z',
      dateCompleted: '2024-03-10T18:00:00Z',
      certificateType: 'completion',
      status: 'valid',
      qrCode: 'QR123456789',
      verificationCode: 'CERT-2024-001-RC'
    },
    {
      id: '2',
      volunteerName: 'Fatima Al-Zahra',
      organizationName: 'Emirates Environmental Group',
      eventTitle: 'Beach Cleanup Initiative - Dubai Marina',
      hoursCompleted: 8,
      dateIssued: '2024-03-12T14:30:00Z',
      dateCompleted: '2024-03-11T16:00:00Z',
      certificateType: 'appreciation',
      status: 'valid',
      qrCode: 'QR987654321',
      verificationCode: 'CERT-2024-002-EEG'
    }
  ];

  const handleSearch = async () => {
    if (!searchCode.trim()) {
      setError('Please enter a certificate code or QR code');
      return;
    }

    setIsSearching(true);
    setError('');
    setCertificate(null);

    // Simulate API call
    setTimeout(() => {
      const found = mockCertificates.find(cert => 
        cert.verificationCode.toLowerCase() === searchCode.toLowerCase() ||
        cert.qrCode.toLowerCase() === searchCode.toLowerCase()
      );

      if (found) {
        setCertificate(found);
      } else {
        setError('Certificate not found. Please check the code and try again.');
      }
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'valid':
        return 'bg-green-100 text-green-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Certificate['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'revoked':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'expired':
        return <XCircle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCertificateTypeColor = (type: Certificate['certificateType']) => {
    switch (type) {
      case 'completion':
        return 'bg-blue-100 text-blue-800';
      case 'appreciation':
        return 'bg-purple-100 text-purple-800';
      case 'achievement':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <span className="text-xl font-bold text-gray-900">SwaedUAE</span>
                <div className="text-xs text-green-600 font-medium">UAE Volunteer Platform</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/opportunities" className="text-gray-600 hover:text-gray-900">Opportunities</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link to="/organizations" className="text-gray-600 hover:text-gray-900">Organizations</Link>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Join Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
            <Award className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify Certificate</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verify the authenticity of volunteer certificates issued through the SwaedUAE platform. 
            Enter the certificate code or scan the QR code to validate.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-6 w-6" />
              <span>Certificate Verification</span>
            </CardTitle>
            <CardDescription>
              Enter the certificate verification code or QR code to check its authenticity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter certificate code (e.g., CERT-2024-001-RC)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="text-lg py-3"
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isSearching}
                className="px-8"
              >
                {isSearching ? 'Verifying...' : 'Verify'}
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <QrCode className="h-4 w-4" />
                <span>QR Code supported</span>
              </div>
              <span>•</span>
              <span>Case insensitive</span>
            </div>

            {/* Sample codes for testing */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Sample Codes for Testing:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center justify-between">
                  <code className="bg-white px-2 py-1 rounded">CERT-2024-001-RC</code>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSearchCode('CERT-2024-001-RC')}
                  >
                    Use
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <code className="bg-white px-2 py-1 rounded">CERT-2024-002-EEG</code>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSearchCode('CERT-2024-002-EEG')}
                  >
                    Use
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Certificate Details */}
        {certificate && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(certificate.status)}
                  <span>Certificate Verified</span>
                </CardTitle>
                <Badge className={getStatusColor(certificate.status)}>
                  {certificate.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Certificate Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Volunteer Name</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{certificate.volunteerName}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Organization</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{certificate.organizationName}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Event/Activity</label>
                    <div className="font-semibold text-gray-900 mt-1">{certificate.eventTitle}</div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Certificate Type</label>
                    <div className="mt-1">
                      <Badge className={getCertificateTypeColor(certificate.certificateType)}>
                        {certificate.certificateType.charAt(0).toUpperCase() + certificate.certificateType.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Dates and Hours */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Hours Completed</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">{certificate.hoursCompleted} hours</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Date Completed</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {new Date(certificate.dateCompleted).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Date Issued</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {new Date(certificate.dateIssued).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">Verification Code</label>
                    <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                      {certificate.verificationCode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4 mt-6 pt-6 border-t">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Certificate</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Information Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How Verification Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</div>
                  <p>Each certificate is issued with a unique verification code</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                  <p>QR codes are generated for easy mobile verification</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
                  <p>All certificates are stored securely in our blockchain-based system</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">4</div>
                  <p>Verification is instant and available 24/7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certificate Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Tamper-proof digital certificates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Verified organization partnerships</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-green-600" />
                  <span>Recognized by UAE authorities</span>
                </div>
                <div className="flex items-center space-x-2">
                  <QrCode className="h-4 w-4 text-green-600" />
                  <span>QR code integration for mobile verification</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you're having trouble verifying a certificate or have questions about our verification process
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}