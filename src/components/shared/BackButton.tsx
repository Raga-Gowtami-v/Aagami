
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BackButtonProps {
  to: string;
  label?: string;
  className?: string;
}

const BackButton = ({ to, label = "Back", className = "" }: BackButtonProps) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center text-gray-500 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10 w-fit ${className}`}
    >
      <ArrowLeft className="h-5 w-5 mr-1" />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default BackButton;
