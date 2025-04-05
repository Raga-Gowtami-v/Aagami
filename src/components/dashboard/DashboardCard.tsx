
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  color?: string;
  className?: string;
}

const DashboardCard = ({ 
  title, 
  description, 
  icon, 
  to, 
  color = "bg-primary", 
  className = "" 
}: DashboardCardProps) => {
  return (
    <Link 
      to={to} 
      className={`hover-lift group glass-card rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full ${className}`}
    >
      <div className={`h-1.5 ${color}`} />
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color.replace('bg-', 'bg-').replace('/', '/10')}`}>
            {icon}
          </div>
          <div 
            className={`p-2 rounded-full ${color.replace('bg-', 'bg-').replace('/', '/10')} group-hover:${color} transition-colors duration-300`}
          >
            <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-600 text-sm flex-grow">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardCard;
