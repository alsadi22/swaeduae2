import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Calendar, User, Eye, Heart, Share2, Bookmark,
  ChevronRight, Clock, MessageCircle, TrendingUp, Star,
  Filter, ArrowRight, Tag, Globe
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedDate: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  image: string;
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Future of Volunteering in the UAE: Digital Transformation and Community Impact',
      excerpt: 'Explore how digital platforms are revolutionizing volunteer engagement and creating lasting community impact across the UAE.',
      content: 'Full article content would be here...',
      author: {
        name: 'Sarah Al-Zahra',
        avatar: '/api/placeholder/50/50',
        role: 'Community Impact Director'
      },
      category: 'Technology',
      tags: ['digital-transformation', 'community-impact', 'uae', 'future-trends'],
      publishedDate: '2024-03-20',
      readTime: 8,
      views: 2847,
      likes: 156,
      comments: 23,
      featured: true,
      image: '/api/placeholder/800/400'
    },
    {
      id: '2',
      title: 'Success Story: How 1000 Volunteers Transformed Dubai Marina Beach',
      excerpt: 'A deep dive into our largest environmental initiative and the incredible impact achieved through collective volunteer action.',
      content: 'Full article content would be here...',
      author: {
        name: 'Ahmed Hassan',
        avatar: '/api/placeholder/50/50',
        role: 'Environmental Program Manager'
      },
      category: 'Success Stories',
      tags: ['environment', 'beach-cleanup', 'dubai', 'success-story'],
      publishedDate: '2024-03-18',
      readTime: 6,
      views: 1923,
      likes: 234,
      comments: 45,
      featured: true,
      image: '/api/placeholder/800/400'
    },
    {
      id: '3',
      title: 'Building Bridges: Youth Volunteer Programs Making a Difference',
      excerpt: 'Discover how young volunteers are leading change in education, technology, and community development across the Emirates.',
      content: 'Full article content would be here...',
      author: {
        name: 'Fatima Al-Rashid',
        avatar: '/api/placeholder/50/50',
        role: 'Youth Programs Coordinator'
      },
      category: 'Youth Programs',
      tags: ['youth', 'education', 'leadership', 'community-development'],
      publishedDate: '2024-03-15',
      readTime: 5,
      views: 1456,
      likes: 89,
      comments: 18,
      featured: false,
      image: '/api/placeholder/800/400'
    },
    {
      id: '4',
      title: 'Corporate Volunteering: A Win-Win Strategy for Business and Community',
      excerpt: 'Learn how leading UAE companies are integrating volunteer programs to boost employee engagement and social impact.',
      content: 'Full article content would be here...',
      author: {
        name: 'Mohammed Al-Mansouri',
        avatar: '/api/placeholder/50/50',
        role: 'Corporate Partnerships Lead'
      },
      category: 'Corporate',
      tags: ['corporate', 'employee-engagement', 'business-impact', 'partnerships'],
      publishedDate: '2024-03-12',
      readTime: 7,
      views: 2134,
      likes: 167,
      comments: 31,
      featured: false,
      image: '/api/placeholder/800/400'
    },
    {
      id: '5',
      title: 'Ramadan Volunteering: The Spirit of Giving in Action',
      excerpt: 'Celebrating the incredible volunteer efforts during Ramadan 2024 and the lasting impact on communities across the UAE.',
      content: 'Full article content would be here...',
      author: {
        name: 'Aisha Abdullah',
        avatar: '/api/placeholder/50/50',
        role: 'Community Outreach Manager'
      },
      category: 'Seasonal',
      tags: ['ramadan', 'giving', 'community', 'seasonal-programs'],
      publishedDate: '2024-03-10',
      readTime: 4,
      views: 3421,
      likes: 298,
      comments: 67,
      featured: true,
      image: '/api/placeholder/800/400'
    },
    {
      id: '6',
      title: 'Innovation in Action: How Technology is Enhancing Volunteer Experiences',
      excerpt: 'From AI-powered matching to blockchain certificates, explore the cutting-edge technologies transforming volunteering.',
      content: 'Full article content would be here...',
      author: {
        name: 'Omar Al-Zaabi',
        avatar: '/api/placeholder/50/50',
        role: 'Technology Innovation Lead'
      },
      category: 'Technology',
      tags: ['innovation', 'ai', 'blockchain', 'technology'],
      publishedDate: '2024-03-08',
      readTime: 9,
      views: 1789,
      likes: 134,
      comments: 22,
      featured: false,
      image: '/api/placeholder/800/400'
    },
    {
      id: '7',
      title: 'Volunteer Spotlight: Meet the Champions Making a Difference',
      excerpt: 'Get inspired by the stories of our most dedicated volunteers and learn what drives their passion for community service.',
      content: 'Full article content would be here...',
      author: {
        name: 'Layla Al-Hashimi',
        avatar: '/api/placeholder/50/50',
        role: 'Volunteer Relations Manager'
      },
      category: 'Volunteer Stories',
      tags: ['volunteer-spotlight', 'inspiration', 'community-champions'],
      publishedDate: '2024-03-05',
      readTime: 6,
      views: 1267,
      likes: 156,
      comments: 28,
      featured: false,
      image: '/api/placeholder/800/400'
    },
    {
      id: '8',
      title: 'Measuring Impact: How We Track the Success of Volunteer Programs',
      excerpt: 'Dive into the metrics and methodologies we use to measure volunteer program effectiveness and community impact.',
      content: 'Full article content would be here...',
      author: {
        name: 'Khalid Al-Nuaimi',
        avatar: '/api/placeholder/50/50',
        role: 'Impact Measurement Specialist'
      },
      category: 'Impact & Analytics',
      tags: ['impact-measurement', 'analytics', 'program-evaluation'],
      publishedDate: '2024-03-02',
      readTime: 8,
      views: 945,
      likes: 78,
      comments: 15,
      featured: false,
      image: '/api/placeholder/800/400'
    }
  ];

  const categories = [
    'all', 'Technology', 'Success Stories', 'Youth Programs', 'Corporate',
    'Seasonal', 'Volunteer Stories', 'Impact & Analytics'
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleLike = (postId: string) => {
    alert('Post liked!');
  };

  const handleBookmark = (postId: string) => {
    alert('Post bookmarked!');
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href + `#post-${post.id}`
      });
    } else {
      alert('Post link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">SwaedUAE Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stories, insights, and updates from the heart of UAE's volunteer community
          </p>
        </div>

        {/* Featured Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{post.readTime} min read</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{post.author.name}</div>
                        <div className="text-xs text-gray-500">{post.author.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    Read Full Story
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search articles by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Latest Articles ({filteredPosts.length})
              </h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            <div className="space-y-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 md:h-full object-cover rounded-l-lg"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="outline">{post.category}</Badge>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {new Date(post.publishedDate).toLocaleDateString()}
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{post.readTime} min read</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={post.author.avatar} 
                              alt={post.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{post.author.name}</div>
                              <div className="text-xs text-gray-500">{post.author.role}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id)}
                            >
                              <Heart className="h-4 w-4 mr-1" />
                              {post.likes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleBookmark(post.id)}
                            >
                              <Bookmark className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare(post)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or browse different categories.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Popular This Week</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogPosts
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((post, index) => (
                    <div key={post.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </span>
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.slice(1).map(category => {
                    const count = blogPosts.filter(post => post.category === category).length;
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start p-0 h-auto"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Button>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Stay Updated</CardTitle>
                <CardDescription className="text-blue-700">
                  Get the latest volunteer stories and updates delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Enter your email" />
                  <Button className="w-full">
                    Subscribe to Newsletter
                  </Button>
                  <p className="text-xs text-blue-600">
                    Join 5,000+ volunteers who stay informed with our weekly digest
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}