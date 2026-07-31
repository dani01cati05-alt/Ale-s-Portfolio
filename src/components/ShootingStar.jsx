import { useEffect, useRef } from "react";
import starImg from "../assets/stella.png";

const LIFE_RANGE = [2000, 7000];
const FADE_FRACTION = 0.3;

function randomBetween([min, max]) {
  return min + Math.random() * (max - min);
}

function smoothstep(x) {
  const c = Math.min(1, Math.max(0, x));
  return c * c * (3 - 2 * c);
}

function randomSpawn() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // spawn anywhere across a region well beyond the viewport in every
  // direction, so births/deaths can land on-screen or off-screen alike
  const marginX = vw * 0.6;
  const marginY = vh * 0.6;

  return {
    x0: -marginX + Math.random() * (vw + marginX * 2),
    y0: -marginY + Math.random() * (vh + marginY * 2),
    travel: 200 + Math.random() * 800,
  };
}

export default function ShootingStar({ size }) {
  const imgRef = useRef(null);

  useEffect(() => {
    let frame;
    let segment = { ...randomSpawn(), duration: randomBetween(LIFE_RANGE), start: performance.now() };

    const tick = (now) => {
      let { x0, y0, travel, duration, start } = segment;
      let t = (now - start) / duration;

      if (t >= 1) {
        segment = { ...randomSpawn(), duration: randomBetween(LIFE_RANGE), start: now };
        ({ x0, y0, travel, duration, start } = segment);
        t = 0;
      }

      const x = x0 + t * travel;
      const y = y0 + t * travel;
      const fadeIn = smoothstep(t / FADE_FRACTION);
      const fadeOut = smoothstep((1 - t) / FADE_FRACTION);
      const reveal = Math.min(fadeIn, fadeOut);

      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${x}px, ${y}px)`;
        // reveal the glow from the center outward on birth, and retract it
        // back into the center on death, like a real star igniting/fading
        const radius = reveal * size * 0.75;
        const feather = radius + size * 0.15;
        const mask = `radial-gradient(circle, #000 ${radius}px, transparent ${feather}px)`;
        imgRef.current.style.maskImage = mask;
        imgRef.current.style.webkitMaskImage = mask;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [size]);

  return (
    <img
      ref={imgRef}
      src={starImg}
      alt=""
      className="shooting-star"
      style={{ width: size, height: size }}
    />
  );
}
