// projects.tsx (OPTIMIZED FOR PERFORMANCE)

import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Grid3X3, List, LayoutGrid } from "lucide-react";
import { ThreeDCarousel } from "@/components/ThreeDCarousel";
import { Badge } from "@/components/ui/badge";
import GlareHover from "@/components/GlareHover";

// Project type definition
interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  link: string;
  demo: string;
  image: string;
}

type ProjectViewMode = "CAROUSEL" | "GRID" | "LIST";

// Project Details Card - PERFORMANCE OPTIMIZED
const ProjectDetailsCard: React.FC<{ project: Project }> = ({ project }) => (
  <GlareHover
    width="100%"
    height="auto"
    background="transparent"
    borderRadius="12px"
    borderColor="transparent"
    glareColor="#ffffff"
    glareOpacity={0.15} // Reduced opacity for faster rendering
    glareSize={150}    // Reduced size to minimize pixel calculation
    transitionDuration={400}
    className="block h-full"
  >
    <Card className="glass-effect border-accent/20 overflow-hidden transition-all duration-300 h-full flex flex-col backdrop-blur-sm will-change-transform">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover"
          loading="lazy" // Added lazy loading for images
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-heading font-bold mb-2 gradient-text">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 text-sm flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tags.map((tag, tagIndex) => (
            <Badge
              key={tagIndex}
              className="text-xs px-2 py-0.5 bg-primary-foreground/10 border border-primary-foreground/30 font-medium text-primary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 mt-auto">
          <Button
            size="sm"
            className="flex-1 bg-accent hover:bg-accent/80 text-primary-foreground"
            onClick={() => window.open(project.demo, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Demo
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-accent/50 hover:bg-accent/20"
            onClick={() => window.open(project.link, "_blank")}
          >
            <Github className="w-4 h-4 mr-2" />
            Code
          </Button>
        </div>
      </div>
    </Card>
  </GlareHover>
);

// Project List Item - PERFORMANCE OPTIMIZED
const ProjectListItem: React.FC<{ project: Project }> = ({ project }) => (
  <Card className="glass-effect border-accent/20 p-4 flex flex-col sm:flex-row gap-4 items-center transition-all duration-200 bg-background/50 backdrop-blur-md will-change-transform">
    <div className="w-full sm:w-40 h-24 overflow-hidden rounded-lg flex-shrink-0 border border-accent/30">
      <img
        src={project.image}
        alt={`${project.title} thumbnail`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>

    <div className="sm:w-3/5 w-full">
      <h3 className="text-xl font-heading font-bold mb-1">
        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="gradient-text hover:underline">
          {project.title}
        </a>
      </h3>
      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag, tagIndex) => (
          <Badge key={tagIndex} className="text-xs bg-accent/20 border border-accent/50 text-accent-foreground">
            {tag}
          </Badge>
        ))}
      </div>
    </div>

    <div className="sm:w-1/5 w-full flex flex-row sm:flex-col gap-2 justify-end sm:items-end">
      <Button size="sm" className="w-1/2 sm:w-auto bg-primary" onClick={() => window.open(project.demo, "_blank")}>
        <ExternalLink className="w-3 h-3 mr-2" />
        Demo
      </Button>
      <Button size="sm" variant="outline" className="w-1/2 sm:w-auto" onClick={() => window.open(project.link, "_blank")}>
        <Github className="w-3 h-3 mr-2" />
        Code
      </Button>
    </div>
  </Card>
);

const ProjectGridView: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {projects.map((project, index) => (
      <ProjectDetailsCard key={index} project={project} />
    ))}
  </div>
);

const ProjectListView: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <div className="flex flex-col gap-4">
    {projects.map((project, index) => (
      <ProjectListItem key={index} project={project} />
    ))}
  </div>
);

const allProjects: Project[] = [
  {
    title: "Triivya – E-Commerce Clothing Platform",
    description: "Developed a fully functional paid e-commerce site with secure authentication, product filters, cart, and payment flow.",
    tags: ["Next.js", "MongoDB", "Express.js", "Tailwind CSS"],
    gradient: "from-primary to-secondary",
    link: "https://github.com/your-repo-triivya",
    demo: "https://triivya.com",
    image: "/triivya.png",
  },
  {
    title: "CodeChisel – Coding Education Platform",
    description: "Built an interactive coding platform with real-time code execution and student progress tracking.",
    tags: ["React.js", "Tailwind CSS", "Node.js"],
    gradient: "from-secondary to-accent",
    link: "https://github.com/your-repo-codechisel",
    demo: "https://codin-learning.netlify.app",
    image: "/codechisel.png",
  },
  {
    title: "Ideolyze – Idea Refinement Tool",
    description: "Created a platform to help users visualize and refine startup ideas with a user-friendly interface.",
    tags: ["React.js", "Frontend"],
    gradient: "from-accent to-lavender",
    link: "https://github.com/your-repo-ideolyze",
    demo: "https://ideolyze.netlify.app",
    image: "/ideolyze.png",
  },
  {
    title: "Multi-Category Content Website",
    description: "Developed a modular blog-style site covering recipes, cocktails, and general topics.",
    tags: ["React.js", "API Integration"],
    gradient: "from-primary to-accent",
    link: "https://github.com/your-repo-multicat",
    demo: "https://multi-category.netlify.app",
    image: "/multi.png",
  },
];

const Projects = () => {
  const [viewMode, setViewMode] = useState<ProjectViewMode>("CAROUSEL");

  // Memoize data to prevent unnecessary re-renders during mode switch
  const memoizedProjects = useMemo(() => allProjects, []);

  return (
    <section id="projects" className="py-24 px-4 relative min-h-screen flex items-center">
      <div className="absolute inset-0 gradient-nebula opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose your preferred way to explore my creations.
          </p>
        </div>

        {/* View Selector Buttons */}
        <div className="flex justify-center gap-2 p-2 rounded-full bg-accent/10 border border-accent/30 mb-12 max-w-fit mx-auto shadow-xl backdrop-blur-sm">
          {(["CAROUSEL", "GRID", "LIST"] as ProjectViewMode[]).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "ghost"}
              onClick={() => setViewMode(mode)}
              className={viewMode === mode ? "bg-accent text-background" : "text-muted-foreground"}
              size="sm"
            >
              {mode === "CAROUSEL" && <LayoutGrid className="w-4 h-4" />}
              {mode === "GRID" && <Grid3X3 className="w-4 h-4" />}
              {mode === "LIST" && <List className="w-4 h-4" />}
              <span className="ml-2 hidden sm:inline">{mode.charAt(0) + mode.slice(1).toLowerCase()}</span>
            </Button>
          ))}
        </div>

        <div className="mt-8">
          {viewMode === "CAROUSEL" && <ThreeDCarousel projects={memoizedProjects} autoRotate={false} />}
          {viewMode === "GRID" && <ProjectGridView projects={memoizedProjects} />}
          {viewMode === "LIST" && <ProjectListView projects={memoizedProjects} />}
        </div>
      </div>
    </section>
  );
};

export default Projects;