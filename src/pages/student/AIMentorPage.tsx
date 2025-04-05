
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, Bot, RefreshCw, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { aiMentorChat } from '@/lib/geminiApi';
import { toast } from '@/hooks/use-toast';
import BackButton from '@/components/shared/BackButton';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIMentorPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI Mentor. How can I help you with your studies today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    "How does photosynthesis work?",
    "Can you explain Newton's laws of motion?",
    "What are the key events of World War II?",
    "How do I solve quadratic equations?"
  ]);
  const [resources, setResources] = useState<{type: string, title: string, url: string}[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'AI Mentor - Aagami';
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      role: 'user' as const,
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Convert messages to format expected by aiMentorChat
      const conversation = messages.slice(-5).map(m => ({
        role: m.role,
        content: m.content
      }));
      conversation.push({ role: userMessage.role, content: userMessage.content });
      
      const response = await aiMentorChat(
        "John Smith", // Student name
        "10", // Grade
        conversation,
        "General" // Subject
      );
      
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: response.response,
          timestamp: new Date()
        }
      ]);
      
      setSuggestedQuestions(response.suggestedQuestions || []);
      setResources(response.relatedResources || []);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI mentor. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
            <BackButton to="/student-dashboard" />
            <h1 className="text-xl font-medium flex items-center ml-2">
              <Bot className="h-6 w-6 mr-2 text-aagami-blue" />
              AI Mentor
            </h1>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  {message.content.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {line}
                    </p>
                  ))}
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t bg-card">
            {suggestedQuestions.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            )}
            
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your question..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </form>
          </div>
        </div>
        
        {resources.length > 0 && (
          <div className="hidden md:block border-l w-72 bg-muted/30 p-4 overflow-y-auto">
            <h3 className="font-medium mb-2 flex items-center">
              <PanelRightOpen className="h-4 w-4 mr-1" />
              Related Resources
            </h3>
            <Separator className="mb-4" />
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <Card key={index}>
                  <CardContent className="p-3">
                    <p className="text-xs uppercase text-muted-foreground mb-1">
                      {resource.type}
                    </p>
                    <p className="font-medium text-sm">
                      {resource.title}
                    </p>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      View Resource
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIMentorPage;
