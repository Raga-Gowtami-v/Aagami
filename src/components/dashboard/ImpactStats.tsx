
import { useState, useEffect } from 'react';

interface StatProps {
  value: number;
  label: string;
  color: string;
  prefix?: string;
  suffix?: string;
}

const Stat = ({ value, label, color, prefix = '', suffix = '' }: StatProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // Animation duration in ms
    const frameRate = 60; // Frames per second
    const totalFrames = duration * frameRate / 1000;
    const increment = value / totalFrames;
    
    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      setCount(Math.min(Math.ceil(increment * currentFrame), value));
      
      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, 1000 / frameRate);
    
    return () => clearInterval(counter);
  }, [value]);

  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${color}`}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
};

const ImpactStats = () => {
  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <h3 className="text-lg font-medium mb-4">Impact Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat 
          value={1287} 
          label="Students Reached" 
          color="text-aagami-sage" 
        />
        <Stat 
          value={485} 
          label="Devices Distributed" 
          color="text-aagami-blue" 
        />
        <Stat 
          value={98} 
          label="Completion Rate" 
          color="text-aagami-gold" 
          suffix="%" 
        />
        <Stat 
          value={352} 
          label="Active Mentors" 
          color="text-aagami-terracotta" 
        />
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Monthly Goal Progress</span>
          <span>75%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-aagami-sage h-2 rounded-full" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
