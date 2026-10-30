import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/anuzx",
      icon: Github,
    },
    {
      name: "X",
      url: "https://x.com/0xzdev",
      icon: FaXTwitter,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anuj-parasar-0a905b360",
      icon: Linkedin,
    },
  ];

  return (
    <footer className="w-full bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto w-full max-w-4xl px-8 sm:px-10 md:px-20">
        <div className="mt-12 border-t border-neutral-200/70 pt-6 pb-6 dark:border-neutral-800/70">
          <ul className="flex flex-row flex-wrap items-center gap-5">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <li key={link.name}>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    <IconComponent size={16} />
                    <span className="font-custom2 text-xs">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
