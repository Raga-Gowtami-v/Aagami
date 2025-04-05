
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RoleSelection from "./pages/RoleSelection";
import StudentDashboard from "./pages/StudentDashboard";
import PathguiderDashboard from "./pages/PathguiderDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

// Student pages
import RequestService from "./pages/student/RequestService";
import LearnEarnPage from "./pages/student/LearnEarnPage";
import LibraryPage from "./pages/student/LibraryPage";
import PracticePage from "./pages/student/PracticePage";
import AIMentorPage from "./pages/student/AIMentorPage";
import CertificationPage from "./pages/student/CertificationPage";
import VirtualLabPage from "./pages/student/VirtualLabPage";

// Pathguider pages
import ReportEWastePage from "./pages/pathguider/ReportEWastePage";
import ScanDonatePage from "./pages/pathguider/ScanDonatePage";

// Teacher pages
import AutomatedGradingPage from "./pages/teacher/AutomatedGradingPage";
import AIFeedbackPage from "./pages/teacher/AIFeedbackPage";
import AIVideoPage from "./pages/teacher/AIVideoPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            
            {/* Student Routes */}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/student-dashboard/request-service" element={<RequestService />} />
            <Route path="/student-dashboard/learn-earn" element={<LearnEarnPage />} />
            <Route path="/student-dashboard/library" element={<LibraryPage />} />
            <Route path="/student-dashboard/practice" element={<PracticePage />} />
            <Route path="/student-dashboard/ai-mentor" element={<AIMentorPage />} />
            <Route path="/student-dashboard/certification" element={<CertificationPage />} />
            <Route path="/student-dashboard/virtual-lab" element={<VirtualLabPage />} />
            <Route path="/student-dashboard/*" element={<StudentDashboard />} />
            
            {/* Pathguider Routes */}
            <Route path="/pathguider-dashboard" element={<PathguiderDashboard />} />
            <Route path="/pathguider-dashboard/report-ewaste" element={<ReportEWastePage />} />
            <Route path="/pathguider-dashboard/scan-donate" element={<ScanDonatePage />} />
            <Route path="/pathguider-dashboard/*" element={<PathguiderDashboard />} />
            
            {/* Teacher Routes */}
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher-dashboard/grading" element={<AutomatedGradingPage />} />
            <Route path="/teacher-dashboard/ai-feedback" element={<AIFeedbackPage />} />
            <Route path="/teacher-dashboard/ai-video" element={<AIVideoPage />} />
            <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
