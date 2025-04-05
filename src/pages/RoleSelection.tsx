
import { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, UserCog, Users, ArrowLeft } from 'lucide-react';
import RoleCard from '../components/shared/RoleCard';

const RoleSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    document.title = 'Choose Your Role - Aagami';
    
    // Check if there's a role in the URL params
    const searchParams = new URLSearchParams(location.search);
    const roleParam = searchParams.get('role');
    if (roleParam) {
      navigate(`/signup?role=${roleParam}`);
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
          
          <div className="text-center mb-12">
            <Link to="/" className="inline-block mb-6">
              <span className="text-4xl font-serif font-bold bg-gradient-to-r from-aagami-sage to-aagami-blue bg-clip-text text-transparent">
                Aagami
              </span>
            </Link>
            <h1 className="text-3xl font-bold mb-4">Choose your role</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the role that best describes you to get started with Aagami.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RoleCard
              title="Student"
              description="Access learning resources, connect with mentors, and track your progress."
              icon={<BookOpen className="h-6 w-6 text-aagami-sage" />}
              to="/signup?role=student"
              color="bg-aagami-sage"
            />
            
            <RoleCard
              title="Pathguider"
              description="Mentor students, manage resources, and create impact in your community."
              icon={<Users className="h-6 w-6 text-aagami-terracotta" />}
              to="/signup?role=pathguider"
              color="bg-aagami-terracotta"
            />
            
            <RoleCard
              title="Teacher"
              description="Create engaging content, track student performance, and provide guidance."
              icon={<UserCog className="h-6 w-6 text-aagami-blue" />}
              to="/signup?role=teacher"
              color="bg-aagami-blue"
            />
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
