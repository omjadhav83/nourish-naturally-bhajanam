import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  User, 
  MapPin, 
  Heart, 
  FileText, 
  Search, 
  Camera, 
  Users, 
  Settings,
  X 
} from 'lucide-react';

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

interface DashboardSidebarProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  {
    id: 'overview' as DashboardView,
    label: 'Dashboard',
    icon: Home,
    description: 'Overview & Stats'
  },
  {
    id: 'personalized-diet' as DashboardView,
    label: 'Personalized Diet',
    icon: User,
    description: 'Health-based plans'
  },
  {
    id: 'regional-diet' as DashboardView,
    label: 'Regional Diets',
    icon: MapPin,
    description: 'Local cuisines'
  },
  {
    id: 'organ-specific' as DashboardView,
    label: 'Organ Health',
    icon: Heart,
    description: 'Targeted nutrition'
  },
  {
    id: 'document-scanner' as DashboardView,
    label: 'Report Scanner',
    icon: FileText,
    description: 'Medical analysis'
  },
  {
    id: 'disease-lookup' as DashboardView,
    label: 'Health Lookup',
    icon: Search,
    description: 'Disease info'
  },
  {
    id: 'nutrition-tracker' as DashboardView,
    label: 'Nutrition Tracker',
    icon: Camera,
    description: 'Food analysis'
  },
  {
    id: 'community' as DashboardView,
    label: 'Community',
    icon: Users,
    description: 'Connect & share'
  },
  {
    id: 'profile' as DashboardView,
    label: 'Profile',
    icon: Settings,
    description: 'Your settings'
  }
];

export const DashboardSidebar = ({ 
  activeView, 
  onViewChange, 
  isOpen, 
  onClose 
}: DashboardSidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold">Navigation</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-4 text-left",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-wellness" 
                      : "hover:bg-muted"
                  )}
                  onClick={() => {
                    onViewChange(item.id);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{item.label}</span>
                      <span className={cn(
                        "text-xs",
                        isActive ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {item.description}
                      </span>
                    </div>
                  </div>
                </Button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="bg-gradient-subtle rounded-lg p-4 text-center">
              <p className="text-sm font-medium text-foreground">
                Natural Wellness
              </p>
              <p className="text-xs text-muted-foreground">
                Your health, naturally
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};