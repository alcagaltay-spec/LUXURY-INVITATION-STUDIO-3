import { useEffect, useRef } from "react";
import "./OpeningExperience.css";

const particles = Array.from({ length: 42 });

export default function OpeningExperience({ onComplete }) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current?.play().catch(() => {});

    const timer = setTimeout(() => {
      onComplete();
    }, 20000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <section className="cinematic-ring-intro">
      <audio ref={audioRef} src="/music/intro.mp3" preload="auto" />

      <div className="scene-black" />
      <div className="scene-atmosphere" />
      <div className="scene-depth-light" />

      <div className="distant-gold-source" />

      <div className="ring-camera">
        <img
          className="ring-glow-layer"
          src="/images/opening/ring-glow.png"
          alt=""
        />

        <img
          className="ring-image ring-one"
          src="/images/opening/ring-1.png"
          alt=""
        />

        <img
          className="ring-image ring-two"
          src="/images/opening/ring-2.png"
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
        src="/images/opening/transition-light.png"
        alt=""
      />
    </section>
  );
}