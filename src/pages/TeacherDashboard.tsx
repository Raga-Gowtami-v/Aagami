
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  Bell, 
  LogOut, 
  Menu, 
  X,
  BarChart3,
  LayoutGrid,
  MessageSquare,
  Calendar,
  FileText,
  Video,
  Users,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import { toast } from '@/hooks/use-toast';

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  useEffect(() => {
    document.title = 'Teacher Dashboard - Aagami';
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
                Teaching
              </span>
            </div>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/teacher-dashboard/class-analysis" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <BarChart3 className="h-5 w-5 mr-3" />
                  Class Analysis
                </Link>
              </li>
              <li>
                <Link 
                  to="/teacher-dashboard/grading" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <LayoutGrid className="h-5 w-5 mr-3" />
                  Automated Grading
                </Link>
              </li>
              <li>
                <Link 
                  to="/teacher-dashboard/ai-feedback" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  Generate AI Feedback
                </Link>
              </li>
              <li>
                <Link 
                  to="/teacher-dashboard/assignments" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Assignments & Tests
                </Link>
              </li>
            </ul>
            
            <div className="px-4 py-2 mt-6 mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resources
              </span>
            </div>
            <ul className="space-y-1">
              <li>
                <Link 
                  to="/teacher-dashboard/mentoring" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Schedule Mentoring
                </Link>
              </li>
              <li>
                <Link 
                  to="/teacher-dashboard/ai-video" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Video className="h-5 w-5 mr-3" />
                  AI Video Generation
                </Link>
              </li>
              <li>
                <Link 
                  to="/teacher-dashboard/parent-student" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-primary/10 hover:text-primary"
                >
                  <Users className="h-5 w-5 mr-3" />
                  Parent-Student Connect
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-aagami-blue/20 flex items-center justify-center text-aagami-blue text-sm font-medium">
                RK
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Rajesh Kumar</p>
                <p className="text-xs text-gray-500">Science Teacher</p>
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
              <h1 className="text-xl font-medium">Teacher Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/teacher-dashboard/settings" 
                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/teacher-dashboard/notifications" 
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
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-medium mb-1">Welcome back, Rajesh!</h2>
                <p className="text-gray-600">Monitor your classes and student progress</p>
              </div>
              <Link 
                to="/teacher-dashboard/class-analysis" 
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors group"
              >
                View Full Class Analysis
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden mb-8">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Class Performance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-aagami-sage">84%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-aagami-blue">92%</div>
                  <div className="text-sm text-gray-600">Attendance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-aagami-terracotta">23</div>
                  <div className="text-sm text-gray-600">Assignments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-aagami-gold">5</div>
                  <div className="text-sm text-gray-600">Tests</div>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>10th Grade - Physics</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-aagami-sage h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>9th Grade - Science</span>
                    <span>76%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-aagami-blue h-2 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>11th Grade - Chemistry</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-aagami-terracotta h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Automated Grading"
              description="Upload assignments and get AI-powered grading with detailed analysis"
              icon={<LayoutGrid className="h-6 w-6 text-aagami-sage" />}
              to="/teacher-dashboard/grading"
              color="bg-aagami-sage"
            />
            
            <DashboardCard
              title="Generate AI Feedback"
              description="Create personalized feedback for students based on their performance"
              icon={<MessageSquare className="h-6 w-6 text-aagami-blue" />}
              to="/teacher-dashboard/ai-feedback"
              color="bg-aagami-blue"
            />
            
            <DashboardCard
              title="Assignments & Tests"
              description="Create, manage, and grade assignments and tests with ease"
              icon={<FileText className="h-6 w-6 text-aagami-terracotta" />}
              to="/teacher-dashboard/assignments"
              color="bg-aagami-terracotta"
            />
            
            <DashboardCard
              title="Schedule Mentoring"
              description="Set up one-on-one or group mentoring sessions with students"
              icon={<Calendar className="h-6 w-6 text-aagami-gold" />}
              to="/teacher-dashboard/mentoring"
              color="bg-aagami-gold"
            />
            
            <DashboardCard
              title="AI Video Generation"
              description="Create educational videos using AI for your lessons"
              icon={<Video className="h-6 w-6 text-primary" />}
              to="/teacher-dashboard/ai-video"
              color="bg-primary"
            />
            
            <DashboardCard
              title="Parent-Student Connect"
              description="Facilitate communication between parents and students"
              icon={<Users className="h-6 w-6 text-aagami-blue" />}
              to="/teacher-dashboard/parent-student"
              color="bg-aagami-blue"
            />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl overflow-hidden md:col-span-2">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Student Activities</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="mr-3 w-8 h-8 rounded-full bg-aagami-sage/20 flex items-center justify-center text-aagami-sage text-xs font-medium">
                          AP
                        </div>
                        <div>
                          <p className="text-sm font-medium">Arjun Patel</p>
                          <p className="text-xs text-gray-600">Submitted Physics Assignment</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="mr-3 w-8 h-8 rounded-full bg-aagami-blue/20 flex items-center justify-center text-aagami-blue text-xs font-medium">
                          SK
                        </div>
                        <div>
                          <p className="text-sm font-medium">Sita Krishnan</p>
                          <p className="text-xs text-gray-600">Completed Chemistry Quiz</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="mr-3 w-8 h-8 rounded-full bg-aagami-terracotta/20 flex items-center justify-center text-aagami-terracotta text-xs font-medium">
                          NS
                        </div>
                        <div>
                          <p className="text-sm font-medium">Nikhil Sharma</p>
                          <p className="text-xs text-gray-600">Requested feedback on project</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link 
                    to="/teacher-dashboard/activities" 
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                  >
                    View all activities
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Upcoming Classes</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Physics - 10th Grade</h4>
                        <p className="text-sm text-gray-600">Topic: Laws of Motion</p>
                      </div>
                      <span className="bg-aagami-sage/10 text-aagami-sage text-xs px-2 py-1 rounded-full">
                        Today
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      10:30 AM - 11:30 AM
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Chemistry - 11th Grade</h4>
                        <p className="text-sm text-gray-600">Topic: Periodic Table</p>
                      </div>
                      <span className="bg-aagami-blue/10 text-aagami-blue text-xs px-2 py-1 rounded-full">
                        Tomorrow
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      9:00 AM - 10:00 AM
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Link 
                    to="/teacher-dashboard/calendar" 
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                  >
                    View full calendar
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 glass-card rounded-xl overflow-hidden relative">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-aagami-blue/30 to-aagami-sage/30 z-10" />
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Teacher resources"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-20 p-6 h-full flex flex-col justify-end">
              <div className="glass-morphism p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Teacher Resources</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Discover helpful resources and best practices for effective teaching with Aagami.
                </p>
                <button className="inline-flex items-center bg-aagami-blue hover:bg-aagami-blue/90 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  <Video className="mr-2 h-4 w-4" />
                  Watch introduction
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
