
import { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  BarChart, 
  Book, 
  Brain,
  Code,
  Play,
  RefreshCw,
  Trophy,
  Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { generateQuestions } from "@/lib/geminiApi";
import { updateUserCoins } from "@/lib/firestoreService";

const PracticePage = () => {
  const { userData } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState("mathematics");
  const [selectedTopic, setSelectedTopic] = useState("algebra");
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: number}>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timerMode, setTimerMode] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Sample subjects and topics mapping
  const subjectTopics: {[key: string]: string[]} = {
    mathematics: ["algebra", "geometry", "calculus", "statistics", "trigonometry"],
    science: ["physics", "chemistry", "biology", "earth science", "astronomy"],
    english: ["grammar", "literature", "vocabulary", "comprehension", "writing"],
    history: ["ancient history", "medieval history", "modern history", "world wars", "indian history"],
    computers: ["programming", "web development", "data structures", "algorithms", "computer architecture"]
  };

  useEffect(() => {
    // Timer logic
    let timer: NodeJS.Timeout;
    if (timerMode && isTimerRunning && timeRemaining > 0 && !quizCompleted) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimerRunning(false);
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerMode, isTimerRunning, timeRemaining, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartQuiz = async () => {
    setIsLoading(true);
    setQuizCompleted(false);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setScore(0);
    
    if (timerMode) {
      setTimeRemaining(300);
      setIsTimerRunning(true);
    }
    
    try {
      // In a real app, this would use the Gemini API to generate actual questions
      const generatedQuestions = await generateQuestions(
        selectedTopic, 
        selectedDifficulty,
        5 // number of questions
      );
      
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error("Failed to generate questions:", error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleQuizComplete = async () => {
    setIsTimerRunning(false);
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);
    
    // Award coins based on performance
    if (userData && userData.uid) {
      try {
        let coinsEarned = 0;
        
        if (finalScore >= 90) coinsEarned = 15;
        else if (finalScore >= 70) coinsEarned = 10;
        else if (finalScore >= 50) coinsEarned = 5;
        
        if (coinsEarned > 0) {
          await updateUserCoins(userData.uid, coinsEarned);
          toast({
            title: "Coins earned!",
            description: `You earned ${coinsEarned} coins for completing the quiz!`
          });
        }
      } catch (error) {
        console.error("Failed to update coins:", error);
      }
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Practice Zone</h1>
      <p className="text-gray-600 mb-8">
        Build your skills through interactive quizzes, problem-solving challenges, and gamified learning
      </p>

      <Tabs defaultValue="quizzes" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full sm:w-[600px]">
          <TabsTrigger value="quizzes" className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Quizzes
          </TabsTrigger>
          <TabsTrigger value="problem-solving" className="flex items-center">
            <Brain className="mr-2 h-4 w-4" />
            Problem Solving
          </TabsTrigger>
          <TabsTrigger value="coding" className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            Coding
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Your Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quizzes" className="space-y-6">
          {!questions.length || quizCompleted ? (
            <Card>
              <CardHeader>
                <CardTitle>Subject Quiz</CardTitle>
                <CardDescription>
                  Test your knowledge with AI-generated questions tailored to your level
                </CardDescription>
              </CardHeader>
              <CardContent>
                {quizCompleted ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center rounded-full w-24 h-24 bg-gray-100 mb-4">
                        <span className="text-3xl font-bold">{score}%</span>
                      </div>
                      <h3 className="text-lg font-medium mb-2">Quiz Completed!</h3>
                      <p className="text-gray-600">
                        {score >= 90 ? "Excellent job! You're a master of this topic." :
                         score >= 70 ? "Great work! You've got a good understanding." :
                         score >= 50 ? "Good effort! Keep practicing to improve." :
                         "Keep practicing! You'll get better with time."}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Question Review</h4>
                      <div className="space-y-2">
                        {questions.map((question, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                              selectedAnswers[question.id] === question.correctAnswer 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-red-100 text-red-600'
                            }`}>
                              {selectedAnswers[question.id] === question.correctAnswer 
                                ? <CheckCircle2 className="h-4 w-4" /> 
                                : index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{question.question}</p>
                              <p className="text-xs text-gray-500">
                                {selectedAnswers[question.id] === question.correctAnswer 
                                  ? 'Correct answer: ' 
                                  : `Your answer: ${question.options[selectedAnswers[question.id] || 0]}`}
                                {selectedAnswers[question.id] !== question.correctAnswer && 
                                  ` | Correct answer: ${question.options[question.correctAnswer]}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="computers">Computers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="topic">Topic</Label>
                        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                          <SelectTrigger id="topic">
                            <SelectValue placeholder="Select topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjectTopics[selectedSubject]?.map(topic => (
                              <SelectItem key={topic} value={topic}>
                                {topic.charAt(0).toUpperCase() + topic.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="difficulty">Difficulty</Label>
                        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                          <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-6">
                      <Label htmlFor="timer-toggle" className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id="timer-toggle"
                          checked={timerMode}
                          onChange={() => setTimerMode(!timerMode)}
                          className="sr-only"
                        />
                        <div className={`relative w-10 h-5 transition-colors duration-200 ease-linear rounded-full ${timerMode ? 'bg-aagami-blue' : 'bg-gray-200'}`}>
                          <div className={`absolute left-0.5 top-0.5 w-4 h-4 transition-transform duration-200 ease-linear transform bg-white rounded-full ${timerMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">
                          Timer Mode (5 minutes)
                        </span>
                      </Label>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleStartQuiz} 
                  disabled={isLoading}
                  className="bg-aagami-blue hover:bg-aagami-blue/90"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating Quiz...
                    </>
                  ) : quizCompleted ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Another Quiz
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Start Quiz
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      {selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)} Quiz
                    </CardTitle>
                    <CardDescription>
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </CardDescription>
                  </div>
                  
                  {timerMode && (
                    <div className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                      <Timer className="h-4 w-4 text-gray-500 mr-1" />
                      <span className={`text-sm font-medium ${
                        timeRemaining < 60 ? 'text-red-500' : 'text-gray-600'
                      }`}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />
                </div>
                
                {questions[currentQuestionIndex] && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">
                        {questions[currentQuestionIndex].question}
                      </h3>
                    </div>
                    
                    <RadioGroup 
                      value={selectedAnswers[questions[currentQuestionIndex].id]?.toString()} 
                      onValueChange={(value) => handleAnswerSelect(
                        questions[currentQuestionIndex].id, 
                        parseInt(value)
                      )}
                    >
                      {questions[currentQuestionIndex].options.map((option: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                          <RadioGroupItem 
                            value={index.toString()} 
                            id={`option-${index}`} 
                          />
                          <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                <Button 
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswers[questions[currentQuestionIndex]?.id]}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {/* Topic Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Book className="mr-2 h-5 w-5 text-aagami-blue" />
                  Popular Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Algebra Equations</span>
                    <Badge>New</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Chemical Reactions</span>
                    <Badge variant="secondary">Popular</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Indian History</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>English Grammar</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="mr-2 h-5 w-5 text-aagami-terracotta" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Quiz Master</span>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Gold</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Problem Solver</span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">Silver</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Science Whiz</span>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Bronze</Badge>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>History Buff</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Level 3</Badge>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-aagami-gold" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center font-medium">
                    <span>1. Ravi S.</span>
                    <span className="text-aagami-gold">980 pts</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>2. Priya T.</span>
                    <span>840 pts</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>3. Amit K.</span>
                    <span>795 pts</span>
                  </li>
                  {userData && (
                    <li className="flex justify-between items-center text-aagami-blue">
                      <span>You</span>
                      <span>520 pts</span>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="problem-solving">
          <Card>
            <CardHeader>
              <CardTitle>Problem Solving Challenges</CardTitle>
              <CardDescription>
                Tackle real-world problems and develop your critical thinking skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                Problem-solving challenges are coming soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coding">
          <Card>
            <CardHeader>
              <CardTitle>Coding Practice</CardTitle>
              <CardDescription>
                Learn coding through interactive challenges and exercises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                Coding challenges are coming soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Your Practice Statistics</CardTitle>
              <CardDescription>
                Track your learning progress and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-gray-500">
                Detailed statistics are coming soon!
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticePage;
