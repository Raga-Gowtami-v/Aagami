
import { BookOpen, UserCog, Users, School, Lightbulb, Award } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: "Interactive Learning",
      description: "Engage with interactive lessons, quizzes, and AI-powered practice sessions.",
      icon: <BookOpen className="h-6 w-6" />,
      delay: 100
    },
    {
      title: "Connect with Mentors",
      description: "Schedule sessions with experienced mentors who guide you through your learning journey.",
      icon: <UserCog className="h-6 w-6" />,
      delay: 200
    },
    {
      title: "Community Support",
      description: "Join a thriving community of learners, teachers, and pathguiders collaborating together.",
      icon: <Users className="h-6 w-6" />,
      delay: 300
    },
    {
      title: "Expert Teachers",
      description: "Learn from qualified teachers who provide personalized feedback and guidance.",
      icon: <School className="h-6 w-6" />,
      delay: 400
    },
    {
      title: "AI-Powered Tools",
      description: "Utilize AI tools for personalized learning experiences and instant feedback.",
      icon: <Lightbulb className="h-6 w-6" />,
      delay: 500
    },
    {
      title: "Earn & Learn",
      description: "Earn rewards while you learn and mentor others on the platform.",
      icon: <Award className="h-6 w-6" />,
      delay: 600
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-aagami-cream/50 to-white z-0" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-xl text-gray-600">
            Aagami provides a comprehensive suite of tools and resources to support your educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
