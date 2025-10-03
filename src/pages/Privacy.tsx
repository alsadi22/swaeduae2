import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Eye, Lock, FileText, Mail } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-gray-900">SwaedUAE</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                UAE Volunteer Platform
              </Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="/opportunities" className="text-gray-600 hover:text-gray-900">Opportunities</a>
              <a href="/about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <a href="/privacy" className="text-red-600 font-medium">Privacy</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how SwaedUAE collects, 
            uses, and protects your personal information.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: October 1, 2024
          </p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-blue-600" />
                <span>Information We Collect</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Name, email address, and phone number</li>
                  <li>• Emirates ID number (for verification purposes)</li>
                  <li>• Profile photo and emergency contact information</li>
                  <li>• Skills, interests, and volunteer preferences</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Activity Information</h4>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Volunteer event registrations and attendance</li>
                  <li>• Check-in/check-out times and locations</li>
                  <li>• Hours completed and certificates earned</li>
                  <li>• Communications with organizations and support</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Technical Information</h4>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Device information and IP address</li>
                  <li>• Browser type and operating system</li>
                  <li>• Location data (when using check-in features)</li>
                  <li>• Usage patterns and preferences</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-green-600" />
                <span>How We Use Your Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Service Delivery</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Match you with suitable volunteer opportunities</li>
                    <li>• Process event registrations and attendance</li>
                    <li>• Generate and verify certificates</li>
                    <li>• Facilitate communication with organizations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Platform Improvement</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Analyze usage patterns to improve features</li>
                    <li>• Personalize your volunteer experience</li>
                    <li>• Prevent fraud and ensure security</li>
                    <li>• Provide customer support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-6 w-6 text-yellow-600" />
                <span>Information Sharing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">With Organizations</h4>
                <p className="text-gray-600 text-sm">
                  We share necessary information with verified organizations when you register for their events, 
                  including your name, contact details, and relevant skills. Organizations are bound by strict 
                  confidentiality agreements.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">With Authorities</h4>
                <p className="text-gray-600 text-sm">
                  We may share information with UAE government authorities as required by law or to comply 
                  with legal processes, including for volunteer verification and certificate validation.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">We Never Sell Your Data</h4>
                <p className="text-gray-600 text-sm">
                  SwaedUAE does not sell, rent, or trade your personal information to third parties for 
                  commercial purposes. Your data is used solely to facilitate volunteer activities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-red-600" />
                <span>Data Security</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Safeguards</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• Encrypted database storage</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Multi-factor authentication options</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access Controls</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Role-based access permissions</li>
                    <li>• Regular access reviews and audits</li>
                    <li>• Employee background checks</li>
                    <li>• Confidentiality agreements</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-purple-600" />
                <span>Your Privacy Rights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access & Control</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• View and download your personal data</li>
                    <li>• Update or correct your information</li>
                    <li>• Delete your account and data</li>
                    <li>• Opt-out of non-essential communications</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Portability</h4>
                  <ul className="text-gray-600 space-y-1 text-sm">
                    <li>• Export your volunteer history</li>
                    <li>• Download certificates and records</li>
                    <li>• Transfer data to other platforms</li>
                    <li>• Request data in machine-readable formats</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Essential Cookies</h4>
                <p className="text-gray-600 text-sm">
                  We use essential cookies to maintain your login session and remember your preferences. 
                  These cookies are necessary for the platform to function properly.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Analytics Cookies</h4>
                <p className="text-gray-600 text-sm">
                  With your consent, we use analytics cookies to understand how you use our platform 
                  and improve our services. You can opt-out of these cookies at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                SwaedUAE welcomes young volunteers aged 16 and above. For volunteers under 18, 
                we require parental or guardian consent before collecting any personal information. 
                We take extra care to protect the privacy of young volunteers and comply with 
                UAE regulations regarding minors.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-6 w-6 text-blue-600" />
                <span>Contact Us</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have questions about this privacy policy or how we handle your personal information, 
                please contact our Data Protection Officer:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@swaeduae.ae</p>
                  <p><strong>Phone:</strong> +971 4 XXX XXXX</p>
                  <p><strong>Address:</strong> Dubai Internet City, Building 3, Floor 12, Dubai, UAE</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mt-4">
                We will respond to your privacy-related inquiries within 30 days.
              </p>
            </CardContent>
          </Card>

          {/* Updates to Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may update this privacy policy from time to time to reflect changes in our practices 
                or applicable laws. We will notify you of any material changes by email or through our platform. 
                Your continued use of SwaedUAE after such changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">SwaedUAE</span>
            </div>
            <p className="text-gray-400">
              Protecting your privacy while you make a difference
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}