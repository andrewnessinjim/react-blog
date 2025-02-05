import * as React from "react";

const VIDEOS = {
  demoWithoutIndex: {
    production:
      "https://t1tjed5p1odlw08b.public.blob.vercel-storage.com/db-indexes/Without_Index_Demo-S9ooQNOFCDP0HifzWRqUR6yJefSV6g.mp4",
    development: "/local_videos/Without_Index_Demo.mp4",
  },
  demoWithIndex: {
    production:
      "https://t1tjed5p1odlw08b.public.blob.vercel-storage.com/db-indexes/With_Index_Demo-vfTr7O73NHC5SQwolKFwEi8GaVe7Fm.mp4",
    development: "/local_videos/With_Index_Demo.mp4",
  },
};

interface Props {
  videoId: keyof typeof VIDEOS;
}

function DemoVideo({ videoId }: Props) {
  const isProduction = process.env.NODE_ENV === "production";

  const videoSrc = isProduction
    ? VIDEOS[videoId].production
    : VIDEOS[videoId].development;

  return (
    <video controls>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default DemoVideo;
