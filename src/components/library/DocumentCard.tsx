
import { useState } from "react";
import { File, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Document {
  id: string;
  title: string;
  description: string;
  subject: string;
  author: string;
  type: string;
  dateAdded: string;
  fileSize: string;
  downloads: number;
  fileUrl?: string;
}

interface DocumentCardProps {
  document: Document;
  onView: (document: Document) => void;
}

const DocumentCard = ({ document, onView }: DocumentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="mb-4 flex items-center">
          <div className="p-2 bg-muted rounded-md mr-3">
            <File className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-base line-clamp-1">{document.title}</h3>
            <div className="flex items-center mt-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Added: {document.dateAdded}</span>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="outline" className="bg-primary/5">
              {document.subject}
            </Badge>
            <Badge variant="outline" className="bg-secondary/5">
              {document.type}
            </Badge>
            <Badge variant="outline" className="bg-muted">
              {document.fileSize}
            </Badge>
          </div>
          
          <p className={`text-sm text-muted-foreground mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {document.description}
          </p>
          
          {document.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary hover:underline mb-3 inline-block"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            {document.downloads} downloads
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={() => onView(document)}
          >
            View
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
