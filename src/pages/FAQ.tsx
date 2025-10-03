import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, ChevronDown, ChevronUp, Users, Calendar, Award, Shield,
  MapPin, Clock, Phone, Mail, Globe, Heart, Leaf, BookOpen,
  Briefcase, Star, HelpCircle, MessageCircle, FileText, Download
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  lastUpdated: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  count: number;
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const categories: FAQCategory[] = [
    {
      id: 'all',
      name: 'All Questions',
      icon: <HelpCircle className="h-5 w-5" />,
      description: 'Browse all frequently asked questions',
      count: 45
    },
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: <Users className="h-5 w-5" />,
      description: 'New to volunteering? Start here',
      count: 8
    },
    {
      id: 'events',
      name: 'Events & Opportunities',
      icon: <Calendar className="h-5 w-5" />,
      description: 'Finding and joining volunteer events',
      count: 12
    },
    {
      id: 'certificates',
      name: 'Certificates & Hours',
      icon: <Award className="h-5 w-5" />,
      description: 'Volunteer hours and certificate system',
      count: 7
    },
    {
      id: 'organizations',
      name: 'Organizations',
      icon: <Briefcase className="h-5 w-5" />,
      description: 'For organizations hosting events',
      count: 9
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: <Shield className="h-5 w-5" />,
      description: 'App features and troubleshooting',
      count: 6
    },
    {
      id: 'policies',
      name: 'Policies & Guidelines',
      icon: <FileText className="h-5 w-5" />,
      description: 'Terms, privacy, and community guidelines',
      count: 3
    }
  ];

  const faqItems: FAQItem[] = [
    // Getting Started
    {
      id: '1',
      question: 'How do I create a volunteer account on SwaedUAE?',
      answer: 'Creating an account is simple! Click "Sign Up" on our homepage, fill in your basic information including your Emirates ID, phone number, and email. You can also sign up using UAE Pass for instant verification. Once registered, complete your profile with your skills, interests, and availability to get personalized volunteer opportunity recommendations.',
      category: 'getting-started',
      tags: ['registration', 'account', 'uae-pass', 'emirates-id'],
      helpful: 234,
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      question: 'What documents do I need to start volunteering?',
      answer: 'You need a valid Emirates ID for identity verification. For certain events, you may need additional documents like a driving license, first aid certification, or educational certificates. Each event listing clearly states any special requirements. Minors (under 18) need parental consent and guardian contact information.',
      category: 'getting-started',
      tags: ['documents', 'emirates-id', 'requirements', 'minors'],
      helpful: 189,
      lastUpdated: '2024-03-12'
    },
    {
      id: '3',
      question: 'Is there a minimum age requirement for volunteering?',
      answer: 'The minimum age is 16 years for most volunteer opportunities. However, some events welcome younger volunteers (12-15 years) with parental supervision. Family-friendly events are clearly marked, and we have special programs for students and youth groups. Always check the specific age requirements listed for each event.',
      category: 'getting-started',
      tags: ['age', 'minors', 'family', 'students'],
      helpful: 156,
      lastUpdated: '2024-03-10'
    },
    {
      id: '4',
      question: 'How does the skill matching system work?',
      answer: 'Our AI-powered system matches your skills, interests, and availability with suitable volunteer opportunities. Complete your profile with your languages, professional skills, hobbies, and preferred causes. The system learns from your activity and feedback to provide increasingly relevant recommendations.',
      category: 'getting-started',
      tags: ['skills', 'matching', 'ai', 'recommendations'],
      helpful: 142,
      lastUpdated: '2024-03-08'
    },
    {
      id: '5',
      question: 'Can I volunteer as part of a group or team?',
      answer: 'Absolutely! We encourage group volunteering. You can register as a corporate team, student group, family, or friends. Group leaders can manage registrations for their team members and coordinate activities. Many events offer special group rates and team-building activities.',
      category: 'getting-started',
      tags: ['groups', 'teams', 'corporate', 'family'],
      helpful: 198,
      lastUpdated: '2024-03-14'
    },
    {
      id: '6',
      question: 'What types of volunteer opportunities are available?',
      answer: 'SwaedUAE offers diverse opportunities across environment, education, healthcare, community development, arts & culture, emergency response, and professional development. Activities range from beach cleanups and tree planting to teaching, elderly care, event management, and disaster relief.',
      category: 'getting-started',
      tags: ['types', 'categories', 'opportunities'],
      helpful: 267,
      lastUpdated: '2024-03-16'
    },
    {
      id: '7',
      question: 'How do I know if an organization is legitimate?',
      answer: 'All organizations on SwaedUAE undergo verification. Look for the "Verified" badge, which indicates the organization has provided proper documentation and meets our standards. You can also check their profile for ratings, reviews, and event history. Report any suspicious activity to our support team.',
      category: 'getting-started',
      tags: ['verification', 'safety', 'organizations', 'trust'],
      helpful: 178,
      lastUpdated: '2024-03-11'
    },
    {
      id: '8',
      question: 'What should I expect on my first volunteer event?',
      answer: 'Arrive on time at the specified location with required items. Check in using the app\'s QR code scanner or with event staff. You\'ll receive a brief orientation, safety instructions, and task assignments. Don\'t hesitate to ask questions - everyone is there to help! Remember to check out when leaving to record your volunteer hours.',
      category: 'getting-started',
      tags: ['first-time', 'check-in', 'orientation', 'expectations'],
      helpful: 203,
      lastUpdated: '2024-03-13'
    },

    // Events & Opportunities
    {
      id: '9',
      question: 'How do I find volunteer opportunities near me?',
      answer: 'Use our location-based search to find opportunities in your area. You can filter by distance, emirate, city, or specific locations. Enable location services for personalized recommendations. The map view shows all nearby events, and you can set up alerts for opportunities in your preferred areas.',
      category: 'events',
      tags: ['location', 'search', 'nearby', 'map'],
      helpful: 289,
      lastUpdated: '2024-03-17'
    },
    {
      id: '10',
      question: 'How far in advance can I register for events?',
      answer: 'You can register for events as soon as they\'re published, which can be up to 6 months in advance for major events. Most events open registration 2-4 weeks before the event date. Popular events fill up quickly, so register early! You\'ll receive reminders and updates as the event approaches.',
      category: 'events',
      tags: ['registration', 'advance', 'timing', 'deadlines'],
      helpful: 167,
      lastUpdated: '2024-03-09'
    },
    {
      id: '11',
      question: 'Can I cancel my registration if something comes up?',
      answer: 'Yes, you can cancel your registration through the app or website. Free cancellation is allowed up to 24 hours before the event. Late cancellations may affect your volunteer rating. Emergency cancellations are understood - just contact the event organizer or our support team.',
      category: 'events',
      tags: ['cancellation', 'policy', 'rating', 'emergency'],
      helpful: 145,
      lastUpdated: '2024-03-07'
    },
    {
      id: '12',
      question: 'What happens if an event is cancelled due to weather?',
      answer: 'Event organizers monitor weather conditions and will notify registered volunteers at least 12 hours in advance if an event is cancelled or postponed. You\'ll receive notifications via app, SMS, and email. Cancelled events don\'t affect your volunteer rating, and you can easily register for the rescheduled date.',
      category: 'events',
      tags: ['weather', 'cancellation', 'notifications', 'rescheduling'],
      helpful: 134,
      lastUpdated: '2024-03-06'
    },
    {
      id: '13',
      question: 'How does the check-in/check-out system work?',
      answer: 'Use the SwaedUAE app to check in when you arrive at the event location. The app uses GPS to verify you\'re within the event geofence (usually 150 meters). Scan the event QR code or use the app\'s check-in button. Don\'t forget to check out when leaving - this records your volunteer hours automatically.',
      category: 'events',
      tags: ['check-in', 'gps', 'geofence', 'qr-code', 'hours'],
      helpful: 198,
      lastUpdated: '2024-03-14'
    },
    {
      id: '14',
      question: 'What if I can\'t check in due to GPS or technical issues?',
      answer: 'If you experience technical difficulties, inform the event coordinator immediately. They can manually check you in using your registration details. For future events, ensure your app is updated and location services are enabled. Offline check-in options are available for areas with poor connectivity.',
      category: 'events',
      tags: ['technical-issues', 'gps', 'manual', 'offline'],
      helpful: 123,
      lastUpdated: '2024-03-05'
    },
    {
      id: '15',
      question: 'Can I bring friends or family who aren\'t registered?',
      answer: 'Only registered volunteers can participate in events for safety and insurance reasons. However, your friends and family can register on the spot if there are available spaces and the event allows walk-in registrations. Family events welcome all ages with proper registration.',
      category: 'events',
      tags: ['friends', 'family', 'walk-in', 'registration', 'safety'],
      helpful: 176,
      lastUpdated: '2024-03-12'
    },
    {
      id: '16',
      question: 'How do I know what to wear or bring to an event?',
      answer: 'Each event listing includes detailed information about dress code, required items, and what\'s provided. Check the "What to Bring" and "What\'s Provided" sections. Common items include comfortable shoes, sun protection, water bottle, and any specific tools or clothing. When in doubt, contact the event organizer.',
      category: 'events',
      tags: ['dress-code', 'items', 'preparation', 'clothing'],
      helpful: 187,
      lastUpdated: '2024-03-13'
    },
    {
      id: '17',
      question: 'Are meals and refreshments provided at events?',
      answer: 'This varies by event and is clearly stated in the event details. Many full-day events provide meals and refreshments, while shorter events may offer snacks and water. If you have dietary restrictions, mention them during registration or contact the organizer in advance.',
      category: 'events',
      tags: ['meals', 'refreshments', 'dietary', 'food'],
      helpful: 154,
      lastUpdated: '2024-03-10'
    },
    {
      id: '18',
      question: 'How do I rate and review an event after participating?',
      answer: 'After checking out, you\'ll receive a notification to rate your experience. Rate the event, organization, and overall experience on a 5-star scale. Your feedback helps improve future events and assists other volunteers in choosing opportunities. Constructive reviews are highly valued by organizers.',
      category: 'events',
      tags: ['rating', 'review', 'feedback', 'experience'],
      helpful: 165,
      lastUpdated: '2024-03-11'
    },
    {
      id: '19',
      question: 'Can I volunteer for multiple shifts of the same event?',
      answer: 'Yes, if the event has multiple shifts and capacity allows, you can register for additional shifts. Some events encourage multi-shift volunteers and may offer special recognition. Check with the event organizer about availability and any requirements for extended participation.',
      category: 'events',
      tags: ['multiple-shifts', 'extended', 'availability'],
      helpful: 132,
      lastUpdated: '2024-03-08'
    },
    {
      id: '20',
      question: 'What safety measures are in place during events?',
      answer: 'All events follow strict safety protocols including risk assessments, safety briefings, first aid availability, and emergency procedures. Event organizers are trained in safety management, and insurance coverage is provided. Report any safety concerns immediately to event staff or through the app.',
      category: 'events',
      tags: ['safety', 'protocols', 'first-aid', 'insurance', 'emergency'],
      helpful: 201,
      lastUpdated: '2024-03-15'
    },

    // Certificates & Hours
    {
      id: '21',
      question: 'How are my volunteer hours calculated and recorded?',
      answer: 'Hours are automatically calculated based on your check-in and check-out times using GPS verification. The system records your actual time on-site within the event geofence. Hours are verified by event organizers and added to your profile within 24-48 hours after the event.',
      category: 'certificates',
      tags: ['hours', 'calculation', 'gps', 'verification'],
      helpful: 256,
      lastUpdated: '2024-03-16'
    },
    {
      id: '22',
      question: 'When will I receive my volunteer certificate?',
      answer: 'Certificates are issued automatically after event completion and hour verification. Digital certificates are available immediately in your profile, while printed certificates (if requested) are mailed within 5-7 business days. Some events offer instant certificate generation upon check-out.',
      category: 'certificates',
      tags: ['certificate', 'timing', 'digital', 'printed'],
      helpful: 234,
      lastUpdated: '2024-03-14'
    },
    {
      id: '23',
      question: 'Are SwaedUAE certificates recognized officially?',
      answer: 'Yes, our certificates are recognized by UAE government entities, educational institutions, and many employers. They include blockchain verification for authenticity and can be verified online using the certificate number. We partner with official bodies to ensure recognition and credibility.',
      category: 'certificates',
      tags: ['recognition', 'official', 'blockchain', 'verification', 'government'],
      helpful: 298,
      lastUpdated: '2024-03-18'
    },
    {
      id: '24',
      question: 'Can I get a certificate for partial participation?',
      answer: 'Certificates are issued for completed volunteer activities. If you participate for less than the full event duration, you\'ll receive hours for actual time contributed, but certificate eligibility depends on the specific event requirements. Some events have minimum hour requirements for certification.',
      category: 'certificates',
      tags: ['partial', 'completion', 'requirements', 'minimum-hours'],
      helpful: 167,
      lastUpdated: '2024-03-12'
    },
    {
      id: '25',
      question: 'How do I share my certificates on LinkedIn or social media?',
      answer: 'Each certificate includes social sharing buttons for LinkedIn, Facebook, Twitter, and Instagram. For LinkedIn, use the "Add to Profile" feature to include it in your volunteer experience section. High-resolution images are available for professional portfolios and job applications.',
      category: 'certificates',
      tags: ['sharing', 'linkedin', 'social-media', 'portfolio'],
      helpful: 189,
      lastUpdated: '2024-03-13'
    },
    {
      id: '26',
      question: 'What if there\'s an error in my volunteer hours or certificate?',
      answer: 'Contact our support team immediately if you notice any discrepancies. Provide your event details and expected hours. We\'ll investigate with the event organizer and make corrections within 2-3 business days. Corrected certificates are reissued automatically.',
      category: 'certificates',
      tags: ['errors', 'corrections', 'support', 'investigation'],
      helpful: 145,
      lastUpdated: '2024-03-10'
    },
    {
      id: '27',
      question: 'Do I get different certificates for different types of volunteer work?',
      answer: 'Yes, certificates are customized based on the type of volunteer work, organization, and event category. Environmental events, educational programs, healthcare support, and emergency response each have specialized certificate templates that reflect the specific contribution made.',
      category: 'certificates',
      tags: ['types', 'customized', 'categories', 'specialized'],
      helpful: 178,
      lastUpdated: '2024-03-11'
    },

    // Organizations
    {
      id: '28',
      question: 'How can my organization join SwaedUAE?',
      answer: 'Organizations can apply through our "For Organizations" page. You\'ll need to provide registration documents, contact information, and details about your mission. The verification process takes 3-5 business days. Once approved, you can create events and manage volunteers through our organization portal.',
      category: 'organizations',
      tags: ['joining', 'application', 'verification', 'documents'],
      helpful: 212,
      lastUpdated: '2024-03-15'
    },
    {
      id: '29',
      question: 'What documents are required for organization verification?',
      answer: 'You need a valid trade license, organization registration certificate, authorized signatory identification, and contact verification. Non-profits should provide their charity registration. Government entities need official authorization letters. All documents are securely stored and verified by our team.',
      category: 'organizations',
      tags: ['documents', 'verification', 'trade-license', 'registration'],
      helpful: 187,
      lastUpdated: '2024-03-13'
    },
    {
      id: '30',
      question: 'Is there a fee for organizations to use SwaedUAE?',
      answer: 'Basic organization accounts are free and include event creation, volunteer management, and basic analytics. Premium features like advanced analytics, custom branding, and priority support are available through paid plans. Contact our team for enterprise pricing and custom solutions.',
      category: 'organizations',
      tags: ['fees', 'pricing', 'premium', 'enterprise'],
      helpful: 234,
      lastUpdated: '2024-03-16'
    },
    {
      id: '31',
      question: 'How do we manage volunteer applications and approvals?',
      answer: 'Use the organization dashboard to review volunteer applications, check profiles, and approve or decline registrations. You can set automatic approval criteria or manually review each application. Communication tools help you message volunteers and send updates about events.',
      category: 'organizations',
      tags: ['applications', 'approvals', 'dashboard', 'management'],
      helpful: 198,
      lastUpdated: '2024-03-14'
    },
    {
      id: '32',
      question: 'Can we track volunteer hours and generate reports?',
      answer: 'Yes, comprehensive reporting tools provide volunteer hours tracking, attendance reports, impact metrics, and volunteer feedback analysis. Export data in various formats for internal reporting, grant applications, or compliance requirements. Real-time dashboards show event performance.',
      category: 'organizations',
      tags: ['tracking', 'reports', 'analytics', 'export'],
      helpful: 223,
      lastUpdated: '2024-03-17'
    },
    {
      id: '33',
      question: 'How do we ensure volunteer safety and insurance coverage?',
      answer: 'SwaedUAE provides basic insurance coverage for registered volunteers during official events. Organizations should conduct risk assessments, provide safety briefings, and maintain first aid capabilities. Additional insurance can be arranged for high-risk activities through our insurance partners.',
      category: 'organizations',
      tags: ['safety', 'insurance', 'risk-assessment', 'coverage'],
      helpful: 267,
      lastUpdated: '2024-03-18'
    },
    {
      id: '34',
      question: 'Can we customize certificates for our organization?',
      answer: 'Premium organization accounts can customize certificate templates with their logo, branding, and specific messaging. Custom templates must be approved to ensure quality and authenticity. Digital signatures and blockchain verification are included in all certificates.',
      category: 'organizations',
      tags: ['customization', 'certificates', 'branding', 'templates'],
      helpful: 156,
      lastUpdated: '2024-03-12'
    },
    {
      id: '35',
      question: 'How do we communicate with volunteers before and after events?',
      answer: 'The platform provides messaging tools, email templates, and SMS capabilities. Send event reminders, updates, instructions, and thank you messages. Automated notifications handle routine communications, while custom messages can be sent for specific needs.',
      category: 'organizations',
      tags: ['communication', 'messaging', 'notifications', 'templates'],
      helpful: 189,
      lastUpdated: '2024-03-13'
    },
    {
      id: '36',
      question: 'What support is available for organizations new to volunteer management?',
      answer: 'We provide comprehensive onboarding, training materials, best practices guides, and dedicated support. Regular webinars cover volunteer management topics, and our success team helps optimize your volunteer programs. Community forums connect you with other organizations.',
      category: 'organizations',
      tags: ['support', 'onboarding', 'training', 'best-practices'],
      helpful: 201,
      lastUpdated: '2024-03-15'
    },

    // Technical Support
    {
      id: '37',
      question: 'The app won\'t let me check in. What should I do?',
      answer: 'First, ensure you\'re within 150 meters of the event location and have location services enabled. Check your internet connection and try refreshing the app. If issues persist, contact the event coordinator for manual check-in. Update your app to the latest version to avoid technical problems.',
      category: 'technical',
      tags: ['check-in', 'gps', 'location', 'troubleshooting'],
      helpful: 178,
      lastUpdated: '2024-03-14'
    },
    {
      id: '38',
      question: 'I\'m not receiving notifications. How can I fix this?',
      answer: 'Check your notification settings in the app and your device settings. Ensure SwaedUAE has permission to send notifications. Verify your email and phone number are correct in your profile. Check spam folders for email notifications. Contact support if issues continue.',
      category: 'technical',
      tags: ['notifications', 'settings', 'permissions', 'email'],
      helpful: 145,
      lastUpdated: '2024-03-11'
    },
    {
      id: '39',
      question: 'How do I update my profile information?',
      answer: 'Go to your profile section in the app or website, click "Edit Profile," and update your information. Changes to contact details require verification. Profile photos and documents can be uploaded directly. Some changes may require admin approval for security reasons.',
      category: 'technical',
      tags: ['profile', 'update', 'verification', 'security'],
      helpful: 167,
      lastUpdated: '2024-03-12'
    },
    {
      id: '40',
      question: 'Can I use SwaedUAE offline?',
      answer: 'Limited offline functionality is available including viewing your registered events, certificates, and basic profile information. Check-in/check-out requires internet connectivity for GPS verification. The app will sync data when connection is restored.',
      category: 'technical',
      tags: ['offline', 'connectivity', 'sync', 'functionality'],
      helpful: 134,
      lastUpdated: '2024-03-09'
    },
    {
      id: '41',
      question: 'How do I delete my account and data?',
      answer: 'Account deletion can be requested through the app settings or by contacting support. We\'ll permanently delete your personal data within 30 days, though some information may be retained for legal compliance. Volunteer hours and certificates can be exported before deletion.',
      category: 'technical',
      tags: ['deletion', 'privacy', 'data', 'export'],
      helpful: 123,
      lastUpdated: '2024-03-08'
    },
    {
      id: '42',
      question: 'Is my personal information secure on SwaedUAE?',
      answer: 'Yes, we use enterprise-grade security including data encryption, secure servers, and regular security audits. Personal information is only shared with event organizers when you register for their events. We comply with UAE data protection regulations and international privacy standards.',
      category: 'technical',
      tags: ['security', 'privacy', 'encryption', 'compliance'],
      helpful: 289,
      lastUpdated: '2024-03-17'
    },

    // Policies & Guidelines
    {
      id: '43',
      question: 'What is SwaedUAE\'s volunteer code of conduct?',
      answer: 'All volunteers must treat others with respect, follow event guidelines, arrive on time, and represent SwaedUAE positively. Discrimination, harassment, or inappropriate behavior is not tolerated. Volunteers should be honest about their availability and skills, and communicate professionally with organizers and fellow volunteers.',
      category: 'policies',
      tags: ['code-of-conduct', 'behavior', 'respect', 'guidelines'],
      helpful: 234,
      lastUpdated: '2024-03-16'
    },
    {
      id: '44',
      question: 'What happens if I repeatedly miss events I\'ve registered for?',
      answer: 'Repeated no-shows affect your volunteer rating and may result in temporary restrictions on event registration. We understand emergencies happen, but consistent unreliability impacts organizations and other volunteers. Contact support if you\'re facing ongoing issues that prevent participation.',
      category: 'policies',
      tags: ['no-shows', 'rating', 'restrictions', 'reliability'],
      helpful: 187,
      lastUpdated: '2024-03-13'
    },
    {
      id: '45',
      question: 'How does SwaedUAE protect minors participating in volunteer activities?',
      answer: 'Strict safeguarding policies protect minors including mandatory background checks for adult supervisors, parental consent requirements, appropriate supervision ratios, and specialized training for youth-focused events. All events involving minors follow UAE child protection guidelines and international best practices.',
      category: 'policies',
      tags: ['minors', 'safeguarding', 'protection', 'consent', 'supervision'],
      helpful: 267,
      lastUpdated: '2024-03-18'
    }
  ];

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const markHelpful = (itemId: string) => {
    // In real app, this would update the helpful count
    alert('Thank you for your feedback!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about volunteering, events, certificates, and using the SwaedUAE platform
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for answers... (e.g., 'how to register', 'certificates', 'check-in')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-lg py-3"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2 text-blue-600">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <Badge variant="secondary">{category.count} questions</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="text-gray-600">
            Showing {filteredFAQs.length} of {faqItems.length} questions
            {selectedCategory !== 'all' && (
              <span> in {categories.find(c => c.id === selectedCategory)?.name}</span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download FAQ PDF
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.question}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {categories.find(c => c.id === item.category)?.name}
                          </Badge>
                          <span>{item.helpful} people found this helpful</span>
                          <span>Updated {new Date(item.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        {expandedItems.has(item.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {expandedItems.has(item.id) && (
                    <div className="px-6 pb-6">
                      <div className="border-t pt-4">
                        <div className="prose max-w-none text-gray-700 mb-4">
                          <p>{item.answer}</p>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-500">
                            Was this helpful?
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markHelpful(item.id)}
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              Helpful ({item.helpful})
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Still need help?
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any questions matching your search.
                </p>
                <div className="flex items-center justify-center space-x-3">
                  <Button variant="outline" onClick={() => setSearchTerm('')}>
                    Clear Search
                  </Button>
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our support team is here to help you with any questions not covered in our FAQ. 
              We typically respond within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat Support
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Call +971 4 123 4567
              </Button>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Support hours: Sunday - Thursday, 9:00 AM - 6:00 PM (UAE Time)</p>
            </div>
          </CardContent>
        </Card>

        {/* Popular Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Resources</CardTitle>
            <CardDescription>
              Quick links to helpful guides and information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">Volunteer Guide</div>
                  <div className="text-sm text-gray-500">Complete guide for new volunteers</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">Organization Handbook</div>
                  <div className="text-sm text-gray-500">How to create and manage events</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">Safety Guidelines</div>
                  <div className="text-sm text-gray-500">Important safety information</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">App Tutorial</div>
                  <div className="text-sm text-gray-500">Step-by-step app usage guide</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">Certificate Guide</div>
                  <div className="text-sm text-gray-500">How to earn and use certificates</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">Community Guidelines</div>
                  <div className="text-sm text-gray-500">Rules and best practices</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}