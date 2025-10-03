import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Award, Star, Trophy, Medal, Crown, Shield, Heart, Leaf, BookOpen,
  Users, Clock, Target, TrendingUp, Share2, Download, Calendar,
  CheckCircle, Lock, Zap, Globe, Camera, Gift, Sparkles
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  requirements: string[];
  benefits: string[];
  shareableImage: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  date: string;
  badgeId: string;
  eventName?: string;
  organizationName?: string;
}

export default function VolunteerBadges() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [showBadgeDialog, setShowBadgeDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data
  const badges: Badge[] = [
    // Hours Milestones
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first volunteer activity',
      icon: <Star className="h-6 w-6" />,
      category: 'milestones',
      rarity: 'common',
      earned: true,
      earnedDate: '2023-06-15',
      requirements: ['Complete 1 volunteer activity'],
      benefits: ['Profile badge display', 'Welcome bonus points'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '2',
      name: 'Helping Hand',
      description: 'Volunteer for 10 hours',
      icon: <Heart className="h-6 w-6" />,
      category: 'milestones',
      rarity: 'common',
      earned: true,
      earnedDate: '2023-07-20',
      requirements: ['Complete 10 volunteer hours'],
      benefits: ['Priority event notifications', 'Special recognition'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '3',
      name: 'Dedicated Volunteer',
      description: 'Volunteer for 50 hours',
      icon: <Award className="h-6 w-6" />,
      category: 'milestones',
      rarity: 'rare',
      earned: true,
      earnedDate: '2023-11-10',
      requirements: ['Complete 50 volunteer hours'],
      benefits: ['Advanced event access', 'Certificate priority', 'Special events invitation'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '4',
      name: 'Community Champion',
      description: 'Volunteer for 100 hours',
      icon: <Trophy className="h-6 w-6" />,
      category: 'milestones',
      rarity: 'epic',
      earned: false,
      progress: 67,
      maxProgress: 100,
      requirements: ['Complete 100 volunteer hours'],
      benefits: ['VIP event access', 'Personal coordinator', 'Premium certificates'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '5',
      name: 'Volunteer Legend',
      description: 'Volunteer for 500 hours',
      icon: <Crown className="h-6 w-6" />,
      category: 'milestones',
      rarity: 'legendary',
      earned: false,
      progress: 67,
      maxProgress: 500,
      requirements: ['Complete 500 volunteer hours'],
      benefits: ['Lifetime recognition', 'Advisory board invitation', 'Legacy certificate'],
      shareableImage: '/api/placeholder/400/400'
    },

    // Category Specialists
    {
      id: '6',
      name: 'Environmental Guardian',
      description: 'Complete 5 environmental activities',
      icon: <Leaf className="h-6 w-6" />,
      category: 'specialist',
      rarity: 'rare',
      earned: true,
      earnedDate: '2024-01-15',
      requirements: ['Complete 5 environmental volunteer activities'],
      benefits: ['Environmental events priority', 'Eco-specialist recognition'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '7',
      name: 'Education Advocate',
      description: 'Complete 5 educational activities',
      icon: <BookOpen className="h-6 w-6" />,
      category: 'specialist',
      rarity: 'rare',
      earned: false,
      progress: 2,
      maxProgress: 5,
      requirements: ['Complete 5 educational volunteer activities'],
      benefits: ['Education events priority', 'Teaching opportunities'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '8',
      name: 'Healthcare Hero',
      description: 'Complete 3 healthcare activities',
      icon: <Shield className="h-6 w-6" />,
      category: 'specialist',
      rarity: 'epic',
      earned: false,
      progress: 1,
      maxProgress: 3,
      requirements: ['Complete 3 healthcare volunteer activities', 'First Aid certification'],
      benefits: ['Healthcare events priority', 'Emergency response team invitation'],
      shareableImage: '/api/placeholder/400/400'
    },

    // Special Achievements
    {
      id: '9',
      name: 'Team Player',
      description: 'Participate in 3 group activities',
      icon: <Users className="h-6 w-6" />,
      category: 'special',
      rarity: 'common',
      earned: true,
      earnedDate: '2023-09-05',
      requirements: ['Participate in 3 group volunteer activities'],
      benefits: ['Team event notifications', 'Group coordination opportunities'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '10',
      name: 'Early Bird',
      description: 'Check in early to 5 events',
      icon: <Clock className="h-6 w-6" />,
      category: 'special',
      rarity: 'rare',
      earned: false,
      progress: 3,
      maxProgress: 5,
      requirements: ['Check in 15+ minutes early to 5 events'],
      benefits: ['Punctuality recognition', 'Event coordination opportunities'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '11',
      name: 'Perfect Attendance',
      description: 'Complete 10 events without missing any',
      icon: <Target className="h-6 w-6" />,
      category: 'special',
      rarity: 'epic',
      earned: false,
      progress: 7,
      maxProgress: 10,
      requirements: ['Complete 10 consecutive registered events without no-shows'],
      benefits: ['Reliability badge', 'Priority registration', 'Special recognition'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '12',
      name: 'Social Impact',
      description: 'Share 5 volunteer experiences on social media',
      icon: <Share2 className="h-6 w-6" />,
      category: 'special',
      rarity: 'rare',
      earned: true,
      earnedDate: '2024-02-20',
      requirements: ['Share 5 volunteer experiences on social media with #SwaedUAE'],
      benefits: ['Social media features', 'Ambassador opportunities'],
      shareableImage: '/api/placeholder/400/400'
    },

    // Seasonal & Limited
    {
      id: '13',
      name: 'Ramadan Spirit',
      description: 'Volunteer during Ramadan 2024',
      icon: <Sparkles className="h-6 w-6" />,
      category: 'seasonal',
      rarity: 'epic',
      earned: false,
      requirements: ['Complete volunteer activity during Ramadan 2024'],
      benefits: ['Seasonal recognition', 'Special Ramadan certificate', 'Community honors'],
      shareableImage: '/api/placeholder/400/400'
    },
    {
      id: '14',
      name: 'UAE National Day Champion',
      description: 'Participate in UAE National Day celebrations',
      icon: <Gift className="h-6 w-6" />,
      category: 'seasonal',
      rarity: 'legendary',
      earned: true,
      earnedDate: '2023-12-02',
      requirements: ['Volunteer for UAE National Day events'],
      benefits: ['National recognition', 'Government acknowledgment', 'Special certificate'],
      shareableImage: '/api/placeholder/400/400'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Volunteer Activity Completed!',
      description: 'You\'ve taken your first step into the world of volunteering',
      icon: <Star className="h-5 w-5" />,
      date: '2023-06-15',
      badgeId: '1',
      eventName: 'Community Garden Planting',
      organizationName: 'Green Initiative UAE'
    },
    {
      id: '2',
      title: 'Environmental Guardian Achieved!',
      description: 'You\'ve become a specialist in environmental conservation',
      icon: <Leaf className="h-5 w-5" />,
      date: '2024-01-15',
      badgeId: '6',
      eventName: 'Beach Cleanup Initiative',
      organizationName: 'Dubai Municipality'
    },
    {
      id: '3',
      title: 'Social Impact Badge Earned!',
      description: 'Your social media advocacy is making a difference',
      icon: <Share2 className="h-5 w-5" />,
      date: '2024-02-20',
      badgeId: '12'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Badges', count: badges.length },
    { id: 'milestones', name: 'Milestones', count: badges.filter(b => b.category === 'milestones').length },
    { id: 'specialist', name: 'Specialists', count: badges.filter(b => b.category === 'specialist').length },
    { id: 'special', name: 'Special', count: badges.filter(b => b.category === 'special').length },
    { id: 'seasonal', name: 'Seasonal', count: badges.filter(b => b.category === 'seasonal').length }
  ];

  const getRarityColor = (rarity: Badge['rarity']) => {
    const colors = {
      common: 'bg-gray-100 text-gray-800 border-gray-300',
      rare: 'bg-blue-100 text-blue-800 border-blue-300',
      epic: 'bg-purple-100 text-purple-800 border-purple-300',
      legendary: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    };
    return colors[rarity];
  };

  const getRarityGlow = (rarity: Badge['rarity']) => {
    const glows = {
      common: '',
      rare: 'shadow-lg shadow-blue-200',
      epic: 'shadow-lg shadow-purple-200',
      legendary: 'shadow-lg shadow-yellow-200'
    };
    return glows[rarity];
  };

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const earnedBadges = badges.filter(badge => badge.earned);
  const totalProgress = badges.reduce((sum, badge) => {
    if (badge.earned) return sum + 1;
    if (badge.progress && badge.maxProgress) {
      return sum + (badge.progress / badge.maxProgress);
    }
    return sum;
  }, 0);

  const shareBadge = (badge: Badge) => {
    const text = `I just earned the "${badge.name}" badge on SwaedUAE! 🏆 ${badge.description}`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: `SwaedUAE Badge: ${badge.name}`,
        text: text,
        url: url
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${text} ${url}`);
      alert('Badge details copied to clipboard!');
    }
  };

  const downloadBadge = (badge: Badge) => {
    // Simulate badge image download
    alert(`Downloading ${badge.name} badge image...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">My Badges & Achievements</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcase your volunteer journey and unlock special recognition for your contributions
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{earnedBadges.length}</div>
              <div className="text-sm text-gray-600">Badges Earned</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{badges.length}</div>
              <div className="text-sm text-gray-600">Total Badges</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((totalProgress / badges.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {badges.filter(b => b.rarity === 'epic' || b.rarity === 'legendary').filter(b => b.earned).length}
              </div>
              <div className="text-sm text-gray-600">Rare Badges</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest badge unlocks and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.slice(0, 3).map(achievement => (
                <div key={achievement.id} className="flex items-center space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(achievement.date).toLocaleDateString()}
                      {achievement.eventName && ` • ${achievement.eventName}`}
                      {achievement.organizationName && ` • ${achievement.organizationName}`}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2"
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-2">{category.count}</Badge>
            </Button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBadges.map(badge => (
            <Card 
              key={badge.id} 
              className={`relative cursor-pointer transition-all hover:scale-105 ${
                badge.earned ? getRarityGlow(badge.rarity) : 'opacity-60'
              }`}
              onClick={() => {
                setSelectedBadge(badge);
                setShowBadgeDialog(true);
              }}
            >
              <CardContent className="p-6 text-center">
                {/* Badge Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  badge.earned 
                    ? `${getRarityColor(badge.rarity)} border-2` 
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                }`}>
                  {badge.earned ? badge.icon : <Lock className="h-6 w-6" />}
                </div>

                {/* Badge Info */}
                <h3 className="font-semibold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{badge.description}</p>

                {/* Rarity Badge */}
                <Badge className={`${getRarityColor(badge.rarity)} mb-3`}>
                  {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                </Badge>

                {/* Progress Bar */}
                {!badge.earned && badge.progress && badge.maxProgress && (
                  <div className="space-y-2">
                    <Progress value={(badge.progress / badge.maxProgress) * 100} className="h-2" />
                    <div className="text-xs text-gray-500">
                      {badge.progress} / {badge.maxProgress}
                    </div>
                  </div>
                )}

                {/* Earned Date */}
                {badge.earned && badge.earnedDate && (
                  <div className="text-xs text-gray-500 mt-2">
                    Earned {new Date(badge.earnedDate).toLocaleDateString()}
                  </div>
                )}

                {/* Earned Indicator */}
                {badge.earned && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Badge Detail Dialog */}
        <Dialog open={showBadgeDialog} onOpenChange={setShowBadgeDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedBadge?.earned 
                    ? `${getRarityColor(selectedBadge.rarity)} border` 
                    : 'bg-gray-100 text-gray-400 border border-gray-300'
                }`}>
                  {selectedBadge?.earned ? selectedBadge.icon : <Lock className="h-4 w-4" />}
                </div>
                <span>{selectedBadge?.name}</span>
              </DialogTitle>
              <DialogDescription>
                {selectedBadge?.description}
              </DialogDescription>
            </DialogHeader>
            
            {selectedBadge && (
              <div className="space-y-4">
                {/* Rarity */}
                <div className="flex items-center justify-center">
                  <Badge className={getRarityColor(selectedBadge.rarity)}>
                    {selectedBadge.rarity.charAt(0).toUpperCase() + selectedBadge.rarity.slice(1)} Badge
                  </Badge>
                </div>

                {/* Progress */}
                {!selectedBadge.earned && selectedBadge.progress && selectedBadge.maxProgress && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{selectedBadge.progress} / {selectedBadge.maxProgress}</span>
                    </div>
                    <Progress value={(selectedBadge.progress / selectedBadge.maxProgress) * 100} />
                  </div>
                )}

                {/* Requirements */}
                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedBadge.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          selectedBadge.earned ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-medium mb-2">Benefits</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedBadge.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Star className="h-4 w-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Earned Date */}
                {selectedBadge.earned && selectedBadge.earnedDate && (
                  <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600 mx-auto mb-1" />
                    <div className="text-sm font-medium text-green-800">
                      Earned on {new Date(selectedBadge.earnedDate).toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {selectedBadge.earned && (
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1" onClick={() => shareBadge(selectedBadge)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => downloadBadge(selectedBadge)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}