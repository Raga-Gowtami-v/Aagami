
import { useState } from 'react';
import { Beaker, Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { virtualLabAssistant } from '@/lib/geminiApi';
import { toast } from '@/hooks/use-toast';

const VirtualLab = () => {
  const [selectedExperiment, setSelectedExperiment] = useState('chemistry');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const data = await virtualLabAssistant(
        selectedExperiment,
        'current step',
        question
      );
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the virtual lab assistant.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const experiments = {
    chemistry: [
      'Acid-Base Titration',
      'Identifying Unknown Substances',
      'Reaction Rates and Catalysts',
      'Electrochemistry',
    ],
    physics: [
      'Simple Pendulum',
      'Ohm\'s Law Circuit',
      'Light Reflection and Refraction',
      'Magnetic Field Mapping',
    ],
    biology: [
      'Microscopy and Cell Observation',
      'Photosynthesis Measurement',
      'DNA Extraction',
      'Heart Rate and Exercise',
    ],
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="chemistry" onValueChange={setSelectedExperiment}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>
        
        {Object.entries(experiments).map(([subject, exps]) => (
          <TabsContent key={subject} value={subject}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {exps.map((exp, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary/10 mr-3">
                        <Beaker className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{exp}</h3>
                        <p className="text-sm text-muted-foreground">Virtual experiment</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Virtual Lab Assistant</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {response && (
            <div className="mb-4 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-medium mb-2">Lab Assistant Response</h3>
              <p className="text-sm mb-4">{response.answer}</p>
              
              {response.safetyReminders?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Safety Reminders:</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    {response.safetyReminders.map((reminder: string, i: number) => (
                      <li key={i}>{reminder}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {response.commonMistakes?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-1">Common Mistakes to Avoid:</h4>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    {response.commonMistakes.map((mistake: string, i: number) => (
                      <li key={i}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Ask a question about your experiment..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !question.trim()}>
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualLab;
