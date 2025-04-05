
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface RoleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  color: string;
}

const RoleCard = ({ title, description, icon, to, color }: RoleCardProps) => {
  return (
    <div className="hover-lift group glass-card rounded-xl overflow-hidden transition-all duration-300">
      <div className={`h-2 ${color}`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color.replace('bg-', 'bg-').replace('/', '/20')}`}>
            {icon}
          </div>
          <Link 
            to={to}
            className={`p-2 rounded-full ${color.replace('bg-', 'bg-').replace('/', '/10')} group-hover:${color} transition-colors duration-300`}
          >
            <ArrowRight className="h-5 w-5 text-gray-700 group-hover:text-white transition-colors duration-300" />
          </Link>
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
    </div>
  );
};

export default RoleCard;
