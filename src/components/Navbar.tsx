import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Code2, Moon, Sun } from "lucide-react";

// Types
interface TNavLink {
  name: string;
  path: string;
}

// Constants
const NAV_LINKS: TNavLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Skills", path: "/#skills" },
  { name: "Projects", path: "/#projects" },
  { name: "Contact", path: "/#contact" },
];

const SCROLL_THRESHOLD = 50;
const HIDE_SCROLL_THRESHOLD = 100;

const Navbar = React.memo((): React.ReactElement => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

      if (currentScrollY > lastScrollY.current && currentScrollY > HIDE_SCROLL_THRESHOLD) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial theme
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, []);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const toggleMobileMenu = useCallback(
    () => setMobileMenuOpen((prev) => !prev),
    [],
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isScrolled ? "glass-card py-3" : "bg-transparent py-5"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg text-white">
              <Code2 size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight group-hover:text-primary-500 transition-colors">
              PavanKalyan Kotakommula
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="text-sm font-medium hover:text-primary-500 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              className="p-2 text-gray-800 dark:text-gray-300"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card absolute top-full left-0 w-full py-4 border-t border-border-color">
          <nav className="flex flex-col px-4 space-y-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={closeMobileMenu}
                className="block text-base font-medium p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };
