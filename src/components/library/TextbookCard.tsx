
import { useState } from "react";
import { Book, GraduationCap, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Textbook {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  coverUrl: string;
  author: string;
  pages: number;
  content?: string;
}

interface TextbookCardProps {
  textbook: Textbook;
  onView: (textbook: Textbook) => void;
  translatedContent?: string;
  onTranslate: (id: string, content: string) => void;
  selectedLanguage: { code: string; name: string };
}

const TextbookCard = ({
  textbook,
  onView,
  translatedContent,
  onTranslate,
  selectedLanguage
}: TextbookCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="relative mb-4 aspect-[3/4] rounded-md overflow-hidden bg-slate-100">
          {textbook.coverUrl ? (
            <img
              src={textbook.coverUrl}
              alt={textbook.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Book className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{textbook.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{textbook.author}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="outline" className="bg-primary/5">
              {textbook.subject}
            </Badge>
            <Badge variant="outline" className="bg-secondary/5">
              {textbook.grade}
            </Badge>
            <Badge variant="outline" className="bg-muted">
              {textbook.pages} pages
            </Badge>
          </div>
          
          <p className={`text-sm text-muted-foreground mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {textbook.description}
          </p>
          
          {textbook.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:underline mb-3 inline-block"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-center">
            <GraduationCap className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-xs text-muted-foreground">Educational</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={() => onView(textbook)}
          >
            View
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextbookCard;
