import { useCallback, useEffect, useRef, useState } from "react";

import AnniversaryStory from "./components/AnniversaryStory";
import CinematicIntro from "./components/CinematicIntro";
import HeartGate from "./components/HeartGate";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const songPlayerRef = useRef(null);
  const handleAutoplayBlocked = useCallback(() => setAutoplayBlocked(true), []);
  const handlePlaybackChange = useCallback((playing) => {
    setIsPlaying(playing);
    if (playing) setAutoplayBlocked(false);
  }, []);

  useEffect(() => {
    if (!unlocked) return undefined;

    const story = document.querySelector(".anniversary-story");
    if (!story) return undefined;

    const reducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return undefined;

    const sections = story.querySelectorAll("section");
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const scrollableHeight =
        document.documentElement.scrollHeight - viewportHeight;
      const storyProgress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      story.style.setProperty(
        "--story-progress",
        Math.min(1, Math.max(0, storyProgress))
      );

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > viewportHeight + 100) return;

        const progress = Math.min(
          1,
          Math.max(
            0,
            (viewportHeight - rect.top) / (viewportHeight + rect.height)
          )
        );
        const depth = (progress - 0.5) * 2;
        section.style.setProperty("--section-progress", progress);
        section.style.setProperty(
          "--parallax-slow",
          `${(depth * 48).toFixed(1)}px`
        );
        section.style.setProperty(
          "--parallax-fast",
          `${(depth * 112).toFixed(1)}px`
        );
        section.style.setProperty(
          "--parallax-soft",
          `${(depth * 68).toFixed(1)}px`
        );
        section.style.setProperty(
          "--ring-rotate",
          `${(depth * 24).toFixed(1)}deg`
        );
      });
    };

    const scheduleParallax = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    let observer;
    if ("IntersectionObserver" in window) {
      story.classList.add("scroll-enhanced");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
      );
      story
        .querySelectorAll(".reveal-card")
        .forEach((card) => observer.observe(card));
    }

    scheduleParallax();
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax);
    return () => {
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [unlocked]);

  function unlockStory() {
    setAutoplayBlocked(false);
    setUnlocked(true);
    setShowIntro(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  const handleIntroFinish = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <div className={unlocked ? "experience-unlocked" : "experience-locked"}>
      {!unlocked ? (
        <HeartGate onUnlock={unlockStory} />
      ) : (
        <>
          {showIntro && <CinematicIntro onFinish={handleIntroFinish} />}
          <AnniversaryStory
            audio={{
              isPlaying,
              progress,
              autoPlay: true,
              playerRef: songPlayerRef,
              onAutoplayBlocked: handleAutoplayBlocked,
              onPlaybackChange: handlePlaybackChange,
              onProgressChange: setProgress,
            }}
          />
          {autoplayBlocked && !isPlaying && (
            <button
              type="button"
              className="autoplay-recovery"
              onClick={() => songPlayerRef.current?.play()}
            >
              <span aria-hidden="true">♫</span> Tap to start our song
            </button>
          )}
        </>
      )}
    </div>
  );
}
