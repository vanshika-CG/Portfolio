import { Code2, Palette, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Orb from "../Orb";

const TechStack = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const techDescriptions = {
    "HTML5": "Modern web structure and semantics",
    "CSS3": "Advanced styling and animations",
    "JavaScript": "Dynamic client-side scripting",
    "React.js": "Component-based UI framework",
    "Tailwind CSS": "Utility-first CSS framework",
    "Next.js": "React framework for SSR and SSG",
    "Node.js": "Server-side JavaScript runtime",
    "Express.js": "Web framework for Node.js",
    "MongoDB": "NoSQL document database",
    "REST APIs": "Standardized API architecture",
    "Microsoft Azure (Certified)": "Cloud computing platform",
    "Netlify": "Modern web deployment platform",
    "Git": "Version control system"
  };

  const allTechs = {
    "Languages & Frontend": ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Next.js"],
    "Backend & Databases": ["Node.js", "Express.js", "MongoDB", "REST APIs"],
    "Cloud & DevOps": ["Microsoft Azure (Certified)", "Netlify", "Git"]
  };

  const categoryIcons = {
    "Languages & Frontend": <Code2 className="w-6 h-6 text-accent" />,
    "Backend & Databases": <Zap className="w-6 h-6 text-accent" />,
    "Cloud & DevOps": <Palette className="w-6 h-6 text-accent" />
  };

  const techIcons: Record<string, JSX.Element> = {
    "HTML5": (
      <svg className="w-5 h-5 text-[#E34F26]" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#E44D26" d="M19 4l9 101 36 11 36-11 9-101H19z"/><path fill="#F16529" d="M64 116v-10l29-8 8-89H64v107z"/><path fill="#EBEBEB" d="M64 66H44l-2-22h22V26H36l1 21h27v19z"/><path fill="#fff" d="M64 99v-10l24-7 1-12H64v-9h36l-1 13-6 61-29 8z"/>
      </svg>
    ),
    "CSS3": (
      <svg className="w-5 h-5 text-[#1572B6]" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#1572B6" d="M19 4l9 101 36 11 36-11 9-101H19z"/><path fill="#33A9DC" d="M64 116v-10l29-8 8-89H64v107z"/><path fill="#fff" d="M64 66H44l-2-22h22V26H36l1 21h27v19z"/>
      </svg>
    ),
    "JavaScript": (
      <svg className="w-5 h-5 text-[#F7DF1E]" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="8" fill="#F7DF1E"/><path d="M54 88l6 4c2 3 4 6 8 6 4 0 6-2 6-6V60h12v30c0 12-8 18-20 18-12 0-20-6-24-12l8-8zM86 60h12v30c0 12-8 18-20 18-12 0-20-6-24-12l8-8c2 3 4 6 8 6 4 0 6-2 6-6V60z" fill="#000"/>
      </svg>
    ),
    "React.js": (
      <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <circle cx="64" cy="64" r="11" fill="#61DAFB"/><ellipse rx="35" ry="12" transform="translate(64 64)" stroke="#61DAFB" strokeWidth="4" fill="none"/><ellipse rx="35" ry="12" transform="translate(64 64) rotate(60)" stroke="#61DAFB" strokeWidth="4" fill="none"/><ellipse rx="35" ry="12" transform="translate(64 64) rotate(120)" stroke="#61DAFB" strokeWidth="4" fill="none"/>
      </svg>
    ),
    "Tailwind CSS": (
        <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12 6.5c-3.5 0-5.5 1.5-6 4.5 1.5-1.5 3-2 4.5-1.5 1.1.35 1.9 1.2 2.7 2.1.8.9 1.6 1.9 3.3 1.9 3.5 0 5.5-1.5 6-4.5-1.5 1.5-3 2-4.5 1.5-1.1-.35-1.9-1.2-2.7-2.1-.8-.9-1.6-1.9-3.3-1.9zM6 12.5c-3.5 0-5.5 1.5-6 4.5 1.5-1.5 3-2 4.5-1.5 1.1.35 1.9 1.2 2.7 2.1.8.9 1.6 1.9 3.3 1.9 3.5 0 5.5-1.5 6-4.5-1.5 1.5-3 2-4.5 1.5-1.1-.35-1.9-1.2-2.7-2.1-.8-.9-1.6-1.9-3.3-1.9z"/></svg>
    ),
    "Next.js": (
        <svg className="w-5 h-5 text-current" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.5 55.4V96h-8.2V32h8.2l53.4 66.4c5.1-9.5 8.1-20.4 8.1-32 0-35.3-28.7-64-64-64zM95.3 40.3L96 41.2V96h-8.2V48.5l-2.5-3.1 10-5.1z"/></svg>
    ),
    "Node.js": (
      <svg className="w-5 h-5 text-[#83CD29]" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#3C873A" d="M64 6L12 36v56l52 30 52-30V36L64 6z"/><path fill="#83CD29" d="M64 14v100l44-25V39L64 14z"/>
      </svg>
    ),
    "Express.js": <Code2 className="w-5 h-5 text-foreground" />,
    "MongoDB": (
      <svg className="w-5 h-5 text-[#47A248]" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <path fill="#47A248" d="M64 6s-4 14-20 28c0 0 2 18 20 34 18-16 20-34 20-34C68 20 64 6 64 6z"/>
      </svg>
    ),
    "REST APIs": <Zap className="w-5 h-5 text-[#7C3AED]" />,
    "Microsoft Azure (Certified)": (
      <svg className="w-5 h-5 text-[#0078D4]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M2 19L12 3l10 16H2z"/>
      </svg>
    ),
    "Netlify": (
      <svg className="w-5 h-5 text-[#00C7B7]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M12 2L2 22h20L12 2z"/>
      </svg>
    ),
    "Git": (
      <svg className="w-5 h-5 text-[#F34F29]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M22 12.5L11.5 2 9 4.5 19.5 15 17 17.5 6.5 7 4 9.5 14.5 20 12 22.5 22 12.5z"/>
      </svg>
    )
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="tech-stack" className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="glass-effect rounded-2xl p-8 md:p-12 border border-border/20 relative overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 z-0">
            <Orb 
              hue={276} 
              hoverIntensity={0.3}
              rotateOnHover={true}
              forceHoverState={false}
              className="w-full h-full opacity-30"
            />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl font-heading font-semibold mb-10 text-center text-foreground">
              Tech <span className="gradient-text">Constellation</span>
            </h3>
            <div className="space-y-8">
              {Object.entries(allTechs).map(([category, techs], catIndex) => (
                <motion.div key={catIndex} className="relative" variants={itemVariants}>
                  <div className="flex items-center gap-3 mb-4">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                    <h4 className="text-xl font-heading font-semibold text-accent">{category}</h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {techs.map((tech, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        onMouseEnter={() => setHoveredTech(tech)}
                        onMouseLeave={() => setHoveredTech(null)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <span className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-sm font-medium text-accent-foreground hover:bg-accent/20 transition-colors duration-200 cursor-pointer backdrop-blur-sm">
                          {techIcons[tech] ?? <Code2 className="w-4 h-4" />}
                          <span>{tech}</span>
                        </span>
                        {hoveredTech === tech && (
                          <div className="absolute z-10 -top-10 left-1/2 -translate-x-1/2 bg-card/90 text-foreground text-xs rounded-lg py-2 px-3 shadow-lg min-w-max">
                            {techDescriptions[tech as keyof typeof techDescriptions]}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;