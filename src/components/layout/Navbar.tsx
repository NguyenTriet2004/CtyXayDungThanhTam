import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, LogIn, LogOut, Globe, ShieldCheck } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import { auth } from "@/src/lib/firebase";
import { signOut } from "firebase/auth";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");
  };

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.services"), path: "/services" },
    { name: t("nav.projects"), path: "/projects" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6",
        scrolled
          ? "bg-brown-light/95 backdrop-blur-md shadow-lg py-3 border-b border-gold/30"
          : "bg-transparent py-5 border-b border-white/5",
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 border-2 border-gold flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
            <span className="text-gold font-serif font-bold text-xl -rotate-45 group-hover:rotate-0 transition-transform">
              TT
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gold font-serif font-bold text-lg leading-none tracking-tight">
              THÀNH TÂM
            </span>
            <span className="text-[10px] text-gold-light/80 tracking-widest uppercase">
              Construction & Design
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium tracking-wide uppercase transition-colors hover:text-gold",
                location.pathname === link.path
                  ? "text-gold"
                  : "text-brown-dark",
              )}
            >
              {link.name}
            </Link>
          ))}

          <div className="h-4 w-px bg-stone-300/50" />

          {user && isAdmin && (
            <Link
              to="/admin"
              className="transition-colors flex items-center gap-1 text-sm uppercase font-bold text-gold"
            >
              <ShieldCheck size={16} /> Admin
            </Link>
          )}

          <button
            onClick={toggleLang}
            className="transition-colors flex items-center gap-1 text-sm uppercase text-brown-dark hover:text-gold font-medium"
          >
            <Globe size={16} />
            {i18n.language === "vi" ? "EN" : "VI"}
          </button>

          {user ? (
            <button
              onClick={() => signOut(auth)}
              className="transition-colors text-brown-dark hover:text-gold p-1"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-sm text-sm font-bold transition-all shadow-md"
            >
              {t("nav.login")}
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brown-dark border-b border-gold/20 shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif text-stone-300 hover:text-gold"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-stone-800" />
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 text-gold"
                >
                  <Globe size={20} />
                  {i18n.language.toUpperCase()}
                </button>
                {user ? (
                  <button
                    onClick={() => signOut(auth)}
                    className="text-stone-300"
                  >
                    {t("nav.logout")}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-gold font-bold"
                  >
                    {t("nav.login")}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
