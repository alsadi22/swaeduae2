import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents, mockOrganizations } from '@/lib/mockData';
import { Calendar, MapPin, Users, Heart, Shield, Award, Clock, CheckCircle } from 'lucide-react';

export default function Home() {
  const { user, login } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    const success = await login(loginForm.email, loginForm.password);
    if (success) {
      setIsLoginOpen(false);
      setLoginForm({ email: '', password: '' });
    } else {
      setLoginError('Invalid credentials. Try: ahmed@example.com, fatima@example.com, contact@redcrescent.ae, or admin@swaeduae.ae');
    }
  };

  const publishedEvents = mockEvents.filter(event => event.status === 'published');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="h-8 w-8 text-red-600" />
                <span className="text-2xl font-bold text-gray-900">SwaedUAE</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                UAE Volunteer Platform
              </Badge>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#opportunities" className="text-gray-600 hover:text-gray-900">Opportunities</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <a href="/qr/verify" className="text-gray-600 hover:text-gray-900">Verify Certificate</a>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                  <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'organization' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </div>
              ) : (
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <Button>Login</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Login to SwaedUAE</DialogTitle>
                      <DialogDescription>
                        Access your volunteer dashboard
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      {loginError && (
                        <p className="text-sm text-red-600">{loginError}</p>
                      )}
                      <Button type="submit" className="w-full">Login</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Make a Difference in the <span className="text-red-600">UAE</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with verified organizations, track your volunteer hours, and earn certificates for your community service. Join thousands of volunteers making the UAE a better place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Start Volunteering
            </Button>
            <Button size="lg" variant="outline">
              Register Organization
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose SwaedUAE?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Verified Organizations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">All partner organizations are verified and approved by UAE authorities for authentic volunteer opportunities.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Digital Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Earn verifiable digital certificates with QR codes for your volunteer hours and community service.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>QR Check-in/out</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Easy attendance tracking with QR codes and geofencing to ensure accurate volunteer hour logging.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section id="opportunities" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Current Opportunities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{event.category}</Badge>
                    <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
                      {event.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    by {event.organizationName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()} • {event.startTime} - {event.endTime}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {event.registeredVolunteers}/{event.maxVolunteers} volunteers
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button className="w-full" disabled={!user || event.registeredVolunteers >= event.maxVolunteers}>
                      {user ? 'Register Now' : 'Login to Register'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Partner Organizations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {mockOrganizations.map((org) => (
              <Card key={org.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{org.name}</CardTitle>
                    {org.isVerified && (
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{org.description}</p>
                  {org.website && (
                    <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                      Visit Website →
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold">SwaedUAE</span>
              </div>
              <p className="text-gray-400">
                Connecting volunteers with verified organizations across the UAE.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#opportunities" className="hover:text-white">Opportunities</a></li>
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="/qr/verify" className="hover:text-white">Verify Certificate</a></li>
                <li><a href="#contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Organizations</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Register Organization</a></li>
                <li><a href="#" className="hover:text-white">Event Management</a></li>
                <li><a href="#" className="hover:text-white">Volunteer Reports</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SwaedUAE. All rights reserved. Made with ❤️ for the UAE community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}