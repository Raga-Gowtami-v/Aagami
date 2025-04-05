
import { BookOpen, Video, File, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LibraryFiltersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedGrade: string;
  setSelectedGrade: (grade: string) => void;
  selectedLanguage: { code: string; name: string };
  setSelectedLanguage: (language: { code: string; name: string }) => void;
  languages: { code: string; name: string }[];
}

const LibraryFilters = ({ 
  activeTab, 
  setActiveTab,
  selectedSubject,
  setSelectedSubject,
  selectedGrade,
  setSelectedGrade,
  selectedLanguage,
  setSelectedLanguage,
  languages
}: LibraryFiltersProps) => {
  const subjects = ["All", "Mathematics", "Science", "English", "History", "Geography", "Computer Science"];
  const grades = ["All", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex overflow-x-auto pb-2 gap-2">
        <Button
          variant={activeTab === "textbooks" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("textbooks")}
          className="flex items-center"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Textbooks
        </Button>
        <Button
          variant={activeTab === "videos" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("videos")}
          className="flex items-center"
        >
          <Video className="h-4 w-4 mr-2" />
          Videos
        </Button>
        <Button
          variant={activeTab === "documents" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("documents")}
          className="flex items-center"
        >
          <File className="h-4 w-4 mr-2" />
          Documents
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Grade Level" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((grade) => (
              <SelectItem key={grade} value={grade}>
                {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto whitespace-nowrap">
              <span>{selectedLanguage.name}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {languages.map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => setSelectedLanguage(language)}
                  className={language.code === selectedLanguage.code ? "bg-primary/10" : ""}
                >
                  {language.name}
                  {language.code === selectedLanguage.code && (
                    <Badge variant="outline" className="ml-auto">
                      Selected
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LibraryFilters;
