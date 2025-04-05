
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-aagami-cream via-white to-aagami-cream/50 z-0" />
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-aagami-sage/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4 z-0" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-aagami-blue/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 z-0" />
      
      <div className="glass-card rounded-xl p-8 md:p-12 max-w-lg w-full mx-auto text-center relative z-10">
        <h1 className="text-7xl md:text-8xl font-bold text-gray-200 mb-2">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
