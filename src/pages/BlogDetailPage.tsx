import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Link2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const path = `blog/${id}`;
      try {
        const docRef = doc(db, 'blog', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, path);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="pt-40 text-center font-serif">Đang tải bài viết...</div>;
  if (!post) return <div className="pt-40 text-center font-serif">Không tìm thấy bài viết.</div>;

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Header Image */}
      <div className="w-full h-[60vh] relative overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-stone-900/40" />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-4xl text-center">
             <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2 bg-gold text-white text-xs font-bold uppercase tracking-widest mb-6 inline-block shadow-xl"
             >
              {post.category}
             </motion.span>
             <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-8 leading-tight"
             >
              {post.title}
             </motion.h1>
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center flex-wrap gap-8 text-white/80 text-xs font-bold uppercase tracking-widest"
             >
                <span className="flex items-center gap-2"><Calendar size={14} className="text-gold" /> {post.date}</span>
                <span className="flex items-center gap-2"><User size={14} className="text-gold" /> {post.author}</span>
                <span className="flex items-center gap-2"><Clock size={14} className="text-gold" /> {post.readTime}</span>
             </motion.div>
          </div>
        </div>
      </div>

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-stone-400 hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest mb-12">
            <ArrowLeft size={16} /> Quay lại kiến thức
          </Link>

          <article className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-headings:text-brown-dark prose-blockquote:border-gold prose-blockquote:bg-stone-50 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:italic">
             {post.content.includes('<p>') || post.content.includes('<h') ? (
               <div dangerouslySetInnerHTML={{ __html: post.content }} />
             ) : (
               <div className="whitespace-pre-wrap">{post.content}</div>
             )}
          </article>

          <div className="mt-20 pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brown-dark flex items-center justify-center text-white font-serif font-bold text-xl rotate-45">
                <span className="-rotate-45">TT</span>
              </div>
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mb-1">Tác giả bài viết</p>
                <h4 className="text-sm font-serif font-bold text-brown-dark">{post.author}</h4>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-400 hover:border-gold hover:text-gold transition-all rounded-full">
                <Facebook size={16} />
              </button>
              <button className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-400 hover:border-gold hover:text-gold transition-all rounded-full">
                <Twitter size={16} />
              </button>
              <button className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-400 hover:border-gold hover:text-gold transition-all rounded-full">
                <Link2 size={16} />
              </button>
              <button className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-400 hover:border-gold hover:text-gold transition-all rounded-full">
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
