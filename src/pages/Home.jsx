import { useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import projects from "../data/projects.json";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <h1 className="app__title">SELECT PROJECT</h1>
      <div className="grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(p) => navigate(`/project/${p.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
