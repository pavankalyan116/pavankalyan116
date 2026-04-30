import React from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// Constants
const CURRENT_YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  {
    href: "https://github.com/pavankalyan116",
    label: "GitHub",
    icon: <FaGithub size={20} />,
  },
  {
    href: "https://www.linkedin.com/in/pavankalyan-kotakommulaommula-226572210",
    label: "LinkedIn",
    icon: <FaLinkedin size={20} />,
  },
  {
    href: "https://x.com/pavankalyan166",
    label: "X (Twitter)",
    icon: <FaTwitter size={20} />,
  },
  {
    href: "mailto:kspkalyan116@gmail.com",
    label: "Email",
    icon: <Mail size={20} />,
  },
];

const Footer = React.memo((): React.ReactElement => {
  return (
    <footer className="glass-card mt-20 py-8 border-t border-border-color">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              Portfolio
            </h3>
            <p className="text-sm mt-1 text-gray-700 dark:text-gray-400">
              © {CURRENT_YEAR} All rights reserved.
            </p>
          </div>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export { Footer };
