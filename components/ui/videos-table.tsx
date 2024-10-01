import { Video } from "@/types/interfaces";
import { fetchServer } from "@/utils/fetchServer";
import Image from "next/image";
import Link from "next/link";
import { PiNotePencilBold } from "react-icons/pi";
import { DeleteVideoForm } from "./forms/delete-video-form";

export const VideosMosaic = async () => {
  const listVideosUrl = `${process.env.NEXT_PUBLIC_API_URL}/videos`;

  // Just here to showcase the <suspense>
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetchServer(listVideosUrl, {
    method: "GET",
  });

  const videos: Video[] = await response.json();

  const getThumbnailUrl = (url: string) => {
    const videoId = url.split("v=")[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  if (!videos.length)
    return <div>Você ainda não possui vídeos publicados!</div>;

  return (
    <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
      {videos.map((video: Video) => (
        <div key={video.id} className="relative flex flex-col items-center">
          {/* Video Thumbnail */}
          <Link
            href={video.url}
            className="hover:shadow-lg dark:shadow-slate-800"
          >
            <Image
              src={getThumbnailUrl(video.url)}
              alt={video.title}
              className="rounded-lg object-cover"
              width={320}
              height={200}
            />
          </Link>

          {/* Video Title with Edit Icon */}
          <div className="mt-2 flex items-center space-x-2 text-center font-bold">
            <div>{video.title}</div>

            {/* Edit Icon */}
            <Link href={`/dashboard/edit-video/${video.id}`} passHref>
              <PiNotePencilBold className="h-5 w-5 cursor-pointer text-neutral hover:text-gray-500" />
            </Link>

            <DeleteVideoForm id={video.id} />
          </div>
        </div>
      ))}
    </div>
  );
};
