import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { User, Session } from '@supabase/supabase-js';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { PersonalizedDietPlans } from '@/components/features/PersonalizedDietPlans';
import { RegionalDietPlans } from '@/components/features/RegionalDietPlans';
import { OrganSpecificDietPlans } from '@/components/features/OrganSpecificDietPlans';
import { DocumentScanner } from '@/components/features/DocumentScanner';
import { DiseaseLookup } from '@/components/features/DiseaseLookup';
import { NutritionTracker } from '@/components/features/NutritionTracker';
import { Community } from '@/components/features/Community';
import { UserProfile } from '@/components/features/UserProfile';

type DashboardView = 
  | 'overview' 
  | 'personalized-diet' 
  | 'regional-diet' 
  | 'organ-specific' 
  | 'document-scanner' 
  | 'disease-lookup' 
  | 'nutrition-tracker' 
  | 'community' 
  | 'profile';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<DashboardView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate('/auth');
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate('/auth');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate('/auth');
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview user={user} />;
      case 'personalized-diet':
        return <PersonalizedDietPlans />;
      case 'regional-diet':
        return <RegionalDietPlans />;
      case 'organ-specific':
        return <OrganSpecificDietPlans />;
      case 'document-scanner':
        return <DocumentScanner />;
      case 'disease-lookup':
        return <DiseaseLookup />;
      case 'nutrition-tracker':
        return <NutritionTracker />;
      case 'community':
        return <Community />;
      case 'profile':
        return <UserProfile user={user} />;
      default:
        return <DashboardOverview user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-wellness-pulse bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-full animate-wellness-bounce"></div>
          </div>
          <p className="text-muted-foreground">Loading your wellness dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <DashboardHeader 
        user={user}
        onSignOut={handleSignOut}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onProfileClick={() => setActiveView('profile')}
        onSettingsClick={() => setActiveView('profile')}
      />

      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar 
          activeView={activeView}
          onViewChange={setActiveView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="p-6">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;