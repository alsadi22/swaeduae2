import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, Star, Award, Users, CheckCircle, Clock, Edit, Trash2,
  Upload, Download, Share2, Eye, Target, TrendingUp, Calendar,
  BookOpen, Heart, Leaf, Briefcase, Shield, Globe, Camera
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  endorsements: number;
  verified: boolean;
  description: string;
  experience: string;
  certifications: string[];
  addedDate: string;
  lastUsed: string;
}

interface Endorsement {
  id: string;
  skillId: string;
  organizationName: string;
  organizationLogo: string;
  endorserName: string;
  endorserRole: string;
  message: string;
  eventName: string;
  date: string;
  verified: boolean;
}

export default function VolunteerSkills() {
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false);
  const [showEndorsementDialog, setShowEndorsementDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('beginner');
  const [newSkillDescription, setNewSkillDescription] = useState('');
  const [newSkillExperience, setNewSkillExperience] = useState('');

  // Mock data
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: '1',
      name: 'First Aid & CPR',
      category: 'Healthcare',
      level: 'advanced',
      endorsements: 8,
      verified: true,
      description: 'Certified in emergency first aid response and CPR techniques',
      experience: '3 years of experience providing first aid at community events',
      certifications: ['Red Cross First Aid Certificate', 'CPR Level C'],
      addedDate: '2023-06-15',
      lastUsed: '2024-03-10'
    },
    {
      id: '2',
      name: 'Arabic Language',
      category: 'Communication',
      level: 'expert',
      endorsements: 12,
      verified: true,
      description: 'Native Arabic speaker with excellent communication skills',
      experience: 'Fluent in Modern Standard Arabic and UAE dialect',
      certifications: [],
      addedDate: '2023-05-20',
      lastUsed: '2024-03-18'
    },
    {
      id: '3',
      name: 'Event Management',
      category: 'Professional',
      level: 'intermediate',
      endorsements: 5,
      verified: false,
      description: 'Experience organizing and coordinating volunteer events',
      experience: '2 years managing community events and fundraisers',
      certifications: ['Event Planning Certificate'],
      addedDate: '2023-08-10',
      lastUsed: '2024-03-05'
    },
    {
      id: '4',
      name: 'Environmental Conservation',
      category: 'Environment',
      level: 'advanced',
      endorsements: 15,
      verified: true,
      description: 'Passionate about environmental protection and sustainability',
      experience: 'Led multiple beach cleanup and tree planting initiatives',
      certifications: ['Environmental Awareness Certificate'],
      addedDate: '2023-04-12',
      lastUsed: '2024-03-15'
    },
    {
      id: '5',
      name: 'Teaching & Mentoring',
      category: 'Education',
      level: 'advanced',
      endorsements: 9,
      verified: true,
      description: 'Experience teaching children and mentoring youth',
      experience: '4 years tutoring students and leading educational workshops',
      certifications: ['Teaching Assistant Certificate'],
      addedDate: '2023-07-08',
      lastUsed: '2024-03-12'
    }
  ]);

  const endorsements: Endorsement[] = [
    {
      id: '1',
      skillId: '1',
      organizationName: 'Dubai Health Authority',
      organizationLogo: '/api/placeholder/50/50',
      endorserName: 'Dr. Sarah Al-Zahra',
      endorserRole: 'Medical Director',
      message: 'Ahmed demonstrated excellent first aid skills during our health awareness campaign. His quick response and professional approach were commendable.',
      eventName: 'Community Health Fair 2024',
      date: '2024-03-10',
      verified: true
    },
    {
      id: '2',
      skillId: '2',
      organizationName: 'Emirates Foundation',
      organizationLogo: '/api/placeholder/50/50',
      endorserName: 'Fatima Hassan',
      endorserRole: 'Program Coordinator',
      message: 'Outstanding Arabic communication skills. Ahmed effectively communicated with diverse community members and helped bridge language barriers.',
      eventName: 'Cultural Heritage Festival',
      date: '2024-03-18',
      verified: true
    },
    {
      id: '3',
      skillId: '4',
      organizationName: 'Green Initiative UAE',
      organizationLogo: '/api/placeholder/50/50',
      endorserName: 'Mohammed Ali',
      endorserRole: 'Environmental Coordinator',
      message: 'Ahmed\'s dedication to environmental conservation is inspiring. He led our beach cleanup team with great enthusiasm and knowledge.',
      eventName: 'Dubai Marina Beach Cleanup',
      date: '2024-03-15',
      verified: true
    }
  ];

  const skillCategories = [
    { id: 'healthcare', name: 'Healthcare', icon: <Heart className="h-4 w-4" />, color: 'bg-red-100 text-red-800' },
    { id: 'education', name: 'Education', icon: <BookOpen className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' },
    { id: 'environment', name: 'Environment', icon: <Leaf className="h-4 w-4" />, color: 'bg-green-100 text-green-800' },
    { id: 'professional', name: 'Professional', icon: <Briefcase className="h-4 w-4" />, color: 'bg-purple-100 text-purple-800' },
    { id: 'communication', name: 'Communication', icon: <Globe className="h-4 w-4" />, color: 'bg-orange-100 text-orange-800' },
    { id: 'technical', name: 'Technical', icon: <Shield className="h-4 w-4" />, color: 'bg-gray-100 text-gray-800' }
  ];

  const getLevelBadge = (level: Skill['level']) => {
    const levelConfig = {
      beginner: { label: 'Beginner', className: 'bg-gray-100 text-gray-800' },
      intermediate: { label: 'Intermediate', className: 'bg-blue-100 text-blue-800' },
      advanced: { label: 'Advanced', className: 'bg-green-100 text-green-800' },
      expert: { label: 'Expert', className: 'bg-purple-100 text-purple-800' }
    };
    
    const config = levelConfig[level];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getCategoryInfo = (categoryName: string) => {
    return skillCategories.find(cat => 
      cat.name.toLowerCase() === categoryName.toLowerCase()
    ) || skillCategories[0];
  };

  const addSkill = () => {
    if (!newSkillName.trim()) return;

    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName,
      category: newSkillCategory || 'Professional',
      level: newSkillLevel,
      endorsements: 0,
      verified: false,
      description: newSkillDescription,
      experience: newSkillExperience,
      certifications: [],
      addedDate: new Date().toISOString().split('T')[0],
      lastUsed: ''
    };

    setSkills([...skills, newSkill]);
    setShowAddSkillDialog(false);
    setNewSkillName('');
    setNewSkillCategory('');
    setNewSkillLevel('beginner');
    setNewSkillDescription('');
    setNewSkillExperience('');
  };

  const removeSkill = (skillId: string) => {
    setSkills(skills.filter(skill => skill.id !== skillId));
  };

  const viewEndorsements = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowEndorsementDialog(true);
  };

  const getSkillEndorsements = (skillId: string) => {
    return endorsements.filter(e => e.skillId === skillId);
  };

  const exportSkills = () => {
    const skillsData = {
      volunteer: 'Ahmed Al-Mansouri',
      exportDate: new Date().toISOString(),
      skills: skills.map(skill => ({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        endorsements: skill.endorsements,
        verified: skill.verified,
        experience: skill.experience,
        certifications: skill.certifications
      }))
    };

    const blob = new Blob([JSON.stringify(skillsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'volunteer-skills.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Skills & Expertise</h1>
            <p className="text-gray-600">Manage your skills, view endorsements, and showcase your capabilities</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={exportSkills}>
              <Download className="h-4 w-4 mr-2" />
              Export Skills
            </Button>
            <Button onClick={() => setShowAddSkillDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{skills.length}</div>
              <div className="text-sm text-gray-600">Total Skills</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {skills.reduce((sum, skill) => sum + skill.endorsements, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Endorsements</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {skills.filter(skill => skill.verified).length}
              </div>
              <div className="text-sm text-gray-600">Verified Skills</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {skills.filter(skill => skill.level === 'advanced' || skill.level === 'expert').length}
              </div>
              <div className="text-sm text-gray-600">Advanced+ Skills</div>
            </CardContent>
          </Card>
        </div>

        {/* Skills by Category */}
        <div className="space-y-6">
          {skillCategories.map(category => {
            const categorySkills = skills.filter(skill => 
              skill.category.toLowerCase() === category.name.toLowerCase()
            );

            if (categorySkills.length === 0) return null;

            return (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {category.icon}
                    <span>{category.name}</span>
                    <Badge variant="secondary">{categorySkills.length} skills</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map(skill => (
                      <Card key={skill.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                                {skill.verified && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                              </div>
                              {getLevelBadge(skill.level)}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => {}}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeSkill(skill.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{skill.description}</p>

                          <div className="space-y-2 text-xs text-gray-500">
                            <div className="flex items-center justify-between">
                              <span>Endorsements</span>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="h-auto p-0 text-blue-600"
                                onClick={() => viewEndorsements(skill)}
                              >
                                {skill.endorsements} endorsements
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Added</span>
                              <span>{new Date(skill.addedDate).toLocaleDateString()}</span>
                            </div>
                            {skill.lastUsed && (
                              <div className="flex items-center justify-between">
                                <span>Last Used</span>
                                <span>{new Date(skill.lastUsed).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>

                          {skill.certifications.length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              <div className="text-xs text-gray-500 mb-1">Certifications</div>
                              <div className="space-y-1">
                                {skill.certifications.map((cert, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mt-3 pt-3 border-t flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              <Share2 className="h-3 w-3 mr-1" />
                              Share
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add Skill Dialog */}
        <Dialog open={showAddSkillDialog} onOpenChange={setShowAddSkillDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Add a new skill to your profile to help organizations find you for relevant opportunities
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="skillName">Skill Name *</Label>
                <Input
                  id="skillName"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g., First Aid, Event Management, Arabic Language"
                />
              </div>

              <div>
                <Label htmlFor="skillCategory">Category</Label>
                <select
                  id="skillCategory"
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  {skillCategories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="skillLevel">Skill Level</Label>
                <select
                  id="skillLevel"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value as Skill['level'])}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div>
                <Label htmlFor="skillDescription">Description</Label>
                <Textarea
                  id="skillDescription"
                  value={newSkillDescription}
                  onChange={(e) => setNewSkillDescription(e.target.value)}
                  placeholder="Describe your skill and how you can use it in volunteer work"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="skillExperience">Experience</Label>
                <Textarea
                  id="skillExperience"
                  value={newSkillExperience}
                  onChange={(e) => setNewSkillExperience(e.target.value)}
                  placeholder="Describe your experience with this skill"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddSkillDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={addSkill} disabled={!newSkillName.trim()}>
                  Add Skill
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Endorsements Dialog */}
        <Dialog open={showEndorsementDialog} onOpenChange={setShowEndorsementDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Endorsements for {selectedSkill?.name}
              </DialogTitle>
              <DialogDescription>
                See what organizations and coordinators say about your {selectedSkill?.name} skills
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {selectedSkill && getSkillEndorsements(selectedSkill.id).map(endorsement => (
                <Card key={endorsement.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <img 
                        src={endorsement.organizationLogo} 
                        alt={endorsement.organizationName}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {endorsement.organizationName}
                          </h4>
                          {endorsement.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <div>{endorsement.endorserName} • {endorsement.endorserRole}</div>
                          <div>{endorsement.eventName}</div>
                          <div>{new Date(endorsement.date).toLocaleDateString()}</div>
                        </div>
                        <p className="text-sm text-gray-700 italic">
                          "{endorsement.message}"
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {selectedSkill && getSkillEndorsements(selectedSkill.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Award className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>No endorsements yet for this skill.</p>
                  <p className="text-sm">Participate in events to receive endorsements from organizations!</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}