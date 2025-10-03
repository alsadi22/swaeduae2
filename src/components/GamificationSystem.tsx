import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Award, Trophy, Star, Target, Zap, 
  Heart, Leaf, GraduationCap, Shield,
  Clock, Users, TrendingUp, Medal
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  category: 'environment' | 'community' | 'healthcare' | 'education' | 'milestone';
}

interface VolunteerLevel {
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  icon: React.ReactNode;
  color: string;
  minHours: number;
  maxHours?: number;
}

interface GamificationSystemProps {
  volunteerHours: number;
  achievements: Achievement[];
  streakDays: number;
  impactMetrics: {
    peopleHelped: number;
    eventsCompleted: number;
    certificatesEarned: number;
  };
}

export default function GamificationSystem({ 
  volunteerHours, 
  achievements, 
  streakDays,
  impactMetrics 
}: GamificationSystemProps) {
  const { t } = useLanguage();

  const levels: VolunteerLevel[] = [
    {
      level: 'bronze',
      name: t('achievements.bronzeLevel'),
      icon: <Medal className="h-6 w-6 text-amber-600" />,
      color: 'bg-amber-100 text-amber-800',
      minHours: 0,
      maxHours: 50
    },
    {
      level: 'silver',
      name: t('achievements.silverLevel'),
      icon: <Medal className="h-6 w-6 text-gray-500" />,
      color: 'bg-gray-100 text-gray-800',
      minHours: 50,
      maxHours: 150
    },
    {
      level: 'gold',
      name: t('achievements.goldLevel'),
      icon: <Medal className="h-6 w-6 text-yellow-500" />,
      color: 'bg-yellow-100 text-yellow-800',
      minHours: 150,
      maxHours: 300
    },
    {
      level: 'platinum',
      name: t('achievements.platinumLevel'),
      icon: <Trophy className="h-6 w-6 text-purple-600" />,
      color: 'bg-purple-100 text-purple-800',
      minHours: 300
    }
  ];

  const getCurrentLevel = (): VolunteerLevel => {
    return levels.find(level => 
      volunteerHours >= level.minHours && 
      (!level.maxHours || volunteerHours < level.maxHours)
    ) || levels[0];
  };

  const getNextLevel = (): VolunteerLevel | null => {
    const currentLevel = getCurrentLevel();
    const currentIndex = levels.findIndex(l => l.level === currentLevel.level);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  };

  const getProgressToNextLevel = (): number => {
    const nextLevel = getNextLevel();
    if (!nextLevel) return 100;
    
    const currentLevel = getCurrentLevel();
    const progress = volunteerHours - currentLevel.minHours;
    const total = nextLevel.minHours - currentLevel.minHours;
    return Math.min((progress / total) * 100, 100);
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progressToNext = getProgressToNextLevel();

  const categoryIcons = {
    environment: <Leaf className="h-5 w-5 text-green-600" />,
    community: <Heart className="h-5 w-5 text-red-600" />,
    healthcare: <Shield className="h-5 w-5 text-blue-600" />,
    education: <GraduationCap className="h-5 w-5 text-purple-600" />,
    milestone: <Target className="h-5 w-5 text-orange-600" />
  };

  return (
    <div className="space-y-6">
      {/* Volunteer Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Volunteer Level</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {currentLevel.icon}
              <div>
                <Badge className={currentLevel.color}>
                  {currentLevel.name}
                </Badge>
                <p className="text-sm text-gray-600 mt-1">
                  {volunteerHours} hours completed
                </p>
              </div>
            </div>
            {nextLevel && (
              <div className="text-right">
                <p className="text-sm font-medium">Next: {nextLevel.name}</p>
                <p className="text-xs text-gray-600">
                  {nextLevel.minHours - volunteerHours} hours to go
                </p>
              </div>
            )}
          </div>
          
          {nextLevel && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextLevel.name}</span>
                <span>{Math.round(progressToNext)}%</span>
              </div>
              <Progress value={progressToNext} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {impactMetrics.peopleHelped.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">People Helped</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {impactMetrics.eventsCompleted}
            </div>
            <div className="text-sm text-gray-600">Events Completed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {impactMetrics.certificatesEarned}
            </div>
            <div className="text-sm text-gray-600">Certificates Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Streak Counter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-full">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold">Volunteer Streak</h3>
                <p className="text-sm text-gray-600">
                  {streakDays} days of consistent volunteering
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">
                {streakDays}
              </div>
              <div className="text-xs text-gray-600">days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.earned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {categoryIcons[achievement.category]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className={`font-medium ${
                        achievement.earned ? 'text-green-900' : 'text-gray-700'
                      }`}>
                        {achievement.title}
                      </h4>
                      {achievement.earned && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Earned
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-green-700' : 'text-gray-600'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}