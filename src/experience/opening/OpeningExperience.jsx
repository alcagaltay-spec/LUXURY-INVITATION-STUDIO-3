import { useEffect, useRef } from "react";
import "./OpeningExperience.css";

const particles = Array.from({ length: 42 });

const openingAsset = (file) =>
  `${import.meta.env.BASE_URL}images/opening/${file}`;

export default function OpeningExperience({ onComplete }) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio?.play().catch(() => {});

    const timer = setTimeout(() => {
      onComplete();
    }, 18200);

    return () => {
      clearTimeout(timer);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [onComplete]);

  return (
    <section className="cinematic-ring-intro">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/luxury-wedding-ring-intro-18s.wav`}
        preload="auto"
      />

      <div className="scene-black" />
      <div className="scene-atmosphere" />
      <div className="scene-depth-light" />
      <div className="distant-gold-source" />

      <div className="ring-camera">
        <img
          className="ring-glow-layer"
          src={openingAsset("ring-glow.png")}
          alt=""
        />

        <img
          className="ring-image ring-one"
          src={openingAsset("ring-1.png")}
          alt=""
        />

        <img
          className="ring-image ring-two"
          src={openingAsset("ring-2.png")}
          alt=""
        />

        <div className="metal-sweep sweep-one" />
        <div className="metal-sweep sweep-two" />
      </div>

      <div className="particle-field">
        {particles.map((_, index) => (
          <span
            key={index}
            className={`gold-particle particle-${index + 1}`}
          />
        ))}
      </div>

      <div className="cinematic-vignette" />

      <img
        className="hero-transition-light"
        src={openingAsset("transition-light.png")}
        alt=""
      />
    </section>
  );
}
