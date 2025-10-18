import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Cosmic Dashboard",
      description: "A real-time analytics dashboard with dynamic data visualization and gradient UI elements",
      tags: ["React", "Chart.js", "Tailwind"],
      gradient: "from-primary to-secondary",
    },
    {
      title: "Nebula Commerce",
      description: "E-commerce platform with smooth animations and interactive product galleries",
      tags: ["Next.js", "Framer Motion", "TypeScript"],
      gradient: "from-secondary to-accent",
    },
    {
      title: "Stellar Docs",
      description: "Documentation site with search, syntax highlighting, and responsive design",
      tags: ["React", "MDX", "CSS Grid"],
      gradient: "from-accent to-lavender",
    },
    {
      title: "Aurora UI Kit",
      description: "Component library with gradient-themed, accessible UI components",
      tags: ["React", "Storybook", "Accessibility"],
      gradient: "from-primary to-accent",
    },
    {
      title: "Void Portfolio",
      description: "3D portfolio website with Three.js integration and scroll-based animations",
      tags: ["Three.js", "GSAP", "WebGL"],
      gradient: "from-secondary to-primary",
    },
    {
      title: "Quantum Blog",
      description: "Modern blog platform with markdown support and gradient typography",
      tags: ["Next.js", "MDX", "Vercel"],
      gradient: "from-accent to-secondary",
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="absolute inset-0 gradient-nebula opacity-10 animate-gradient"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of cosmic creations showcasing modern web development techniques
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass-effect border-accent/20 overflow-hidden group hover:glow-effect transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold mb-2 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 rounded-full bg-accent/10 border border-accent/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-accent/50 hover:bg-accent/10"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-accent/50 hover:bg-accent/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
