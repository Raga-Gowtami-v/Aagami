
// YouTube API implementation

const API_KEY = "AIzaSyBPEWyQ0jzstkrPuz239nWKinQltBDDGGw";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
  duration: string;
}

export const searchYouTubeVideos = async (
  query: string,
  maxResults: number = 10
): Promise<YouTubeVideo[]> => {
  try {
    // In a real implementation, you would make a fetch request to the YouTube API
    // For now, we'll simulate a response to avoid making actual API calls
    
    console.log(`Searching YouTube for "${query}" (max: ${maxResults})`);
    
    // Simulated search results based on query
    let videos: YouTubeVideo[] = [];
    
    if (query.toLowerCase().includes("web development")) {
      videos = [
        {
          id: "PkZNo7MFNFg",
          title: "Learn JavaScript - Full Course for Beginners",
          description: "This complete 134-part JavaScript tutorial for beginners will teach you everything you need to know to get started with the JavaScript programming language.",
          thumbnail: "https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
          channelTitle: "freeCodeCamp.org",
          publishedAt: "2018-12-10",
          viewCount: "5.6M",
          duration: "3:26:24"
        },
        {
          id: "qz0aGYrrlhU",
          title: "HTML Tutorial for Beginners: HTML Crash Course",
          description: "This HTML tutorial for beginners teaches the basics of HTML and web development.",
          thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
          channelTitle: "Programming with Mosh",
          publishedAt: "2021-01-15",
          viewCount: "2.1M",
          duration: "1:15:35"
        },
        {
          id: "1Rs2ND1ryYc",
          title: "CSS Tutorial - Zero to Hero (Complete Course)",
          description: "Learn CSS in this full course for beginners. You will learn CSS from scratch and go from zero to hero.",
          thumbnail: "https://i.ytimg.com/vi/1Rs2ND1ryYc/maxresdefault.jpg",
          channelTitle: "freeCodeCamp.org",
          publishedAt: "2021-07-21",
          viewCount: "1.8M",
          duration: "4:40:51"
        }
      ];
    } else if (query.toLowerCase().includes("data science")) {
      videos = [
        {
          id: "ua-CiDNNj30",
          title: "Data Science Full Course - Learn Data Science in 10 Hours",
          description: "This Data Science full course will help you understand what is Data Science, Data Science Applications, Data Science Tools, etc.",
          thumbnail: "https://i.ytimg.com/vi/ua-CiDNNj30/maxresdefault.jpg",
          channelTitle: "Edureka",
          publishedAt: "2019-03-21",
          viewCount: "3.1M",
          duration: "10:23:41"
        },
        {
          id: "JL_grPUnXzY",
          title: "Python for Data Science - Course for Beginners",
          description: "Learn Python programming with this comprehensive course for beginners with a focus on Data Science.",
          thumbnail: "https://i.ytimg.com/vi/JL_grPUnXzY/maxresdefault.jpg",
          channelTitle: "freeCodeCamp.org",
          publishedAt: "2022-01-10",
          viewCount: "985K",
          duration: "12:20:15"
        }
      ];
    } else {
      // Default videos for generic queries
      videos = [
        {
          id: "rfscVS0vtbw",
          title: "Learn Python - Full Course for Beginners",
          description: "This course will give you a full introduction into all of the core concepts in python.",
          thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg",
          channelTitle: "freeCodeCamp.org",
          publishedAt: "2018-07-11",
          viewCount: "36M",
          duration: "4:26:51"
        },
        {
          id: "7eh4d6sabA0",
          title: "Blockchain Full Course - 4 Hours | Blockchain Tutorial",
          description: "This Blockchain Full Course will help you understand all the basic concepts of Blockchain technology.",
          thumbnail: "https://i.ytimg.com/vi/7eh4d6sabA0/maxresdefault.jpg",
          channelTitle: "Simplilearn",
          publishedAt: "2020-04-22",
          viewCount: "1.2M",
          duration: "3:56:18"
        },
        {
          id: "i_LwzRVP7bg",
          title: "Java Programming - Full Course for Beginners",
          description: "Learn Java in this full course for beginners. Java is a general-purpose programming language.",
          thumbnail: "https://i.ytimg.com/vi/i_LwzRVP7bg/maxresdefault.jpg",
          channelTitle: "Bro Code",
          publishedAt: "2021-05-18",
          viewCount: "2.8M",
          duration: "8:28:37"
        }
      ];
    }
    
    // Limit results to the requested number
    return videos.slice(0, maxResults);
  } catch (error) {
    console.error("Error searching YouTube videos:", error);
    throw error;
  }
};

export const getPopularCourses = async (
  category: string = "programming",
  maxResults: number = 5
): Promise<YouTubeVideo[]> => {
  // This would normally fetch from the YouTube API
  // For now, we'll return simulated data
  
  console.log(`Getting popular ${category} courses (max: ${maxResults})`);
  
  const courses: YouTubeVideo[] = [
    {
      id: "7S_tz1z_5bA",
      title: "MySQL Tutorial for Beginners [Full Course]",
      description: "MySQL tutorial for beginners - Learn MySQL, the world's most popular open source database.",
      thumbnail: "https://i.ytimg.com/vi/7S_tz1z_5bA/maxresdefault.jpg",
      channelTitle: "Programming with Mosh",
      publishedAt: "2019-06-21",
      viewCount: "4.2M",
      duration: "3:10:18"
    },
    {
      id: "l1EssrLxt7E",
      title: "The Complete Web Development Bootcamp",
      description: "Learn web development from scratch with HTML, CSS, JavaScript, React, Node and more.",
      thumbnail: "https://i.ytimg.com/vi/l1EssrLxt7E/maxresdefault.jpg",
      channelTitle: "Academind",
      publishedAt: "2021-01-05",
      viewCount: "1.5M",
      duration: "55:26:42"
    },
    {
      id: "8mAITcNt710",
      title: "React JS Full Course for Beginners | Complete All-in-One Tutorial",
      description: "This React JS Full Course for Beginners is a complete guide to learn React.js from scratch.",
      thumbnail: "https://i.ytimg.com/vi/8mAITcNt710/maxresdefault.jpg",
      channelTitle: "Dave Gray",
      publishedAt: "2022-03-29",
      viewCount: "782K",
      duration: "8:23:47"
    },
    {
      id: "qz0aGYrrlhU",
      title: "HTML Crash Course For Absolute Beginners",
      description: "In this crash course we will go over the fundamentals of HTML.",
      thumbnail: "https://i.ytimg.com/vi/qz0aGYrrlhU/maxresdefault.jpg",
      channelTitle: "Traversy Media",
      publishedAt: "2019-02-13",
      viewCount: "3.8M",
      duration: "1:00:42"
    },
    {
      id: "C72WkcUZvco",
      title: "Tailwind CSS Full Course for Beginners | Complete All-in-One Tutorial",
      description: "Learn Tailwind CSS from scratch with this comprehensive beginner friendly course.",
      thumbnail: "https://i.ytimg.com/vi/C72WkcUZvco/maxresdefault.jpg",
      channelTitle: "Dave Gray",
      publishedAt: "2022-12-02",
      viewCount: "325K",
      duration: "4:45:32"
    }
  ];
  
  return courses.slice(0, maxResults);
};
