import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { 
  Heart, Users, Award, Target, Globe, Shield,
  ArrowRight, Star, CheckCircle, Zap, TrendingUp
} from 'lucide-react';

export default function About() {
  const { t, isRTL } = useLanguage();

  const stats = [
    { label: 'Active Volunteers', value: '12,500+', icon: Users },
    { label: 'Partner Organizations', value: '850+', icon: Shield },
    { label: 'Hours Contributed', value: '45,000+', icon: Award },
    { label: 'Events Completed', value: '2,300+', icon: CheckCircle }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We believe in putting the community at the heart of everything we do, fostering connections and building stronger neighborhoods.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'All our partner organizations are verified and approved, ensuring authentic and meaningful volunteer opportunities.'
    },
    {
      icon: Globe,
      title: 'Inclusive Impact',
      description: 'We welcome volunteers from all backgrounds and cultures, reflecting the diverse spirit of the UAE.'
    },
    {
      icon: Target,
      title: 'Measurable Change',
      description: 'We track and celebrate the real impact our volunteers make in communities across the Emirates.'
    }
  ];

  const team = [
    {
      name: 'Ahmed Al-Mansouri',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'Passionate about community development and social impact in the UAE.'
    },
    {
      name: 'Fatima Al-Zahra',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      description: 'Expert in volunteer management and organizational partnerships.'
    },
    {
      name: 'Omar Hassan',
      role: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Leading digital innovation to connect volunteers with opportunities.'
    }
  ];

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'font-arabic' : ''}`}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">SwaedUAE</span>
                <div className="text-xs text-green-600 font-medium">UAE Volunteer Platform</div>
              </div>
            </Link>
            
            <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/opportunities" className="text-gray-700 hover:text-blue-600 font-medium">Opportunities</Link>
              <Link to="/about" className="text-blue-600 font-medium">About</Link>
              <Link to="/organizations" className="text-gray-700 hover:text-blue-600 font-medium">Organizations</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>
            </div>

            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <LanguageToggle />
              <Button variant="outline" asChild>
                <Link to="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              🇦🇪 About SwaedUAE
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering Communities Through Volunteering
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              SwaedUAE is the UAE's leading volunteer platform, connecting passionate individuals 
              with meaningful opportunities to make a positive impact in their communities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-6 w-6 text-blue-600" />
                  <span>Our Mission</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To create a thriving volunteer ecosystem in the UAE that connects individuals 
                  with meaningful opportunities, empowers communities, and builds a stronger, 
                  more compassionate society for all residents and citizens.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-6 w-6 text-green-600" />
                  <span>Our Vision</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the premier platform that transforms the UAE into a global model 
                  of community engagement, where every individual has the opportunity to 
                  contribute to positive change and social development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Making a difference across the UAE</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">Passionate leaders driving positive change</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Mission?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Become part of the SwaedUAE community and start making a difference today.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/auth/register">Start Volunteering</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className={`flex items-center space-x-3 mb-4 ${isRTL ? 'space-x-reverse' : ''}`}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">SwaedUAE</span>
              </div>
              <p className="text-gray-400">Empowering communities across the UAE through meaningful volunteer opportunities.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/opportunities" className="hover:text-white">Opportunities</Link></li>
                <li><Link to="/organizations" className="hover:text-white">Organizations</Link></li>
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Volunteers</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth/register" className="hover:text-white">Sign Up</Link></li>
                <li><Link to="/auth/login" className="hover:text-white">Sign In</Link></li>
                <li><Link to="/certificates" className="hover:text-white">Certificates</Link></li>
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/org/register" className="hover:text-white">Register Organization</Link></li>
                <li><Link to="/org/login" className="hover:text-white">Organization Login</Link></li>
                <li><Link to="/partners" className="hover:text-white">Partners</Link></li>
                <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-gray-400">&copy; 2024 SwaedUAE. All rights reserved.</p>
            <div className={`flex space-x-6 mt-4 md:mt-0 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}