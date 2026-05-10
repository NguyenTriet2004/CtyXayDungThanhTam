import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { X, Search, Image as ImageIcon, CheckCircle2 } from "lucide-react";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  onSelect,
  title = "Thư viện hình ảnh",
}: ImageGalleryModalProps) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "projects"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);

        const allImages = new Set<string>();
        querySnapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.image) allImages.add(data.image);
          if (Array.isArray(data.gallery)) {
            data.gallery.forEach((img: string) => allImages.add(img));
          }
        });

        setImages(Array.from(allImages));
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [isOpen]);

  const filteredImages = images.filter(
    (img) =>
      img.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.startsWith("data:"), // Keep base64 images
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brown-dark/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl border border-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-brown-dark">
                {title}
              </h2>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                Chọn từ các hình ảnh đã sử dụng trong dự án
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-400"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 border-b border-stone-50 bg-stone-50/50">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300"
                size={16}
              />
              <input
                type="text"
                placeholder="Tìm kiếm link ảnh..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-none px-10 py-2 text-sm outline-none focus:border-gold transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="h-64 flex flex-col items-center justify-center gap-4 text-stone-400">
                <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                <p className="text-xs uppercase tracking-widest">
                  Đang tải thư viện...
                </p>
              </div>
            ) : filteredImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredImages.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelect(url);
                      onClose();
                    }}
                    className="aspect-square relative group overflow-hidden border border-stone-100 hover:border-gold transition-all"
                  >
                    <img
                      src={url}
                      alt="Gallery item"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <CheckCircle2 className="text-white" size={32} />
                    </div>
                    {url.startsWith("data:") && (
                      <div className="absolute top-2 right-2 bg-gold text-white text-[8px] px-1 font-bold uppercase tracking-tighter">
                        Base64
                      </div>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center gap-4 text-stone-300">
                <ImageIcon size={48} />
                <p className="text-sm font-serif">
                  Không tìm thấy hình ảnh nào
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-stone-200 text-stone-500 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-100 transition-all"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
