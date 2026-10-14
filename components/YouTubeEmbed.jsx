import VideoEmbed from "@/components/media/VideoEmbed";

export default function YouTubeEmbed({ videoId, title = "YouTube video" }) {
  if (!/^[A-Za-z0-9_-]{11}$/.test(String(videoId))) return <p>Video unavailable.</p>;
  return <VideoEmbed src={`https://www.youtube-nocookie.com/embed/${videoId}`} title={title} provider="youtube" />;
}
