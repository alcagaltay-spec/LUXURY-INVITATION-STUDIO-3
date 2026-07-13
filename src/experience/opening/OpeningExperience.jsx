import { useEffect } from "react";
import "./OpeningExperience.css";

const openingAsset = (file) =>
  `${import.meta.env.BASE_URL}images/opening/${file}`;

function playRingChime() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const gain = context.createGain();
  gain.connect(context.destination);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.17, context.currentTime + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 1.25);

  [1174.66, 1760, 2349.32].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = index * 4;
    oscillator.connect(gain);
    oscillator.start(context.currentTime + index * 0.035);
    oscillator.stop(context.currentTime + 1.3);
  });

  window.setTimeout(() => context.close(), 1500);
}

export default function OpeningExperience({ onComplete }) {
  useEffect(() => {
    const chimeTimer = window.setTimeout(playRingChime, 4200);
    const completeTimer = window.setTimeout(onComplete, 7000);

    return () => {
      window.clearTimeout(chimeTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <section className="couple-opening" aria-label="Ahmet ve Elif düğün davetiyesi">
      <div className="opening-ambient" />
      <div className="opening-stars" />

      <div className="couple-stage">
        <img
          className="opening-person opening-groom"
          src={openingAsset("damat.png")}
          alt="Damat"
        />
        <img
          className="opening-person opening-bride"
          src={openingAsset("gelin.png")}
          alt="Gelin"
        />

        <div className="hand-glow" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="invitation-transition" />
      <div className="opening-vignette" />
    </section>
  );
}
