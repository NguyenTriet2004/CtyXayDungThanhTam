import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = "projects";
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fbProjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(fbProjects);
        setLoading(false);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "projects");
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="pt-20 bg-brown-light min-h-screen">
      {/* Header */}
      <section className="relative py-24 bg-brown overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">
              Portfolio
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Dự Án Hoàn Thành
            </h1>
            <div className="h-1 w-24 bg-gold mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Filter & Search UI (Visual only) */}
      <section className="py-12 border-b border-gold/10 bg-brown/50 backdrop-blur-sm sticky top-16 z-30 shadow-sm px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {["Tất Cả", "Biệt Thự", "Nhà Phố", "Hầm & Móng", "Nội Thất"].map(
              (cat, i) => (
                <button
                  key={i}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all ${i === 0 ? "bg-gold text-white shadow-md" : "bg-brown text-stone-500 hover:bg-gold/10"}`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Tìm kiếm dự án..."
              className="w-full bg-brown border border-gold/10 px-6 py-3 rounded-full text-sm focus:ring-2 focus:ring-gold outline-none text-white"
            />
            <Search
              className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400"
              size={18}
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6 shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link
                      to={`/projects/${project.id}`}
                      className="w-16 h-16 bg-gold text-white flex items-center justify-center rotate-45 hover:rotate-0 transition-transform duration-500 shadow-xl"
                    >
                      <ArrowUpRight
                        size={24}
                        className="-rotate-45 group-hover:rotate-0 transition-transform"
                      />
                    </Link>
                  </div>
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-gold text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 shadow-md">
                      {project.category}
                    </span>
                    <span className="bg-brown text-gold text-[10px] uppercase font-bold tracking-widest px-3 py-1 shadow-md">
                      {project.year}
                    </span>
                  </div>
                </div>
                <h4 className="text-xl font-serif font-bold text-brown-dark mb-2 group-hover:text-gold transition-colors">
                  {project.title}
                </h4>
                <div className="flex items-center gap-2 text-stone-400 text-xs uppercase tracking-widest mb-4">
                  <span className="h-px w-4 bg-gold" />
                  {project.location}
                </div>
                <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 italic">
                  "{project.description}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Load more button removed */}
        </div>
      </section>
    </div>
  );
}
