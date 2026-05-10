import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Ruler,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const path = `projects/${id}`;
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, path);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading)
    return (
      <div className="pt-40 text-center font-serif text-stone-400">
        Đang tải chi tiết dự án...
      </div>
    );
  if (!project)
    return (
      <div className="pt-40 text-center font-serif text-stone-400">
        Không tìm thấy dự án.
      </div>
    );

  return (
    <div className="pt-20 bg-brown-light min-h-screen">
      <section className="py-12 px-6 border-b border-stone-200 bg-white sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-stone-500 hover:text-gold transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={18} /> Quay lại danh sách
          </Link>
          <div className="flex gap-4">
            <button className="p-2 border border-stone-200 rounded-full hover:bg-gold/10 transition-all text-stone-400 hover:text-gold">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 space-y-10"
            >
              <div>
                <span className="text-gold text-xs uppercase font-bold tracking-[0.3em] mb-4 block">
                  {project.category}
                </span>
                <h1 className="text-4xl font-serif font-bold text-brown-dark mb-6 leading-tight">
                  {project.title}
                </h1>
                <p className="text-stone-500 leading-relaxed italic border-l-2 border-gold pl-6 py-2">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 py-10 border-y border-stone-200">
                <div className="space-y-1">
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest flex items-center gap-2">
                    <MapPin size={10} /> Địa điểm
                  </p>
                  <p className="text-sm font-serif font-bold text-brown-dark">
                    {project.location}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest flex items-center gap-2">
                    <Calendar size={10} /> Năm hoàn thành
                  </p>
                  <p className="text-sm font-serif font-bold text-brown-dark">
                    {project.year}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest flex items-center gap-2">
                    <Ruler size={10} /> Quy mô
                  </p>
                  <p className="text-sm font-serif font-bold text-brown-dark">
                    {project.size}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest">
                    Trạng thái
                  </p>
                  <p className="text-sm font-serif font-bold text-green-700">
                    {project.status}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-brown-dark mb-6">
                  Hạng Mục Thực Hiện
                </h3>
                <ul className="space-y-4">
                  {(Array.isArray(project.details)
                    ? project.details
                    : project.details?.split("\n").filter(Boolean) || []
                  ).map((detail: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-stone-500 text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-gold mt-1 shrink-0"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-8 space-y-8"
            >
              <div className="relative aspect-[16/10] overflow-hidden shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                {(Array.isArray(project.gallery) ? project.gallery : []).map(
                  (img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative aspect-video overflow-hidden shadow-xl group"
                    >
                      <img
                        src={img}
                        alt="Gallery"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
