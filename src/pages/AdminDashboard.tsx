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
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  Mail,
  FileText,
  Trash2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  LayoutGrid,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"messages" | "posts" | "projects">(
    "messages",
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/login");
      } else if (!isAdmin) {
        navigate("/");
      } else {
        fetchData();
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const [actionStatus, setActionStatus] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    let currentPath = "";
    try {
      // Fetch Messages
      currentPath = "messages";
      const qMsg = query(
        collection(db, currentPath),
        orderBy("createdAt", "desc"),
      );
      const msgSnap = await getDocs(qMsg);
      const msgs = msgSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);

      // Fetch Posts
      currentPath = "blog";
      const qPost = query(
        collection(db, currentPath),
        orderBy("createdAt", "desc"),
      );
      const postSnap = await getDocs(qPost);
      const pts = postSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(pts);

      // Fetch Projects
      currentPath = "projects";
      const qProj = query(
        collection(db, currentPath),
        orderBy("createdAt", "desc"),
      );
      const projSnap = await getDocs(qProj);
      const projs = projSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProjects(projs);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, currentPath);
    } finally {
      setLoading(false);
    }
  };

  const [confirmDelete, setConfirmDelete] = useState<{
    id: string;
    type: "message" | "post" | "project";
  } | null>(null);

  const handleDeleteMessage = async (id: string) => {
    setActionStatus("Đang xóa tin nhắn...");
    const path = `messages/${id}`;
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages((prev) => prev.filter((m) => m.id !== id));
      setActionStatus("Đã xóa tin nhắn thành công!");
      setTimeout(() => setActionStatus(null), 3000);
    } catch (error: any) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const handleDeletePost = async (id: string) => {
    setActionStatus("Đang xóa bài viết...");
    const path = `blog/${id}`;
    try {
      await deleteDoc(doc(db, "blog", id));
      setPosts((prev) => prev.filter((p) => p.id !== id));
      setActionStatus("Đã xóa bài viết thành công!");
      setTimeout(() => setActionStatus(null), 3000);
    } catch (error: any) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setActionStatus("Đang xóa dự án...");
    const path = `projects/${id}`;
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setActionStatus("Đã xóa dự án thành công!");
      setTimeout(() => setActionStatus(null), 3000);
    } catch (error: any) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-brown-dark mb-2 flex items-center gap-3">
              <ShieldCheck className="text-gold" size={32} /> Quản Trị Hệ Thống
            </h1>
            <p className="text-stone-500">
              Chào mừng trở lại, {auth.currentUser?.displayName}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/admin/blog/new"
              className="bg-gold text-white px-6 py-3 font-bold uppercase tracking-widest text-xs shadow-lg hover:bg-gold-dark transition-all flex items-center gap-2"
            >
              <FileText size={16} /> Đăng bài mới
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Stats */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100">
              <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6 font-serif">
                Thống kê nhanh
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-500 flex items-center gap-2">
                    <MessageSquare size={16} /> Tin nhắn
                  </span>
                  <span className="text-brown-dark font-bold font-serif">
                    {messages.length}
                  </span>
                </div>
                <div className="h-px bg-stone-100" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-500 flex items-center gap-2">
                    <FileText size={16} /> Bài viết
                  </span>
                  <span className="text-brown-dark font-bold font-serif">
                    {posts.length}
                  </span>
                </div>
                <div className="h-px bg-stone-100" />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-500 flex items-center gap-2">
                    <LayoutGrid size={16} /> Dự án
                  </span>
                  <span className="text-brown-dark font-bold font-serif">
                    {projects.length}
                  </span>
                </div>
              </div>
            </div>

            <nav className="bg-brown-dark p-2 rounded-sm shadow-xl">
              <button
                onClick={() => setActiveTab("messages")}
                className={cn(
                  "w-full flex items-center justify-between p-4 transition-all font-bold uppercase tracking-widest text-xs",
                  activeTab === "messages"
                    ? "bg-gold text-white"
                    : "text-stone-400 hover:text-white",
                )}
              >
                Tin nhắn khách hàng{" "}
                <ChevronRight
                  size={16}
                  className={
                    activeTab === "messages" ? "rotate-90 md:rotate-0" : ""
                  }
                />
              </button>
              <button
                onClick={() => setActiveTab("posts")}
                className={cn(
                  "w-full flex items-center justify-between p-4 transition-all font-bold uppercase tracking-widest text-xs",
                  activeTab === "posts"
                    ? "bg-gold text-white"
                    : "text-stone-400 hover:text-white",
                )}
              >
                Quản lý bài viết{" "}
                <ChevronRight
                  size={16}
                  className={
                    activeTab === "posts" ? "rotate-90 md:rotate-0" : ""
                  }
                />
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={cn(
                  "w-full flex items-center justify-between p-4 transition-all font-bold uppercase tracking-widest text-xs",
                  activeTab === "projects"
                    ? "bg-gold text-white"
                    : "text-stone-400 hover:text-white",
                )}
              >
                Quản lý dự án{" "}
                <ChevronRight
                  size={16}
                  className={
                    activeTab === "projects" ? "rotate-90 md:rotate-0" : ""
                  }
                />
              </button>
              <div className="h-px bg-white/10 my-2 mx-4" />
              <Link
                to="/blog"
                className="w-full flex items-center justify-between p-4 text-stone-400 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
              >
                Xem Blog <ExternalLink size={16} />
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-8">
            <div className="bg-white rounded-sm shadow-sm border border-stone-100 overflow-hidden">
              <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-stone-50/50">
                <h2 className="text-xl font-serif font-bold text-brown-dark">
                  {activeTab === "messages"
                    ? "Tin nhắn liên hệ mới"
                    : activeTab === "posts"
                      ? "Danh sách bài viết"
                      : "Danh sách dự án"}
                </h2>
                <div className="flex flex-wrap items-center gap-4">
                  {activeTab === "posts" && (
                    <Link
                      to="/admin/blog/new"
                      className="px-4 py-2 bg-gold text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brown-dark transition-all flex items-center gap-2"
                    >
                      Thêm bài viết mới
                    </Link>
                  )}
                  {activeTab === "projects" && (
                    <Link
                      to="/admin/project/new"
                      className="px-4 py-2 bg-gold text-white text-[10px] font-bold uppercase tracking-widest hover:bg-brown-dark transition-all flex items-center gap-2"
                    >
                      Thêm dự án mới
                    </Link>
                  )}
                  {actionStatus && (
                    <span
                      className={cn(
                        "text-xs font-bold px-3 py-1 rounded-sm animate-pulse",
                        actionStatus.includes("Lỗi")
                          ? "bg-red-100 text-red-600"
                          : "bg-gold/10 text-gold",
                      )}
                    >
                      {actionStatus}
                    </span>
                  )}
                  <span className="text-xs text-gold font-bold uppercase tracking-widest border border-gold/20 px-3 py-1 rounded-full shrink-0">
                    Trực tuyến
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="p-20 text-center text-stone-400 font-serif italic">
                  Đang tải dữ liệu...
                </div>
              ) : activeTab === "messages" ? (
                messages.length === 0 ? (
                  <div className="p-20 text-center text-stone-400 font-serif italic">
                    Chưa có tin nhắn nào từ khách hàng.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-8 hover:bg-stone-50/50 transition-colors group"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                          <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 bg-brown-light flex items-center justify-center text-gold rounded-full shrink-0">
                              <Mail size={20} />
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-lg text-brown-dark">
                                {msg.name}
                              </h4>
                              <p className="text-gold text-xs font-bold uppercase tracking-widest mb-1">
                                {msg.phone}
                              </p>
                              <p className="text-stone-400 text-[10px] uppercase font-bold">
                                {msg.createdAt?.toDate
                                  ? new Date(
                                      msg.createdAt.toDate(),
                                    ).toLocaleString()
                                  : "Just now"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() =>
                                setConfirmDelete({
                                  id: msg.id,
                                  type: "message",
                                })
                              }
                              className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <div className="bg-stone-50 p-4 rounded-sm border-l-2 border-gold italic text-stone-500 text-sm">
                          <span className="block text-[10px] text-stone-400 uppercase font-bold not-italic mb-2">
                            Dịch vụ quan tâm: {msg.service}
                          </span>
                          "{msg.message}"
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === "posts" ? (
                posts.length === 0 ? (
                  <div className="p-20 text-center text-stone-400 font-serif italic">
                    Chưa có bài viết nào.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="p-8 hover:bg-stone-50/50 transition-colors group"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex gap-6 items-start">
                            <div className="w-24 h-16 bg-stone-100 overflow-hidden shadow-inner hidden md:block">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1 block">
                                {post.category}
                              </span>
                              <h4 className="font-serif font-bold text-lg text-brown-dark mb-1 leading-snug">
                                {post.title}
                              </h4>
                              <div className="flex items-center gap-4 text-stone-400 text-[10px] uppercase font-bold">
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.author}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <Link
                              to={`/blog/${post.id}`}
                              className="p-2 text-stone-300 hover:text-gold transition-colors"
                              title="Xem bài viết"
                            >
                              <ExternalLink size={18} />
                            </Link>
                            <button
                              onClick={() =>
                                setConfirmDelete({ id: post.id, type: "post" })
                              }
                              className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                              title="Xóa bài viết"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : projects.length === 0 ? (
                <div className="p-20 text-center text-stone-400 font-serif italic">
                  Chưa có dự án nào.
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-8 hover:bg-stone-50/50 transition-colors group"
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex gap-6 items-start">
                          <div className="w-24 h-16 bg-stone-100 overflow-hidden shadow-inner hidden md:block">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <span className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1 block">
                              {project.category}
                            </span>
                            <h4 className="font-serif font-bold text-lg text-brown-dark mb-1 leading-snug">
                              {project.title}
                            </h4>
                            <div className="flex items-center gap-4 text-stone-400 text-[10px] uppercase font-bold">
                              <span>{project.year}</span>
                              <span>•</span>
                              <span>{project.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Link
                            to={`/projects/${project.id}`}
                            className="p-2 text-stone-300 hover:text-gold transition-colors"
                            title="Xem dự án"
                          >
                            <ExternalLink size={18} />
                          </Link>
                          <button
                            onClick={() =>
                              setConfirmDelete({
                                id: project.id,
                                type: "project",
                              })
                            }
                            className="p-2 text-stone-300 hover:text-red-500 transition-colors"
                            title="Xóa dự án"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 max-w-md w-full rounded-sm shadow-2xl border border-stone-100"
          >
            <h3 className="text-2xl font-serif font-bold text-brown-dark mb-4">
              Xác nhận xóa
            </h3>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Bạn có chắc chắn muốn xóa{" "}
              {confirmDelete.type === "message" ? "tin nhắn" : "bài viết"} này
              không? Thao tác này không thể hoàn tác.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-6 py-3 border border-stone-200 text-stone-600 font-bold uppercase tracking-widest text-[10px] hover:bg-stone-50 transition-all"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  if (confirmDelete.type === "message") {
                    handleDeleteMessage(confirmDelete.id);
                  } else if (confirmDelete.type === "post") {
                    handleDeletePost(confirmDelete.id);
                  } else {
                    handleDeleteProject(confirmDelete.id);
                  }
                  setConfirmDelete(null);
                }}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-widest text-[10px] shadow-lg hover:bg-red-700 transition-all"
              >
                Đồng ý xóa
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
