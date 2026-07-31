import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds } from "@react-three/drei";
import { EffectComposer } from "@react-three/postprocessing";
import Model from "./Model.jsx";
import Dither from "../effects/Dither.jsx";

export default function ProjectCard({ project, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={() => onSelect(project)}
    >
      <div className="project-card__thumb">
        <Canvas camera={{ position: [0, 0.6, 3.2], fov: 45 }}>
          <color attach="background" args={["#111111"]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 4]} intensity={1.1} />
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.6}>
              <Model url={project.model} spinSpeed={0.3} />
            </Bounds>
          </Suspense>
          {!hovered && (
            <EffectComposer>
              <Dither />
            </EffectComposer>
          )}
        </Canvas>
      </div>
      <div className="project-card__body">
        <span className="project-card__name">{project.name.toUpperCase()}</span>
      </div>
    </button>
  );
}
