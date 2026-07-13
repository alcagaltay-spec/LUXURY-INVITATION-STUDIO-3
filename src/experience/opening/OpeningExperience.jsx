import { useEffect } from "react";
import "./OpeningExperience.css";

const DURATION = 12000;
const GOLD = [226, 184, 95];

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const ease = (value) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

function createJourneySound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return () => {};

  const context = new AudioContext();
  const master = context.createGain();
  const warmth = context.createBiquadFilter();
  const shimmer = context.createDelay(1);
  const shimmerGain = context.createGain();
  const now = context.currentTime;

  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.045, now + 1.15);
  master.gain.exponentialRampToValueAtTime(0.082, now + 8.6);
  master.gain.exponentialRampToValueAtTime(0.0001, now + 12);

  warmth.type = "lowpass";
  warmth.frequency.setValueAtTime(680, now);
  warmth.frequency.exponentialRampToValueAtTime(3200, now + 5.9);
  shimmer.delayTime.value = 0.31;
  shimmerGain.gain.value = 0.18;
  warmth.connect(master);
  warmth.connect(shimmer);
  shimmer.connect(shimmerGain);
  shimmerGain.connect(master);
  master.connect(context.destination);

  // Warm, nearly silent bed written for the seven-second light movement.
  [146.83, 220].forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const voice = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    oscillator.detune.value = index === 0 ? -4 : 5;
    voice.gain.setValueAtTime(0.0001, now);
    voice.gain.exponentialRampToValueAtTime(index === 0 ? 0.28 : 0.11, now + 1.4);
    voice.gain.exponentialRampToValueAtTime(0.0001, now + 11.75);
    oscillator.connect(voice);
    voice.connect(warmth);
    oscillator.start(now);
    oscillator.stop(now + 12.05);
  });

  // Sparse glass notes follow the two loops of the infinity symbol.
  const notes = [
    [0.48, 587.33, 0.05],
    [1.35, 739.99, 0.065],
    [2.18, 880, 0.07],
    [3.04, 739.99, 0.06],
    [3.86, 987.77, 0.075],
    [4.7, 1174.66, 0.085],
    [5.42, 1174.66, 0.08],
    [6.3, 1318.51, 0.085],
    [7.25, 1479.98, 0.09],
    [8.35, 1760, 0.1],
    [9.4, 1479.98, 0.075],
    [10.35, 1174.66, 0.065],
  ];

  notes.forEach(([offset, frequency, volume]) => {
    const tone = context.createOscillator();
    const overtone = context.createOscillator();
    const noteGain = context.createGain();
    const noteStart = now + offset;
    tone.type = "sine";
    overtone.type = "sine";
    tone.frequency.value = frequency;
    overtone.frequency.value = frequency * 2.01;
    noteGain.gain.setValueAtTime(0.0001, noteStart);
    noteGain.gain.exponentialRampToValueAtTime(volume, noteStart + 0.025);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.85);
    tone.connect(noteGain);
    overtone.connect(noteGain);
    noteGain.connect(master);
    tone.start(noteStart);
    overtone.start(noteStart);
    tone.stop(noteStart + 0.9);
    overtone.stop(noteStart + 0.9);
  });

  // A soft resolving chord carries the viewer into the invitation.
  [293.66, 440, 587.33, 739.99].forEach((frequency, index) => {
    const tone = context.createOscillator();
    const chordGain = context.createGain();
    const chordStart = now + 10.35 + index * 0.045;
    tone.type = "sine";
    tone.frequency.value = frequency;
    chordGain.gain.setValueAtTime(0.0001, chordStart);
    chordGain.gain.exponentialRampToValueAtTime(0.032 - index * 0.004, chordStart + 0.18);
    chordGain.gain.exponentialRampToValueAtTime(0.0001, now + 11.95);
    tone.connect(chordGain);
    chordGain.connect(master);
    tone.start(chordStart);
    tone.stop(now + 12);
  });

  return () => {
    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setTargetAtTime(0.0001, context.currentTime, 0.02);
    window.setTimeout(() => context.close(), 160);
  };
}

function seeded(index, salt = 0) {
  const value = Math.sin(index * 9283.31 + salt * 77.17) * 43758.5453;
  return value - Math.floor(value);
}

function journeyPoint(time, width, height) {
  const portraitWidth = Math.min(width, height * 0.5625);
  const progress = ease((time - 1) / 4.25);
  const angle = progress * Math.PI * 2;
  const horizontalRadius = portraitWidth * 0.34;
  const verticalRadius = portraitWidth * 0.18;

  return {
    x: width * 0.5 + Math.sin(angle) * horizontalRadius,
    y: height * 0.48 + Math.sin(angle) * Math.cos(angle) * verticalRadius,
    scale: 1,
  };
}

