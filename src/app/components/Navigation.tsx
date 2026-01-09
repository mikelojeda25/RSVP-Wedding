import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "story", label: "Our Story" },
    { id: "details", label: "Details" },
    { id: "gallery", label: "Gallery" },
    { id: "rsvp", label: "RSVP" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 shadow-md backdrop-blur-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <Link
        to="/admin/rsvps"
        className="text-[80px] opacity-10 hover:opacity-100 transition-opacity ml-2 absolute top-0"
      >
        .
      </Link>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate("home")}
            className={`text-2xl italic transition-colors ${
              isScrolled ? "text-[#8b9eb5]" : "text-white"
            }`}
          >
            S & M
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`cursor-pointer transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:text-[#8b9eb5]"
                    : "text-white hover:text-[#3380dd]"
                } ${activeSection === item.id ? "opacity-100" : "opacity-80"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${
              isScrolled ? "text-[#8b9eb5]" : "text-white"
            }`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                  isScrolled
                    ? "text-gray-700 hover:bg-[#8b9eb5]/10"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
