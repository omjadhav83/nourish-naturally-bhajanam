import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share2, Users, TrendingUp, Award, Plus } from 'lucide-react';

const posts = [
  {
    id: 1,
    author: "Maya Sharma",
    avatar: "MS",
    time: "2 hours ago",
    category: "Recipe",
    title: "Heart-Healthy Quinoa Bowl Recipe",
    content: "Just tried this amazing quinoa bowl with roasted vegetables and tahini dressing. Perfect for my heart health journey! 🥗❤️",
    image: "🥗",
    likes: 24,
    comments: 8,
    tags: ["heart-healthy", "quinoa", "vegetarian"]
  },
  {
    id: 2, 
    author: "Raj Patel",
    avatar: "RP",
    time: "5 hours ago",
    category: "Success Story",
    title: "7-Day Streak with Rajasthani Diet!",
    content: "Completed my first week following traditional Rajasthani diet plan. Feeling more energetic and my digestion has improved significantly! 💪",
    image: "🏜️",
    likes: 45,
    comments: 12,
    tags: ["success", "rajasthani", "energy"]
  },
  {
    id: 3,
    author: "Dr. Priya Kumar",
    avatar: "PK",
    time: "1 day ago",
    category: "Tip",
    title: "Morning Ayurvedic Routine",
    content: "Start your day with warm water + lemon + honey. This simple Ayurvedic practice kickstarts metabolism and aids digestion. Try it for a week! 🌅",
    image: "🍯",
    likes: 67,
    comments: 15,
    tags: ["ayurveda", "morning-routine", "digestion"]
  }
];

const challenges = [
  {
    name: "30-Day Natural Detox",
    participants: 1250,
    daysLeft: 12,
    description: "Natural detox using traditional Indian herbs and foods"
  },
  {
    name: "Mindful Eating Challenge", 
    participants: 890,
    daysLeft: 8,
    description: "Practice mindful eating and gratitude with meals"
  },
  {
    name: "Regional Recipe Exchange",
    participants: 2100,
    daysLeft: 20,
    description: "Share and try traditional recipes from different states"
  }
];

export const Community = () => {
  const [newPost, setNewPost] = useState('');
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Community</h1>
        <p className="text-muted-foreground mt-2">
          Connect with others on their natural wellness journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="recipes">Recipe Exchange</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6 mt-6">
              {/* Create Post */}
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle className="text-lg">Share with Community</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Share your wellness journey, ask questions, or post a recipe..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={3}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        📸 Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        🥗 Recipe
                      </Button>
                      <Button variant="outline" size="sm">
                        💡 Tip
                      </Button>
                    </div>
                    <Button className="btn-wellness-hover">
                      <Plus className="h-4 w-4 mr-2" />
                      Share Post
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="card-feature">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {post.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{post.author}</div>
                            <div className="text-sm text-muted-foreground">{post.time}</div>
                          </div>
                        </div>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">{post.title}</h3>
                        <p className="text-muted-foreground">{post.content}</p>
                      </div>
                      
                      {post.image && (
                        <div className="text-6xl text-center py-4 bg-muted/20 rounded-lg">
                          {post.image}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4 mt-6">
              {challenges.map((challenge, index) => (
                <Card key={index} className="card-feature">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{challenge.name}</CardTitle>
                        <CardDescription>{challenge.description}</CardDescription>
                      </div>
                      <Badge className="bg-primary/10 text-primary">
                        {challenge.daysLeft} days left
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {challenge.participants.toLocaleString()} participants
                      </div>
                      <Button size="sm" className="btn-wellness-hover">
                        Join Challenge
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recipes" className="space-y-4 mt-6">
              <Card className="card-wellness">
                <CardContent className="text-center py-12">
                  <div className="text-6xl mb-4">🥘</div>
                  <p className="text-muted-foreground">
                    Recipe exchange feature coming soon! Share and discover traditional healthy recipes from across India.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Community Stats */}
          <Card className="card-wellness">
            <CardHeader>
              <CardTitle className="text-lg">Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12,500+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">2,850</div>
                <div className="text-sm text-muted-foreground">Recipes Shared</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">450</div>
                <div className="text-sm text-muted-foreground">Success Stories</div>
              </div>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card className="card-wellness">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['#ayurveda', '#plantbased', '#regionalcuisine', '#detox', '#immunity'].map((topic, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start h-auto p-2">
                  <span className="text-sm">{topic}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card className="card-wellness">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Dr. Priya Kumar", badge: "Expert", posts: 145 },
                { name: "Maya Sharma", badge: "Recipe Master", posts: 89 },
                { name: "Raj Patel", badge: "Motivator", posts: 67 }
              ].map((contributor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {contributor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{contributor.name}</div>
                    <div className="text-xs text-muted-foreground">{contributor.posts} posts</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {contributor.badge}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};