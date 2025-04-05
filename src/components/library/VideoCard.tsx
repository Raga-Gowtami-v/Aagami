
import { Video, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

interface VideoCardProps {
  video: YouTubeVideo;
  onView: (videoId: string) => void;
}

const VideoCard = ({ video, onView }: VideoCardProps) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="relative mb-4 rounded-md overflow-hidden bg-slate-100 aspect-video">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Video className="h-12 w-12 text-muted-foreground/50" />
            </div>
          )}
          
          <div className="absolute bottom-2 right-2 bg-background/80 text-foreground px-2 py-1 rounded text-xs">
            {video.duration}
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="font-semibold text-base line-clamp-2 mb-1">{video.title}</h3>
          
          <div className="flex items-center mb-2 text-xs text-muted-foreground">
            <span>{video.channelTitle}</span>
            <span className="mx-1">•</span>
            <span>{video.viewCount} views</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {video.description}
          </p>
        </div>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>Published: {new Date(video.publishedAt).toLocaleDateString()}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={() => onView(video.id)}
          >
            Watch
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
