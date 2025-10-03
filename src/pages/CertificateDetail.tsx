import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, Calendar, Download, Share2, ExternalLink, ArrowLeft,
  CheckCircle, QrCode, Smartphone, Linkedin, Facebook, Twitter,
  Copy, Mail, MessageSquare, Eye, Shield, Verified, Globe
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

interface CertificateDetail {
  id: number;
  title: string;
  organization: string;
  organizationLogo: string;
  organizationWebsite: string;
  type: 'completion' | 'milestone' | 'achievement' | 'recognition';
  category: string;
  issuedDate: string;
  expiryDate?: string;
  hours: number;
  description: string;
  certificateNumber: string;
  verificationCode: string;
  qrCode: string;
  skills: string[];
  verified: boolean;
  shared: boolean;
  downloads: number;
  linkedInShared: boolean;
  signatoryName: string;
  signatoryTitle: string;
  signatorySignature: string;
  events: Array<{
    id: number;
    title: string;
    date: string;
    hours: number;
  }>;
  metadata: {
    issueDate: string;
    blockchainHash?: string;
    ipfsHash?: string;
    digitalSignature: string;
  };
}

export default function CertificateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState<CertificateDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('certificate');
  const [shareUrl, setShareUrl] = useState('');

  // Mock certificate data
  const mockCertificate: CertificateDetail = {
    id: parseInt(id || '1'),
    title: '50 Hours Milestone Achievement',
    organization: 'SwaedUAE Platform',
    organizationLogo: '/api/placeholder/80/80',
    organizationWebsite: 'https://swaeduae.ae',
    type: 'milestone',
    category: 'General',
    issuedDate: '2024-03-15',
    hours: 50,
    description: 'This certificate recognizes exceptional dedication and commitment to community service through volunteering. The recipient has demonstrated outstanding leadership and made significant contributions to various volunteer initiatives across the UAE.',
    certificateNumber: 'SWD-MLS-50-2024-001234',
    verificationCode: 'VER-2024-001234-ABC',
    qrCode: 'https://swaeduae.ae/verify/VER-2024-001234-ABC',
    skills: ['Commitment', 'Community Service', 'Leadership', 'Project Management', 'Teamwork'],
    verified: true,
    shared: true,
    downloads: 12,
    linkedInShared: true,
    signatoryName: 'Dr. Amina Al-Zahra',
    signatoryTitle: 'Director of Volunteer Programs',
    signatorySignature: '/api/placeholder/120/60',
    events: [
      { id: 1, title: 'Beach Cleanup Drive - Dubai Marina', date: '2024-03-15', hours: 4 },
      { id: 2, title: 'Food Distribution - Ramadan Initiative', date: '2024-03-10', hours: 3 },
      { id: 3, title: 'Children\'s Reading Program', date: '2024-03-08', hours: 3 },
      { id: 4, title: 'Senior Care Visit', date: '2024-03-05', hours: 3 },
      { id: 5, title: 'Tree Planting Campaign', date: '2024-02-28', hours: 4 }
    ],
    metadata: {
      issueDate: '2024-03-15T10:30:00Z',
      blockchainHash: '0x1234567890abcdef1234567890abcdef12345678',
      ipfsHash: 'QmX1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T',
      digitalSignature: 'SHA256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCertificate(mockCertificate);
      setShareUrl(`${window.location.origin}/certificates/${id}/public`);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleDownloadPDF = () => {
    alert('Downloading certificate as PDF...');
  };

  const handleDownloadWallet = () => {
    alert('Adding certificate to Apple Wallet / Google Pay...');
  };

  const handleShare = async (platform: string) => {
    const url = shareUrl;
    const text = `Check out my volunteer certificate: ${certificate?.title}`;
    
    switch (platform) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
        break;
      default:
        break;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return '🏆';
      case 'achievement':
        return '🏅';
      case 'recognition':
        return '👑';
      case 'completion':
        return '✅';
      default:
        return '🎖️';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-8 text-center">
            <Award className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Certificate Not Found</h2>
            <p className="text-gray-600 mb-4">The certificate you're looking for doesn't exist.</p>
            <Link to="/certificates">
              <Button>Back to Certificates</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/certificates">
              <Button variant="ghost" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Certificates</span>
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleDownloadPDF}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={handleDownloadWallet}>
                <Smartphone className="h-4 w-4 mr-2" />
                Add to Wallet
              </Button>
              <Button variant="outline" onClick={() => handleShare('copy')}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Certificate Preview */}
            <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={certificate.organizationLogo} alt={certificate.organization} />
                      <AvatarFallback>{certificate.organization.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{certificate.organization}</h2>
                      <p className="text-gray-600">Certificate of {certificate.type}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Certificate Title */}
                  <div>
                    <div className="text-6xl mb-4">{getTypeIcon(certificate.type)}</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{certificate.title}</h1>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                      {certificate.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Details */}
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Certificate Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Certificate #:</strong> {certificate.certificateNumber}</p>
                        <p><strong>Issued Date:</strong> {formatDate(certificate.issuedDate)}</p>
                        <p><strong>Hours Completed:</strong> {certificate.hours} hours</p>
                        <p><strong>Category:</strong> {certificate.category}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Verification</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Digitally Verified</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-blue-600" />
                          <span>Blockchain Secured</span>
                        </div>
                        <p><strong>Verification Code:</strong> {certificate.verificationCode}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Skills Demonstrated</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {certificate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Signature */}
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <img 
                        src={certificate.signatorySignature} 
                        alt="Signature" 
                        className="h-12 mb-2"
                      />
                      <p className="font-semibold text-gray-900">{certificate.signatoryName}</p>
                      <p className="text-sm text-gray-600">{certificate.signatoryTitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                        <QrCode className="h-12 w-12 text-gray-600" />
                      </div>
                      <p className="text-xs text-gray-500">Scan to verify</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="certificate">Certificate</TabsTrigger>
                <TabsTrigger value="events">Contributing Events</TabsTrigger>
                <TabsTrigger value="verification">Verification</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Contributing Events</CardTitle>
                    <CardDescription>
                      Events that contributed to earning this certificate
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {certificate.events.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-blue-600">{event.hours}h</div>
                            <p className="text-xs text-gray-500">contributed</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="verification" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Certificate Verification</CardTitle>
                    <CardDescription>
                      Technical details for certificate authenticity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Verification Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Certificate Number:</span>
                          <span className="font-mono">{certificate.certificateNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Verification Code:</span>
                          <span className="font-mono">{certificate.verificationCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Issue Timestamp:</span>
                          <span className="font-mono">{certificate.metadata.issueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Digital Signature:</span>
                          <span className="font-mono text-xs">{certificate.metadata.digitalSignature}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Blockchain Security</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Blockchain Hash:</span>
                          <span className="font-mono text-xs">{certificate.metadata.blockchainHash}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">IPFS Hash:</span>
                          <span className="font-mono text-xs">{certificate.metadata.ipfsHash}</span>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-green-200 bg-green-50">
                      <Verified className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        This certificate has been cryptographically verified and is permanently recorded on the blockchain.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleDownloadPDF} className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button onClick={handleDownloadWallet} variant="outline" className="w-full justify-start">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Add to Wallet
                </Button>
                <Button onClick={() => handleShare('copy')} variant="outline" className="w-full justify-start">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Public View
                </Button>
              </CardContent>
            </Card>

            {/* Share Options */}
            <Card>
              <CardHeader>
                <CardTitle>Share Certificate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => handleShare('linkedin')} 
                  variant="outline" 
                  className="w-full justify-start text-blue-700 border-blue-200"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Share on LinkedIn
                </Button>
                <Button 
                  onClick={() => handleShare('facebook')} 
                  variant="outline" 
                  className="w-full justify-start text-blue-600 border-blue-200"
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Share on Facebook
                </Button>
                <Button 
                  onClick={() => handleShare('twitter')} 
                  variant="outline" 
                  className="w-full justify-start text-blue-500 border-blue-200"
                >
                  <Twitter className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button 
                  onClick={() => handleShare('email')} 
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Share via Email
                </Button>
              </CardContent>
            </Card>

            {/* Certificate Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Certificate Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Downloads</span>
                  <span className="font-medium">{certificate.downloads}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Verification Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Shared</span>
                  <span className="font-medium">{certificate.shared ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">LinkedIn Shared</span>
                  <span className="font-medium">{certificate.linkedInShared ? 'Yes' : 'No'}</span>
                </div>
              </CardContent>
            </Card>

            {/* Organization Info */}
            <Card>
              <CardHeader>
                <CardTitle>Issuing Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={certificate.organizationLogo} alt={certificate.organization} />
                    <AvatarFallback>{certificate.organization.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{certificate.organization}</h4>
                    <p className="text-sm text-gray-600">Verified Organization</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}