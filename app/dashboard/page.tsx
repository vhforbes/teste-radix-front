import { Button } from "@/components/ui/button";
import { VideoSkeleton } from "@/components/ui/skeletons/video-mosaic-sekelton";
import { VideosMosaic } from "@/components/ui/videos-table";
import { fetchServer } from "@/utils/fetchServer";
import Link from "next/link";
import { Suspense } from "react";

export default async function Dashboard() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <Button>
        <Link href={"/dashboard/create-video"}>Publicar Video</Link>
      </Button>
      <h1 className="mt-12 text-2xl font-bold">Vídeos Publicados</h1>
      <div className="mt-8">
        <Suspense fallback={<VideoSkeleton />}>
          <VideosMosaic />
        </Suspense>
      </div>
    </div>
  );
}
