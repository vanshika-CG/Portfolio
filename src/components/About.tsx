import meImage from "../../public/me.jpg";

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-nebula-radial opacity-20"></div>
      
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-32 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
            <div className="relative glass-effect rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent"></div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-muted to-background">
                <img 
                  src={meImage} 
                  alt="Vanshika Jangam portrait"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4 text-foreground">
                VANSHIKA JANGAM
              </h1>
              <p className="text-2xl text-accent font-medium mb-6">UI/UX DESIGNER</p>
              <p className="text-muted-foreground leading-relaxed">
                Enthusiastic and detail-oriented Computer Science student with hands-on experience in 
                <span className="text-accent font-medium"> full-stack web development</span>. 
                Proficient in <span className="text-accent font-medium">React.js</span>, 
                <span className="text-accent font-medium"> Node.js</span>, and 
                <span className="text-accent font-medium"> MongoDB</span>, with strong problem-solving skills and clean code practices. 
                Delivered real-world projects, including a <span className="text-accent font-medium">paid e-commerce platform</span>, 
                focusing on performance, security, and user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;