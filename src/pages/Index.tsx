import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Users, Shield } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-wellness">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center space-y-6 animate-wellness-fade-in">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-primary-foreground/10 p-4 rounded-xl">
              <Leaf className="h-12 w-12 text-primary-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-primary-foreground">
              Nourish Naturally
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground leading-tight max-w-4xl">
            Your Complete Natural Medicine & Nutrition Platform
          </h2>
          
          <p className="text-xl text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
            Discover personalized diet plans, regional cuisines, organ-specific nutrition, 
            document analysis, and connect with a wellness community - all in one place.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto my-8">
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <Heart className="h-8 w-8" />
              <span className="text-sm font-medium">Personalized Plans</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <Shield className="h-8 w-8" />
              <span className="text-sm font-medium">Health Analysis</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <Users className="h-8 w-8" />
              <span className="text-sm font-medium">Community</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-primary-foreground/90">
              <Leaf className="h-8 w-8" />
              <span className="text-sm font-medium">Natural Solutions</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 btn-wellness-hover text-lg px-8 py-6"
              >
                Start Your Wellness Journey
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
