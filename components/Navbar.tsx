"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/containers";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";
import { CommandMenu } from "@/components/command-menu";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    const updateViewport = () => setIsDesktop(window.innerWidth >= 768);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const pill = (
    <motion.span
      layoutId="nav-item-pill"
      className="absolute inset-0 -z-10 rounded-md bg-neutral-300/25 dark:bg-neutral-800/50"
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
    />
  );

  return (
    <Container>
      <motion.nav
        initial={false}
        animate={{
          boxShadow: scrolled ? "var(--shadow-input)" : "none",
          width: scrolled
            ? isDesktop
              ? "40rem"
              : "90%"
            : isDesktop
              ? "48rem"
              : "100%",
          top: scrolled ? 12 : 0,
          borderRadius: "2.5rem",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="font-custom fixed inset-x-0 top-0 z-50 mx-auto flex w-full items-center bg-neutral-50/80 px-4 py-3 tracking-wide text-neutral-900 backdrop-blur-lg transition-colors duration-300 dark:bg-neutral-950/70 dark:text-neutral-50"
      >
        <div
          className="flex w-full items-center justify-between"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Links */}
          <div className="flex items-center gap-0.5 md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHovered(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative px-2.5 py-1.5 text-sm font-medium transition-colors md:px-3 ${
                  isActive(item.href)
                    ? "text-neutral-900 dark:text-neutral-50"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
                }`}
              >
                {hovered === item.href && pill}
                {item.title}
              </Link>
            ))}
          </div>

          {/* Utilities */}
          <div className="flex items-center gap-1">
            <div
              className="relative px-1 py-1"
              onMouseEnter={() => setHovered("theme")}
            >
              {hovered === "theme" && pill}
              <motion.div
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
              >
                <ThemeToggleButton variant="circle" start="top-right" />
              </motion.div>
            </div>

            <div
              className="relative hidden px-1 py-1 sm:block"
              onMouseEnter={() => setHovered("cmd")}
            >
              {hovered === "cmd" && pill}
              <CommandMenu />
            </div>
          </div>
        </div>
      </motion.nav>
    </Container>
  );
};

export default Navbar;
