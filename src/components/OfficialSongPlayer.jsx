import { useEffect, useImperativeHandle, useRef, useState } from "react";

const VIDEO_ID = "dCWMpvzMM1Y";
const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;

let youtubeApiPromise;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve, reject) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve(window.YT);
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      youtubeApiPromise = undefined;
      reject(new Error("YouTube player could not load"));
    };
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

export default function OfficialSongPlayer({ autoPlay = false, controlRef, onAutoplayBlocked, onPlaybackChange, onProgressChange }) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const [status, setStatus] = useState("loading");

  useImperativeHandle(controlRef, () => ({
    play: () => playerRef.current?.playVideo(),
  }), []);

  useEffect(() => {
    const host = hostRef.current;
    let active = true;
    let player;
    let progressTimer;
    const loadTimer = window.setTimeout(() => {
      if (active) setStatus("unavailable");
    }, 10000);

    const updateProgress = () => {
      if (!player || !active) return;
      const duration = player.getDuration?.();
      const currentTime = player.getCurrentTime?.();
      if (Number.isFinite(duration) && duration > 0 && Number.isFinite(currentTime)) {
        onProgressChange(Math.min(1, Math.max(0, currentTime / duration)));
      }
    };

    loadYouTubeApi().then((YT) => {
      if (!active || !host) return;

      const target = document.createElement("div");
      host.appendChild(target);
      player = new YT.Player(target, {
        width: "100%",
        height: "100%",
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (!active) return;
            window.clearTimeout(loadTimer);
            setStatus("ready");
            if (autoPlay) player.playVideo();
          },
          onStateChange: (event) => {
            if (!active) return;
            window.clearInterval(progressTimer);
            updateProgress();
            if (event.data === YT.PlayerState.PLAYING) {
              onPlaybackChange(true);
              progressTimer = window.setInterval(updateProgress, 500);
            } else {
              onPlaybackChange(false);
              if (event.data === YT.PlayerState.ENDED) onProgressChange(1);
            }
          },
          onError: () => {
            if (!active) return;
            window.clearTimeout(loadTimer);
            window.clearInterval(progressTimer);
            onPlaybackChange(false);
            setStatus("unavailable");
          },
          onAutoplayBlocked: () => {
            if (active) onAutoplayBlocked?.();
          },
        },
      });
      playerRef.current = player;
    }).catch(() => {
      if (!active) return;
      window.clearTimeout(loadTimer);
      setStatus("unavailable");
    });

    return () => {
      active = false;
      window.clearInterval(progressTimer);
      window.clearTimeout(loadTimer);
      player?.destroy();
      playerRef.current = null;
      host?.replaceChildren();
    };
  }, [autoPlay, onAutoplayBlocked, onPlaybackChange, onProgressChange]);

  return (
    <section className="soundtrack-section story-section" id="soundtrack" aria-labelledby="soundtrack-title">
      <div className="soundtrack-copy reveal-card">
        <p className="section-label">The song that feels like us</p>
        <h2 id="soundtrack-title">Our song, <em>Love.</em></h2>
        <p>“Palagi” starts with our story when your browser allows it. If it stays quiet, tap the player to hear TJ Monterde and KZ Tandingan’s official duet while you read the letter and explore our memories.</p>
      </div>
      <div className="official-video-card reveal-card">
        <div className="official-video-frame" ref={hostRef} aria-label="Official Palagi TJxKZ audio player by TJ Monterde and KZ Tandingan" />
        <div className="official-video-caption">
          <div>
            <span>Official audio · YouTube</span>
            <strong>Palagi (TJxKZ Version) — TJ Monterde &amp; KZ Tandingan</strong>
          </div>
          <a href={VIDEO_URL} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
        </div>
        {status === "loading" && <p className="video-status" role="status">Loading the official player…</p>}
        {status === "unavailable" && <p className="video-status" role="status">The player is unavailable here. Use the YouTube link above to listen.</p>}
      </div>
    </section>
  );
}
