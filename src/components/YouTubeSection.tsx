import React, { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
}

const YouTubeSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  // Securely access keys from .env
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

  useEffect(() => {
    const fetchVideos = async () => {
      if (!API_KEY || !CHANNEL_ID) {
        console.error("YouTube credentials missing in .env file");
        setLoading(false);
        return;
      }

      try {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
          const fetchedVideos = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            description: item.snippet.description,
          }));

          setVideos(fetchedVideos);
          setSelectedVideo(fetchedVideos[0]);
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [API_KEY, CHANNEL_ID]);

  return (
    <section id="youtube" className="py-24 px-4 md:px-6 bg-background/50">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4">
              Featured Tutorials
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deep dives into LeetCode solutions, system design, and full-stack development.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Player Area */}
            <div className="lg:w-2/3">
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-muted bg-black group relative">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  selectedVideo && (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.id}?rel=0&showinfo=0`}
                      title={selectedVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )
                )}
              </div>
              
              <div className="mt-6">
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-3 leading-tight">
                      {selectedVideo?.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed italic">
                      {selectedVideo?.description}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Suggestions Sidebar */}
            <div className="lg:w-1/3 flex flex-col">
              <div className="flex items-center justify-between mb-4 px-2">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary" /> Recent Uploads
                </h4>
              </div>

              <ScrollArea className="h-[400px] lg:h-[550px] rounded-xl border border-muted/50 bg-card/30 p-4">
                <div className="space-y-4">
                  {loading
                    ? Array(5).fill(0).map((_, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <Skeleton className="w-32 h-20 rounded-lg flex-shrink-0" />
                          <div className="space-y-2 w-full">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                          </div>
                        </div>
                      ))
                    : videos.map((video) => (
                        <Card
                          key={video.id}
                          className={`group flex gap-3 p-2 cursor-pointer transition-all border-none hover:bg-primary/10 active:scale-[0.98] ${
                            selectedVideo?.id === video.id 
                            ? "bg-primary/5 ring-1 ring-primary/20" 
                            : "bg-transparent"
                          }`}
                          onClick={() => {
                            setSelectedVideo(video);
                            // Optional: Smooth scroll back to player on mobile
                            if (window.innerWidth < 1024) {
                              document.getElementById('youtube')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                        >
                          <div className="relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="object-cover w-full h-full transition-transform group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h5 className="text-sm font-medium line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                              {video.title}
                            </h5>
                          </div>
                        </Card>
                      ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default YouTubeSection;