
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MessageSquare, 
  RefreshCw, 
  Send,
  Calendar,
  BookOpen,
  CheckCircle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { generateDetailedFeedback } from '@/lib/geminiApi';
import { toast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  avatar?: string;
  grade: string;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  type: string;
  submissionDate: string;
}

const AIFeedbackPage = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [feedbackType, setFeedbackType] = useState('assignment');
  const [customNotes, setCustomNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedFeedback, setGeneratedFeedback] = useState<any>(null);

  const students: Student[] = [
    { id: '1', name: 'Arjun Patel', grade: '10' },
    { id: '2', name: 'Sita Krishnan', grade: '9' },
    { id: '3', name: 'Nikhil Sharma', grade: '11' },
    { id: '4', name: 'Priya Singh', grade: '10' },
    { id: '5', name: 'Rahul Kapoor', grade: '9' },
  ];

  const assignments: Assignment[] = [
    { id: '1', title: 'Newton\'s Laws of Motion', subject: 'Physics', type: 'assignment', submissionDate: '2025-03-28' },
    { id: '2', title: 'Periodic Elements Quiz', subject: 'Chemistry', type: 'quiz', submissionDate: '2025-04-01' },
    { id: '3', title: 'Light and Reflection Project', subject: 'Physics', type: 'project', submissionDate: '2025-03-25' },
    { id: '4', title: 'Mid-term Examination', subject: 'Science', type: 'exam', submissionDate: '2025-03-20' },
  ];

  useEffect(() => {
    document.title = 'AI Feedback - Aagami';
  }, []);

  const handleGenerateFeedback = async () => {
    if (!selectedStudent || !selectedAssignment) {
      toast({
        title: "Missing Information",
        description: "Please select a student and assignment",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Get selected student and assignment
      const student = students.find(s => s.id === selectedStudent);
      const assignment = assignments.find(a => a.id === selectedAssignment);
      
      if (!student || !assignment) {
        throw new Error("Invalid student or assignment selection");
      }
      
      // Sample performance data - in a real app, this would come from a database
      const performance = {
        score: Math.floor(Math.random() * 31) + 70, // Random score between 70-100
        details: [
          { section: 'Understanding of Concepts', score: Math.floor(Math.random() * 9) + 12, maxScore: 20 },
          { section: 'Application of Knowledge', score: Math.floor(Math.random() * 7) + 9, maxScore: 15 },
          { section: 'Presentation and Structure', score: Math.floor(Math.random() * 6) + 10, maxScore: 15 },
          { section: 'Accuracy and Precision', score: Math.floor(Math.random() * 5) + 6, maxScore: 10 },
          { section: 'Creativity and Innovation', score: Math.floor(Math.random() * 4) + 7, maxScore: 10 }
        ]
      };
      
      // Previous performances
      const previousPerformance = [
        Math.floor(Math.random() * 21) + 70,
        Math.floor(Math.random() * 21) + 70,
        Math.floor(Math.random() * 21) + 70
      ];
      
      const feedback = await generateDetailedFeedback(
        student.name,
        assignment.subject,
        assignment.type,
        performance,
        previousPerformance
      );
      
      setGeneratedFeedback(feedback);
    } catch (error) {
      console.error('Error generating feedback:', error);
      toast({
        title: "Error",
        description: "Failed to generate feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
            <Link 
              to="/teacher-dashboard" 
              className="mr-4 p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-medium flex items-center">
              <MessageSquare className="h-6 w-6 mr-2 text-aagami-blue" />
              Generate AI Feedback
            </h1>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <Tabs defaultValue="generate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate Feedback</TabsTrigger>
            <TabsTrigger value="preview" disabled={!generatedFeedback}>Preview & Edit</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-medium mb-4">Generate Personalized Student Feedback</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Feedback Type
                  </label>
                  <Select value={feedbackType} onValueChange={setFeedbackType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assignment">Assignment Feedback</SelectItem>
                      <SelectItem value="report">Progress Report</SelectItem>
                      <SelectItem value="exam">Exam Performance</SelectItem>
                      <SelectItem value="project">Project Evaluation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Select Student
                    </label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map(student => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} (Grade {student.grade})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Select Assignment
                    </label>
                    <Select value={selectedAssignment} onValueChange={setSelectedAssignment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an assignment" />
                      </SelectTrigger>
                      <SelectContent>
                        {assignments.map(assignment => (
                          <SelectItem key={assignment.id} value={assignment.id}>
                            {assignment.title} ({assignment.subject})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Custom Notes (Optional)
                  </label>
                  <Textarea
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Add any specific points you want to include in the feedback..."
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleGenerateFeedback} 
                    disabled={loading || !selectedStudent || !selectedAssignment}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Feedback
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Feedbacks</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-aagami-sage/20 text-aagami-sage">NS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Nikhil Sharma</p>
                        <p className="text-xs text-muted-foreground">Physics Quiz</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-aagami-blue/20 text-aagami-blue">PS</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Priya Singh</p>
                        <p className="text-xs text-muted-foreground">Chemistry Project</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">5 days ago</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Feedback Templates</CardTitle>
                    <Button variant="ghost" size="sm" className="gap-1">
                      <BookOpen className="h-4 w-4" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center">
                      <div className="h-8 w-8 mr-2 bg-aagami-terracotta/20 rounded-md flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-aagami-terracotta" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Monthly Progress Report</p>
                        <p className="text-xs text-muted-foreground">Comprehensive</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Use</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center">
                      <div className="h-8 w-8 mr-2 bg-aagami-gold/20 rounded-md flex items-center justify-center">
                        <Star className="h-4 w-4 text-aagami-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Positive Encouragement</p>
                        <p className="text-xs text-muted-foreground">Motivational</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Use</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-6">
            {generatedFeedback && (
              <>
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {students.find(s => s.id === selectedStudent)?.name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-medium">
                          {students.find(s => s.id === selectedStudent)?.name}
                        </h2>
                        <p className="text-muted-foreground">
                          {assignments.find(a => a.id === selectedAssignment)?.title} - 
                          {assignments.find(a => a.id === selectedAssignment)?.subject}
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline">
                      Edit Feedback
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Personal Greeting</h3>
                      <Textarea 
                        value={generatedFeedback.personalizedGreeting} 
                        className="w-full"
                        rows={2}
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Overall Performance</h3>
                      <Textarea 
                        value={generatedFeedback.overallFeedback} 
                        className="w-full"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Detailed Analysis</h3>
                      <div className="space-y-3">
                        {generatedFeedback.detailedAnalysis.map((item: any, index: number) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row justify-between mb-2">
                                <h4 className="font-medium">{item.section}</h4>
                                <span className="font-bold">{item.performance}</span>
                              </div>
                              <Textarea 
                                value={item.feedback} 
                                className="w-full"
                                rows={2}
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Strengths</h3>
                        <ul className="space-y-2">
                          {generatedFeedback.strengthsAndWeaknesses.strengths.map((strength: string, index: number) => (
                            <li key={index}>
                              <Input value={strength} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Areas to Improve</h3>
                        <ul className="space-y-2">
                          {generatedFeedback.strengthsAndWeaknesses.weaknesses.map((weakness: string, index: number) => (
                            <li key={index}>
                              <Input value={weakness} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                      <ul className="space-y-2">
                        {generatedFeedback.nextSteps.map((step: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary mr-2">
                              {index + 1}
                            </span>
                            <Input value={step} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Send to Student</Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIFeedbackPage;
