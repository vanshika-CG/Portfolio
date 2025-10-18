const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-accent/20">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4">
          <span className="text-2xl font-heading font-bold gradient-text">
            Purple Nebula Nexus
          </span>
        </div>
        <p className="text-muted-foreground mb-4">
          Crafting cosmic digital experiences with modern web technologies
        </p>
        <p className="text-sm text-muted-foreground">
          © {currentYear} Purple Nebula Nexus. Built with React, Tailwind & passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
