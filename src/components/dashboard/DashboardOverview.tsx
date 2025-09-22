import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Droplets, 
  Flame, 
  TrendingUp, 
  Calendar, 
  Award,
  Users,
  Apple
} from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface DashboardOverviewProps {
  user: User | null;
}

export const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  const getUserName = () => {
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Wellness Seeker';
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-wellness rounded-xl p-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {getTimeGreeting()}, {getUserName()}! 🌱
            </h1>
            <p className="text-primary-foreground/80 mt-2">
              Ready to nourish your body naturally today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-primary-foreground/10 p-4 rounded-full">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-feature">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6/8</div>
            <p className="text-xs text-muted-foreground">glasses today</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-feature">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calories</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <p className="text-xs text-muted-foreground">of 2,000 goal</p>
            <Progress value={92} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-feature">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">days consistent</p>
            <div className="flex gap-1 mt-2">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full ${
                    i < 5 ? 'bg-success' : 'bg-muted'
                  }`} 
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-feature">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">weekly goals</p>
            <Badge variant="secondary" className="mt-2">
              Excellent!
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Today's Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-wellness">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-primary" />
              Today's Nutrition Focus
            </CardTitle>
            <CardDescription>
              Personalized recommendations for your wellness journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Boost Iron Intake</p>
                  <p className="text-sm text-muted-foreground">
                    Add spinach, lentils, or lean meat to your meals
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-wellness-leaf rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Increase Antioxidants</p>
                  <p className="text-sm text-muted-foreground">
                    Include berries and green tea in your diet
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-wellness-sage rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Hydration Check</p>
                  <p className="text-sm text-muted-foreground">
                    You're doing great! Keep up the water intake
                  </p>
                </div>
              </div>
            </div>
            <Button className="w-full btn-wellness-hover">
              View Detailed Plan
            </Button>
          </CardContent>
        </Card>

        <Card className="card-wellness">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Community Highlights
            </CardTitle>
            <CardDescription>
              See what others in your wellness community are sharing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">MK</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Maya shared a recipe</p>
                  <p className="text-xs text-muted-foreground">
                    "Heart-healthy quinoa bowl with roasted vegetables"
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-wellness-leaf/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-wellness-leaf">RJ</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Raj completed 7-day streak</p>
                  <p className="text-xs text-muted-foreground">
                    Following Rajasthani traditional diet plan
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Join Community
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-wellness">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump into your most-used features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Heart className="h-6 w-6" />
              <span className="text-sm">Scan Food</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Meal Plan</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Track Progress</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Community</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};