
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-aagami-cream via-white to-aagami-cream/50 z-0" />
      
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-aagami-sage/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/3 z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-aagami-blue/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 z-0" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-aagami-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`transition-all duration-1000 ease-out transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-pulse-subtle">
              Empowering Education for All
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Connect, Learn &</span>
              <span className="bg-gradient-to-r from-aagami-sage via-aagami-terracotta to-aagami-gold bg-clip-text text-transparent">
                Grow Together
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Aagami is a revolutionary platform connecting students, teachers, and mentors to create 
              a sustainable educational ecosystem for the future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/role-selection"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-all group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/features"
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-lg font-medium inline-flex items-center transition-all"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-aagami-blue/20 flex items-center justify-center text-aagami-blue text-sm font-medium">S</div>
                <div className="w-10 h-10 rounded-full bg-aagami-sage/20 flex items-center justify-center text-aagami-sage text-sm font-medium">T</div>
                <div className="w-10 h-10 rounded-full bg-aagami-gold/20 flex items-center justify-center text-aagami-gold text-sm font-medium">P</div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Join 2000+</span> students, teachers and pathguiders
              </div>
            </div>
          </div>

          <div 
            className={`relative transition-all duration-1000 ease-out delay-300 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="glass-card relative z-10 rounded-xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-aagami-sage/20 to-aagami-blue/20" />
                <img 
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Students learning together" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-500">Aagami Impact</span>
                  <span className="text-xs font-medium bg-aagami-sage/10 text-aagami-sage px-2 py-1 rounded-full">
                    Live Data
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1.2K+</div>
                    <div className="text-xs text-gray-500">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">200+</div>
                    <div className="text-xs text-gray-500">Teachers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">450+</div>
                    <div className="text-xs text-gray-500">Mentors</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-aagami-terracotta h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>Device Distribution</span>
                  <span>75%</span>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-aagami-gold/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/3 z-0" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-aagami-sage/20 rounded-full blur-xl translate-y-1/3 -translate-x-1/4 z-0" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
