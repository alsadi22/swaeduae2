import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, FileText, Shield, Users, AlertTriangle, Scale } from 'lucide-react';

export default function Terms() {
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
              <a href="/terms" className="text-red-600 font-medium">Terms</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Scale className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            These terms govern your use of the SwaedUAE volunteer platform. 
            Please read them carefully before using our services.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: October 1, 2024
          </p>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <span>Acceptance of Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                By accessing and using SwaedUAE, you accept and agree to be bound by the terms and 
                provisions of this agreement. If you do not agree to abide by the above, please do 
                not use this service.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> These terms constitute a legally binding agreement between 
                  you and SwaedUAE. Your continued use of the platform indicates your acceptance of any 
                  updates to these terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-green-600" />
                <span>User Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Account Security</h4>
                <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                  <li>• Maintain the confidentiality of your login credentials</li>
                  <li>• Notify us immediately of any unauthorized account access</li>
                  <li>• Use strong passwords and enable two-factor authentication</li>
                  <li>• You are responsible for all activities under your account</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Accurate Information</h4>
                <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                  <li>• Provide truthful and accurate personal information</li>
                  <li>• Keep your profile information up to date</li>
                  <li>• Verify your identity when requested</li>
                  <li>• Report any changes to your contact information</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional Conduct</h4>
                <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                  <li>• Treat all users, organizations, and staff with respect</li>
                  <li>• Follow the code of conduct during volunteer activities</li>
                  <li>• Arrive on time and fulfill your volunteer commitments</li>
                  <li>• Report any issues or concerns promptly</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Volunteer Commitments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-600" />
                <span>Volunteer Commitments</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Event Participation</h4>
                <p className="text-gray-600 text-sm mb-2">
                  When you register for a volunteer event, you commit to:
                </p>
                <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                  <li>• Attend the event as scheduled or provide 24-hour notice of cancellation</li>
                  <li>• Follow all safety guidelines and instructions provided</li>
                  <li>• Use the check-in/check-out system accurately</li>
                  <li>• Complete the full duration of your volunteer commitment</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">No-Show Policy</h4>
                <p className="text-gray-600 text-sm">
                  Repeated no-shows without proper notice may result in temporary or permanent 
                  suspension from the platform. We understand emergencies occur, but consistent 
                  reliability is essential for our partner organizations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Organization Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-purple-600" />
                <span>Organization Responsibilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Verification Requirements</h4>
                <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                  <li>• Maintain valid UAE registration and licensing</li>
                  <li>• Provide accurate organization information and documentation</li>
                  <li>• Submit to periodic verification reviews</li>
                  <li>• Report any changes to legal status or operations</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Volunteer Safety</h4>
                <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                  <li>• Provide safe working environments for all volunteers</li>
                  <li>• Conduct proper safety briefings and training</li>
                  <li>• Maintain appropriate insurance coverage</li>
                  <li>• Report any incidents or injuries immediately</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Platform Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Acceptable Use</h4>
                <p className="text-gray-600 text-sm mb-2">You may use SwaedUAE to:</p>
                <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                  <li>• Find and register for volunteer opportunities</li>
                  <li>• Manage your volunteer activities and hours</li>
                  <li>• Communicate with organizations and other volunteers</li>
                  <li>• Access and share your volunteer certificates</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Prohibited Activities</h4>
                <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                  <li>• Using the platform for commercial or promotional purposes</li>
                  <li>• Sharing false or misleading information</li>
                  <li>• Attempting to access unauthorized areas or data</li>
                  <li>• Harassing, threatening, or discriminating against other users</li>
                  <li>• Violating any applicable laws or regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Platform Content</h4>
                <p className="text-gray-600 text-sm">
                  All content on SwaedUAE, including text, graphics, logos, and software, is owned by 
                  SwaedUAE or its licensors and is protected by UAE and international copyright laws.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">User Content</h4>
                <p className="text-gray-600 text-sm">
                  You retain ownership of content you submit to the platform but grant us a license to 
                  use, display, and distribute it as necessary to provide our services.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Liability and Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
                <span>Liability and Disclaimers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Service Availability</h4>
                <p className="text-gray-600 text-sm">
                  While we strive to maintain continuous service, SwaedUAE is provided "as is" without 
                  warranties of any kind. We do not guarantee uninterrupted access or error-free operation.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Volunteer Activities</h4>
                <p className="text-gray-600 text-sm">
                  SwaedUAE facilitates connections between volunteers and organizations but is not 
                  responsible for the conduct of volunteer activities or any incidents that may occur 
                  during such activities.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Third-Party Content</h4>
                <p className="text-gray-600 text-sm">
                  We are not responsible for content provided by organizations or other users. 
                  Users should verify information independently and report any concerns.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Account Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Voluntary Termination</h4>
                <p className="text-gray-600 text-sm">
                  You may terminate your account at any time by contacting our support team. 
                  Upon termination, you will lose access to your account and associated data.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Involuntary Termination</h4>
                <p className="text-gray-600 text-sm">
                  We reserve the right to suspend or terminate accounts that violate these terms, 
                  engage in fraudulent activity, or pose a risk to other users or organizations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-blue-600" />
                <span>Governing Law</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                These terms are governed by the laws of the United Arab Emirates. Any disputes 
                arising from these terms or your use of SwaedUAE will be resolved through the 
                UAE court system or through arbitration as appropriate.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Questions About These Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have questions about these terms of service, please contact our legal team:
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> legal@swaeduae.ae</p>
                  <p><strong>Phone:</strong> +971 4 XXX XXXX</p>
                  <p><strong>Address:</strong> Dubai Internet City, Building 3, Floor 12, Dubai, UAE</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Updates to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may update these terms from time to time to reflect changes in our services or 
                applicable laws. We will notify users of material changes via email or platform 
                notifications. Continued use of SwaedUAE after such changes constitutes acceptance 
                of the updated terms.
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
              Building a community of trust and transparency
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}