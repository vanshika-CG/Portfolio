import { Github, Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import GlareHover from "@/components/GlareHover";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socials = [
    { name: "LinkedIn", href: "https://linkedin.com/in/yourprofile", Icon: Linkedin },
    { name: "GitHub", href: "https://github.com/yourusername", Icon: Github },
    { name: "Twitter", href: "https://twitter.com/yourhandle", Icon: Twitter },
    { name: "YouTube", href: "https://youtube.com/yourchannel", Icon: Youtube },
    { name: "Email", href: "mailto:your.email@example.com", Icon: Mail },
  ];

  return (
    <footer className="border-t border-accent/20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center">
          


          <div className="mt-6 flex items-center gap-3">
            {socials.map(({ name, href, Icon }) => (
              <GlareHover
                key={name}
                width="auto"
                height="auto"
                background="transparent"
                borderRadius="9999px"
                borderColor="transparent"
                glareColor="#ffffff"
                glareOpacity={0.25}
                glareSize={180}
                transitionDuration={450}
                className="inline-flex"
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={name}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted/20 text-foreground hover:bg-accent hover:text-accent-foreground shadow-sm shadow-accent/10 transition"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </GlareHover>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-accent/20 pt-6 text-center text-sm text-muted-foreground">
          {currentYear} vanshika jangam. Built with React, Tailwind & passion.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
