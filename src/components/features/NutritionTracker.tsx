import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Camera, Upload, Zap, Apple, Droplets, Activity } from 'lucide-react';

export const NutritionTracker = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [nutritionData, setNutritionData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        analyzeNutrition();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeNutrition = async () => {
    setLoading(true);
    // Simulate nutrition analysis
    setTimeout(() => {
      setNutritionData({
        foodName: "Grilled Chicken Salad",
        confidence: 92,
        portionSize: "1 large bowl (300g)",
        totalCalories: 285,
        macronutrients: {
          protein: { amount: 28, unit: "g", percentage: 39 },
          carbs: { amount: 12, unit: "g", percentage: 17 },
          fat: { amount: 14, unit: "g", percentage: 44 }
        },
        micronutrients: [
          { name: "Vitamin A", amount: 1250, unit: "IU", dailyValue: 25 },
          { name: "Vitamin C", amount: 35, unit: "mg", dailyValue: 39 },
          { name: "Iron", amount: 2.1, unit: "mg", dailyValue: 12 },
          { name: "Calcium", amount: 85, unit: "mg", dailyValue: 9 },
          { name: "Fiber", amount: 4.2, unit: "g", dailyValue: 17 }
        ],
        healthScore: 85,
        benefits: ["High protein", "Low carb", "Rich in vitamins", "Heart healthy"],
        concerns: ["Moderate sodium", "Check dressing calories"],
        recommendations: [
          "Great choice for muscle building and weight management",
          "Add more colorful vegetables for extra antioxidants",
          "Use olive oil-based dressing for healthy fats"
        ]
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Nutrition Tracker</h1>
        <p className="text-muted-foreground mt-2">
          Snap a photo of your food and get instant nutritional analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image Upload */}
        <Card className="card-wellness">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Food Scanner
            </CardTitle>
            <CardDescription>
              Take a photo or upload an image of your food
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {uploadedImage ? (
                <div className="space-y-4">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded food" 
                    className="max-w-full h-32 object-cover rounded-lg mx-auto"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUploadedImage(null);
                      setNutritionData(null);
                    }}
                  >
                    Upload Different Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
                    <Camera className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Scan your food</p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="btn-wellness-hover"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Analysis */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <Card className="card-wellness">
              <CardContent className="text-center py-12">
                <div className="animate-wellness-pulse bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Analyzing nutrition content...</p>
                <p className="text-sm text-muted-foreground mt-2">AI is identifying your food</p>
              </CardContent>
            </Card>
          ) : nutritionData ? (
            <>
              {/* Food Identification */}
              <Card className="card-feature">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Apple className="h-6 w-6 text-primary" />
                      {nutritionData.foodName}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-success/10 text-success">
                        {nutritionData.confidence}% confident
                      </Badge>
                      <Badge className={`${
                        nutritionData.healthScore >= 80 ? 'bg-green-100 text-green-800' :
                        nutritionData.healthScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        Health Score: {nutritionData.healthScore}/100
                      </Badge>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    Portion: {nutritionData.portionSize} • {nutritionData.totalCalories} calories
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Macronutrients */}
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle>Macronutrients Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {nutritionData.macronutrients.protein.amount}{nutritionData.macronutrients.protein.unit}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">Protein</div>
                      <div className="text-xs text-muted-foreground">
                        {nutritionData.macronutrients.protein.percentage}% of calories
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {nutritionData.macronutrients.carbs.amount}{nutritionData.macronutrients.carbs.unit}
                      </div>
                      <div className="text-sm text-green-600 font-medium">Carbs</div>
                      <div className="text-xs text-muted-foreground">
                        {nutritionData.macronutrients.carbs.percentage}% of calories
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {nutritionData.macronutrients.fat.amount}{nutritionData.macronutrients.fat.unit}
                      </div>
                      <div className="text-sm text-orange-600 font-medium">Fat</div>
                      <div className="text-xs text-muted-foreground">
                        {nutritionData.macronutrients.fat.percentage}% of calories
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Micronutrients */}
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle>Vitamins & Minerals</CardTitle>
                  <CardDescription>
                    Key micronutrients and their daily value percentages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nutritionData.micronutrients.map((nutrient: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{nutrient.name}</span>
                          <span className="text-muted-foreground">
                            {nutrient.amount}{nutrient.unit} ({nutrient.dailyValue}% DV)
                          </span>
                        </div>
                        <Progress value={nutrient.dailyValue} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Health Insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="card-wellness">
                  <CardHeader>
                    <CardTitle className="text-lg text-success">✅ Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {nutritionData.benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-wellness">
                  <CardHeader>
                    <CardTitle className="text-lg text-warning">⚠️ Watch Out</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {nutritionData.concerns.map((concern: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-warning rounded-full"></div>
                          <span className="text-sm">{concern}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle>Nutritionist Recommendations</CardTitle>
                  <CardDescription>
                    Tips to optimize your meal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {nutritionData.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button className="btn-wellness-hover">
                      <Activity className="h-4 w-4 mr-2" />
                      Add to Food Log
                    </Button>
                    <Button variant="outline">
                      Get Similar Recipes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="card-wellness">
              <CardContent className="text-center py-12">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Upload an image of your food to get detailed nutritional analysis
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};