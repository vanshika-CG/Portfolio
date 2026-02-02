import React, { useState, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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

  const API_KEY = "AIzaSyDWN9jobKPU2OMWvkp3LjLlx785Y26irV8";
  const CHANNEL_ID = "UCkPPmUnla7VUEuUTF7qNdQw";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.items) {
          const fetchedVideos = data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            description: item.snippet.description,
          }));

          setVideos(fetchedVideos);
          setSelectedVideo(fetchedVideos[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section id="youtube" className="py-20 px-4 md:px-6">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center gradient-text">
            YouTube Content
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Player */}
            <div className="lg:w-2/3">
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-muted bg-black">
                {loading ? (
                  <Skeleton className="w-full h-full" />
                ) : (
                  selectedVideo && (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                      title={selectedVideo.title}
                      allowFullScreen
                    />
                  )
                )}
              </div>
              <div className="mt-4">
                {loading ? (
                  <Skeleton className="h-8 w-3/4 mb-2" />
                ) : (
                  <>
                    <h3 className="text-2xl font-bold line-clamp-2">{selectedVideo?.title}</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-3">{selectedVideo?.description}</p>
                  </>
                )}
              </div>
            </div>

            {/* Suggestions Sidebar */}
            <div className="lg:w-1/3">
              <h4 className="text-lg font-semibold mb-4 px-2">Recent Uploads</h4>
              <ScrollArea className="h-[400px] lg:h-[500px] pr-4">
                <div className="space-y-4">
                  {loading
                    ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-md" />)
                    : videos.map((video) => (
                        <Card
                          key={video.id}
                          className={`flex gap-3 p-2 cursor-pointer transition-all border-none bg-transparent hover:bg-muted/50 ${
                            selectedVideo?.id === video.id ? "bg-muted/50 ring-1 ring-primary/20" : ""
                          }`}
                          onClick={() => setSelectedVideo(video)}
                        >
                          <div className="relative flex-shrink-0 w-32 h-20 rounded-md overflow-hidden">
                            <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full" />
                          </div>
                          <div className="flex flex-col justify-center">
                            <h5 className="text-sm font-medium line-clamp-2 leading-tight">{video.title}</h5>
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