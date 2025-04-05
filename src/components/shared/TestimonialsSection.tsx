
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Aagami has completely transformed how I approach learning. The mentorship program has given me confidence and direction I never had before.",
    author: "Priya Singh",
    role: "Student, Class 10",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    id: 2,
    content: "As a teacher, Aagami gives me powerful tools to track student progress and provide personalized feedback. The AI-generated content saves me hours of preparation time.",
    author: "Rajesh Kumar",
    role: "Science Teacher",
    avatar: "https://i.pravatar.cc/150?img=60"
  },
  {
    id: 3,
    content: "The pathguider program has allowed me to give back to my community while developing my leadership skills. The impact dashboard keeps me motivated to help more students.",
    author: "Ananya Patel",
    role: "College Student & Pathguider",
    avatar: "https://i.pravatar.cc/150?img=49"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-aagami-sage/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-aagami-gold/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What our community says</h2>
          <p className="text-xl text-gray-600">
            Hear from students, teachers, and pathguiders who are part of the Aagami ecosystem.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative glass-card rounded-xl p-8 md:p-12">
            <div className="text-aagami-gold opacity-20 absolute top-6 left-6">
              <Quote className="h-16 w-16" />
            </div>
            
            <div className="relative z-10">
              <div 
                className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
                key={testimonials[activeIndex].id}
              >
                <blockquote className="text-xl md:text-2xl font-serif text-gray-800 mb-8">
                  "{testimonials[activeIndex].content}"
                </blockquote>
                <div className="flex items-center">
                  <div className="mr-4">
                    <img 
                      src={testimonials[activeIndex].avatar} 
                      alt={testimonials[activeIndex].author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonials[activeIndex].author}</p>
                    <p className="text-sm text-gray-600">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-8 right-8 flex items-center space-x-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="flex space-x-1">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex ? 'bg-aagami-terracotta w-6' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
