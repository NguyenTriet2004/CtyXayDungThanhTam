import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-black">
      {/* Background with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-gold" />
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold font-sans">
              Since 2010 • Excellence in Construction
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight">
            {t("hero.title").split(",")[0]} <br />
            <span className="text-gold italic font-normal">
              {t("hero.title").split(",")[1]}
            </span>
          </h1>

          <p className="text-stone-300 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl font-light">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Link
              to="/projects"
              className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-brown-dark px-10 py-5 rounded-sm font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 group shadow-[0_10px_40px_rgba(212,175,55,0.2)]"
            >
              {t("hero.cta")}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <button className="flex items-center gap-4 text-white hover:text-gold transition-colors group">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold group-hover:scale-110 transition-all">
                <Play size={20} fill="currentColor" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">
                Xem Video Giới Thiệu
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="hidden lg:block absolute right-20 top-0 bottom-0 w-px bg-white/10" />
      <div className="hidden lg:block absolute right-40 top-0 bottom-0 w-px bg-white/5" />

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-widest text-gold text-vertical">
          Scroll
        </span>
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  );
}
