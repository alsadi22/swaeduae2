import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Search, MessageCircle, Phone, Mail, Clock, Users, BookOpen,
  HelpCircle, Headphones, Video, FileText, ExternalLink, Send,
  CheckCircle, AlertTriangle, Info, Star, ThumbsUp, ChevronRight
} from 'lucide-react';

interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  availability: string;
  responseTime: string;
  action: string;
  featured: boolean;
}

interface HelpArticle {
  id: string;
  title: string;
  category: string;
  views: number;
  helpful: number;
  lastUpdated: string;
}

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  const supportOptions: SupportOption[] = [
    {
      id: '1',
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: <MessageCircle className="h-6 w-6" />,
      availability: '24/7',
      responseTime: 'Immediate',
      action: 'Start Chat',
      featured: true
    },
    {
      id: '2',
      title: 'Phone Support',
      description: 'Speak directly with a support specialist',
      icon: <Phone className="h-6 w-6" />,
      availability: 'Sun-Thu 9AM-6PM',
      responseTime: 'Immediate',
      action: 'Call Now',
      featured: true
    },
    {
      id: '3',
      title: 'Email Support',
      description: 'Send us a detailed message about your issue',
      icon: <Mail className="h-6 w-6" />,
      availability: '24/7',
      responseTime: 'Within 24 hours',
      action: 'Send Email',
      featured: false
    },
    {
      id: '4',
      title: 'Video Call Support',
      description: 'Schedule a video call for complex issues',
      icon: <Video className="h-6 w-6" />,
      availability: 'By appointment',
      responseTime: 'Same day',
      action: 'Schedule Call',
      featured: false
    },
    {
      id: '5',
      title: 'Community Forum',
      description: 'Get help from other volunteers and organizations',
      icon: <Users className="h-6 w-6" />,
      availability: '24/7',
      responseTime: 'Varies',
      action: 'Visit Forum',
      featured: false
    },
    {
      id: '6',
      title: 'Knowledge Base',
      description: 'Browse our comprehensive help articles',
      icon: <BookOpen className="h-6 w-6" />,
      availability: '24/7',
      responseTime: 'Immediate',
      action: 'Browse Articles',
      featured: false
    }
  ];

  const popularArticles: HelpArticle[] = [
    {
      id: '1',
      title: 'How to register as a volunteer',
      category: 'Getting Started',
      views: 15420,
      helpful: 1340,
      lastUpdated: '2024-03-20'
    },
    {
      id: '2',
      title: 'Troubleshooting check-in issues',
      category: 'Technical Support',
      views: 8930,
      helpful: 756,
      lastUpdated: '2024-03-18'
    },
    {
      id: '3',
      title: 'How to download your volunteer certificate',
      category: 'Certificates',
      views: 12650,
      helpful: 1120,
      lastUpdated: '2024-03-15'
    },
    {
      id: '4',
      title: 'Creating your first volunteer event',
      category: 'For Organizations',
      views: 6780,
      helpful: 590,
      lastUpdated: '2024-03-22'
    },
    {
      id: '5',
      title: 'Understanding volunteer hours tracking',
      category: 'Hours & Tracking',
      views: 9340,
      helpful: 820,
      lastUpdated: '2024-03-19'
    },
    {
      id: '6',
      title: 'Privacy and data protection',
      category: 'Privacy & Security',
      views: 4560,
      helpful: 410,
      lastUpdated: '2024-03-17'
    }
  ];

  const quickActions = [
    {
      title: 'Reset Password',
      description: 'Reset your account password',
      icon: <HelpCircle className="h-5 w-5" />,
      action: 'Reset Now'
    },
    {
      title: 'Update Profile',
      description: 'Change your profile information',
      icon: <Users className="h-5 w-5" />,
      action: 'Update Profile'
    },
    {
      title: 'Report a Bug',
      description: 'Report technical issues',
      icon: <AlertTriangle className="h-5 w-5" />,
      action: 'Report Bug'
    },
    {
      title: 'Request Feature',
      description: 'Suggest new features',
      icon: <Star className="h-5 w-5" />,
      action: 'Submit Request'
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Your message has been sent! We\'ll get back to you within 24 hours.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
      priority: 'medium'
    });
  };

  const handleSupportAction = (option: SupportOption) => {
    switch (option.id) {
      case '1':
        alert('Starting live chat...');
        break;
      case '2':
        alert('Calling +971 4 123 4567...');
        break;
      case '3':
        // Scroll to contact form
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '4':
        alert('Redirecting to scheduling page...');
        break;
      case '5':
        alert('Opening community forum...');
        break;
      case '6':
        alert('Opening knowledge base...');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the help you need to make the most of your volunteer experience
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles, guides, or common issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>
          </CardContent>
        </Card>

        {/* Support Options */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Support</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportOptions.map(option => (
              <Card 
                key={option.id} 
                className={`hover:shadow-lg transition-shadow cursor-pointer ${
                  option.featured ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => handleSupportAction(option)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      option.featured ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>Available: {option.availability}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Headphones className="h-3 w-3" />
                          <span>Response: {option.responseTime}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="mt-3 w-full"
                        variant={option.featured ? 'default' : 'outline'}
                      >
                        {option.action}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might need help with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button key={index} variant="outline" className="h-auto p-4 justify-start">
                  <div className="text-left">
                    <div className="flex items-center space-x-2 mb-1">
                      {action.icon}
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <div className="text-sm text-gray-500">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Help Articles</CardTitle>
            <CardDescription>Most viewed and helpful articles from our knowledge base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularArticles.map(article => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{article.views.toLocaleString()} views</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{article.helpful} helpful</span>
                      </span>
                      <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Articles
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card id="contact-form">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Can't find what you're looking for? Send us a message and we'll help you out.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <Input
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    value={contactForm.category}
                    onChange={(e) => setContactForm({...contactForm, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a category</option>
                    <option value="technical">Technical Support</option>
                    <option value="account">Account Issues</option>
                    <option value="events">Event Management</option>
                    <option value="certificates">Certificates</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Standard issue</option>
                    <option value="high">High - Urgent issue</option>
                    <option value="critical">Critical - System down</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <Input
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <Textarea
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Please provide detailed information about your issue, including any error messages and steps to reproduce the problem."
                  rows={6}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Before submitting:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Check our FAQ section for quick answers</li>
                      <li>Include relevant details like error messages or screenshots</li>
                      <li>For urgent issues, consider using live chat or phone support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  We typically respond within 24 hours
                </div>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-blue-600" />
                <span>Video Tutorials</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium">Getting Started with SwaedUAE</span>
                  <Badge variant="secondary">5:30</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium">How to Check In to Events</span>
                  <Badge variant="secondary">3:15</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium">Managing Your Volunteer Profile</span>
                  <Badge variant="secondary">7:45</Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Tutorials
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-green-600" />
                <span>Documentation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium">API Documentation</span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium">Integration Guides</span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer">
                  <span className="text-sm font-medium">Best Practices</span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Documentation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any questions or issues you may have.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone className="h-5 w-5" />
                <span>+971 4 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Mail className="h-5 w-5" />
                <span>support@swaed.ae</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Clock className="h-5 w-5" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}