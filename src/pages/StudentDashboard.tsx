
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  LibraryBig, 
  Beaker, 
  BarChart3, 
  MessageSquare, 
  HelpCircle, 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Users,
  Award,
  Bot,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Student Dashboard - Aagami';
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    // In a real app, we would handle actual logout here
    // For now, we'll just redirect to the home page
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold bg-gradient-to-r from-aagami-sage to-aagami-blue bg-clip-text text-transparent">
                Aagami
              </span>
            </Link>
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-grow py-4 overflow-y-auto">
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/student-dashboard/practice" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  Practice
                </Link>
              </li>
              <li>
                <Link 
                  to="/student-dashboard/library" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <LibraryBig className="h-5 w-5 mr-3" />
                  Library
                </Link>
              </li>
              <li>
                <Link 
                  to="/student-dashboard/virtual-lab" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Beaker className="h-5 w-5 mr-3" />
                  Virtual Lab
                </Link>
              </li>
              <li>
                <Link 
                  to="/student-dashboard/analysis" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <BarChart3 className="h-5 w-5 mr-3" />
                  Analysis
                </Link>
              </li>
              <li>
                <Link 
                  to="/student-dashboard/ai-mentor" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Bot className="h-5 w-5 mr-3" />
                  AI Mentor
                </Link>
              </li>
              <li>
                <Link 
                  to="/student-dashboard/help" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <HelpCircle className="h-5 w-5 mr-3" />
                  Help
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-aagami-terracotta/20 flex items-center justify-center text-aagami-terracotta text-sm font-medium">
                JS
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">John Smith</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ml-0 md:ml-64`}>
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between py-4 px-6">
            <div className="flex items-center">
              <button 
                className="md:hidden text-gray-500 hover:text-gray-700 mr-4"
                onClick={toggleSidebar}
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-medium">Student Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/student-dashboard/settings" 
                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/student-dashboard/notifications" 
                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block w-2 h-2 bg-aagami-terracotta rounded-full"></span>
              </Link>
              
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Request a Service"
              description="Request a device, funding for fees, school books and more"
              icon={<HelpCircle className="h-6 w-6 text-aagami-terracotta" />}
              to="/student-dashboard/request-service"
              color="bg-aagami-terracotta"
            />
            
            <DashboardCard
              title="Learn and Earn"
              description="Become a certified mentor, teach juniors, learn new courses"
              icon={<Award className="h-6 w-6 text-aagami-blue" />}
              to="/student-dashboard/learn-earn"
              color="bg-aagami-blue"
            />
            
            <DashboardCard
              title="Library"
              description="Access categorized resources, books, videos and materials"
              icon={<LibraryBig className="h-6 w-6 text-aagami-sage" />}
              to="/student-dashboard/library"
              color="bg-aagami-sage"
            />
            
            <DashboardCard
              title="Practice"
              description="Take quizzes, solve problems, learn coding with gamification"
              icon={<BookOpen className="h-6 w-6 text-primary" />}
              to="/student-dashboard/practice"
              color="bg-primary"
            />
            
            <DashboardCard
              title="AI Mentor"
              description="Get personalized guidance from our AI tutor"
              icon={<Bot className="h-6 w-6 text-aagami-gold" />}
              to="/student-dashboard/ai-mentor"
              color="bg-aagami-gold"
            />
            
            <DashboardCard
              title="Virtual Lab"
              description="Perform interactive virtual experiments with guidance"
              icon={<Beaker className="h-6 w-6 text-aagami-blue" />}
              to="/student-dashboard/virtual-lab"
              color="bg-aagami-blue"
            />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl overflow-hidden p-6">
              <h3 className="text-lg font-medium mb-4">Your Rewards</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-aagami-gold/20 flex items-center justify-center text-aagami-gold">
                  <Award className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold">350 coins</p>
                  <p className="text-sm text-gray-500">Worth ₹35</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link 
                  to="/student-dashboard/rewards" 
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                >
                  View rewards history
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden p-6">
              <h3 className="text-lg font-medium mb-4">Leaderboard</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-aagami-terracotta/20 flex items-center justify-center text-aagami-terracotta text-xs font-medium">
                      1
                    </div>
                    <p className="ml-3 text-sm font-medium">Priya Sharma</p>
                  </div>
                  <p className="text-sm font-semibold">760 coins</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-aagami-blue/20 flex items-center justify-center text-aagami-blue text-xs font-medium">
                      2
                    </div>
                    <p className="ml-3 text-sm font-medium">Raj Kumar</p>
                  </div>
                  <p className="text-sm font-semibold">685 coins</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-aagami-sage/20 flex items-center justify-center text-aagami-sage text-xs font-medium">
                      3
                    </div>
                    <p className="ml-3 text-sm font-medium">Ananya Singh</p>
                  </div>
                  <p className="text-sm font-semibold">590 coins</p>
                </div>
                <div className="flex items-center justify-between bg-primary/5 p-2 rounded">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">
                      8
                    </div>
                    <p className="ml-3 text-sm font-medium">You</p>
                  </div>
                  <p className="text-sm font-semibold">350 coins</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link 
                  to="/student-dashboard/leaderboard" 
                  className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                >
                  View full leaderboard
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper component for dashboard cards
interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}

const DashboardCard = ({ title, description, icon, to, color }: DashboardCardProps) => {
  return (
    <Link 
      to={to} 
      className="hover-lift group glass-card rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full"
    >
      <div className={`h-1.5 ${color}`} />
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color.replace('bg-', 'bg-').replace('/', '/10')}`}>
            {icon}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${color.replace('bg-', 'bg-').replace('/', '/10')} group-hover:${color} transition-colors duration-300`}
          >
            <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
          </Button>
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
      </div>
    </Link>
  );
};

export default StudentDashboard;
