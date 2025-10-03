import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, Star, Building2, Phone, Mail, Calendar, Download,
  Plus, Eye, Share2, CheckCircle, Clock, AlertTriangle,
  FileText, ExternalLink, MessageCircle, Award, Shield
} from 'lucide-react';

interface Reference {
  id: string;
  referee: {
    name: string;
    title: string;
    organization: string;
    email: string;
    phone: string;
    avatar: string;
    verified: boolean;
  };
  relationship: string;
  duration: string;
  projects: string[];
  skills: string[];
  rating: number;
  recommendation: string;
  dateProvided: string;
  status: 'active' | 'expired' | 'pending';
  contactPermission: boolean;
  publiclyVisible: boolean;
}

interface ReferenceRequest {
  id: string;
  requester: {
    name: string;
    email: string;
    organization?: string;
  };
  purpose: string;
  deadline: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'declined';
  message: string;
}

export default function VolunteerReferences() {
  const [activeTab, setActiveTab] = useState<'references' | 'requests' | 'settings'>('references');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [selectedReference, setSelectedReference] = useState<Reference | null>(null);

  // Mock references data
  const references: Reference[] = [
    {
      id: '1',
      referee: {
        name: 'Dr. Sarah Al-Zahra',
        title: 'Environmental Program Director',
        organization: 'Green Initiative UAE',
        email: 'sarah.alzahra@greeninitiative.ae',
        phone: '+971 50 123 4567',
        avatar: '/api/placeholder/60/60',
        verified: true
      },
      relationship: 'Direct Supervisor',
      duration: '2 years (2022-2024)',
      projects: ['Dubai Marina Beach Cleanup', 'Mangrove Restoration Project', 'Plastic-Free Campaign'],
      skills: ['Environmental Conservation', 'Team Leadership', 'Project Management', 'Public Speaking'],
      rating: 5,
      recommendation: 'Ahmed has been an exceptional volunteer with our environmental programs. His dedication to marine conservation and ability to lead volunteer teams has been outstanding. He consistently goes above and beyond, organizing additional cleanup sessions and educating the community about environmental issues. I highly recommend him for any environmental or leadership role.',
      dateProvided: '2024-03-15',
      status: 'active',
      contactPermission: true,
      publiclyVisible: true
    },
    {
      id: '2',
      referee: {
        name: 'Mohammed Al-Rashid',
        title: 'Community Outreach Manager',
        organization: 'Emirates Food Bank',
        email: 'm.alrashid@emiratesfoodbank.ae',
        phone: '+971 50 234 5678',
        avatar: '/api/placeholder/60/60',
        verified: true
      },
      relationship: 'Project Coordinator',
      duration: '1.5 years (2022-2023)',
      projects: ['Ramadan Food Distribution', 'Community Kitchen Initiative', 'Hunger Relief Campaign'],
      skills: ['Community Service', 'Logistics Coordination', 'Cultural Sensitivity', 'Crisis Management'],
      rating: 5,
      recommendation: 'Ahmed demonstrated exceptional organizational skills and cultural sensitivity during our food distribution programs. His ability to coordinate with diverse volunteer teams and manage complex logistics made him invaluable to our operations. He has a natural ability to connect with community members and understand their needs.',
      dateProvided: '2024-02-28',
      status: 'active',
      contactPermission: true,
      publiclyVisible: true
    },
    {
      id: '3',
      referee: {
        name: 'Fatima Al-Hashimi',
        title: 'Education Program Lead',
        organization: 'Future Leaders Foundation',
        email: 'f.alhashimi@futureleaders.ae',
        phone: '+971 50 345 6789',
        avatar: '/api/placeholder/60/60',
        verified: true
      },
      relationship: 'Mentor Supervisor',
      duration: '1 year (2023-2024)',
      projects: ['Youth Mentorship Program', 'Digital Literacy Initiative', 'Career Guidance Workshops'],
      skills: ['Mentoring', 'Teaching', 'Youth Development', 'Digital Skills'],
      rating: 4,
      recommendation: 'Ahmed has been a dedicated mentor in our youth programs. His patience and ability to connect with young people has made a significant impact on their development. He brings creativity to his teaching methods and shows genuine care for each mentee\'s progress.',
      dateProvided: '2024-01-20',
      status: 'active',
      contactPermission: false,
      publiclyVisible: false
    }
  ];

  const referenceRequests: ReferenceRequest[] = [
    {
      id: '1',
      requester: {
        name: 'Emirates Airlines HR Department',
        email: 'hr@emirates.com',
        organization: 'Emirates Airlines'
      },
      purpose: 'Employment verification for Customer Service Representative position',
      deadline: '2024-04-01',
      requestDate: '2024-03-20',
      status: 'pending',
      message: 'We are considering Ahmed for a customer service role and would like to verify his volunteer experience and skills in community service and communication.'
    },
    {
      id: '2',
      requester: {
        name: 'Dubai Municipality',
        email: 'volunteers@dm.gov.ae',
        organization: 'Dubai Municipality'
      },
      purpose: 'Volunteer leadership program application',
      deadline: '2024-03-30',
      requestDate: '2024-03-18',
      status: 'pending',
      message: 'Ahmed has applied for our advanced volunteer leadership program. We need references regarding his leadership experience and environmental project involvement.'
    }
  ];

  const handleApproveRequest = (requestId: string) => {
    alert(`Reference request ${requestId} approved and sent!`);
  };

  const handleDeclineRequest = (requestId: string) => {
    alert(`Reference request ${requestId} declined.`);
  };

  const handleContactReference = (reference: Reference) => {
    if (reference.contactPermission) {
      window.open(`mailto:${reference.referee.email}?subject=Reference Inquiry - ${reference.referee.name}`);
    } else {
      alert('Direct contact not permitted for this reference.');
    }
  };

  const handleShareReference = (reference: Reference) => {
    if (reference.publiclyVisible) {
      if (navigator.share) {
        navigator.share({
          title: `Reference from ${reference.referee.name}`,
          text: reference.recommendation.substring(0, 100) + '...',
          url: window.location.href + `#reference-${reference.id}`
        });
      } else {
        alert('Reference link copied to clipboard!');
      }
    } else {
      alert('This reference is private and cannot be shared.');
    }
  };

  const exportReferences = () => {
    alert('References exported to PDF successfully!');
  };

  const averageRating = references.reduce((sum, ref) => sum + ref.rating, 0) / references.length;
  const totalProjects = [...new Set(references.flatMap(ref => ref.projects))].length;
  const totalSkills = [...new Set(references.flatMap(ref => ref.skills))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Professional References</h1>
            <p className="text-gray-600">Manage and showcase your professional references from volunteer work</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={exportReferences}>
              <Download className="h-4 w-4 mr-2" />
              Export References
            </Button>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reference
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{references.length}</div>
              <div className="text-sm text-gray-600">Total References</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalProjects}</div>
              <div className="text-sm text-gray-600">Projects Referenced</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalSkills}</div>
              <div className="text-sm text-gray-600">Skills Validated</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <Button
            variant={activeTab === 'references' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('references')}
            className="flex-1"
          >
            <FileText className="h-4 w-4 mr-2" />
            My References ({references.length})
          </Button>
          <Button
            variant={activeTab === 'requests' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('requests')}
            className="flex-1"
          >
            <Clock className="h-4 w-4 mr-2" />
            Requests ({referenceRequests.length})
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
            className="flex-1"
          >
            <Shield className="h-4 w-4 mr-2" />
            Privacy Settings
          </Button>
        </div>

        {/* References Tab */}
        {activeTab === 'references' && (
          <div className="space-y-6">
            {references.map(reference => (
              <Card key={reference.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={reference.referee.avatar} 
                      alt={reference.referee.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{reference.referee.name}</h3>
                          {reference.referee.verified && (
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          )}
                          <Badge className={
                            reference.status === 'active' ? 'bg-green-100 text-green-800' :
                            reference.status === 'expired' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {reference.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < reference.rating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">
                            <strong>{reference.referee.title}</strong>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                            <Building2 className="h-4 w-4" />
                            <span>{reference.referee.organization}</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            <strong>Relationship:</strong> {reference.relationship}
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>Duration:</strong> {reference.duration}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                            <Mail className="h-4 w-4" />
                            <span>{reference.referee.email}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                            <Phone className="h-4 w-4" />
                            <span>{reference.referee.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Provided: {new Date(reference.dateProvided).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Projects Worked On:</h4>
                        <div className="flex flex-wrap gap-2">
                          {reference.projects.map((project, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Validated:</h4>
                        <div className="flex flex-wrap gap-2">
                          {reference.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendation:</h4>
                        <blockquote className="text-gray-700 italic border-l-4 border-blue-200 pl-4">
                          "{reference.recommendation}"
                        </blockquote>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{reference.publiclyVisible ? 'Public' : 'Private'}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{reference.contactPermission ? 'Contact OK' : 'No Contact'}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleContactReference(reference)}
                            disabled={!reference.contactPermission}
                          >
                            <Mail className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShareReference(reference)}
                            disabled={!reference.publiclyVisible}
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Reference Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                You have {referenceRequests.filter(r => r.status === 'pending').length} pending reference requests that require your attention.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {referenceRequests.map(request => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{request.requester.name}</h3>
                        {request.requester.organization && (
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Building2 className="h-4 w-4" />
                            <span>{request.requester.organization}</span>
                          </div>
                        )}
                      </div>
                      <Badge className={
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }>
                        {request.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <span className="text-sm font-medium text-gray-900">Purpose: </span>
                        <span className="text-sm text-gray-700">{request.purpose}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Deadline: </span>
                        <span className="text-sm text-gray-700">{new Date(request.deadline).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">Contact: </span>
                        <span className="text-sm text-gray-700">{request.requester.email}</span>
                      </div>
                    </div>

                    <blockquote className="text-gray-700 italic border-l-4 border-blue-200 pl-4 mb-4">
                      "{request.message}"
                    </blockquote>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Requested on {new Date(request.requestDate).toLocaleDateString()}
                      </div>
                      
                      {request.status === 'pending' && (
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm"
                            onClick={() => handleApproveRequest(request.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve & Send
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Privacy Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reference Privacy Settings</CardTitle>
                <CardDescription>Control how your references are shared and accessed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Public Profile References</h4>
                      <p className="text-sm text-gray-600">Allow references to be visible on your public volunteer profile</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Direct Contact Permission</h4>
                      <p className="text-sm text-gray-600">Allow potential employers to contact your references directly</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Automatic Request Approval</h4>
                      <p className="text-sm text-gray-600">Automatically approve reference requests from verified organizations</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive email notifications for new reference requests</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>Save Privacy Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reference Expiration</CardTitle>
                <CardDescription>Manage reference validity and renewal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Reference Validity Period
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option value="1">1 year</option>
                      <option value="2" selected>2 years</option>
                      <option value="3">3 years</option>
                      <option value="never">Never expire</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="autoRenewal" className="h-4 w-4" />
                    <label htmlFor="autoRenewal" className="text-sm text-gray-700">
                      Automatically request renewal from references before expiration
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Reference Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Reference</DialogTitle>
              <DialogDescription>
                Add a professional reference from your volunteer work
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <Input placeholder="Reference name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <Input placeholder="Job title" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization *</label>
                <Input placeholder="Organization name" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input type="email" placeholder="reference@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input placeholder="+971 50 123 4567" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship *</label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="">Select relationship</option>
                  <option value="supervisor">Direct Supervisor</option>
                  <option value="coordinator">Project Coordinator</option>
                  <option value="colleague">Colleague</option>
                  <option value="mentor">Mentor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Projects Worked Together</label>
                <Textarea placeholder="List the volunteer projects you worked on together" rows={2} />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="contactPermission" className="h-4 w-4" />
                  <label htmlFor="contactPermission" className="text-sm text-gray-700">
                    Allow direct contact
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="publicVisible" className="h-4 w-4" />
                  <label htmlFor="publicVisible" className="text-sm text-gray-700">
                    Make publicly visible
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  Cancel
                </Button>
                <Button>
                  Add Reference
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}