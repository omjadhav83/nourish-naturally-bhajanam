import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Brain, Zap, Shield, Eye, Bone } from 'lucide-react';

const organs = [
  {
    name: "Heart",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    description: "Cardiovascular health and circulation",
    goodFoods: ["Salmon", "Oats", "Berries", "Avocado", "Nuts", "Dark Chocolate"],
    avoidFoods: ["Processed Meat", "Trans Fats", "Excess Salt", "Sugary Drinks"],
    benefits: ["Lower cholesterol", "Reduce blood pressure", "Improve circulation"],
    nutrients: ["Omega-3", "Fiber", "Potassium", "Antioxidants"]
  },
  {
    name: "Brain", 
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    description: "Cognitive function and mental clarity",
    goodFoods: ["Blueberries", "Fatty Fish", "Turmeric", "Broccoli", "Walnuts", "Green Tea"],
    avoidFoods: ["Refined Sugar", "Alcohol", "Processed Foods", "Artificial Sweeteners"],
    benefits: ["Improve memory", "Enhance focus", "Protect neurons"],
    nutrients: ["DHA", "Antioxidants", "Vitamin E", "Folate"]
  },
  {
    name: "Liver",
    icon: Zap,
    color: "text-green-500", 
    bgColor: "bg-green-50",
    description: "Detoxification and metabolism",
    goodFoods: ["Leafy Greens", "Citrus Fruits", "Garlic", "Beets", "Carrots", "Green Tea"],
    avoidFoods: ["Alcohol", "Fried Foods", "Processed Foods", "Excess Medication"],
    benefits: ["Support detox", "Improve metabolism", "Reduce inflammation"],
    nutrients: ["Vitamin C", "Sulfur", "Beta-carotene", "Antioxidants"]
  },
  {
    name: "Kidneys",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-50", 
    description: "Filtration and fluid balance",
    goodFoods: ["Cranberries", "Red Bell Peppers", "Cabbage", "Cauliflower", "Fish", "Egg Whites"],
    avoidFoods: ["Excess Salt", "Dark Sodas", "Processed Meat", "High Potassium Foods"],
    benefits: ["Support filtration", "Reduce stone risk", "Maintain fluid balance"],
    nutrients: ["Low sodium", "Moderate protein", "Antioxidants", "Low phosphorus"]
  },
  {
    name: "Eyes",
    icon: Eye,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    description: "Vision and eye health",
    goodFoods: ["Carrots", "Spinach", "Sweet Potato", "Fish", "Eggs", "Citrus Fruits"],
    avoidFoods: ["Sugary Foods", "Processed Snacks", "Excessive Screen Time", "Smoking"],
    benefits: ["Protect vision", "Reduce eye strain", "Prevent degeneration"],
    nutrients: ["Vitamin A", "Lutein", "Zeaxanthin", "Omega-3"]
  },
  {
    name: "Bones",
    icon: Bone,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    description: "Bone density and joint health", 
    goodFoods: ["Dairy Products", "Leafy Greens", "Sardines", "Almonds", "Sesame Seeds", "Fortified Foods"],
    avoidFoods: ["Excess Caffeine", "Alcohol", "High Sodium", "Carbonated Drinks"],
    benefits: ["Strengthen bones", "Improve density", "Support joints"],
    nutrients: ["Calcium", "Vitamin D", "Magnesium", "Vitamin K"]
  }
];

export const OrganSpecificDietPlans = () => {
  const [selectedOrgan, setSelectedOrgan] = useState(organs[0]);

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Organ-Specific Diet Plans</h1>
        <p className="text-muted-foreground mt-2">
          Targeted nutrition for specific organs and body systems
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Organ Selection */}
        <div className="lg:col-span-1">
          <Card className="card-wellness">
            <CardHeader>
              <CardTitle className="text-lg">Select Target Organ</CardTitle>
              <CardDescription>
                Choose which organ to focus on
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {organs.map((organ, index) => {
                const IconComponent = organ.icon;
                return (
                  <Button
                    key={index}
                    variant={selectedOrgan.name === organ.name ? "default" : "ghost"}
                    className={`w-full justify-start h-auto p-3 ${
                      selectedOrgan.name === organ.name ? 'shadow-wellness' : ''
                    }`}
                    onClick={() => setSelectedOrgan(organ)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${organ.bgColor}`}>
                        <IconComponent className={`h-5 w-5 ${organ.color}`} />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{organ.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {organ.description.split(' ').slice(0, 2).join(' ')}...
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Plan */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header Card */}
          <Card className="card-feature">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className={`p-3 rounded-xl ${selectedOrgan.bgColor}`}>
                  <selectedOrgan.icon className={`h-8 w-8 ${selectedOrgan.color}`} />
                </div>
                {selectedOrgan.name} Health Plan
              </CardTitle>
              <CardDescription className="text-base">
                {selectedOrgan.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedOrgan.benefits.map((benefit, index) => (
                  <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-medium">{benefit}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Good Foods */}
            <Card className="card-wellness">
              <CardHeader>
                <CardTitle className="text-lg text-success">✅ Foods to Include</CardTitle>
                <CardDescription>
                  These foods support {selectedOrgan.name.toLowerCase()} health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {selectedOrgan.goodFoods.map((food, index) => (
                    <div key={index} className="p-3 bg-success/10 rounded-lg text-center">
                      <div className="text-sm font-medium">{food}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Key Nutrients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedOrgan.nutrients.map((nutrient, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {nutrient}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Foods to Avoid */}
            <Card className="card-wellness">
              <CardHeader>
                <CardTitle className="text-lg text-destructive">❌ Foods to Limit</CardTitle>
                <CardDescription>
                  These foods may harm {selectedOrgan.name.toLowerCase()} health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedOrgan.avoidFoods.map((food, index) => (
                    <div key={index} className="p-3 bg-destructive/10 rounded-lg">
                      <div className="text-sm font-medium">{food}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Plan */}
          <Card className="card-wellness">
            <CardHeader>
              <CardTitle className="text-lg">7-Day {selectedOrgan.name} Health Plan</CardTitle>
              <CardDescription>
                Sample meal plan optimized for {selectedOrgan.name.toLowerCase()} health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <div key={day} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Day {day}</h4>
                      <Badge variant="outline">Optimized</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Breakfast:</span> {selectedOrgan.goodFoods[0]} smoothie bowl
                      </div>
                      <div>
                        <span className="font-medium">Lunch:</span> {selectedOrgan.goodFoods[1]} salad
                      </div>
                      <div>
                        <span className="font-medium">Dinner:</span> {selectedOrgan.goodFoods[2]} with quinoa
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                <Button className="btn-wellness-hover">
                  Download Full Plan
                </Button>
                <Button variant="outline">
                  Get Recipes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};