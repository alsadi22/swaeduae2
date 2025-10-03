import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, Shield, CheckCircle, XCircle, Calendar, 
  User, Building, Clock, Award, QrCode, Download, Share2, ArrowLeft
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

export default function QRVerify() {
  const [searchParams] = useSearchParams();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const code = searchParams.get('code') || searchParams.get('qr');
    
    if (code) {
      // Simulate API call
      setTimeout(() => {
        const found = mockCertificates.find(cert => 
          cert.verificationCode.toLowerCase() === code.toLowerCase() ||
          cert.qrCode.toLowerCase() === code.toLowerCase()
        );

        if (found) {
          setCertificate(found);
        } else {
          setError('Certificate not found. Please check the QR code and try again.');
        }
        setLoading(false);
      }, 1000);
    } else {
      setError('No verification code provided in QR scan.');
      setLoading(false);
    }
  }, [searchParams]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <QrCode className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Certificate</h2>
          <p className="text-gray-600">Please wait while we verify the QR code...</p>
        </div>
      </div>
    );
  }

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
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link to="/verify-certificate">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Manual Verify
                </Link>
              </Button>
              <Button asChild>
                <Link to="/">Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <QrCode className="h-12 w-12 text-blue-600" />
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Certificate Verification</h1>
          <p className="text-gray-600">
            Instant verification results from QR code scan
          </p>
        </div>

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
                  <span>Certificate Verified Successfully</span>
                </CardTitle>
                <Badge className={getStatusColor(certificate.status)}>
                  {certificate.status.toUpperCase()}
                </Badge>
              </div>
              <CardDescription>
                This certificate has been verified against our secure database
              </CardDescription>
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
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-6 pt-6 border-t">
                <Button variant="outline" className="flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download Certificate</span>
                </Button>
                <Button variant="outline" className="flex items-center justify-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share Certificate</span>
                </Button>
                <Button asChild className="flex items-center justify-center space-x-2">
                  <Link to="/verify-certificate">
                    <Shield className="h-4 w-4" />
                    <span>Verify Another</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Certificate Found */}
        {!certificate && !loading && (
          <Card>
            <CardContent className="text-center py-12">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certificate Not Found</h3>
              <p className="text-gray-600 mb-6">
                The QR code you scanned does not match any certificates in our database.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/verify-certificate">Try Manual Verification</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample QR Codes for Testing */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Test QR Verification</h3>
          <p className="text-gray-600 mb-4">
            Use these sample URLs to test the QR verification system:
          </p>
          <div className="space-y-2 text-sm">
            <div className="bg-white p-2 rounded border">
              <code>/qr/verify?code=CERT-2024-001-RC</code>
            </div>
            <div className="bg-white p-2 rounded border">
              <code>/qr/verify?qr=QR987654321</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}