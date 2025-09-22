import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock, Users } from 'lucide-react';

const regions = [
  {
    name: "Maharashtra",
    cuisine: "Maharashtrian",
    description: "Rich in nutrients and traditional spices",
    image: "🌾",
    specialties: ["Jowar Bhakri", "Varan Bhat", "Sabudana Khichdi", "Misal Pav"],
    benefits: ["High fiber", "Probiotic-rich", "Energy boosting"],
    color: "bg-orange-100 text-orange-800"
  },
  {
    name: "Kerala",
    cuisine: "South Indian",
    description: "Coconut-based dishes with anti-inflammatory spices", 
    image: "🥥",
    specialties: ["Fish Curry", "Appam", "Sambar", "Avial"],
    benefits: ["Heart healthy", "Anti-inflammatory", "Rich in omega-3"],
    color: "bg-green-100 text-green-800"
  },
  {
    name: "Rajasthan",
    cuisine: "Rajasthani",
    description: "Desert cuisine with preservation techniques",
    image: "🏜️",
    specialties: ["Dal Baati Churma", "Gatte ki Sabzi", "Ker Sangri", "Bajra Roti"],
    benefits: ["High protein", "Long-lasting energy", "Digestive health"],
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    name: "Gujarat",
    cuisine: "Gujarati",
    description: "Balanced vegetarian meals with fermented foods",
    image: "🌿",
    specialties: ["Dhokla", "Thepla", "Kadhi", "Undhiyu"],
    benefits: ["Probiotic-rich", "Low glycemic", "Complete nutrition"],
    color: "bg-blue-100 text-blue-800"
  },
  {
    name: "Punjab",
    cuisine: "Punjabi",
    description: "Nutrient-dense with seasonal ingredients",
    image: "🌽",
    specialties: ["Sarson da Saag", "Makki di Roti", "Lassi", "Rajma"],
    benefits: ["Iron-rich", "Calcium boost", "Immunity building"],
    color: "bg-purple-100 text-purple-800"
  },
  {
    name: "Tamil Nadu",
    cuisine: "Tamil",
    description: "Rice-based with fermented preparations",
    image: "🍚",
    specialties: ["Idli", "Dosa", "Rasam", "Curd Rice"],
    benefits: ["Easy digestion", "Probiotic", "Cooling effect"],
    color: "bg-pink-100 text-pink-800"
  }
];

export const RegionalDietPlans = () => {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Regional Diet Plans</h1>
        <p className="text-muted-foreground mt-2">
          Explore traditional cuisines from different states of India with their health benefits
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Region Selection */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regions.map((region, index) => (
              <Card 
                key={index}
                className={`card-feature cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedRegion?.name === region.name ? 'ring-2 ring-primary shadow-wellness' : ''
                }`}
                onClick={() => setSelectedRegion(region)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="text-2xl">{region.image}</span>
                      {region.name}
                    </CardTitle>
                    <Badge className={region.color}>
                      {region.cuisine}
                    </Badge>
                  </div>
                  <CardDescription>{region.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Popular Dishes:</h4>
                      <div className="flex flex-wrap gap-1">
                        {region.specialties.slice(0, 2).map((dish, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {dish}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs">
                          +{region.specialties.length - 2} more
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>2.5k+ users</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div className="space-y-4">
          {selectedRegion ? (
            <Card className="card-wellness">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selectedRegion.image}</span>
                  {selectedRegion.name} Cuisine
                </CardTitle>
                <CardDescription>
                  Traditional and healthy dishes from {selectedRegion.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Signature Dishes</h4>
                  <div className="space-y-2">
                    {selectedRegion.specialties.map((dish: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">{dish}</span>
                        <Button size="sm" variant="ghost">
                          <Clock className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Health Benefits</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedRegion.benefits.map((benefit: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-2">
                  <Button className="w-full btn-wellness-hover">
                    Get {selectedRegion.name} Diet Plan
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Recipes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="card-wellness">
              <CardContent className="text-center py-12">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a region to explore its traditional cuisine and health benefits
                </p>
              </CardContent>
            </Card>
          )}

          {/* Weekly Plan Preview */}
          {selectedRegion && (
            <Card className="card-feature">
              <CardHeader>
                <CardTitle className="text-lg">7-Day Plan Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Day 1:</span>
                    <span className="text-muted-foreground">Breakfast + Lunch + Dinner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Day 2:</span>
                    <span className="text-muted-foreground">Breakfast + Lunch + Dinner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Day 3:</span>
                    <span className="text-muted-foreground">Breakfast + Lunch + Dinner</span>
                  </div>
                  <div className="text-center pt-2">
                    <Button variant="ghost" size="sm">
                      View Complete Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};