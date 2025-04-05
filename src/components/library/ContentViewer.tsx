
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textbook } from "./TextbookCard";
import { Document } from "./DocumentCard";

interface ContentViewerProps {
  content: Textbook | Document | null;
  onClose: () => void;
  translatedContent?: string;
  onTranslate: (id: string, content: string) => void;
  selectedLanguage: { code: string; name: string };
}

const ContentViewer = ({
  content,
  onClose,
  translatedContent,
  onTranslate,
  selectedLanguage
}: ContentViewerProps) => {
  if (!content) return null;

  const isTextbook = 'pages' in content;
  const displayContent = isTextbook && content.content ? content.content : 'No content available';
  const contentToShow = translatedContent || displayContent;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-card shadow-lg rounded-lg max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{content.title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-6">
          {isTextbook && (
            <div className="flex flex-col md:flex-row md:gap-6">
              {content.coverUrl && (
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <img 
                    src={content.coverUrl} 
                    alt={content.title} 
                    className="w-full rounded-md shadow-md mb-4"
                  />
                  <div className="text-sm">
                    <p><strong>Author:</strong> {content.author}</p>
                    <p><strong>Subject:</strong> {content.subject}</p>
                    <p><strong>Grade:</strong> {content.grade}</p>
                    <p><strong>Pages:</strong> {content.pages}</p>
                  </div>
                </div>
              )}
              
              <div className={content.coverUrl ? "md:w-2/3" : "w-full"}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">{selectedLanguage.code !== 'en' ? 'Translated Content' : 'Content'}</h4>
                  {content.content && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onTranslate(content.id, content.content!)}
                      disabled={!content.content}
                    >
                      {selectedLanguage.code === 'en' ? 'Translate' : 'Show original'}
                    </Button>
                  )}
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {contentToShow.split('\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {'fileUrl' in content && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p><strong>Author:</strong> {content.author}</p>
                  <p><strong>Type:</strong> {content.type}</p>
                  <p><strong>Added:</strong> {content.dateAdded}</p>
                  <p><strong>Size:</strong> {content.fileSize}</p>
                </div>
                
                <Button>Download</Button>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{content.description}</p>
              </div>
              
              {content.fileUrl && (
                <div className="mt-6 border rounded-md p-4">
                  <p className="text-center text-sm text-muted-foreground mb-2">
                    Document preview is available below
                  </p>
                  <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
                    Document preview would be displayed here
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ContentViewer;
