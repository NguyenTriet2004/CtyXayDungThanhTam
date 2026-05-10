import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Project {
  id: string;
  title: string;
}
export default function Footer() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      orderBy("createdAt", "desc"),
      limit(4),
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const fetched = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        })) as Project[];
        setProjects(fetched);
      },
      (error) => {
        console.error("Error listening to footer projects:", error);
      },
    );

    return () => unsubscribe();
  }, []);
  return (
    <footer className="bg-brown-dark border-t border-gold/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 border border-gold flex items-center justify-center rotate-45">
              <span className="text-gold font-serif font-bold text-sm -rotate-45">
                TT
              </span>
            </div>
            <span className="text-white font-serif font-bold text-lg uppercase tracking-widest">
              THÀNH TÂM
            </span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed mb-8 italic">
            {t("footer.about")}
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-stone-400 hover:border-gold hover:text-gold transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white-dark font-serif font-bold text-lg mb-8 uppercase tracking-widest">
            {t("nav.services")}
          </h4>
          <ul className="space-y-4">
            {[
              "Thiết kế Kiến trúc",
              "Thi công Xây dựng",
              "Nội thất Cổ điển",
              "Sửa chữa Nâng cấp",
            ].map((s) => (
              <li key={s}>
                <Link
                  to="/services"
                  className="text-stone-500 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"
                  />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white-dark font-serif font-bold text-lg mb-8 uppercase tracking-widest">
            {t("nav.projects")}
          </h4>
          <ul className="space-y-4">
            {projects.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/projects/${p.id}`}
                  className="text-stone-300 hover:text-gold text-sm transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"
                  />
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white-dark font-serif font-bold text-lg mb-8 uppercase tracking-widest">
            {t("footer.contact")}
          </h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <Phone size={20} className="text-gold shrink-0" />
              <div>
                <p className="text-xs text-stone-400 uppercase mb-1">Hotline</p>
                <a
                  href="tel:0909090909"
                  className="text-white hover:text-gold transition-colors font-bold"
                >
                  090 909 0909
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Mail size={20} className="text-gold shrink-0" />
              <div>
                <p className="text-xs text-stone-400 uppercase mb-1">Email</p>
                <a
                  href="mailto:triet1235@gmail.com"
                  className="text-white hover:text-gold transition-colors"
                >
                  triet1235@gmail.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={20} className="text-gold shrink-0" />
              <div>
                <p className="text-xs text-stone-400 uppercase mb-1">Địa chỉ</p>
                <p className="text-white hover:text-gold transition-colors">
                  53/56 Nguyễn Việt Dũng, Cần Thơ
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-stone-400 text-xs tracking-widest">
          © {new Date().getFullYear()} CTY TNHH THÀNH TÂM. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8 text-[10px] text-stone-400 uppercase tracking-widest">
          <a href="#" className="hover:text-gold">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gold">
            Terms of Service
          </a>
          <a href="#" className="hover:text-gold">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
