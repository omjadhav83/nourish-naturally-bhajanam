import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Heart, Brain, Shield, AlertCircle, BookOpen } from 'lucide-react';

const diseases = [
  {
    name: "Diabetes Type 2",
    category: "Metabolic",
    severity: "Chronic",
    description: "A condition where blood sugar levels are consistently high due to insulin resistance.",
    symptoms: ["Frequent urination", "Excessive thirst", "Fatigue", "Blurred vision", "Slow healing wounds"],
    causes: ["Genetics", "Obesity", "Sedentary lifestyle", "Poor diet", "Age"],
    prevention: ["Maintain healthy weight", "Regular exercise", "Balanced diet", "Limit processed foods"],
    treatment: ["Medication", "Diet modification", "Exercise", "Blood sugar monitoring"],
    dietary: ["Low glycemic foods", "High fiber", "Portion control", "Regular meal timing"]
  },
  {
    name: "Hypertension",
    category: "Cardiovascular", 
    severity: "Chronic",
    description: "High blood pressure that puts extra strain on heart and blood vessels.",
    symptoms: ["Often no symptoms", "Headaches", "Shortness of breath", "Chest pain", "Dizziness"],
    causes: ["Genetics", "High sodium diet", "Stress", "Obesity", "Lack of exercise"],
    prevention: ["Low sodium diet", "Regular exercise", "Stress management", "Healthy weight"],
    treatment: ["Medication", "Lifestyle changes", "Regular monitoring", "Stress reduction"],
    dietary: ["DASH diet", "Low sodium", "High potassium", "Limit alcohol"]
  },
  {
    name: "Dengue Fever",
    category: "Infectious",
    severity: "Acute",
    description: "Viral infection transmitted by mosquitoes, common in tropical areas.",
    symptoms: ["High fever", "Severe headache", "Joint pain", "Nausea", "Skin rash"],
    causes: ["Aedes mosquito bite", "Viral infection", "Poor sanitation", "Standing water"],
    prevention: ["Mosquito control", "Clean environment", "Use repellents", "Remove standing water"],
    treatment: ["Rest", "Hydration", "Fever management", "Medical monitoring"],
    dietary: ["Increase fluids", "Papaya leaf juice", "Coconut water", "Light foods"]
  }
];

const disorders = [
  {
    name: "Anxiety Disorder",
    category: "Mental Health",
    severity: "Variable",
    description: "Persistent worry and fear that interferes with daily activities.",
    symptoms: ["Excessive worry", "Restlessness", "Fatigue", "Difficulty concentrating", "Sleep problems"],
    causes: ["Genetics", "Brain chemistry", "Stress", "Trauma", "Medical conditions"],
    prevention: ["Stress management", "Regular exercise", "Healthy lifestyle", "Social support"],
    treatment: ["Therapy", "Medication", "Relaxation techniques", "Lifestyle changes"],
    dietary: ["Omega-3 rich foods", "Limit caffeine", "Magnesium foods", "Avoid alcohol"]
  },
  {
    name: "Depression",
    category: "Mood Disorder",
    severity: "Variable", 
    description: "Persistent feelings of sadness and loss of interest in activities.",
    symptoms: ["Persistent sadness", "Loss of interest", "Fatigue", "Sleep changes", "Appetite changes"],
    causes: ["Brain chemistry", "Genetics", "Life events", "Medical conditions", "Medications"],
    prevention: ["Regular exercise", "Social connections", "Stress management", "Healthy diet"],
    treatment: ["Therapy", "Medication", "Lifestyle changes", "Support groups"],
    dietary: ["Omega-3 foods", "Complex carbs", "Protein rich", "Limit processed foods"]
  }
];

export const DiseaseLookup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('diseases');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const allItems = activeTab === 'diseases' ? diseases : disorders;
  const filteredItems = allItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'acute':
        return 'bg-red-100 text-red-800';
      case 'chronic':
        return 'bg-orange-100 text-orange-800';
      case 'variable':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-wellness-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Disease & Disorder Lookup</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive information about diseases and disorders with dietary recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search and List */}
        <div className="lg:col-span-1">
          <Card className="card-wellness">
            <CardHeader>
              <CardTitle className="text-lg">Search Conditions</CardTitle>
              <CardDescription>
                Find information about diseases and disorders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search diseases or disorders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="diseases">Diseases</TabsTrigger>
                  <TabsTrigger value="disorders">Disorders</TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab} className="mt-4 space-y-2">
                  {filteredItems.map((item, index) => (
                    <Button
                      key={index}
                      variant={selectedItem?.name === item.name ? "default" : "ghost"}
                      className="w-full justify-start h-auto p-3 text-left"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                          <Badge className={`text-xs ${getSeverityColor(item.severity)}`}>
                            {item.severity}
                          </Badge>
                        </div>
                      </div>
                    </Button>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-4">
          {selectedItem ? (
            <>
              {/* Overview */}
              <Card className="card-feature">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-3 rounded-xl bg-primary/10">
                      {selectedItem.category === 'Mental Health' || selectedItem.category === 'Mood Disorder' ? (
                        <Brain className="h-8 w-8 text-primary" />
                      ) : selectedItem.category === 'Cardiovascular' ? (
                        <Heart className="h-8 w-8 text-primary" />
                      ) : (
                        <Shield className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    {selectedItem.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {selectedItem.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{selectedItem.category}</Badge>
                    <Badge className={getSeverityColor(selectedItem.severity)}>
                      {selectedItem.severity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Symptoms */}
                <Card className="card-wellness">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-600">⚠️ Symptoms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedItem.symptoms.map((symptom: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Causes */}
                <Card className="card-wellness">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-600">🔍 Causes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedItem.causes.map((cause: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Prevention */}
                <Card className="card-wellness">
                  <CardHeader>
                    <CardTitle className="text-lg text-green-600">🛡️ Prevention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedItem.prevention.map((prevention: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          {prevention}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Treatment */}
                <Card className="card-wellness">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600">💊 Treatment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedItem.treatment.map((treatment: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Dietary Recommendations */}
              <Card className="card-wellness">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">🥗 Dietary Recommendations</CardTitle>
                  <CardDescription>
                    Nutrition advice for managing {selectedItem.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedItem.dietary.map((dietary: string, index: number) => (
                      <div key={index} className="p-3 bg-primary/5 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                          </div>
                          <span className="text-sm">{dietary}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Button className="btn-wellness-hover">
                      Get Personalized Diet Plan
                    </Button>
                    <Button variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      More Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="card-wellness">
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Search and select a condition to view detailed information
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};