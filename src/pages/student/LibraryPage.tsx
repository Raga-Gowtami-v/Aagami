
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { translateText } from '@/lib/googleApis';
import { searchYouTubeVideos, getPopularCourses } from '@/lib/youtubeApi';
import { toast } from '@/hooks/use-toast';
import BackButton from '@/components/shared/BackButton';
import SearchBar from '@/components/library/SearchBar';
import LibraryFilters from '@/components/library/LibraryFilters';
import TextbookCard, { Textbook } from '@/components/library/TextbookCard';
import DocumentCard, { Document } from '@/components/library/DocumentCard';
import VideoCard from '@/components/library/VideoCard';
import ContentViewer from '@/components/library/ContentViewer';
import YoutubeViewer from '@/components/library/YoutubeViewer';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
}

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState("textbooks");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedContent, setSelectedContent] = useState<Textbook | Document | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [popularCourses, setPopularCourses] = useState<YouTubeVideo[]>([]);
  const [translatedContent, setTranslatedContent] = useState<{[key: string]: string}>({});
  const [selectedLanguage, setSelectedLanguage] = useState({ code: "en", name: "English" });

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "bn", name: "Bengali" },
    { code: "te", name: "Telugu" },
    { code: "ta", name: "Tamil" },
    { code: "mr", name: "Marathi" },
    { code: "gu", name: "Gujarati" },
    { code: "kn", name: "Kannada" },
    { code: "pa", name: "Punjabi" },
    { code: "ml", name: "Malayalam" }
  ];

  useEffect(() => {
    document.title = 'Library - Aagami';
    
    const fetchPopularVideos = async () => {
      try {
        const videos = await getPopularCourses("education");
        setPopularCourses(videos);
      } catch (error) {
        console.error("Error fetching popular videos:", error);
      }
    };
    
    fetchPopularVideos();
  }, []);
  
  const handleSearch = async () => {
    if (!searchQuery) {
      toast({
        title: "Search query empty",
        description: "Please enter a search term",
      });
      return;
    }
    
    if (activeTab === "videos") {
      try {
        const videos = await searchYouTubeVideos(searchQuery);
        setYoutubeVideos(videos);
      } catch (error) {
        toast({
          title: "Search results",
          description: `Found results for "${searchQuery}"`,
        });
      }
    }
  };
  
  const viewContent = (content: Textbook | Document) => {
    setSelectedContent(content);
  };
  
  const viewVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
  };
  
  const closeContentViewer = () => {
    setSelectedContent(null);
  };
  
  const closeVideoViewer = () => {
    setSelectedVideoId(null);
  };

  const translateTextbook = async (textbookId: string, content: string) => {
    if (selectedLanguage.code === "en") {
      const newTranslatedContent = { ...translatedContent };
      delete newTranslatedContent[textbookId];
      setTranslatedContent(newTranslatedContent);
      return;
    }
    
    try {
      toast({
        title: "Translating",
        description: `Translating to ${selectedLanguage.name}...`,
      });
      
      const translatedText = await translateText(content, selectedLanguage.code);
      
      setTranslatedContent(prev => ({
        ...prev,
        [textbookId]: translatedText
      }));
      
      toast({
        title: "Translation complete",
        description: `Successfully translated to ${selectedLanguage.name}`,
      });
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: "Translation failed",
        description: "Failed to translate content. Please try again.",
        variant: "destructive"
      });
    }
  };

  const textbooks: Textbook[] = [
    {
      id: "tb1",
      title: "Introduction to Physics",
      author: "Dr. Rajan Mishra",
      subject: "Physics",
      grade: "10",
      coverUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
      description: "A comprehensive introduction to physics concepts for 10th grade students.",
      pages: 248
    },
    {
      id: "tb2",
      title: "Mathematics Fundamentals",
      author: "Prof. Anita Desai",
      subject: "Mathematics",
      grade: "9",
      coverUrl: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
      description: "Core mathematics concepts with practice problems for 9th grade students.",
      pages: 312
    },
    {
      id: "tb3",
      title: "Biology Essentials",
      author: "Dr. Sanjay Gupta",
      subject: "Biology",
      grade: "11",
      coverUrl: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe",
      description: "Comprehensive coverage of biology for 11th grade students with detailed illustrations.",
      pages: 356
    },
    {
      id: "tb4",
      title: "Chemistry Made Simple",
      author: "Dr. Priya Sharma",
      subject: "Chemistry",
      grade: "10",
      coverUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6",
      description: "Simplified approach to chemistry with experiments and examples.",
      pages: 284
    },
    {
      id: "tb5",
      title: "History of Modern India",
      author: "Prof. Rajiv Iyer",
      subject: "History",
      grade: "8",
      coverUrl: "https://images.unsplash.com/photo-1576872381149-7847515ce5d8",
      description: "A detailed account of India's history from 1857 to independence.",
      pages: 326
    }
  ];

  const documents: Document[] = [
    {
      id: "doc1",
      title: "Physics Formula Sheet",
      type: "PDF",
      subject: "Physics",
      author: "Teacher",
      dateAdded: "2023-05-15",
      fileSize: "2.4 MB",
      downloads: 1245,
      description: "Comprehensive formula sheet for physics exams"
    },
    {
      id: "doc2",
      title: "Mathematics Problem Set",
      type: "PDF",
      subject: "Mathematics",
      author: "Teacher",
      dateAdded: "2023-06-22",
      fileSize: "3.1 MB",
      downloads: 987,
      description: "Practice problems for algebra and calculus"
    },
    {
      id: "doc3",
      title: "Biology Lab Manual",
      type: "DOCX",
      subject: "Biology",
      author: "Admin",
      dateAdded: "2023-04-10",
      fileSize: "5.7 MB",
      downloads: 756,
      description: "Step-by-step guide for biology lab experiments"
    },
    {
      id: "doc4",
      title: "Chemistry Periodic Table",
      type: "PDF",
      subject: "Chemistry",
      author: "Teacher",
      dateAdded: "2023-07-05",
      fileSize: "1.2 MB",
      downloads: 2134,
      description: "Detailed periodic table with element properties"
    },
    {
      id: "doc5",
      title: "History Timeline Worksheet",
      type: "PDF",
      subject: "History",
      author: "Teacher",
      dateAdded: "2023-08-18",
      fileSize: "1.8 MB",
      downloads: 645,
      description: "Timeline worksheet covering major historical events"
    }
  ];

  const filteredTextbooks = textbooks.filter(textbook => {
    const matchesSubject = !selectedSubject || textbook.subject === selectedSubject;
    const matchesGrade = !selectedGrade || textbook.grade === selectedGrade;
    const matchesSearch = !searchQuery || 
      textbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      textbook.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      textbook.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSubject && matchesGrade && matchesSearch;
  });

  const filteredDocuments = documents.filter(doc => {
    const matchesSubject = !selectedSubject || doc.subject === selectedSubject;
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <BackButton to="/student-dashboard" label="Back to Dashboard" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Library</h1>
            <p className="text-muted-foreground mt-1">
              Access educational resources, books, videos, and documents
            </p>
          </div>
          
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>
      </div>
      
      <LibraryFilters 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        languages={languages}
      />
      
      <div className="mt-6">
        {activeTab === "textbooks" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Available Textbooks</h2>
            {filteredTextbooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTextbooks.map((textbook) => (
                  <TextbookCard
                    key={textbook.id}
                    textbook={textbook}
                    onView={viewContent}
                    translatedContent={translatedContent[textbook.id]}
                    onTranslate={translateTextbook}
                    selectedLanguage={selectedLanguage}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No textbooks match your filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSubject("All");
                    setSelectedGrade("All");
                  }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </>
        )}
        
        {activeTab === "videos" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Educational Videos</h2>
            
            {searchQuery && youtubeVideos.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium">Search Results</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setYoutubeVideos([]);
                      setSearchQuery("");
                    }}
                    className="flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear results
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {youtubeVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onView={viewVideo}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-3">Popular Courses</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {popularCourses.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onView={viewVideo}
                  />
                ))}
              </div>
            </div>
          </>
        )}
        
        {activeTab === "documents" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Available Documents</h2>
            {filteredDocuments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    document={doc}
                    onView={viewContent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No documents match your filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedSubject("All");
                  }}
                  className="mt-2"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {selectedContent && (
        <ContentViewer
          content={selectedContent}
          onClose={closeContentViewer}
          translatedContent={translatedContent[selectedContent.id]}
          onTranslate={translateTextbook}
          selectedLanguage={selectedLanguage}
        />
      )}
      
      {selectedVideoId && (
        <YoutubeViewer
          videoId={selectedVideoId}
          onClose={closeVideoViewer}
        />
      )}
    </div>
  );
};

export default LibraryPage;
