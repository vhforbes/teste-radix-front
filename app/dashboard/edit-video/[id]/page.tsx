import { GloboSvg } from "@/components/icons/globoSvg";
import { Card } from "@/components/ui/card";
import { EditVideoForm } from "@/components/ui/forms/edit-video-form";
import { Video } from "@/types/interfaces";
import { fetchServer } from "@/utils/fetchServer";

export default async function EditVideoPage({
  params,
}: {
  params: { id: string };
}) {
  const listVideosUrl = `${process.env.NEXT_PUBLIC_API_URL}/videos`;

  // Just here to showcase the <suspense>
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetchServer(listVideosUrl, {
    method: "GET",
  });

  const videos: Video[] = await response.json();

  const video = videos.filter((video) => video.id.toString() === params.id)[0];

  return (
    <div className="flex h-screen items-center justify-center p-4 md:p-0">
      <Card className="flex w-full max-w-[30rem] flex-col items-center px-12 py-4 md:w-2/3">
        <div className="w-24">
          <GloboSvg />
        </div>
        <EditVideoForm videoToEdit={video} />
      </Card>
    </div>
  );
}
