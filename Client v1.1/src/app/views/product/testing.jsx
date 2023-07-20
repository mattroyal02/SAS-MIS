import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const Testing = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoPlayer = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      loop: true,
      fluid: true,
      sources: [
        {
          src: "https://jxewrnrtcopnlvpihgfq.supabase.co/storage/v1/object/public/daniel&Gina/Black%20and%20Orange%20Modern%20Please%20Wait%20YouTube%20Intro.mp4", // Replace with the relative path to your first video file
          type: "video/mp4",
        },
        {
          src: "https://jxewrnrtcopnlvpihgfq.supabase.co/storage/v1/object/public/daniel&Gina/Black%20and%20Orange%20Modern%20Please%20Wait%20YouTube%20Intro.mp4", // Replace with the relative path to your second video file
          type: "video/mp4",
        },
        // Add more video sources if you have additional videos in the "videos" folder.
      ],
    });

    return () => {
      videoPlayer.dispose();
    };
  }, []);

  return (
    <div className="App">
      <video ref={videoRef} className="video-js vjs-default-skin" />
    </div>
  );
};

export default Testing;
