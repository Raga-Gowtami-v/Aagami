
import { useState } from 'react';
import { BookOpen, Users, UserCog } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RoleSelectorProps {
  selectedRole: string;
  onChange: (role: string) => void;
}

const RoleSelector = ({ selectedRole, onChange }: RoleSelectorProps) => {
  return (
    <div className="my-4">
      <h3 className="text-sm font-medium mb-2">Select your role:</h3>
      <RadioGroup 
        value={selectedRole} 
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${selectedRole === 'student' ? 'border-primary bg-primary/5' : ''}`}>
          <RadioGroupItem value="student" id="student" className="sr-only" />
          <Label htmlFor="student" className="cursor-pointer flex flex-col items-center text-center">
            <BookOpen className="h-8 w-8 mb-2 text-aagami-sage" />
            <span className="font-medium">Student</span>
            <span className="text-xs text-gray-500 mt-1">Access resources and track your progress</span>
          </Label>
        </div>
        
        <div className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${selectedRole === 'pathguider' ? 'border-primary bg-primary/5' : ''}`}>
          <RadioGroupItem value="pathguider" id="pathguider" className="sr-only" />
          <Label htmlFor="pathguider" className="cursor-pointer flex flex-col items-center text-center">
            <Users className="h-8 w-8 mb-2 text-aagami-terracotta" />
            <span className="font-medium">Pathguider</span>
            <span className="text-xs text-gray-500 mt-1">Mentor students and create impact</span>
          </Label>
        </div>
        
        <div className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${selectedRole === 'teacher' ? 'border-primary bg-primary/5' : ''}`}>
          <RadioGroupItem value="teacher" id="teacher" className="sr-only" />
          <Label htmlFor="teacher" className="cursor-pointer flex flex-col items-center text-center">
            <UserCog className="h-8 w-8 mb-2 text-aagami-blue" />
            <span className="font-medium">Teacher</span>
            <span className="text-xs text-gray-500 mt-1">Create content and guide learning</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default RoleSelector;
