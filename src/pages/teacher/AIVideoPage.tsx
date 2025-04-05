
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Video, 
  RefreshCw, 
  Image,
  FileText,
  Film,
  Layers,
  Send,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const AIVideoPage = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoType, setVideoType] = useState('educational');
  const [targetGrade, setTargetGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState([3]); // in minutes
  const [voiceGender, setVoiceGender] = useState('female');
  const [includeQuiz, setIncludeQuiz] = useState(false);
  const [includeAnimations, setIncludeAnimations] = useState(true);
  const [loading, setLoading] = useState(false);
  const [videoGenerationComplete, setVideoGenerationComplete] = useState(false);
  
  // Mock generated video URL
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');
  
  useEffect(() => {
    document.title = 'AI Video Generation - Aagami';
  }, []);
  
  const handleGenerateVideo = async () => {
    if (!videoTitle || !videoDescription || !subject || !targetGrade) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate video generation with a timeout
    setTimeout(() => {
      // Mock video generation result
      setGeneratedVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ'); // Placeholder URL
      setVideoGenerationComplete(true);
      setLoading(false);
      
      toast({
        title: "Video Generated",
        description: "Your educational video has been generated successfully!",
      });
    }, 3000);
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
              <Video className="h-6 w-6 mr-2 text-primary" />
              AI Video Generation
            </h1>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">Create Video</TabsTrigger>
            <TabsTrigger value="preview" disabled={!videoGenerationComplete}>Preview</TabsTrigger>
            <TabsTrigger value="library">Video Library</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-medium mb-4">Create Educational Video</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Video Title *
                  </label>
                  <Input
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Enter video title"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Subject *
                    </label>
                    <Input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g., Physics, Mathematics, History"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Target Grade Level *
                    </label>
                    <Select value={targetGrade} onValueChange={setTargetGrade}>
                      <SelectTrigger>
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
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Video Description *
                  </label>
                  <Textarea
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    placeholder="Describe what you want the video to cover..."
                    rows={4}
                    required
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-md font-medium mb-3">Video Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Video Type
                      </label>
                      <Select value={videoType} onValueChange={setVideoType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select video type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="educational">Educational</SelectItem>
                          <SelectItem value="explainer">Explainer</SelectItem>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                          <SelectItem value="presentation">Presentation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Narrator Voice
                      </label>
                      <Select value={voiceGender} onValueChange={setVoiceGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select narrator voice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="neutral">Gender Neutral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Approximate Duration: {duration[0]} minutes
                      </label>
                      <Slider
                        value={duration}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={setDuration}
                        className="py-4"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="include-quiz" className="cursor-pointer">
                          Include Quiz Questions
                        </Label>
                        <Switch
                          id="include-quiz"
                          checked={includeQuiz}
                          onCheckedChange={setIncludeQuiz}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="include-animations" className="cursor-pointer">
                          Include Animations
                        </Label>
                        <Switch
                          id="include-animations"
                          checked={includeAnimations}
                          onCheckedChange={setIncludeAnimations}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleGenerateVideo} 
                    disabled={loading || !videoTitle || !videoDescription || !subject || !targetGrade}
                    className="gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Generating Video...
                      </>
                    ) : (
                      <>
                        Generate Video
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-aagami-sage/20 rounded-full flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-aagami-sage" />
                  </div>
                  <h3 className="font-medium mb-1">Script Generation</h3>
                  <p className="text-sm text-muted-foreground">AI generates an educational script based on your topic</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-aagami-blue/20 rounded-full flex items-center justify-center mb-3">
                    <Image className="h-6 w-6 text-aagami-blue" />
                  </div>
                  <h3 className="font-medium mb-1">Visual Creation</h3>
                  <p className="text-sm text-muted-foreground">AI creates visuals that match the educational content</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-aagami-terracotta/20 rounded-full flex items-center justify-center mb-3">
                    <Film className="h-6 w-6 text-aagami-terracotta" />
                  </div>
                  <h3 className="font-medium mb-1">Video Rendering</h3>
                  <p className="text-sm text-muted-foreground">AI combines script, visuals, and voice narration</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="space-y-6">
            {videoGenerationComplete && (
              <>
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-xl font-medium mb-4">{videoTitle}</h2>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={generatedVideoUrl} 
                      title={videoTitle}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{duration[0]} minutes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Subject</p>
                      <p className="font-medium">{subject}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Grade Level</p>
                      <p className="font-medium">{targetGrade}th Grade</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="font-medium mb-2">Video Description</h3>
                    <p className="text-sm text-muted-foreground">{videoDescription}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" className="gap-2">
                    <Layers className="h-4 w-4" />
                    Edit Video
                  </Button>
                  <Button className="gap-2">
                    <Play className="h-4 w-4" />
                    Share with Students
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="library" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium">Your Video Library</h2>
              <Input placeholder="Search videos..." className="max-w-xs" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29sYXIlMjBzeXN0ZW18ZW58MHx8MHx8fDA%3D" alt="Video thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="icon" className="bg-white/20 backdrop-blur-sm">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Solar System Exploration</h3>
                  <p className="text-xs text-muted-foreground mb-2">Science • 6th Grade • 4 min</p>
                  <p className="text-sm line-clamp-2">Learn about the planets in our solar system and their unique characteristics.</p>
                </CardContent>
              </Card>
              
              <Card>
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img src="https://plus.unsplash.com/premium_photo-1676325102583-0609f12f265d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Video thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="icon" className="bg-white/20 backdrop-blur-sm">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Photosynthesis Process</h3>
                  <p className="text-xs text-muted-foreground mb-2">Biology • 9th Grade • 5 min</p>
                  <p className="text-sm line-clamp-2">Understand how plants convert light energy into chemical energy.</p>
                </CardContent>
              </Card>
              
              <Card>
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1554475901-4538ddfbccc2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Video thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="icon" className="bg-white/20 backdrop-blur-sm">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">Algebraic Equations</h3>
                  <p className="text-xs text-muted-foreground mb-2">Mathematics • 8th Grade • 6 min</p>
                  <p className="text-sm line-clamp-2">Learn how to solve various types of algebraic equations step by step.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIVideoPage;
