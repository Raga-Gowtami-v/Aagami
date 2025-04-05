
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  BarChart3,
  Trash2,
  Scan,
  Map,
  Package,
  FileDown,
  FileText,
  CheckSquare,
  Users,
  CalendarDays,
  Play,
  ChevronRight
} from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import ImpactStats from '../components/dashboard/ImpactStats';
import { toast } from '@/hooks/use-toast';

const PathguiderDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Pathguider Dashboard - Aagami';
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
            <div className="px-4 py-2 mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Management
              </span>
            </div>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/pathguider-dashboard/impact" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <BarChart3 className="h-5 w-5 mr-3" />
                  Impact Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/pathguider-dashboard/report-ewaste" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Trash2 className="h-5 w-5 mr-3" />
                  Report E-Waste
                </Link>
              </li>
              <li>
                <Link 
                  to="/pathguider-dashboard/scan-donate" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Scan className="h-5 w-5 mr-3" />
                  Scan & Donate
                </Link>
              </li>
              <li>
                <Link 
                  to="/pathguider-dashboard/track-device" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Map className="h-5 w-5 mr-3" />
                  Track Device
                </Link>
              </li>
            </ul>
            
            <div className="px-4 py-2 mt-6 mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Requests
              </span>
            </div>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/pathguider-dashboard/raw-requests" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <FileText className="h-5 w-5 mr-3" />
                  View Raw Requests
                </Link>
              </li>
              <li>
                <Link 
                  to="/pathguider-dashboard/verified-requests" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <CheckSquare className="h-5 w-5 mr-3" />
                  Verified Requests
                </Link>
              </li>
              <li>
                <Link 
                  to="/pathguider-dashboard/verify-request" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <CheckSquare className="h-5 w-5 mr-3" />
                  Verify a Request
                </Link>
              </li>
            </ul>
            
            <div className="px-4 py-2 mt-6 mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Community
              </span>
            </div>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/pathguider-dashboard/guided-students" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Users className="h-5 w-5 mr-3" />
                  Your Guided Students
                </Link>
              </li>
              <li>
                <Link 
                  to="/pathguider-dashboard/events" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <CalendarDays className="h-5 w-5 mr-3" />
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-aagami-terracotta/20 flex items-center justify-center text-aagami-terracotta text-sm font-medium">
                AS
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Ananya Singh</p>
                <p className="text-xs text-gray-500">Pathguider</p>
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
              <h1 className="text-xl font-medium">Pathguider Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/pathguider-dashboard/settings" 
                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/pathguider-dashboard/notifications" 
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
          <ImpactStats />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <DashboardCard
              title="Report E-Waste Nearby"
              description="Upload images of e-waste in your area for collection"
              icon={<Trash2 className="h-6 w-6 text-aagami-terracotta" />}
              to="/pathguider-dashboard/report-ewaste"
              color="bg-aagami-terracotta"
            />
            
            <DashboardCard
              title="Scan & Donate Old Device"
              description="Scan devices to assess condition and recycle/donate"
              icon={<Scan className="h-6 w-6 text-aagami-blue" />}
              to="/pathguider-dashboard/scan-donate"
              color="bg-aagami-blue"
            />
            
            <DashboardCard
              title="Track Old Device"
              description="Monitor the status and journey of donated devices"
              icon={<Map className="h-6 w-6 text-aagami-sage" />}
              to="/pathguider-dashboard/track-device"
              color="bg-aagami-sage"
            />
            
            <DashboardCard
              title="Pickup/Distribute Devices"
              description="Coordinate device pickup and distribution tasks"
              icon={<Package className="h-6 w-6 text-aagami-gold" />}
              to="/pathguider-dashboard/pickup-distribute"
              color="bg-aagami-gold"
            />
            
            <DashboardCard
              title="Drop Devices"
              description="Find drop-off locations and instructions"
              icon={<FileDown className="h-6 w-6 text-primary" />}
              to="/pathguider-dashboard/drop-devices"
              color="bg-primary"
            />
            
            <DashboardCard
              title="View Requests"
              description="Browse and manage service requests from students"
              icon={<FileText className="h-6 w-6 text-aagami-blue" />}
              to="/pathguider-dashboard/requests"
              color="bg-aagami-blue"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Your Guided Students</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-3 w-8 h-8 rounded-full bg-aagami-sage/20 flex items-center justify-center text-aagami-sage text-xs font-medium">
                      RK
                    </div>
                    <div>
                      <p className="text-sm font-medium">Rahul Kumar</p>
                      <p className="text-xs text-gray-600">Grade 10 • Math, Science</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 w-8 h-8 rounded-full bg-aagami-blue/20 flex items-center justify-center text-aagami-blue text-xs font-medium">
                      SP
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sanya Patel</p>
                      <p className="text-xs text-gray-600">Grade 8 • English, Science</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-3 w-8 h-8 rounded-full bg-aagami-terracotta/20 flex items-center justify-center text-aagami-terracotta text-xs font-medium">
                      MJ
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mohan Joshi</p>
                      <p className="text-xs text-gray-600">Grade 11 • Physics, Chemistry</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link 
                    to="/pathguider-dashboard/guided-students" 
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                  >
                    View all students
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Device Distribution</h4>
                        <p className="text-sm text-gray-600">Delhi Public School</p>
                      </div>
                      <span className="bg-aagami-sage/10 text-aagami-sage text-xs px-2 py-1 rounded-full">
                        Tomorrow
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      10:00 AM - 1:00 PM
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Pathguider Training</h4>
                        <p className="text-sm text-gray-600">Online Webinar</p>
                      </div>
                      <span className="bg-aagami-blue/10 text-aagami-blue text-xs px-2 py-1 rounded-full">
                        Next Week
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      3:00 PM - 4:30 PM
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link 
                    to="/pathguider-dashboard/events" 
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                  >
                    View all events
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden relative">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-aagami-terracotta/30 to-aagami-sage/30 z-10" />
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80"
                  alt="Pathguider video"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-20 p-6 h-full flex flex-col justify-end">
                <div className="glass-morphism p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Pathguider Overview</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Learn about your role and impact as a pathguider in the Aagami ecosystem.
                  </p>
                  <button className="inline-flex items-center bg-aagami-terracotta hover:bg-aagami-terracotta/90 text-white px-3 py-2 rounded-lg text-sm font-medium">
                    <Play className="mr-2 h-4 w-4" />
                    Watch video
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 glass-card rounded-xl overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Introduce to Aagami</h3>
              <p className="text-gray-600 mb-6">
                Help expand our educational ecosystem by introducing Aagami to others.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/role-selection?role=student" 
                  className="bg-aagami-sage/10 hover:bg-aagami-sage/20 text-aagami-sage p-4 rounded-lg text-center transition-colors"
                >
                  <span className="block font-medium mb-1">For Students</span>
                  <span className="text-sm">Help students access quality education</span>
                </Link>
                
                <Link 
                  to="/role-selection?role=teacher" 
                  className="bg-aagami-blue/10 hover:bg-aagami-blue/20 text-aagami-blue p-4 rounded-lg text-center transition-colors"
                >
                  <span className="block font-medium mb-1">For Teachers</span>
                  <span className="text-sm">Empower teachers with innovative tools</span>
                </Link>
                
                <Link 
                  to="/role-selection?role=pathguider" 
                  className="bg-aagami-terracotta/10 hover:bg-aagami-terracotta/20 text-aagami-terracotta p-4 rounded-lg text-center transition-colors"
                >
                  <span className="block font-medium mb-1">For Pathguiders</span>
                  <span className="text-sm">Recruit mentors to expand our impact</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PathguiderDashboard;
