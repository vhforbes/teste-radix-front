import { fetchServer } from "@/utils/fetchServer";
import Image from "next/image";
import Link from "next/link";

interface Video {
  id: number;
  user_id: number;
  title: string;
  url: string;
}

export const VideosMosaic = async () => {
  const listVideosUrl = `${process.env.NEXT_PUBLIC_API_URL}/videos`;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetchServer(listVideosUrl, {
    method: "GET",
  });

  const videos = await response.json();

  console.log(videos);

  const getThumbnailUrl = (url: string) => {
    // Extract the video ID from the YouTube URL (assuming it's a full YouTube URL)
    const videoId = url.split("v=")[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // YouTube thumbnail
  };

  return (
    <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
      {videos.map((video: Video) => (
        <div key={video.id} className="flex flex-col items-center">
          <Image
            src={getThumbnailUrl(video.url)}
            alt={video.title}
            className="rounded-lg object-cover"
            width={320}
            height={200}
          />
          <div className="mt-2 text-center">
            <Link href={video.url}>{video.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};
