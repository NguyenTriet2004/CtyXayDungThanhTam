import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  db,
  auth,
  handleFirestoreError,
  OperationType,
} from "@/src/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Send,
  Library,
  Upload,
  Loader2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ImageGalleryModal from "@/src/components/admin/ImageGalleryModal";
import imageCompression from "browser-image-compression";

export default function AdminBlogEditor() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Tư Vấn Kiến Trúc",
    excerpt: "",
    content: "",
    image:
      "https://images.unsplash.com/photo-1541913055-943f98247ee1?auto=format&fit=crop&q=80&w=2070",
    author: "",
  });
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const navigate = useNavigate();

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Compression error:", error);
      return file;
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
        setLoading(false);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
    }
  };

  const handleGallerySelect = (url: string) => {
    setFormData({ ...formData, image: url });
    setLocalPreview(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      // Root admin override
      if (user.email === "triet1509w@gmail.com") {
        setIsAdmin(true);
        setFormData((prev) => ({
          ...prev,
          author: user.displayName || "Admin",
        }));
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true);
          setFormData((prev) => ({
            ...prev,
            author: user.displayName || "Admin",
          }));
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const path = "blog";

    try {
      await addDoc(collection(db, path), {
        ...formData,
        date: new Date().toLocaleDateString("vi-VN"),
        createdAt: serverTimestamp(),
      });
      alert("Đăng bài thành công!");
      navigate("/admin");
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Có lỗi xảy ra khi đăng bài.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="pt-32 pb-24 bg-brown-light min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/admin"
          className="flex items-center gap-2 text-stone-500 hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest mb-10"
        >
          <ArrowLeft size={16} /> Quay lại Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 shadow-2xl border border-stone-100"
        >
          <div className="mb-12 border-b border-stone-100 pb-8">
            <h1 className="text-3xl font-serif font-bold text-brown-dark mb-2">
              Đăng Bài Viết Mới
            </h1>
            <p className="text-stone-400 text-sm">
              Chia sẻ kiến thức xây dựng cho cộng đồng.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">
                  Tiêu đề bài viết
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif text-lg text-brown-dark"
                  placeholder="Nhập tiêu đề..."
                />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">
                  Chuyên mục
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all italic text-stone-500"
                >
                  <option>Tư Vấn Kiến Trúc</option>
                  <option>Kỹ Thuật Thi Công</option>
                  <option>Phong Thủy</option>
                  <option>Vật Liệu Mới</option>
                  <option>Tin Tức Công Ty</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">
                Hình ảnh (URL)
              </label>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={
                      formData.image.startsWith("data:")
                        ? "Đang chuẩn bị ảnh..."
                        : formData.image
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="flex-1 bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif text-stone-500 text-sm"
                    placeholder="Link ảnh Unsplash..."
                  />
                  <div className="w-12 h-12 bg-stone-100 flex items-center justify-center text-stone-300 border border-stone-200 overflow-hidden">
                    {localPreview || formData.image ? (
                      <img
                        src={localPreview || formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={20} />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 px-2">
                  <label className="cursor-pointer bg-stone-100 hover:bg-stone-200 text-brown-dark px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 border border-stone-200">
                    <Upload size={14} />
                    {loading ? "Đang xử lý..." : "Chọn ảnh từ thiết bị"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={loading}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsGalleryModalOpen(true)}
                    className="bg-stone-100 hover:bg-stone-200 text-brown-dark px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-2 border border-stone-200"
                  >
                    <Library size={14} />
                    Thư viện công ty
                  </button>
                  {formData.image &&
                    !formData.image.startsWith("https://images.unsplash.com") &&
                    !localPreview && (
                      <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest flex items-center gap-1">
                        ✓ Đã tải lên
                      </span>
                    )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">
                Tóm tắt ngắn
              </label>
              <textarea
                rows={2}
                required
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif italic text-stone-500"
                placeholder="Một vài dòng giới thiệu thu hút độc giả..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">
                Nội dung chi tiết
              </label>
              <textarea
                rows={10}
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full bg-stone-50 border border-stone-200 focus:border-gold outline-none p-6 transition-all font-serif leading-relaxed text-stone-600"
                placeholder="Viết nội dung bài viết ở đây..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brown-dark text-gold font-bold py-6 uppercase tracking-[0.3em] text-xs hover:bg-gold hover:text-gold-light transition-all shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                "Lưu và Đăng Bài"
              )}{" "}
              <Save size={16} />
            </button>
          </form>
        </motion.div>
      </div>

      <ImageGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        onSelect={handleGallerySelect}
        title="Chọn ảnh cho bài viết"
      />
    </div>
  );
}
