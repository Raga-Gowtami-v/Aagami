
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Clock, ArrowRight, CheckCircle, X, Award, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { generateCertificationQuestions, analyzeCertificationResults } from '@/lib/certificationApi';
import BackButton from '@/components/shared/BackButton';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const CertificationPage = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [topic, setTopic] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds
  const [timeSpent, setTimeSpent] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    document.title = 'Get Certified - Aagami';
  }, []);

  useEffect(() => {
    if (examStarted && !examCompleted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Auto-submit when time runs out
            clearInterval(timerRef.current!);
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [examStarted, examCompleted]);

  const handleStartCertification = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a certification topic.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const generatedQuestions = await generateCertificationQuestions(topic, difficultyLevel, 10);
      setQuestions(generatedQuestions);
      setUserAnswers(new Array(generatedQuestions.length).fill(-1));
      setCurrentQuestionIndex(0);
      setExamStarted(true);
      setExamCompleted(false);
      setTimeRemaining(1800); // Reset timer to 30 minutes
      setTimeSpent(0);
      setActiveTab('exam');
    } catch (error) {
      console.error("Error starting certification:", error);
      toast({
        title: "Error",
        description: "Failed to generate certification questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishExam = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setExamCompleted(true);
    
    const unansweredCount = userAnswers.filter(a => a === -1).length;
    if (unansweredCount > 0) {
      const confirmed = window.confirm(`You have ${unansweredCount} unanswered questions. Are you sure you want to finish the exam?`);
      if (!confirmed) {
        setExamCompleted(false);
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      // Fill in any unanswered questions with -1
      const finalAnswers = userAnswers.map(a => a === -1 ? 0 : a);
      
      const analysisResults = await analyzeCertificationResults(
        topic,
        questions,
        finalAnswers,
        timeSpent
      );
      
      setResults(analysisResults);
      setShowResults(true);
    } catch (error) {
      console.error("Error analyzing results:", error);
      toast({
        title: "Error",
        description: "Failed to analyze certification results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const renderExploreContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Certifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors"
              onClick={() => setTopic('Web Development')}
            >
              <h3 className="font-medium">Web Development</h3>
              <p className="text-sm text-gray-600">HTML, CSS, JavaScript, React</p>
            </div>
            <div 
              className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors"
              onClick={() => setTopic('Data Science')}
            >
              <h3 className="font-medium">Data Science</h3>
              <p className="text-sm text-gray-600">Python, Statistics, Machine Learning</p>
            </div>
            <div 
              className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors"
              onClick={() => setTopic('Digital Marketing')}
            >
              <h3 className="font-medium">Digital Marketing</h3>
              <p className="text-sm text-gray-600">SEO, Social Media, Analytics</p>
            </div>
            <div 
              className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 cursor-pointer transition-colors"
              onClick={() => setTopic('Mobile App Development')}
            >
              <h3 className="font-medium">Mobile App Development</h3>
              <p className="text-sm text-gray-600">Android, iOS, React Native</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Custom Certification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Certification Topic</Label>
              <Input 
                id="topic" 
                placeholder="e.g., Python Programming, Digital Marketing, etc."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div>
              <Label>Difficulty Level</Label>
              <RadioGroup
                value={difficultyLevel}
                onValueChange={(value) => setDifficultyLevel(value as 'beginner' | 'intermediate' | 'advanced')}
                className="flex space-x-2 mt-2"
              >
                <div className="flex items-center space-x-2 border rounded-md px-3 py-2 flex-1 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="cursor-pointer">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md px-3 py-2 flex-1 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="cursor-pointer">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md px-3 py-2 flex-1 cursor-pointer hover:bg-muted">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="cursor-pointer">Advanced</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleStartCertification} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Preparing Certification...
                  </>
                ) : (
                  <>
                    Start Certification
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Why Get Certified?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Validate Your Skills</h3>
              </div>
              <p className="text-sm text-gray-600">
                Prove your knowledge and abilities with official certifications that are recognized by employers.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Enhanced Learning</h3>
              </div>
              <p className="text-sm text-gray-600">
                Preparation for certification exams helps deepen your understanding of the subject matter.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="bg-primary/10 p-2 rounded-full mr-2">
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">Career Advancement</h3>
              </div>
              <p className="text-sm text-gray-600">
                Stand out in job applications and unlock new opportunities with industry-recognized credentials.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Certification Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Web Development Fundamentals</h3>
                <p className="text-sm text-gray-600">In progress (75%)</p>
              </div>
              <Button size="sm" variant="outline">Continue</Button>
            </div>
            <Progress value={75} className="h-2" />
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Digital Marketing Essentials</h3>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <Button size="sm" variant="outline">View Certificate</Button>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderExamContent = () => {
    if (showResults) {
      return (
        <Card className="shadow-lg">
          <CardHeader className={`${results.certificateEligible ? 'bg-green-50' : 'bg-amber-50'}`}>
            <CardTitle className="text-center">Your Certification Results</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                results.certificateEligible ? 'bg-green-100' : 'bg-amber-100'
              }`}>
                {results.certificateEligible ? (
                  <Award className="h-12 w-12 text-green-600" />
                ) : (
                  <Clock className="h-12 w-12 text-amber-600" />
                )}
              </div>
              
              <h2 className="text-2xl font-bold mb-1">
                {results.score} / {questions.length} ({results.percentage}%)
              </h2>
              
              <p className={`text-lg font-medium ${
                results.certificateEligible ? 'text-green-600' : 'text-amber-600'
              }`}>
                {results.certificateEligible 
                  ? "Congratulations! You've passed." 
                  : "You didn't meet the passing score of 70%."}
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Feedback</h3>
                <p className="text-gray-700">{results.feedback}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Strengths</h3>
                  <ul className="space-y-2">
                    {results.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Areas for Improvement</h3>
                  {results.weaknesses.length > 0 ? (
                    <ul className="space-y-2">
                      {results.weaknesses.map((weakness: string, index: number) => (
                        <li key={index} className="flex">
                          <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">No significant areas for improvement identified.</p>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <ol className="list-decimal ml-5 space-y-2">
                  {results.nextSteps.map((step: string, index: number) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </div>
              
              {results.certificateEligible && (
                <div className="mt-6 p-5 border rounded-lg bg-green-50">
                  <h3 className="text-lg font-medium mb-2 text-green-700">Certificate Available</h3>
                  <p className="text-gray-700 mb-4">
                    Your certificate for {topic} ({difficultyLevel} level) is ready! You can download it now or view it in your profile later.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1">
                      <Award className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View in Profile
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="outline" onClick={() => setActiveTab('explore')}>
              Back to Certifications
            </Button>
            {!results.certificateEligible && (
              <Button onClick={() => {
                setShowResults(false);
                setExamStarted(false);
                setExamCompleted(false);
                setActiveTab('explore');
              }}>
                Try Again
              </Button>
            )}
          </CardFooter>
        </Card>
      );
    }
    
    if (!examStarted) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Start Your Certification Journey</CardTitle>
          </CardHeader>
          <CardContent className="text-center p-8">
            <p className="mb-4">Select a certification topic from the Explore tab to begin.</p>
            <Button onClick={() => setActiveTab('explore')}>
              Browse Certifications
            </Button>
          </CardContent>
        </Card>
      );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-medium">{topic} Certification</h2>
              <p className="text-sm text-gray-600">{difficultyLevel} level</p>
            </div>
            <div className="flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
          </div>
          
          <Progress 
            value={(currentQuestionIndex + 1) / questions.length * 100} 
            className="h-2 mb-4" 
          />
          
          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{userAnswers.filter(a => a !== -1).length} answered</span>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-medium mb-6">{currentQuestion.question}</h3>
            
            <RadioGroup
              value={userAnswers[currentQuestionIndex]?.toString() || ""}
              onValueChange={(value) => handleSelectAnswer(parseInt(value))}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted ${
                    userAnswers[currentQuestionIndex] === index ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleSelectAnswer(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="border-t p-4 flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={handleNextQuestion}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleFinishExam}>
                  Finish Exam
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
        
        {examStarted && !examCompleted && (
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleFinishExam}>
              Submit All Answers
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white shadow-sm">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center">
            <BackButton to="/student-dashboard" />
            <h1 className="text-xl font-medium ml-2">Get Certified</h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explore" disabled={examStarted && !examCompleted && !showResults}>
              Explore Certifications
            </TabsTrigger>
            <TabsTrigger value="exam">
              Certification Exam
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="space-y-6">
            {renderExploreContent()}
          </TabsContent>
          
          <TabsContent value="exam" className="space-y-6">
            {renderExamContent()}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CertificationPage;
