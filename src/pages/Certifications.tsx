// src/pages/CertificationsPage.tsx

import { ExternalLink, ArrowLeft } from 'lucide-react';

const CertificationsPage = () => {
  const certifications = [
    {
      name: 'Microsoft Certified: Azure Fundamentals',
      code: 'AZ-900',
      issuer: 'Microsoft',
      date: 'December 2024',
      badgeImage: '/assets/Azure fundamental certificate-1.png',
      credentialLink: 'https://learn.microsoft.com/api/credentials/share/en-us/...',
    },
    {
      name: 'JavaScript (Basic)',
      issuer: 'HackerRank',
      date: 'November 2024',
      badgeImage: '/assets/javascript_basic certificate-1.png',
      credentialLink: 'https://www.hackerrank.com/certificates/...',
    },
    {
      name: 'React (Basic)',
      issuer: 'HackerRank',
      date: 'November 2024',
      badgeImage: '/assets/react_basic certificate-1.png',
      credentialLink: 'https://www.hackerrank.com/certificates/...',
    },
    {
      name: 'InfyTQ Certification',
      issuer: 'Infosys',
      date: 'November 2024',
      badgeImage: '/assets/infoysis.png',
      credentialLink: 'https://infytq.infosys.com', // Update with real link if available
    },
    {
      name: 'CSS (Basic)',
      issuer: 'HackerRank',
      date: 'November 2024',
      badgeImage: '/assets/css certificate-1.png',
      credentialLink: 'https://www.hackerrank.com/certificates/...',
    },
    {
      name: 'Gateway Load Balancer',
      issuer: 'AWS Skill Builder',
      date: 'November 2024',
      badgeImage: '/assets/gateway load balancer certificate-1.png',
      credentialLink: 'https://skillbuilder.aws',
    },
    {
      name: 'Getting Started with Amazon DocumentDB',
      issuer: 'AWS Skill Builder',
      date: 'November 2024',
      badgeImage: '/assets/Getting Started with Amazon DocumentDB certificate-1.png',
      credentialLink: 'https://skillbuilder.aws',
    },
    {
      name: 'GitHub Copilot Fundamentals',
      issuer: 'GitHub',
      date: 'November 2024',
      badgeImage: '/assets/GitHub Copilot Fundamentals certificate-1.png',
      credentialLink: 'https://github.com/skills',
    },
    {
      name: 'Introduction to the Basics of Azure Services',
      issuer: 'Microsoft Learn',
      date: 'November 2024',
      badgeImage: '/assets/Introduction to the Basics of Azure Services certificate-1.png',
      credentialLink: 'https://learn.microsoft.com',
    },
  ];

  return (
    <section className="py-16 px-4 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="gradient-text">All Certifications</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Click on any certificate to view the official credential
          </p>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl overflow-hidden hover:glow-effect transition-all duration-500 group flex flex-col h-full"
            >
              {/* Clickable Large Image */}
              <a
                href={cert.credentialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-black/20"
              >
                <img
                  src={cert.badgeImage}
                  alt={`${cert.name} certificate`}
                  loading="lazy"
                  className="w-full h-full object-contain md:object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Optional overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4">
                  <span className="text-white text-sm font-medium">Click to view credential</span>
                </div>
              </a>

              {/* Details Below Image */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-heading font-semibold mb-2 text-center">
                  {cert.name}
                  {cert.code && <span className="text-accent ml-2">({cert.code})</span>}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base text-center mb-1">
                  {cert.issuer}
                </p>
                <p className="text-muted-foreground/80 text-xs md:text-sm text-center mb-4">
                  {cert.date}
                </p>

                <a
                  href={cert.credentialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 text-accent hover:underline font-medium text-sm"
                >
                  View Official Credential <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsPage;