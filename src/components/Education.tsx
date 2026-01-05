import { GraduationCap, Award } from 'lucide-react';
import LightRays from './LightRays'; // Adjust path as necessary

const Education = () => {
  const education = [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Rai University',
      period: '2024–2028',
      icon: GraduationCap,
    },
    {
      degree: 'High School',
      institution: 'LP Savani International School',
      period: '2022–2023',
      icon: GraduationCap,
    },
  ];

  const certifications = [
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      code: 'AZ-900',
      issuer: 'Microsoft',
    },
    {
      name: 'JavaScript (Basics)',
      issuer: 'HackerRank',
    },
    {
      name: 'React (Basics)',
      issuer: 'HackerRank',
    },
  ];

  return (
    <section id="education" className="py-24 px-4 relative min-h-[800px] overflow-hidden"> 
      
      <div className="absolute inset-0 z-0">
        <LightRays 
          raysOrigin="top-center"
          raysColor="#8be9fd"
          raysSpeed={0.5} 
          lightSpread={0.8} 
          rayLength={3.0}
          pulsating={true}
          fadeDistance={0.5}
          saturation={1.0}
          followMouse={true}
          mouseInfluence={0.05}
          noiseAmount={0.05}
          className="opacity-100"
        />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            <span className="gradient-text">Archives</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Educational journey and professional certifications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Education Block */}
          <div>
            <h3 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-accent" />
              <span className="gradient-text">Education</span>
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 hover:glow-effect transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-nebula flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <edu.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-semibold mb-1">{edu.degree}</h4>
                      <p className="text-accent font-medium">{edu.institution}</p>
                      <p className="text-muted-foreground text-sm mt-1">{edu.period}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Block */}
          <div>
            <h3 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-accent" />
              <span className="gradient-text">Certifications</span>
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 hover:glow-effect transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-nebula flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="text-lg font-heading font-semibold mb-1">
                        {cert.name}
                        {cert.code && <span className="text-accent ml-2">({cert.code})</span>}
                      </h4>
                      <p className="text-muted-foreground text-sm">{cert.issuer}</p> 
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Certificates Button */}
            <div className="mt-8 text-center">
              <a href="/certifications">
                <button className="inline-flex items-center gap-2 px-7 py-3 rounded-xl glass-effect hover:glow-effect transition-all duration-300 font-medium text-foreground hover:scale-105 shadow-lg">
                  View More Certificates →
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;