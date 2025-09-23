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
  },
  {
    name: "Malaria",
    category: "Infectious",
    severity: "Acute",
    description: "Parasitic infection transmitted by infected mosquitoes.",
    symptoms: ["High fever", "Chills", "Sweating", "Headache", "Muscle pain", "Fatigue"],
    causes: ["Infected mosquito bite", "Plasmodium parasite", "Poor sanitation", "Stagnant water"],
    prevention: ["Mosquito nets", "Antimalarial medication", "Insect repellent", "Clean environment"],
    treatment: ["Antimalarial drugs", "Supportive care", "Hospitalization if severe"],
    dietary: ["High fluid intake", "Nutrient-rich foods", "Easy to digest foods", "Avoid alcohol"]
  },
  {
    name: "Tuberculosis",
    category: "Infectious",
    severity: "Chronic",
    description: "Bacterial infection that primarily affects the lungs.",
    symptoms: ["Persistent cough", "Blood in sputum", "Chest pain", "Weight loss", "Night sweats"],
    causes: ["Bacterial infection", "Weakened immunity", "Close contact with infected person", "Poor ventilation"],
    prevention: ["BCG vaccination", "Good ventilation", "Avoid close contact", "Strengthen immunity"],
    treatment: ["Antibiotics", "DOT therapy", "Regular monitoring", "Isolation if needed"],
    dietary: ["High protein", "Vitamin rich foods", "Calcium supplements", "Iron rich foods"]
  },
  {
    name: "Thyroid Disorders",
    category: "Endocrine",
    severity: "Chronic",
    description: "Conditions affecting thyroid hormone production.",
    symptoms: ["Weight changes", "Fatigue", "Hair loss", "Temperature sensitivity", "Mood changes"],
    causes: ["Autoimmune conditions", "Genetics", "Iodine deficiency", "Stress", "Radiation exposure"],
    prevention: ["Adequate iodine intake", "Stress management", "Regular checkups", "Healthy lifestyle"],
    treatment: ["Hormone replacement", "Medication", "Regular monitoring", "Lifestyle changes"],
    dietary: ["Iodine rich foods", "Selenium foods", "Avoid goitrogens", "Balanced nutrition"]
  },
  {
    name: "Hepatitis",
    category: "Infectious",
    severity: "Variable",
    description: "Inflammation of the liver caused by viral infection.",
    symptoms: ["Jaundice", "Fatigue", "Abdominal pain", "Dark urine", "Loss of appetite"],
    causes: ["Viral infection", "Contaminated food/water", "Unsafe practices", "Blood contact"],
    prevention: ["Vaccination", "Safe practices", "Clean water", "Hand hygiene"],
    treatment: ["Antiviral medication", "Rest", "Supportive care", "Regular monitoring"],
    dietary: ["Low fat diet", "Avoid alcohol", "High carbohydrates", "Adequate fluids"]
  },
  {
    name: "Kidney Disease",
    category: "Renal",
    severity: "Chronic",
    description: "Progressive loss of kidney function over time.",
    symptoms: ["Swelling", "Fatigue", "Changes in urination", "High blood pressure", "Nausea"],
    causes: ["Diabetes", "High blood pressure", "Genetics", "Autoimmune diseases", "Infections"],
    prevention: ["Control diabetes", "Manage blood pressure", "Healthy diet", "Regular exercise"],
    treatment: ["Medication", "Dialysis", "Kidney transplant", "Lifestyle modifications"],
    dietary: ["Low sodium", "Limit protein", "Control phosphorus", "Adequate fluids"]
  },
  {
    name: "Arthritis",
    category: "Musculoskeletal",
    severity: "Chronic",
    description: "Inflammation of joints causing pain and stiffness.",
    symptoms: ["Joint pain", "Stiffness", "Swelling", "Reduced mobility", "Morning stiffness"],
    causes: ["Age", "Genetics", "Injury", "Autoimmune factors", "Wear and tear"],
    prevention: ["Regular exercise", "Maintain healthy weight", "Joint protection", "Balanced diet"],
    treatment: ["Anti-inflammatory drugs", "Physical therapy", "Exercise", "Joint replacement"],
    dietary: ["Anti-inflammatory foods", "Omega-3 fatty acids", "Antioxidants", "Avoid processed foods"]
  },
  {
    name: "Asthma",
    category: "Respiratory",
    severity: "Chronic",
    description: "Chronic condition affecting the airways and breathing.",
    symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Coughing", "Difficulty breathing"],
    causes: ["Genetics", "Allergies", "Environmental factors", "Respiratory infections", "Stress"],
    prevention: ["Avoid triggers", "Regular medication", "Air quality control", "Allergy management"],
    treatment: ["Inhalers", "Bronchodilators", "Corticosteroids", "Allergy treatment"],
    dietary: ["Anti-inflammatory foods", "Avoid allergens", "Vitamin D", "Magnesium rich foods"]
  },
  {
    name: "Osteoporosis",
    category: "Musculoskeletal",
    severity: "Chronic",
    description: "Condition where bones become weak and brittle.",
    symptoms: ["Bone fractures", "Back pain", "Loss of height", "Stooped posture", "Brittle nails"],
    causes: ["Age", "Hormonal changes", "Calcium deficiency", "Lack of exercise", "Genetics"],
    prevention: ["Calcium intake", "Vitamin D", "Weight-bearing exercise", "Avoid smoking"],
    treatment: ["Calcium supplements", "Bisphosphonates", "Hormone therapy", "Exercise program"],
    dietary: ["High calcium foods", "Vitamin D sources", "Protein rich foods", "Limit caffeine"]
  },
  {
    name: "Anemia",
    category: "Blood",
    severity: "Variable",
    description: "Condition with insufficient healthy red blood cells.",
    symptoms: ["Fatigue", "Weakness", "Pale skin", "Shortness of breath", "Cold hands"],
    causes: ["Iron deficiency", "Vitamin B12 deficiency", "Chronic diseases", "Blood loss", "Genetics"],
    prevention: ["Iron rich diet", "Vitamin supplements", "Regular checkups", "Treat underlying causes"],
    treatment: ["Iron supplements", "Vitamin B12", "Dietary changes", "Treat underlying conditions"],
    dietary: ["Iron rich foods", "Vitamin C", "Folate sources", "Avoid tea with meals"]
  },
  {
    name: "Migraine",
    category: "Neurological",
    severity: "Chronic",
    description: "Recurring headaches with severe throbbing pain.",
    symptoms: ["Severe headache", "Nausea", "Light sensitivity", "Sound sensitivity", "Visual disturbances"],
    causes: ["Genetics", "Hormonal changes", "Stress", "Certain foods", "Environmental factors"],
    prevention: ["Identify triggers", "Regular sleep", "Stress management", "Hydration"],
    treatment: ["Pain relievers", "Triptans", "Preventive medications", "Lifestyle changes"],
    dietary: ["Avoid trigger foods", "Regular meals", "Magnesium foods", "Stay hydrated"]
  },
  {
    name: "PCOS",
    category: "Endocrine",
    severity: "Chronic",
    description: "Hormonal disorder affecting women of reproductive age.",
    symptoms: ["Irregular periods", "Weight gain", "Acne", "Hair growth", "Hair loss"],
    causes: ["Insulin resistance", "Genetics", "Inflammation", "Hormonal imbalance"],
    prevention: ["Healthy weight", "Regular exercise", "Balanced diet", "Stress management"],
    treatment: ["Hormonal therapy", "Metformin", "Lifestyle changes", "Fertility treatment"],
    dietary: ["Low glycemic index", "Anti-inflammatory foods", "Omega-3", "Limit processed foods"]
  },
  {
    name: "Gastritis",
    category: "Digestive",
    severity: "Acute/Chronic",
    description: "Inflammation of the stomach lining.",
    symptoms: ["Stomach pain", "Nausea", "Vomiting", "Bloating", "Loss of appetite"],
    causes: ["H. pylori infection", "NSAIDs", "Alcohol", "Stress", "Spicy foods"],
    prevention: ["Avoid irritants", "Hand hygiene", "Limit alcohol", "Stress management"],
    treatment: ["Antibiotics", "Acid reducers", "Antacids", "Dietary changes"],
    dietary: ["Bland foods", "Avoid spicy foods", "Small frequent meals", "Probiotics"]
  },
  {
    name: "IBS",
    category: "Digestive",
    severity: "Chronic",
    description: "Functional disorder affecting the large intestine.",
    symptoms: ["Abdominal pain", "Bloating", "Gas", "Diarrhea", "Constipation"],
    causes: ["Stress", "Food sensitivities", "Gut bacteria", "Genetics", "Hormones"],
    prevention: ["Stress management", "Identify food triggers", "Regular exercise", "Adequate sleep"],
    treatment: ["Dietary changes", "Stress management", "Probiotics", "Medications"],
    dietary: ["Low FODMAP diet", "Fiber management", "Probiotics", "Avoid triggers"]
  },
  {
    name: "Psoriasis",
    category: "Autoimmune",
    severity: "Chronic",
    description: "Autoimmune condition causing skin cell buildup.",
    symptoms: ["Red patches", "Silvery scales", "Itching", "Burning", "Thick nails"],
    causes: ["Genetics", "Immune system", "Stress", "Infections", "Environmental factors"],
    prevention: ["Stress management", "Avoid triggers", "Skin care", "Healthy lifestyle"],
    treatment: ["Topical treatments", "Light therapy", "Systemic medications", "Biologics"],
    dietary: ["Anti-inflammatory foods", "Omega-3", "Antioxidants", "Avoid alcohol"]
  },
  {
    name: "Eczema",
    category: "Dermatological",
    severity: "Chronic",
    description: "Inflammatory skin condition causing itchy, red skin.",
    symptoms: ["Itchy skin", "Red patches", "Dry skin", "Swelling", "Skin thickening"],
    causes: ["Genetics", "Environmental factors", "Allergens", "Stress", "Immune system"],
    prevention: ["Moisturize regularly", "Avoid triggers", "Gentle skin care", "Stress management"],
    treatment: ["Topical corticosteroids", "Moisturizers", "Antihistamines", "Immunomodulators"],
    dietary: ["Anti-inflammatory foods", "Avoid allergens", "Probiotics", "Omega-3 fatty acids"]
  },
  {
    name: "Fibromyalgia",
    category: "Musculoskeletal",
    severity: "Chronic",
    description: "Disorder causing widespread musculoskeletal pain.",
    symptoms: ["Widespread pain", "Fatigue", "Sleep problems", "Memory issues", "Mood problems"],
    causes: ["Genetics", "Infections", "Physical trauma", "Emotional stress", "Brain chemistry"],
    prevention: ["Stress management", "Regular exercise", "Good sleep hygiene", "Healthy lifestyle"],
    treatment: ["Pain medications", "Antidepressants", "Physical therapy", "Stress management"],
    dietary: ["Anti-inflammatory foods", "Magnesium", "Vitamin D", "Avoid processed foods"]
  },
  {
    name: "Sleep Apnea",
    category: "Sleep Disorder",
    severity: "Chronic",
    description: "Breathing repeatedly stops and starts during sleep.",
    symptoms: ["Loud snoring", "Gasping", "Daytime fatigue", "Morning headaches", "Mood changes"],
    causes: ["Obesity", "Age", "Family history", "Alcohol use", "Smoking"],
    prevention: ["Maintain healthy weight", "Avoid alcohol", "Sleep position", "Quit smoking"],
    treatment: ["CPAP machine", "Oral appliances", "Surgery", "Weight loss"],
    dietary: ["Weight management", "Avoid alcohol", "Light dinner", "Anti-inflammatory foods"]
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
  },
  {
    name: "Bipolar Disorder",
    category: "Mood Disorder",
    severity: "Chronic",
    description: "Mental condition causing extreme mood swings including manic and depressive episodes.",
    symptoms: ["Mood swings", "Manic episodes", "Depressive episodes", "Energy changes", "Sleep disturbances"],
    causes: ["Genetics", "Brain structure", "Stress", "Substance abuse", "Life events"],
    prevention: ["Stress management", "Regular sleep", "Avoid triggers", "Medication compliance"],
    treatment: ["Mood stabilizers", "Therapy", "Lifestyle management", "Support groups"],
    dietary: ["Stable meal times", "Omega-3 foods", "Limit caffeine", "Avoid alcohol"]
  },
  {
    name: "ADHD",
    category: "Neurodevelopmental",
    severity: "Chronic",
    description: "Attention deficit hyperactivity disorder affecting focus and behavior.",
    symptoms: ["Inattention", "Hyperactivity", "Impulsivity", "Difficulty focusing", "Restlessness"],
    causes: ["Genetics", "Brain development", "Environmental factors", "Premature birth"],
    prevention: ["Early intervention", "Structured environment", "Healthy lifestyle", "Regular routine"],
    treatment: ["Medication", "Behavioral therapy", "Educational support", "Lifestyle changes"],
    dietary: ["High protein breakfast", "Complex carbs", "Omega-3", "Limit sugar"]
  },
  {
    name: "PTSD",
    category: "Trauma Related",
    severity: "Variable",
    description: "Post-traumatic stress disorder following exposure to traumatic events.",
    symptoms: ["Flashbacks", "Nightmares", "Severe anxiety", "Avoidance", "Mood changes"],
    causes: ["Traumatic events", "Combat exposure", "Accidents", "Abuse", "Natural disasters"],
    prevention: ["Stress management", "Social support", "Early intervention", "Healthy coping"],
    treatment: ["Trauma therapy", "EMDR", "Medication", "Support groups"],
    dietary: ["Anti-inflammatory foods", "Magnesium", "B vitamins", "Avoid caffeine"]
  },
  {
    name: "OCD",
    category: "Anxiety Related",
    severity: "Chronic",
    description: "Obsessive-compulsive disorder with unwanted thoughts and repetitive behaviors.",
    symptoms: ["Obsessive thoughts", "Compulsive behaviors", "Anxiety", "Repetitive actions", "Distress"],
    causes: ["Genetics", "Brain differences", "Stress", "Infections", "Environmental factors"],
    prevention: ["Stress management", "Early treatment", "Healthy coping", "Support systems"],
    treatment: ["Cognitive therapy", "Exposure therapy", "Medication", "Support groups"],
    dietary: ["Serotonin supporting foods", "Omega-3", "Probiotics", "Limit processed foods"]
  },
  {
    name: "Schizophrenia",
    category: "Psychotic Disorder",
    severity: "Severe",
    description: "Chronic brain disorder affecting thinking, perception, and behavior.",
    symptoms: ["Hallucinations", "Delusions", "Disorganized thinking", "Abnormal behavior", "Social withdrawal"],
    causes: ["Genetics", "Brain chemistry", "Environmental factors", "Substance use", "Stress"],
    prevention: ["Avoid drug use", "Stress management", "Early intervention", "Family support"],
    treatment: ["Antipsychotic medication", "Therapy", "Rehabilitation", "Support services"],
    dietary: ["Balanced nutrition", "Omega-3", "Antioxidants", "Regular meals"]
  },
  {
    name: "Eating Disorders",
    category: "Behavioral",
    severity: "Severe",
    description: "Serious conditions related to persistent eating behaviors.",
    symptoms: ["Extreme weight changes", "Food obsession", "Body image issues", "Social withdrawal", "Physical complications"],
    causes: ["Genetics", "Psychological factors", "Cultural pressures", "Trauma", "Brain chemistry"],
    prevention: ["Positive body image", "Healthy relationship with food", "Early intervention", "Support"],
    treatment: ["Nutritional counseling", "Therapy", "Medical monitoring", "Support groups"],
    dietary: ["Meal planning", "Nutritional rehabilitation", "Balanced approach", "Professional guidance"]
  },
  {
    name: "Autism Spectrum Disorder",
    category: "Neurodevelopmental",
    severity: "Variable",
    description: "Developmental disorder affecting communication and behavior.",
    symptoms: ["Social challenges", "Communication difficulties", "Repetitive behaviors", "Sensory issues", "Routine preferences"],
    causes: ["Genetics", "Brain development", "Environmental factors", "Prenatal factors"],
    prevention: ["Early intervention", "Supportive environment", "Regular healthcare", "Family support"],
    treatment: ["Behavioral therapy", "Speech therapy", "Occupational therapy", "Educational support"],
    dietary: ["Sensory-friendly foods", "Nutritional balance", "Avoid problem foods", "Structured meals"]
  },
  {
    name: "Borderline Personality Disorder",
    category: "Personality Disorder",
    severity: "Severe",
    description: "Mental disorder affecting emotional regulation and relationships.",
    symptoms: ["Unstable relationships", "Self-image issues", "Impulsivity", "Mood swings", "Fear of abandonment"],
    causes: ["Genetics", "Brain development", "Environmental factors", "Childhood trauma"],
    prevention: ["Early intervention", "Trauma prevention", "Healthy relationships", "Emotional skills"],
    treatment: ["Dialectical behavior therapy", "Medication", "Skills training", "Support groups"],
    dietary: ["Stable blood sugar", "Omega-3", "Limit alcohol", "Regular meals"]
  },
  {
    name: "Substance Use Disorder",
    category: "Addiction",
    severity: "Variable",
    description: "Chronic condition involving compulsive substance use despite harmful consequences.",
    symptoms: ["Cravings", "Loss of control", "Tolerance", "Withdrawal", "Neglecting responsibilities"],
    causes: ["Genetics", "Environmental factors", "Mental health", "Stress", "Social factors"],
    prevention: ["Education", "Stress management", "Healthy coping", "Social support"],
    treatment: ["Detoxification", "Counseling", "Medication", "Support groups"],
    dietary: ["Nutritional rehabilitation", "Hydration", "Vitamin supplements", "Balanced meals"]
  },
  {
    name: "Dissociative Disorders",
    category: "Trauma Related",
    severity: "Variable",
    description: "Disorders involving disruption of memory, awareness, and identity.",
    symptoms: ["Memory gaps", "Identity confusion", "Feeling detached", "Depersonalization", "Time loss"],
    causes: ["Trauma", "Abuse", "Stress", "Genetics", "Environmental factors"],
    prevention: ["Trauma prevention", "Early intervention", "Stress management", "Support systems"],
    treatment: ["Trauma therapy", "Medication", "Grounding techniques", "Support groups"],
    dietary: ["Stable blood sugar", "B vitamins", "Magnesium", "Regular meals"]
  },
  {
    name: "Panic Disorder",
    category: "Anxiety Related",
    severity: "Variable",
    description: "Disorder characterized by recurrent unexpected panic attacks.",
    symptoms: ["Panic attacks", "Fear of attacks", "Physical symptoms", "Avoidance", "Worry"],
    causes: ["Genetics", "Stress", "Brain changes", "Life transitions", "Substance use"],
    prevention: ["Stress management", "Healthy lifestyle", "Avoid triggers", "Regular exercise"],
    treatment: ["Cognitive therapy", "Medication", "Relaxation techniques", "Lifestyle changes"],
    dietary: ["Limit caffeine", "Stable blood sugar", "Magnesium foods", "Avoid alcohol"]
  },
  {
    name: "Social Anxiety Disorder",
    category: "Anxiety Related",
    severity: "Variable",
    description: "Intense fear of social situations and being judged by others.",
    symptoms: ["Social fear", "Physical symptoms", "Avoidance", "Self-consciousness", "Distress"],
    causes: ["Genetics", "Brain structure", "Environment", "Negative experiences", "Temperament"],
    prevention: ["Social skills training", "Confidence building", "Gradual exposure", "Support"],
    treatment: ["Cognitive therapy", "Exposure therapy", "Medication", "Social skills training"],
    dietary: ["Serotonin supporting foods", "Limit caffeine", "B vitamins", "Regular meals"]
  },
  {
    name: "Insomnia",
    category: "Sleep Disorder",
    severity: "Variable",
    description: "Persistent difficulty falling asleep or staying asleep.",
    symptoms: ["Difficulty falling asleep", "Frequent awakening", "Early morning awakening", "Daytime fatigue", "Mood changes"],
    causes: ["Stress", "Medical conditions", "Medications", "Caffeine", "Poor sleep habits"],
    prevention: ["Sleep hygiene", "Regular schedule", "Comfortable environment", "Stress management"],
    treatment: ["Sleep therapy", "Medication", "Relaxation techniques", "Lifestyle changes"],
    dietary: ["Avoid caffeine late", "Light evening meals", "Tryptophan foods", "Magnesium"]
  },
  {
    name: "Seasonal Affective Disorder",
    category: "Mood Disorder",
    severity: "Variable",
    description: "Depression that occurs during specific seasons, usually winter.",
    symptoms: ["Seasonal depression", "Low energy", "Sleep changes", "Weight changes", "Social withdrawal"],
    causes: ["Reduced sunlight", "Biological clock changes", "Serotonin levels", "Melatonin levels"],
    prevention: ["Light therapy", "Vitamin D", "Regular exercise", "Social activities"],
    treatment: ["Light therapy", "Medication", "Therapy", "Lifestyle changes"],
    dietary: ["Vitamin D foods", "Omega-3", "Complex carbs", "Seasonal fruits"]
  },
  {
    name: "Body Dysmorphic Disorder",
    category: "Obsessive Related",
    severity: "Variable",
    description: "Preoccupation with perceived flaws or defects in physical appearance.",
    symptoms: ["Appearance preoccupation", "Repetitive behaviors", "Avoidance", "Distress", "Social isolation"],
    causes: ["Genetics", "Brain differences", "Environment", "Cultural factors", "Life experiences"],
    prevention: ["Positive body image", "Media literacy", "Self-esteem building", "Early intervention"],
    treatment: ["Cognitive therapy", "Medication", "Exposure therapy", "Support groups"],
    dietary: ["Balanced nutrition", "Avoid restrictive diets", "Regular meals", "Self-care focus"]
  },
  {
    name: "Tourette Syndrome",
    category: "Neurodevelopmental",
    severity: "Variable",
    description: "Neurological disorder characterized by repetitive, involuntary movements and vocalizations.",
    symptoms: ["Motor tics", "Vocal tics", "Repetitive movements", "Sudden sounds", "Urge sensations"],
    causes: ["Genetics", "Brain development", "Environmental factors", "Neurotransmitter imbalances"],
    prevention: ["Genetic counseling", "Stress management", "Early intervention", "Supportive environment"],
    treatment: ["Behavioral therapy", "Medication", "Support groups", "Stress management"],
    dietary: ["Magnesium foods", "Omega-3", "Avoid artificial additives", "Balanced nutrition"]
  },
  {
    name: "Intermittent Explosive Disorder",
    category: "Impulse Control",
    severity: "Variable",
    description: "Disorder involving repeated episodes of aggressive, violent behavior.",
    symptoms: ["Sudden aggression", "Violent outbursts", "Irritability", "Impulsivity", "Regret after episodes"],
    causes: ["Brain differences", "Genetics", "Environment", "Trauma", "Substance use"],
    prevention: ["Stress management", "Anger management", "Avoid triggers", "Healthy coping"],
    treatment: ["Anger management", "Medication", "Cognitive therapy", "Stress reduction"],
    dietary: ["Stable blood sugar", "Omega-3", "Limit alcohol", "Magnesium foods"]
  },
  {
    name: "Trichotillomania",
    category: "Impulse Control",
    severity: "Variable",
    description: "Compulsive urge to pull out one's own hair.",
    symptoms: ["Hair pulling", "Tension before pulling", "Relief after pulling", "Hair loss", "Distress"],
    causes: ["Genetics", "Brain chemistry", "Stress", "Emotional regulation", "Environmental factors"],
    prevention: ["Stress management", "Early intervention", "Healthy coping", "Support systems"],
    treatment: ["Behavioral therapy", "Medication", "Support groups", "Stress management"],
    dietary: ["B vitamins", "Iron", "Protein", "Biotin supplements"]
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