import { useEffect, useState } from "react";

const scenes = [
  "For the girl who changed everything…",
  "For every quiet moment that became a memory…",
  "For four beautiful years of us…",
  "Love, this is our little movie.",
];

export default function CinematicIntro({ onFinish }) {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    if (scene === scenes.length - 1) {
      const finalTimer = window.setTimeout(onFinish, 1900);
      return () => window.clearTimeout(finalTimer);
    }

    const timer = window.setTimeout(
      () => setScene((current) => current + 1),
      4000
    );
    return () => window.clearTimeout(timer);
  }, [scene, onFinish]);

  return (
    <div className="cinematic-intro" role="status" aria-live="polite">
      <div className="cinema-grain" aria-hidden="true" />
      <div className="cinema-line cinema-line-top" aria-hidden="true" />
      <p key={scene}>{scenes[scene]}</p>
      <span>
        {String(scene + 1).padStart(2, "0")} /{" "}
        {String(scenes.length).padStart(2, "0")}
      </span>
      <div className="cinema-line cinema-line-bottom" aria-hidden="true" />
    </div>
  );
}
