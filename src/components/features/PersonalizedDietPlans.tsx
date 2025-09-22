import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Target, CheckCircle } from 'lucide-react';

export const PersonalizedDietPlans = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    healthConditions: '',
    dietaryRestrictions: '',
    goals: ''
  });

  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedPlan({
        title: "Heart-Healthy Mediterranean Plan",
        duration: "4 weeks",
        calories: "1,800-2,000 per day",
        meals: [
          {
            time: "Breakfast",
            food: "Oatmeal with berries and almonds",
            calories: 350,
            benefits: ["High fiber", "Antioxidants", "Heart healthy"]
          },
          {
            time: "Lunch", 
            food: "Grilled salmon with quinoa and vegetables",
            calories: 450,
            benefits: ["Omega-3", "Complete protein", "Anti-inflammatory"]
          },
          {
            time: "Snack",
            food: "Greek yogurt with walnuts",
            calories: 200,
            benefits: ["Probiotics", "Healthy fats", "Protein"]
          },
          {
            time: "Dinner",
            food: "Lentil curry with brown rice",
            calories: 400,
            benefits: ["Plant protein", "Fiber", "Iron"]
          }
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Personalized Diet Plans</h1>
        <p className="text-muted-foreground mt-2">
          Get customized nutrition plans based on your health conditions and goals
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="card-wellness">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Your Health Profile
            </CardTitle>
            <CardDescription>
              Tell us about yourself to generate the perfect plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({...formData, gender: value})}>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData({...formData, weight: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={formData.height}
                  onChange={(e) => setFormData({...formData, height: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => setFormData({...formData, activityLevel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (desk job)</SelectItem>
                  <SelectItem value="light">Lightly active</SelectItem>
                  <SelectItem value="moderate">Moderately active</SelectItem>
                  <SelectItem value="very">Very active</SelectItem>
                  <SelectItem value="extra">Extremely active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="conditions">Health Conditions</Label>
              <Textarea
                id="conditions"
                placeholder="e.g., diabetes, hypertension, heart disease..."
                value={formData.healthConditions}
                onChange={(e) => setFormData({...formData, healthConditions: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="restrictions">Dietary Restrictions</Label>
              <Textarea
                id="restrictions"
                placeholder="e.g., vegetarian, vegan, gluten-free, allergies..."
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({...formData, dietaryRestrictions: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Health Goals</Label>
              <Textarea
                id="goals"
                placeholder="e.g., weight loss, muscle gain, better energy..."
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
              />
            </div>

            <Button 
              onClick={generatePlan}
              disabled={loading}
              className="w-full btn-wellness-hover bg-gradient-wellness"
            >
              {loading ? 'Generating Plan...' : 'Generate My Diet Plan'}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Plan */}
        <div className="space-y-4">
          {generatedPlan ? (
            <Card className="card-feature">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-success" />
                  {generatedPlan.title}
                </CardTitle>
                <CardDescription>
                  {generatedPlan.duration} • {generatedPlan.calories}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedPlan.meals.map((meal: any, index: number) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{meal.time}</h4>
                      <Badge variant="secondary">{meal.calories} cal</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{meal.food}</p>
                    <div className="flex flex-wrap gap-1">
                      {meal.benefits.map((benefit: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  Download Full Plan
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="card-wellness">
              <CardContent className="text-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Fill out your health profile to generate a personalized diet plan
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};