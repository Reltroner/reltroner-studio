export default function YouTubeEmbed({ videoId, title = "YouTube video" }) {
    return (
      <div className="w-full aspect-video max-w-3xl mx-auto my-6">
        <iframe
          className="w-full h-full rounded-lg shadow-md"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  