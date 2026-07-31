import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Bounds } from "@react-three/drei";
import Model from "../components/Model.jsx";
import projects from "../data/projects.json";

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="project-page">
        <button className="project-page__back" onClick={() => navigate("/")}>
          ← Torna alla selezione
        </button>
        <p className="project-page__missing">Progetto non trovato.</p>
      </div>
    );
  }

  return (
    <div className="project-page">
      <button className="project-page__back" onClick={() => navigate("/")}>
        ← Torna alla selezione
      </button>

      <div className="project-page__model">
        <Canvas camera={{ position: [0, 0.6, 3.2], fov: 45 }}>
          <color attach="background" args={["#000"]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 4]} intensity={1.2} />
          <Suspense fallback={null}>
            <Bounds fit clip observe margin={1.4}>
              <Model url={project.model} spinSpeed={0.3} />
            </Bounds>
            <Environment preset="city" />
          </Suspense>
          <OrbitControls makeDefault enablePan={false} minDistance={1} maxDistance={8} />
        </Canvas>
      </div>

      <div className="project-page__info">
        <h2 className="project-page__name">{project.name.toUpperCase()}</h2>
        {project.description && (
          <p className="project-page__description">{project.description}</p>
        )}
        {project.url && (
          <a
            className="project-page__link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visita il progetto ↗
          </a>
        )}
      </div>
    </div>
  );
}
