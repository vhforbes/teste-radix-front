export const VideoSkeleton = () => {
  return (
    <div className="mx-auto flex flex-wrap items-center justify-center gap-8">
      {/* Map to show 4 skeletons */}
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex animate-pulse flex-col items-center">
          {/* Thumbnail skeleton */}
          <div className="h-[200px] w-[320px] rounded-lg bg-gray-300"></div>

          {/* Title skeleton */}
          <div className="mt-2 h-4 w-3/4 bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};
