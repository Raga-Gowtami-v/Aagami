
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

const FeatureCard = ({ title, description, icon, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="glass-card rounded-xl p-6 hover-lift"
      style={{ 
        animationDelay: `${delay}ms`, 
        opacity: 0, 
        animation: 'fade-in 0.6s ease-out forwards',
        animationFillMode: 'forwards'
      }}
    >
      <div className="bg-primary/10 text-primary p-3 rounded-lg inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
