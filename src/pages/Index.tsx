import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import { 
  Heart, Users, Award, Calendar, MapPin, Clock, 
  ArrowRight, Star, CheckCircle, Globe, Shield,
  Zap, Target, TrendingUp
} from 'lucide-react';

export default function Index() {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-gradient-to-b from-blue-50 to-white ${isRTL ? 'font-arabic' : ''}`}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">SwaedUAE</span>
                <div className="text-xs text-green-600 font-medium">UAE Volunteer Platform</div>
              </div>
            </div>
            
            <div className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">{t('nav.home')}</Link>
              <Link to="/opportunities" className="text-gray-700 hover:text-blue-600 font-medium">{t('nav.opportunities')}</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">{t('nav.about')}</Link>
              <Link to="/organizations" className="text-gray-700 hover:text-blue-600 font-medium">{t('nav.organizations')}</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium">{t('nav.contact')}</Link>
            </div>

            <div className={`flex items-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
              <LanguageToggle />
              <Button variant="outline" asChild>
                <Link to="/auth/login">{t('nav.signin')}</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">{t('nav.signup')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/auth/register">
                  {t('hero.startVolunteering')} 
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/opportunities">{t('hero.browseOpportunities')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12,500+</div>
              <div className="text-gray-600">{t('stats.activeVolunteers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">850+</div>
              <div className="text-gray-600">{t('stats.partnerOrganizations')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">45,000+</div>
              <div className="text-gray-600">{t('stats.hoursContributed')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">2,300+</div>
              <div className="text-gray-600">{t('stats.eventsCompleted')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Volunteers in Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('volunteers.title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('volunteers.subtitle')}
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Row 1 */}
            <div className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop&crop=center" 
                alt="Volunteers helping elderly community members"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=400&fit=crop&crop=center" 
                alt="Young volunteers celebrating community service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center" 
                alt="Medical volunteer providing healthcare services"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                alt="Professional volunteer in community service"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Row 2 */}
            <div className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop&crop=center" 
                alt="Volunteers working together on community project"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=400&fit=crop&crop=center" 
                alt="Volunteers in meeting discussing community initiatives"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center" 
                alt="Fitness volunteers leading community yoga session"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" 
                alt="Dedicated volunteer making a difference"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* View More Photos Button */}
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/photos">
                {t('volunteers.viewMore')} 
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('features.title')}</h2>
            <p className="text-lg text-gray-600">{t('features.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.certificates.title')}</h3>
                <p className="text-gray-600">{t('features.certificates.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.community.title')}</h3>
                <p className="text-gray-600">{t('features.community.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t('features.tracking.title')}</h3>
                <p className="text-gray-600">{t('features.tracking.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Opportunities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <h2 className="text-3xl font-bold text-gray-900">{t('opportunities.title')}</h2>
            <Button variant="outline" asChild>
              <Link to="/opportunities">{t('opportunities.viewAll')}</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Badge className="bg-green-100 text-green-800">{t('opportunities.environment')}</Badge>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Beach Cleanup Drive</h3>
                <p className="text-gray-600 mb-4">Join us for a community beach cleanup at Jumeirah Beach to protect marine life.</p>
                <div className={`flex items-center text-sm text-gray-500 mb-4 ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                  <div className="flex items-center">
                    <MapPin className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span>{t('emirates.dubai')}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span>Oct 15, 2024</span>
                  </div>
                </div>
                <Button className="w-full">{t('opportunities.joinNow')}</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Badge className="bg-blue-100 text-blue-800">{t('opportunities.education')}</Badge>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Teaching Assistant</h3>
                <p className="text-gray-600 mb-4">Help underprivileged children with their studies and homework support.</p>
                <div className={`flex items-center text-sm text-gray-500 mb-4 ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                  <div className="flex items-center">
                    <MapPin className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span>{t('emirates.abuDhabi')}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span>{t('opportunities.ongoing')}</span>
                  </div>
                </div>
                <Button className="w-full">{t('opportunities.joinNow')}</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`flex items-start justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Badge className="bg-red-100 text-red-800">{t('opportunities.healthcare')}</Badge>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Blood Donation Drive</h3>
                <p className="text-gray-600 mb-4">Support the community by volunteering at our monthly blood donation event.</p>
                <div className={`flex items-center text-sm text-gray-500 mb-4 ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                  <div className="flex items-center">
                    <MapPin className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span>{t('emirates.sharjah')}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className={`h-4 w-4 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                    <span>Oct 20, 2024</span>
                  </div>
                </div>
                <Button className="w-full">{t('opportunities.joinNow')}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
            <p className="text-lg text-gray-600">{t('testimonials.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className={`flex items-center mb-4 ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                    alt="Ahmed Al-Mansouri"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Ahmed Al-Mansouri</h4>
                    <p className="text-sm text-gray-600">Dubai Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"SwaedUAE has given me the opportunity to give back to my community in meaningful ways. The platform makes it so easy to find and join volunteer activities."</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className={`flex items-center mb-4 ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face" 
                    alt="Fatima Al-Zahra"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Fatima Al-Zahra</h4>
                    <p className="text-sm text-gray-600">Abu Dhabi Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"I've met incredible people and made lasting friendships through volunteering. It's amazing how much impact we can make together."</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className={`flex items-center mb-4 ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                    alt="Omar Hassan"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">Omar Hassan</h4>
                    <p className="text-sm text-gray-600">Sharjah Volunteer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The certificates and recognition I've received have helped me professionally, while also allowing me to contribute to causes I care about."</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-xl text-blue-100 mb-8">
            {t('cta.subtitle')}
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/auth/register">{t('cta.getStarted')}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/about">{t('cta.learnMore')}</Link>
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
              <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/opportunities" className="hover:text-white">{t('nav.opportunities')}</Link></li>
                <li><Link to="/organizations" className="hover:text-white">{t('nav.organizations')}</Link></li>
                <li><Link to="/about" className="hover:text-white">{t('nav.about')}</Link></li>
                <li><Link to="/contact" className="hover:text-white">{t('nav.contact')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('footer.forVolunteers')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/auth/register" className="hover:text-white">{t('nav.signup')}</Link></li>
                <li><Link to="/auth/login" className="hover:text-white">{t('nav.signin')}</Link></li>
                <li><Link to="/certificates" className="hover:text-white">{t('footer.certificates')}</Link></li>
                <li><Link to="/help" className="hover:text-white">{t('footer.helpCenter')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{t('footer.forOrganizations')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/org/register" className="hover:text-white">{t('footer.registerOrg')}</Link></li>
                <li><Link to="/org/login" className="hover:text-white">{t('footer.orgLogin')}</Link></li>
                <li><Link to="/partners" className="hover:text-white">{t('footer.partners')}</Link></li>
                <li><Link to="/resources" className="hover:text-white">{t('footer.resources')}</Link></li>
              </ul>
            </div>
          </div>
          
          <div className={`border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-gray-400">{t('footer.copyright')}</p>
            <div className={`flex space-x-6 mt-4 md:mt-0 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Link to="/privacy" className="text-gray-400 hover:text-white">{t('footer.privacy')}</Link>
              <Link to="/terms" className="text-gray-400 hover:text-white">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}