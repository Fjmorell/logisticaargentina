const YouTubeVideo = ({ videoId }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto h-[500px]">
      <iframe
        className="w-full h-full rounded-md"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        title={`YouTube video ${videoId}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeVideo;