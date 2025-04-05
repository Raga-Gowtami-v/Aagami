
import { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/shared/HeroSection';
import FeaturesSection from '../components/shared/FeaturesSection';
import TestimonialsSection from '../components/shared/TestimonialsSection';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, UserCog } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Aagami - Empowering Education for All';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturesSection />
        
        {/* Role section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white to-aagami-cream/20 z-0" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Join Our Ecosystem
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Find your role at Aagami</h2>
              <p className="text-xl text-gray-600">
                Whether you're a student seeking knowledge, a teacher sharing wisdom, or a pathguider mentoring others, 
                Aagami has a place for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card rounded-xl overflow-hidden hover-lift group">
                <div className="h-2 bg-aagami-sage" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-aagami-sage/10 text-aagami-sage">
                      <BookOpen className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Student</h3>
                  <p className="text-gray-600 mb-6">
                    Access quality education, connect with mentors, and earn while you learn.
                  </p>
                  <Link 
                    to="/role-selection?role=student" 
                    className="inline-flex items-center text-aagami-sage group-hover:underline transition-all"
                  >
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              <div className="glass-card rounded-xl overflow-hidden hover-lift group">
                <div className="h-2 bg-aagami-terracotta" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-aagami-terracotta/10 text-aagami-terracotta">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Pathguider</h3>
                  <p className="text-gray-600 mb-6">
                    Mentor students, manage resource distribution, and make a lasting impact.
                  </p>
                  <Link 
                    to="/role-selection?role=pathguider" 
                    className="inline-flex items-center text-aagami-terracotta group-hover:underline transition-all"
                  >
                    Join as pathguider
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              <div className="glass-card rounded-xl overflow-hidden hover-lift group">
                <div className="h-2 bg-aagami-blue" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-aagami-blue/10 text-aagami-blue">
                      <UserCog className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Teacher</h3>
                  <p className="text-gray-600 mb-6">
                    Utilize AI tools, track student progress, and create engaging learning materials.
                  </p>
                  <Link 
                    to="/role-selection?role=teacher" 
                    className="inline-flex items-center text-aagami-blue group-hover:underline transition-all"
                  >
                    Join as teacher
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TestimonialsSection />
        
        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-aagami-sage/5 z-0" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="glass-card rounded-xl p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-aagami-gold/20 text-aagami-gold mb-6">
                <Award className="h-6 w-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform education?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Join thousands of students, teachers, and mentors who are creating a sustainable educational ecosystem.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/role-selection"
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-all group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg font-medium inline-flex items-center transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
