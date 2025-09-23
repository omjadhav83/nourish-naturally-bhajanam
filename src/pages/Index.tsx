import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Users, Shield, ArrowRight, User, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const Index = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-wellness flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-wellness-pulse bg-primary-foreground/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <div className="w-8 h-8 bg-primary-foreground rounded-full animate-wellness-bounce"></div>
          </div>
          <p className="text-primary-foreground/80">Loading...</p>
        </div>
      </div>
    );
  }

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

          {user ? (
            // Logged in user - show dashboard access
            <div className="space-y-4">
              <p className="text-primary-foreground/90 text-lg">
                Welcome back! Continue your wellness journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 btn-wellness-hover text-lg px-8 py-6"
                  >
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Link to="/dashboard">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-6 py-6"
                    >
                      <User className="mr-2 h-5 w-5" />
                      Profile
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-6 py-6"
                    >
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // Not logged in - show sign up
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
          )}

          {/* Quick access instructions for logged-in users */}
          {user && (
            <div className="mt-8 p-4 bg-primary-foreground/10 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-primary-foreground/80 text-center">
                💡 <strong>Quick Access:</strong> Use the user menu (top-right avatar) in dashboard to access Profile & Settings, 
                or click "Profile" in the sidebar navigation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
