import { Code2, Palette, Zap } from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, semantic HTML and modern JavaScript",
    },
    {
      icon: Palette,
      title: "Visual Design",
      description: "Crafting beautiful interfaces with CSS and modern frameworks",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Building fast, responsive applications with React and optimization",
    },
  ];

  const technologies = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js",
    "Tailwind CSS", "GSAP", "Framer Motion", "Git", "Responsive Design", "Accessibility"
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="absolute inset-0 gradient-nebula-radial opacity-20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About the <span className="gradient-text">Nexus</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A frontend developer passionate about creating immersive digital experiences
            that push the boundaries of web technology
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 hover:glow-effect transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl gradient-nebula flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <skill.icon className="w-7 h-7 text-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-heading font-semibold mb-6 text-center">
            Tech <span className="gradient-text">Constellation</span>
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium hover:bg-accent/20 hover:scale-105 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
