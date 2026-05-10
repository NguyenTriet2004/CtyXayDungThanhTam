import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight, Tag, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';

export default function BlogPage() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const path = 'blog';
      try {
        const q = query(collection(db, path), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fbPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(fbPosts);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, path);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pt-20 bg-brown-light min-h-screen">
      {/* Header */}
      <section className="relative py-24 bg-brown overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">Journal</h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Kiến Thức Xây Dựng</h1>
            <div className="h-1 w-24 bg-gold mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          {/* Main Posts */}
          <div className="flex-[2] space-y-16">
            {loading ? (
               <div className="text-center py-20 font-serif italic text-stone-400">Đang tải bài viết...</div>
            ) : posts.length === 0 ? (
               <div className="text-center py-20 border-2 border-dashed border-stone-100 bg-stone-50/50">
                 <p className="font-serif italic text-stone-400">Chưa có bài viết nào được đăng tải.</p>
               </div>
            ) : (
              posts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative aspect-video overflow-hidden mb-8 shadow-xl">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute top-6 left-6 bg-gold text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                      {post.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-stone-400 text-xs uppercase tracking-widest mb-4 font-bold">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} className="text-gold" /> {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <User size={14} className="text-gold" /> {post.author}
                    </span>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-brown-dark mb-4 group-hover:text-gold transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-stone-500 mb-8 leading-relaxed italic">
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-3 text-brown-dark font-bold uppercase tracking-widest text-sm border-b-2 border-gold/30 pb-1 hover:border-gold transition-all">
                    Đọc Bài Viết <ArrowRight size={18} />
                  </Link>
                </motion.article>
              ))
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex-1 space-y-12">
            <div className="bg-black-mystic p-8 border border-stone-800 shadow-sm">
              <h4 className="text-xl font-serif font-bold text-brown-dark mb-6 relative">
                Chuyên Mục
                <span className="absolute bottom-[-10px] left-0 w-10 h-[2px] bg-gold" />
              </h4>
              <ul className="space-y-4">
                {['Tư Vấn Kiến Trúc (12)', 'Kỹ Thuật Thi Công (08)', 'Phong Thủy (05)', 'Vật Liệu Mới (11)', 'Tin Tức Công Ty (07)'].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="flex items-center justify-between text-stone-500 hover:text-gold text-sm group transition-all">
                      <span className="flex items-center gap-2">
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-gold" />
                        {cat}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 border border-stone-100 shadow-sm">
              <h4 className="text-xl font-serif font-bold text-brown-dark mb-6 relative">
                Tags
                <span className="absolute bottom-[-10px] left-0 w-10 h-[2px] bg-gold" />
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Nhà đẹp', 'Biệt thự', 'Cần Thơ', 'Xây thô', 'Mẫu nội thất', 'Hợp đồng kiến trúc'].map((tag) => (
                  <a key={tag} href="#" className="px-4 py-2 bg-stone-900 border border-stone-800 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:border-gold hover:text-gold transition-all">
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gold p-10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h4 className="text-2xl font-serif font-bold text-white mb-6 italic">Cần Tư Vấn Miễn Phí?</h4>
              <p className="text-white/80 text-sm mb-10 leading-relaxed font-light">
                Đội ngũ kiến trúc sư Thành Tâm luôn sẵn sàng hỗ trợ giải đáp mọi thắc mắc của quý khách.
              </p>
              <a href="tel:0909090909" className="inline-block bg-white text-gold font-bold py-4 px-8 rounded-sm uppercase tracking-widest text-xs hover:bg-stone-50 transition-all shadow-xl">
                Gọi Ngay: 090 909 0909
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
