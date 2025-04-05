
import { useEffect } from 'react';
import { Beaker } from 'lucide-react';
import VirtualLab from '@/components/dashboard/VirtualLab';
import BackButton from '@/components/shared/BackButton';

const VirtualLabPage = () => {
  useEffect(() => {
    document.title = 'Virtual Lab - Aagami';
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <BackButton to="/student-dashboard" label="Back to Dashboard" />
      
      <div className="flex items-center mt-6 mb-8">
        <Beaker className="h-8 w-8 text-primary mr-3" />
        <div>
          <h1 className="text-3xl font-bold">Virtual Lab</h1>
          <p className="text-muted-foreground mt-1">
            Perform virtual experiments and receive guidance from the AI lab assistant
          </p>
        </div>
      </div>
      
      <VirtualLab />
    </div>
  );
};

export default VirtualLabPage;
