import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, TrendingDown, Users, Calendar, Star, Target,
  Award, Clock, BarChart3, PieChart, Download, Share2,
  AlertTriangle, CheckCircle, ArrowUp, ArrowDown, Minus,
  Filter, RefreshCw, Eye, Settings, Trophy, Zap
} from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number;
  status: 'excellent' | 'good' | 'average' | 'poor';
  category: string;
  description: string;
}

interface ScoreCard {
  id: string;
  category: string;
  score: number;
  maxScore: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D';
  kpis: KPI[];
  insights: string[];
  recommendations: string[];
}

export default function OrgScorecards() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-quarter');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock KPI data
  const kpis: KPI[] = [
    {
      id: '1',
      name: 'Volunteer Retention Rate',
      value: 78.5,
      target: 75,
      unit: '%',
      trend: 'up',
      change: 5.2,
      status: 'excellent',
      category: 'Engagement',
      description: 'Percentage of volunteers who participate in multiple events'
    },
    {
      id: '2',
      name: 'Event Completion Rate',
      value: 94.2,
      target: 95,
      unit: '%',
      trend: 'down',
      change: -1.8,
      status: 'good',
      category: 'Operations',
      description: 'Percentage of events completed successfully without cancellation'
    },
    {
      id: '3',
      name: 'Average Event Rating',
      value: 4.7,
      target: 4.5,
      unit: '/5',
      trend: 'up',
      change: 0.3,
      status: 'excellent',
      category: 'Quality',
      description: 'Average rating given by volunteers for events'
    },
    {
      id: '4',
      name: 'Volunteer Response Time',
      value: 2.3,
      target: 3,
      unit: 'days',
      trend: 'up',
      change: 0.5,
      status: 'good',
      category: 'Communication',
      description: 'Average time to respond to volunteer inquiries'
    },
    {
      id: '5',
      name: 'Event Fill Rate',
      value: 87.4,
      target: 85,
      unit: '%',
      trend: 'up',
      change: 3.1,
      status: 'excellent',
      category: 'Recruitment',
      description: 'Percentage of volunteer spots filled for events'
    },
    {
      id: '6',
      name: 'No-Show Rate',
      value: 8.2,
      target: 10,
      unit: '%',
      trend: 'down',
      change: -1.5,
      status: 'good',
      category: 'Reliability',
      description: 'Percentage of registered volunteers who don\'t attend events'
    },
    {
      id: '7',
      name: 'Impact Score',
      value: 8.9,
      target: 8,
      unit: '/10',
      trend: 'up',
      change: 0.7,
      status: 'excellent',
      category: 'Impact',
      description: 'Composite score measuring community impact of events'
    },
    {
      id: '8',
      name: 'Cost per Volunteer Hour',
      value: 12.5,
      target: 15,
      unit: 'AED',
      trend: 'down',
      change: -2.1,
      status: 'excellent',
      category: 'Efficiency',
      description: 'Cost efficiency of volunteer program operations'
    }
  ];

  // Group KPIs into scorecards
  const scorecards: ScoreCard[] = [
    {
      id: '1',
      category: 'Volunteer Engagement',
      score: 85,
      maxScore: 100,
      grade: 'A',
      kpis: kpis.filter(kpi => ['Engagement', 'Recruitment'].includes(kpi.category)),
      insights: [
        'Volunteer retention has improved significantly this quarter',
        'Event fill rates are consistently above target',
        'Strong volunteer satisfaction scores indicate good engagement'
      ],
      recommendations: [
        'Continue current engagement strategies',
        'Consider expanding volunteer recognition programs',
        'Implement peer-to-peer recruitment initiatives'
      ]
    },
    {
      id: '2',
      category: 'Operational Excellence',
      score: 78,
      maxScore: 100,
      grade: 'B+',
      kpis: kpis.filter(kpi => ['Operations', 'Reliability'].includes(kpi.category)),
      insights: [
        'Event completion rate slightly below target',
        'No-show rates are improving but need attention',
        'Overall operational efficiency is good'
      ],
      recommendations: [
        'Implement better event planning processes',
        'Introduce volunteer commitment confirmation system',
        'Provide backup volunteer pools for critical events'
      ]
    },
    {
      id: '3',
      category: 'Quality & Impact',
      score: 92,
      maxScore: 100,
      grade: 'A+',
      kpis: kpis.filter(kpi => ['Quality', 'Impact'].includes(kpi.category)),
      insights: [
        'Exceptional volunteer satisfaction ratings',
        'Strong community impact measurement',
        'Quality standards consistently exceeded'
      ],
      recommendations: [
        'Share best practices with other organizations',
        'Document successful quality assurance processes',
        'Consider expanding high-impact program areas'
      ]
    },
    {
      id: '4',
      category: 'Communication & Efficiency',
      score: 81,
      maxScore: 100,
      grade: 'A-',
      kpis: kpis.filter(kpi => ['Communication', 'Efficiency'].includes(kpi.category)),
      insights: [
        'Response times are good but could be faster',
        'Cost efficiency is excellent',
        'Communication processes are effective'
      ],
      recommendations: [
        'Implement automated response systems',
        'Optimize resource allocation further',
        'Enhance digital communication channels'
      ]
    }
  ];

  const overallScore = scorecards.reduce((sum, card) => sum + card.score, 0) / scorecards.length;
  const overallGrade = overallScore >= 95 ? 'A+' : 
                      overallScore >= 90 ? 'A' : 
                      overallScore >= 85 ? 'A-' : 
                      overallScore >= 80 ? 'B+' : 
                      overallScore >= 75 ? 'B' : 
                      overallScore >= 70 ? 'B-' : 'C+';

  const getStatusColor = (status: KPI['status']) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'average':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: KPI['trend']) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getGradeColor = (grade: ScoreCard['grade']) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-100';
      case 'A-':
      case 'B+':
        return 'text-blue-600 bg-blue-100';
      case 'B':
      case 'B-':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-red-600 bg-red-100';
    }
  };

  const exportScorecard = () => {
    alert('Scorecard exported to PDF successfully!');
  };

  const shareScorecard = () => {
    alert('Scorecard shared with stakeholders!');
  };

  const refreshData = () => {
    alert('Data refreshed successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organization Scorecard</h1>
            <p className="text-gray-600">Performance metrics and KPIs for your volunteer programs</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="current-quarter">Current Quarter</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="current-year">Current Year</option>
              <option value="last-year">Last Year</option>
            </select>
            <Button variant="outline" onClick={refreshData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={shareScorecard}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={exportScorecard}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center space-x-8">
              <div>
                <Trophy className="h-16 w-16 mx-auto mb-4 opacity-90" />
                <h2 className="text-4xl font-bold mb-2">{overallScore.toFixed(1)}</h2>
                <p className="text-xl opacity-90">Overall Score</p>
              </div>
              <div className="text-6xl font-bold opacity-20">|</div>
              <div>
                <div className={`text-6xl font-bold px-6 py-3 rounded-lg ${
                  overallGrade.includes('A') ? 'bg-green-500' :
                  overallGrade.includes('B') ? 'bg-blue-500' : 'bg-yellow-500'
                }`}>
                  {overallGrade}
                </div>
                <p className="text-xl opacity-90 mt-2">Grade</p>
              </div>
            </div>
            <p className="text-lg opacity-80 mt-4">
              Your organization is performing {overallScore >= 85 ? 'excellently' : overallScore >= 75 ? 'well' : 'adequately'} across all key metrics
            </p>
          </CardContent>
        </Card>

        {/* Category Scorecards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {scorecards.map(scorecard => (
            <Card key={scorecard.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{scorecard.category}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getGradeColor(scorecard.grade)}>
                      {scorecard.grade}
                    </Badge>
                    <span className="text-2xl font-bold text-gray-900">
                      {scorecard.score}/{scorecard.maxScore}
                    </span>
                  </div>
                </div>
                <Progress value={scorecard.score} className="h-3" />
              </CardHeader>
              <CardContent>
                {/* KPIs */}
                <div className="space-y-4 mb-6">
                  {scorecard.kpis.map(kpi => (
                    <div key={kpi.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{kpi.name}</h4>
                          <Badge className={getStatusColor(kpi.status)} size="sm">
                            {kpi.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">{kpi.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">
                            {kpi.value}{kpi.unit}
                          </span>
                          {getTrendIcon(kpi.trend)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Target: {kpi.target}{kpi.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Insights */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>Key Insights</span>
                  </h4>
                  <ul className="space-y-1">
                    {scorecard.insights.map((insight, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>Recommendations</span>
                  </h4>
                  <ul className="space-y-1">
                    {scorecard.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                        <Zap className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed KPI Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Detailed KPI Analysis</span>
            </CardTitle>
            <CardDescription>Comprehensive view of all key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">KPI</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Current</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Target</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Trend</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map(kpi => (
                    <tr key={kpi.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{kpi.name}</div>
                        <div className="text-sm text-gray-600">{kpi.description}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900">
                          {kpi.value}{kpi.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gray-600">
                          {kpi.target}{kpi.unit}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(kpi.trend)}
                          <span className={`text-sm font-medium ${
                            kpi.trend === 'up' ? 'text-green-600' :
                            kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {kpi.change > 0 ? '+' : ''}{kpi.change}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(kpi.status)}>
                          {kpi.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{kpi.category}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>KPI performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                  <p>Performance trend chart would be displayed here</p>
                  <p className="text-sm">Showing 12-month KPI trends</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Score distribution across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scorecards.map(scorecard => (
                  <div key={scorecard.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{scorecard.category}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${scorecard.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                        {scorecard.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Priority Action Items</span>
            </CardTitle>
            <CardDescription>Areas requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kpis
                .filter(kpi => kpi.status === 'average' || kpi.status === 'poor' || kpi.value < kpi.target)
                .map(kpi => (
                <div key={kpi.id} className="flex items-start space-x-3 p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{kpi.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Current: {kpi.value}{kpi.unit} | Target: {kpi.target}{kpi.unit}
                    </p>
                    <p className="text-sm text-orange-800">
                      {kpi.value < kpi.target 
                        ? `Below target by ${(kpi.target - kpi.value).toFixed(1)}${kpi.unit}`
                        : `Needs improvement in ${kpi.category.toLowerCase()}`
                      }
                    </p>
                  </div>
                  <Badge className={getStatusColor(kpi.status)}>
                    {kpi.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}