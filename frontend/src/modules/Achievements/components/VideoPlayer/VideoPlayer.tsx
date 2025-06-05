import { FC, JSX } from "react";

type VideoType = "youtube" | "vimeo" | "direct" | "unsupported";

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl }) => {
  const getVideoType = (url: string): VideoType => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    } else if (url.includes("vimeo.com")) {
      return "vimeo";
    } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return "direct";
    } else {
      return "unsupported";
    }
  };

  const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^&]+)/);
    return match ? match[1] : null;
  };

  const getVimeoVideoId = (url: string): string | null => {
    const match = url.match(/vimeo.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const videoType = getVideoType(videoUrl);

  const renderPlayer = (): JSX.Element => {
    switch (videoType) {
      case "youtube":
        const youtubeVideoId = getYouTubeVideoId(videoUrl);
        if (!youtubeVideoId) return <></>;

        return (
          <iframe
            width="100%"
            height="128"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: "20px" }}
          ></iframe>
        );

      case "vimeo":
        const vimeoVideoId = getVimeoVideoId(videoUrl);
        if (!vimeoVideoId) return <></>;

        return (
          <iframe
            width="398"
            height="128"
            src={`https://player.vimeo.com/video/${vimeoVideoId}`}
            title="Vimeo video player"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            style={{ borderRadius: "20px" }}
          ></iframe>
        );

      case "direct":
        return (
          <video width="398" controls>
            <source src={videoUrl} type={`video/${videoUrl.split('.').pop()}`} />
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        );

      default:
        return <></>;
    }
  };

  return <div>{renderPlayer()}</div>;
};

