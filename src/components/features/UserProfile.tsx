import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { User, Settings, Globe, Shield, Bell, Heart, Award, TrendingUp } from 'lucide-react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface UserProfileProps {
  user: SupabaseUser | null;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    healthGoals: '',
    dietaryPreferences: '',
    allergies: '',
    medicalConditions: '',
    preferredLanguage: 'english'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    mealReminders: true,
    communityActivity: false,
    weeklyReports: true
  });

  const getUserInitials = () => {
    if (profileData.fullName) {
      return profileData.fullName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'UN';
  };

  const achievements = [
    { name: "First Week Complete", description: "Completed your first week", earned: true },
    { name: "Recipe Sharer", description: "Shared 5 recipes with community", earned: true },
    { name: "Streak Master", description: "Maintained 30-day streak", earned: false },
    { name: "Health Guru", description: "Helped 10 community members", earned: false }
  ];

  const healthStats = [
    { label: "Days Active", value: 28, total: 30, color: "bg-green-500" },
    { label: "Recipes Tried", value: 15, total: 20, color: "bg-blue-500" },
    { label: "Community Posts", value: 8, total: 10, color: "bg-purple-500" },
    { label: "Health Goals", value: 7, total: 10, color: "bg-orange-500" }
  ];

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and wellness preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Overview */}
        <Card className="card-wellness">
          <CardHeader className="text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4">
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{profileData.fullName || 'Wellness Seeker'}</CardTitle>
            <CardDescription>{profileData.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                Premium Member
              </Badge>
              <p className="text-sm text-muted-foreground">
                Member since Jan 2024
              </p>
            </div>
            
            <div className="space-y-2">
              {healthStats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{stat.label}</span>
                    <span className="text-muted-foreground">{stat.value}/{stat.total}</span>
                  </div>
                  <Progress value={(stat.value / stat.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="health">Health Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  <CardDescription>
                    Update your basic profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={profileData.age}
                        onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={profileData.gender} onValueChange={(value) => setProfileData({...profileData, gender: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="btn-wellness-hover">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Health Profile
                  </CardTitle>
                  <CardDescription>
                    Your health information for personalized recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        value={profileData.height}
                        onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={profileData.weight}
                        onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity Level</Label>
                    <Select value={profileData.activityLevel} onValueChange={(value) => setProfileData({...profileData, activityLevel: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">Lightly Active</SelectItem>
                        <SelectItem value="moderate">Moderately Active</SelectItem>
                        <SelectItem value="very">Very Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="goals">Health Goals</Label>
                    <Textarea
                      id="goals"
                      placeholder="e.g., weight loss, muscle gain, better energy..."
                      value={profileData.healthGoals}
                      onChange={(e) => setProfileData({...profileData, healthGoals: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="conditions">Medical Conditions</Label>
                    <Textarea
                      id="conditions"
                      placeholder="e.g., diabetes, hypertension, allergies..."
                      value={profileData.medicalConditions}
                      onChange={(e) => setProfileData({...profileData, medicalConditions: e.target.value})}
                    />
                  </div>

                  <Button className="btn-wellness-hover">
                    Update Health Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="card-wellness">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Language & Region
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Preferred Language</Label>
                      <Select value={profileData.preferredLanguage} onValueChange={(value) => setProfileData({...profileData, preferredLanguage: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                          <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                          <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                          <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                          <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" className="w-full">
                      Save Language
                    </Button>
                  </CardContent>
                </Card>

                <Card className="card-wellness">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                            className="rounded"
                          />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full">
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Your Achievements
                  </CardTitle>
                  <CardDescription>
                    Milestones in your wellness journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          achievement.earned 
                            ? 'bg-success/10 border-success/20' 
                            : 'bg-muted/20 border-border'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            achievement.earned ? 'bg-success/20' : 'bg-muted'
                          }`}>
                            <Award className={`h-5 w-5 ${
                              achievement.earned ? 'text-success' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div>
                            <h4 className={`font-medium ${
                              achievement.earned ? 'text-success' : 'text-muted-foreground'
                            }`}>
                              {achievement.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                            {achievement.earned && (
                              <Badge variant="secondary" className="mt-2 text-xs">
                                Earned!
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};