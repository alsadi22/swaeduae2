import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Search, Filter, MapPin, Calendar, Clock, 
  Users, Star, X, SlidersHorizontal 
} from 'lucide-react';

interface SearchFilters {
  query: string;
  location: string;
  category: string[];
  skills: string[];
  timeCommitment: string;
  availability: string;
  rating: number;
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
}

export default function AdvancedSearch({ onSearch, onClear }: AdvancedSearchProps) {
  const { t, isRTL } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    location: '',
    category: [],
    skills: [],
    timeCommitment: '',
    availability: '',
    rating: 0
  });

  const emirates = [
    'emirates.dubai',
    'emirates.abuDhabi',
    'emirates.sharjah',
    'emirates.ajman',
    'emirates.ummalQuwain',
    'emirates.rasAlKhaimah',
    'emirates.fujairah'
  ];

  const categories = [
    'opportunities.environment',
    'opportunities.education',
    'opportunities.healthcare',
    'Community Service',
    'Elderly Care',
    'Youth Development',
    'Animal Welfare',
    'Disaster Relief'
  ];

  const skills = [
    'Teaching',
    'Medical Care',
    'Event Planning',
    'Translation',
    'Photography',
    'Social Media',
    'Fundraising',
    'Leadership',
    'Communication',
    'Technical Skills'
  ];

  const timeCommitments = [
    '1-2 hours',
    '3-5 hours',
    '6-8 hours',
    'Full day',
    'Weekend',
    'Weekly',
    'Monthly'
  ];

  const availabilities = [
    'Weekdays',
    'Weekends',
    'Mornings',
    'Afternoons',
    'Evenings',
    'Flexible'
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      category: checked 
        ? [...prev.category, category]
        : prev.category.filter(c => c !== category)
    }));
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      skills: checked 
        ? [...prev.skills, skill]
        : prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      query: '',
      location: '',
      category: [],
      skills: [],
      timeCommitment: '',
      availability: '',
      rating: 0
    });
    onClear();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>{t('common.search')}</span>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {t('common.filter')}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Search Bar */}
        <div className="relative">
          <Search className={`absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
          <Input
            placeholder={t('search.placeholder')}
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className={isRTL ? 'pr-10' : 'pl-10'}
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
            <SelectTrigger className="w-40">
              <MapPin className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('search.location')} />
            </SelectTrigger>
            <SelectContent>
              {emirates.map(emirate => (
                <SelectItem key={emirate} value={emirate}>
                  {t(emirate)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.timeCommitment} onValueChange={(value) => setFilters(prev => ({ ...prev, timeCommitment: value }))}>
            <SelectTrigger className="w-40">
              <Clock className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('search.timeCommitment')} />
            </SelectTrigger>
            <SelectContent>
              {timeCommitments.map(time => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({ ...prev, availability: value }))}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder={t('search.availability')} />
            </SelectTrigger>
            <SelectContent>
              {availabilities.map(availability => (
                <SelectItem key={availability} value={availability}>
                  {availability}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            {/* Categories */}
            <div>
              <h4 className="font-medium mb-2">{t('search.category')}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.category.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <label htmlFor={category} className="text-sm">
                      {category.startsWith('opportunities.') ? t(category) : category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-medium mb-2">{t('search.skills')}</h4>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <Badge
                    key={skill}
                    variant={filters.skills.includes(skill) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleSkillChange(skill, !filters.skills.includes(skill))}
                  >
                    {skill}
                    {filters.skills.includes(skill) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="font-medium mb-2">Minimum Rating</h4>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(rating => (
                  <Button
                    key={rating}
                    variant={filters.rating >= rating ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilters(prev => ({ ...prev, rating }))}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-4">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="h-4 w-4 mr-2" />
            {t('common.search')}
          </Button>
          <Button variant="outline" onClick={handleClear}>
            <X className="h-4 w-4 mr-2" />
            {t('search.clearFilters')}
          </Button>
        </div>

        {/* Active Filters Display */}
        {(filters.category.length > 0 || filters.skills.length > 0 || filters.location || filters.timeCommitment || filters.availability) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.location && (
              <Badge variant="secondary">
                <MapPin className="h-3 w-3 mr-1" />
                {t(filters.location)}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => setFilters(prev => ({ ...prev, location: '' }))}
                />
              </Badge>
            )}
            {filters.category.map(category => (
              <Badge key={category} variant="secondary">
                {category.startsWith('opportunities.') ? t(category) : category}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleCategoryChange(category, false)}
                />
              </Badge>
            ))}
            {filters.skills.map(skill => (
              <Badge key={skill} variant="secondary">
                {skill}
                <X 
                  className="h-3 w-3 ml-1 cursor-pointer" 
                  onClick={() => handleSkillChange(skill, false)}
                />
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}