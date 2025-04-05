
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  BarChart3, 
  Check,
  X,
  Info,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { gradeAssignment } from '@/lib/geminiApi';
import { toast } from '@/hooks/use-toast';

const AutomatedGradingPage = () => {
  const [assignmentType, setAssignmentType] = useState('essay');
  const [subject, setSubject] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [gradingResults, setGradingResults] = useState<any>(null);

  useEffect(() => {
    document.title = 'Automated Grading - Aagami';
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !gradeLevel || (!file && !text)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, we would extract text from the uploaded file
      // For now, we'll use the provided text or a placeholder
      const contentToGrade = text || "Sample student submission for grading";
      
      // Sample rubric
      const rubric = [
        { criteria: "Content Knowledge", weight: 30 },
        { criteria: "Critical Thinking", weight: 25 },
        { criteria: "Organization", weight: 20 },
        { criteria: "Grammar & Mechanics", weight: 15 },
        { criteria: "Creativity", weight: 10 }
      ];
      
      const results = await gradeAssignment(
        assignmentType,
        contentToGrade,
        rubric,
        gradeLevel,
        subject
      );
      
      setGradingResults(results);
    } catch (error) {
      console.error('Error grading assignment:', error);
      toast({
        title: "Error",
        description: "Failed to grade assignment. Please try again.",
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
              <BarChart3 className="h-6 w-6 mr-2 text-aagami-sage" />
              Automated Grading
            </h1>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Assignment</TabsTrigger>
            <TabsTrigger value="results" disabled={!gradingResults}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-medium mb-4">Upload Student Work for Grading</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="assignment-type">Assignment Type</Label>
                    <Select 
                      value={assignmentType} 
                      onValueChange={setAssignmentType}
                    >
                      <SelectTrigger id="assignment-type">
                        <SelectValue placeholder="Select assignment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="essay">Essay</SelectItem>
                        <SelectItem value="short_answer">Short Answer</SelectItem>
                        <SelectItem value="project">Project Report</SelectItem>
                        <SelectItem value="lab_report">Lab Report</SelectItem>
                        <SelectItem value="presentation">Presentation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Science, Mathematics, History"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="grade-level">Grade Level</Label>
                    <Select 
                      value={gradeLevel} 
                      onValueChange={setGradeLevel}
                    >
                      <SelectTrigger id="grade-level">
                        <SelectValue placeholder="Select grade level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6th Grade</SelectItem>
                        <SelectItem value="7">7th Grade</SelectItem>
                        <SelectItem value="8">8th Grade</SelectItem>
                        <SelectItem value="9">9th Grade</SelectItem>
                        <SelectItem value="10">10th Grade</SelectItem>
                        <SelectItem value="11">11th Grade</SelectItem>
                        <SelectItem value="12">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">Upload student assignment file</p>
                    <Input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      className="max-w-xs"
                    />
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm text-center text-gray-500 mb-2">Or paste text content:</p>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full h-40 p-3 border rounded-md"
                      placeholder="Paste student submission here..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Grading...
                      </>
                    ) : (
                      <>
                        Grade Assignment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            {gradingResults && (
              <>
                <div className="glass-card rounded-xl p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h2 className="text-xl font-medium">Grading Results</h2>
                      <p className="text-muted-foreground">
                        {subject} - {assignmentType.charAt(0).toUpperCase() + assignmentType.slice(1)} - Grade {gradeLevel}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 bg-primary/10 text-primary px-4 py-2 rounded-full">
                      <span className="text-xl font-bold">{gradingResults.overallScore}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">General Feedback</h3>
                        <p className="text-muted-foreground">{gradingResults.feedback}</p>
                      </CardContent>
                    </Card>
                    
                    <h3 className="font-medium mt-4">Detailed Rubric Scores</h3>
                    {gradingResults.detailedRubricScores.map((item: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.criteria}</h4>
                              <p className="text-sm text-muted-foreground">{item.feedback}</p>
                            </div>
                            <div className="mt-2 md:mt-0 md:ml-4 md:text-right">
                              <span className="font-bold">{item.score}/{item.maxScore}</span>
                              <div className="mt-1 w-full md:w-24 bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-primary h-1.5 rounded-full" 
                                  style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-3">Strengths</h3>
                      <ul className="space-y-2">
                        {gradingResults.strengths.map((strength: string, index: number) => (
                          <li key={index} className="flex">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-3">Areas for Improvement</h3>
                      <ul className="space-y-2">
                        {gradingResults.areasForImprovement.map((area: string, index: number) => (
                          <li key={index} className="flex">
                            <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-medium mb-3">Suggested Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gradingResults.suggestedResources.map((resource: any, index: number) => (
                      <Card key={index}>
                        <CardContent className="p-3">
                          <p className="text-xs uppercase text-muted-foreground mb-1">
                            {resource.type}
                          </p>
                          <p className="font-medium text-sm line-clamp-2">
                            {resource.title}
                          </p>
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline inline-flex items-center mt-1"
                          >
                            View Resource
                            <Info className="h-3 w-3 ml-1" />
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Download Report</Button>
                  <Button>Share with Student</Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AutomatedGradingPage;