function drawGlow(context, x, y, radius, alpha = 1) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `rgba(255, 250, 226, ${alpha})`);
  gradient.addColorStop(0.12, `rgba(245, 211, 133, ${alpha * 0.95})`);
  gradient.addColorStop(0.42, `rgba(${GOLD.join(",")}, ${alpha * 0.25})`);
  gradient.addColorStop(1, "rgba(226, 184, 95, 0)");
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function renderFrame(context, width, height, time) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#000";
  context.fillRect(0, 0, width, height);

  const birth = ease((time - 0.38) / 0.5);
  if (birth <= 0) return;

  const current = journeyPoint(time, width, height);
  const drawProgress = ease((time - 1) / 4.25);
  const symbolFade = 1 - ease((time - 5.72) / 0.58);
  const portraitWidth = Math.min(width, height * 0.5625);

  context.save();
  context.globalCompositeOperation = "lighter";
  context.lineCap = "round";
  context.lineJoin = "round";

  if (drawProgress > 0) {
    const samples = Math.max(2, Math.floor(drawProgress * 180));
    const drawSymbol = (lineWidth, opacity, blur) => {
      context.beginPath();
      for (let index = 0; index <= samples; index += 1) {
        const progress = index / 180;
        const angle = progress * Math.PI * 2;
        const x = width * 0.5 + Math.sin(angle) * portraitWidth * 0.34;
        const y = height * 0.48 + Math.sin(angle) * Math.cos(angle) * portraitWidth * 0.18;
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = `rgba(${GOLD.join(",")}, ${opacity * symbolFade})`;
      context.lineWidth = lineWidth;
      context.shadowColor = "rgba(226, 184, 95, .75)";
      context.shadowBlur = blur;
      context.stroke();
    };

    drawSymbol(5, 0.08, 22);
    drawSymbol(1.25, 0.88, 7);
    drawSymbol(0.45, 0.95, 2);
  }

  const particleCount = 14;
  for (let index = 0; index < particleCount; index += 1) {
    const delay = seeded(index, 1) * 0.7;
    const age = clamp(time - 1 - delay, 0, 4.5);
    const sampleTime = Math.max(1, time - seeded(index, 2) * 0.42);
    const point = journeyPoint(sampleTime, width, height);
    const drift = age * (2 + seeded(index, 3) * 5);
    const opacity = symbolFade * (0.08 + seeded(index, 4) * 0.22) * drawProgress;
    context.fillStyle = `rgba(238, 204, 132, ${opacity})`;
    context.shadowBlur = 3;
    context.beginPath();
    context.arc(
      point.x + (seeded(index, 5) - 0.5) * drift,
      point.y + (seeded(index, 6) - 0.5) * drift,
      0.35 + seeded(index, 7) * 0.7,
      0,
      Math.PI * 2,
    );
    context.fill();
  }

  const pulse = 0.94 + Math.sin(time * 7) * 0.06;
  drawGlow(context, current.x, current.y, 13 * pulse, birth * symbolFade);
  drawGlow(context, current.x, current.y, 2.6, birth * symbolFade);

  if (time >= 5.25) {
    const gather = ease((time - 5.25) / 1.05);
    drawGlow(context, width * 0.5, height * 0.48, portraitWidth * (0.035 + gather * 0.13), gather * 0.72);
  }

  if (time >= 6.3) {
    const push = ease((time - 6.3) / 0.7);
    drawGlow(context, width * 0.5, height * 0.48, Math.max(width, height) * (0.12 + push * 1.15), push);
  }

  context.restore();
}

export default function OpeningExperience({ onComplete }) {
  useEffect(() => {
    const stopSound = createJourneySound();
    const completeTimer = window.setTimeout(onComplete, DURATION);

    return () => {
      window.clearTimeout(completeTimer);
      stopSound();
    };
  }, [onComplete]);

  return (
    <section className="journey-opening" aria-label="Altın A ve E monogramı">
      <div className="monogram-ambient" />
      <svg className="gold-monogram" viewBox="0 0 768 512" aria-hidden="true">
        <defs>
          <filter id="gold-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="champagne-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f8e8bd" />
            <stop offset="0.48" stopColor="#dcae52" />
            <stop offset="1" stopColor="#fff5d8" />
          </linearGradient>
        </defs>

        <g className="letter-glow" filter="url(#gold-soft-glow)">
          <path
            className="monogram-letter letter-a"
            pathLength="1"
            d="M62 382 C90 414 151 370 207 305 C251 255 295 188 326 137 C336 121 342 117 339 135 C327 194 300 283 278 365 C268 404 258 394 260 365"
          />
          <path
            className="monogram-letter letter-a-cross"
            pathLength="1"
            d="M62 382 C87 324 151 289 215 278 C275 267 337 287 386 262"
          />
          <path
            className="monogram-letter letter-ampersand"
            pathLength="1"
            d="M432 332 C418 309 389 285 389 254 C389 231 416 220 429 236 C444 254 425 278 402 294 C381 309 375 334 393 346 C416 361 445 339 451 310"
          />
          <path
            className="monogram-letter letter-ampersand-cross"
            pathLength="1"
            d="M381 278 C402 291 428 300 456 292"
          />
          <path
            className="monogram-letter letter-e"
            pathLength="1"
            d="M611 186 C652 145 648 128 618 139 C569 156 515 190 526 216 C535 237 565 234 588 227 C529 250 479 293 459 337 C439 380 459 405 503 399 C566 391 632 344 690 318 C703 312 709 313 695 316"
          />
        </g>

        <circle className="drawing-light light-a" cx="0" cy="0" r="4" />
        <circle className="drawing-light light-a-cross" cx="0" cy="0" r="3" />
        <circle className="drawing-light light-ampersand" cx="0" cy="0" r="3" />
        <circle className="drawing-light light-ampersand-cross" cx="0" cy="0" r="2.5" />
        <circle className="drawing-light light-e" cx="0" cy="0" r="4" />
        <circle className="monogram-core" cx="384" cy="256" r="8" />
      </svg>

      <div className="story-signature">
        <span>
          <b><em>B</em>ir <em>H</em>ikâye</b>
          <b><em>B</em>aşlıyor</b>
        </span>
        <i />
      </div>

      <div className="gold-dust" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => <i key={index} />)}
      </div>
      <div className="journey-depth" />
      <div className="journey-transition" />
    </section>
  );
}
