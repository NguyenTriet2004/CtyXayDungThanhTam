import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Send, MessageSquare, ExternalLink } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';

export default function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Thiết kế Kiến trúc',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const path = 'messages';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSent(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const getMailLink = () => {
    const subject = encodeURIComponent(`Yêu cầu tư vấn từ ${formData.name}`);
    const body = encodeURIComponent(
      `Họ tên: ${formData.name}\nSĐT: ${formData.phone}\nDịch vụ: ${formData.service}\nLời nhắn: ${formData.message}`
    );
    return `mailto:triet1509w@gmail.com?subject=${subject}&body=${body}`;
  };

  const getZaloLink = () => {
    return `https://zalo.me/0559083403`;
  };

  return (
    <div className="pt-20 bg-brown-light min-h-screen">
      {/* Header */}
      <section className="relative py-24 bg-brown overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">Contact</h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Liên Hệ Với Thành Tâm</h1>
            <div className="h-1 w-24 bg-gold mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h3 className="text-3xl font-serif font-bold text-brown-dark mb-8 uppercase tracking-tight">Thông Tin <span className="italic font-normal text-gold">Kết Nối</span></h3>
                <p className="text-stone-500 mb-12 leading-relaxed">
                  Chúng tôi luôn ưu tiên lắng nghe ý tưởng của khách hàng. Hãy để lại thông tin hoặc ghé thăm văn phòng để chúng tôi có thể phục vụ bạn một cách tốt nhất.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  { icon: <Phone />, title: 'Số Điện Thoại', val: '090 909 0909', subtitle: 'Hỗ trợ 24/7' },
                  { icon: <Mail />, title: 'Email Liên Hệ', val: 'triet1509w@gmail.com', subtitle: 'Phản hồi trong 24h' },
                  { icon: <MapPin />, title: 'Văn Phòng Chính', val: '53/56 Nguyễn Việt Dũng', subtitle: 'Bình Thủy, Cần Thơ' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-14 h-14 bg-white border border-gold/20 flex items-center justify-center text-gold shadow-sm shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1 font-bold">{item.title}</p>
                      <h4 className="text-lg font-serif font-bold text-brown-dark">{item.val}</h4>
                      <p className="text-stone-500 text-xs italic">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Link Visual */}
              <div className="pt-12 border-t border-stone-200">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-6 font-bold">Theo dõi chúng tôi</p>
                <div className="flex gap-4">
                  {['FB', 'IG', 'LN', 'YT'].map((s) => (
                    <a key={s} href="#" className="w-12 h-12 border border-stone-200 flex items-center justify-center text-stone-400 hover:border-gold hover:text-gold transition-all text-xs font-bold font-serif">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-brown p-12 border border-gold/10 shadow-2xl relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl -z-10" />
                <h3 className="text-2xl font-serif font-bold text-brown-dark mb-10 text-center uppercase tracking-widest">
                  Gửi Yêu Cầu <span className="text-gold italic font-normal">Tư Vấn</span>
                </h3>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Họ Tên Quý Khách</label>
                      <input 
                        type="text" 
                        required 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif italic text-stone-600" 
                        placeholder="Nguyễn Văn A" 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Số Điện Thoại</label>
                      <input 
                        type="tel" 
                        required 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif italic text-stone-600" 
                        placeholder="09xx xxx xxx" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Dịch Vụ Quan Tâm</label>
                      <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all italic text-stone-500"
                      >
                      <option>Thiết kế Kiến trúc</option>
                      <option>Xây dựng Trọn gói</option>
                      <option>Thi công Nội thất</option>
                      <option>Cải tạo & Sửa chữa</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold px-2">Lời Nhắn / Yêu Cầu Riêng</label>
                    <textarea 
                      rows={4} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border-b border-stone-200 focus:border-gold outline-none px-4 py-3 transition-all font-serif italic text-stone-600" 
                      placeholder="Mô tả sơ bộ về dự án của quý khách..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-brown-dark text-gold font-bold py-6 uppercase tracking-[0.3em] text-xs hover:bg-gold hover:text-white transition-all shadow-xl flex items-center justify-center gap-4 group disabled:opacity-50"
                  >
                    {loading ? 'Đang gửi...' : 'Gửi Thông Tin'} <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>

                {sent && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="absolute inset-0 bg-black-mystic flex flex-col items-center justify-center p-12 text-center z-20"
                  >
                    <div className="w-20 h-20 bg-gold text-white flex items-center justify-center rounded-full mb-8 shadow-2xl">
                      <MessageSquare size={32} />
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-gold mb-4">Cảm ơn quý khách!</h4>
                    <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto mb-10">
                      Thông tin đã được lưu lại. Bạn có thể nhấn vào nút bên dưới để gửi tin nhắn trực tiếp cho chúng tôi.
                    </p>
                    
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                      <a 
                        href={getZaloLink()} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 bg-[#0068ff] text-white py-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg"
                      >
                        Gửi qua Zalo <ExternalLink size={14} />
                      </a>
                      <a 
                        href={getMailLink()} 
                        className="flex items-center justify-center gap-3 bg-brown-dark text-gold py-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-lg"
                      >
                        Gửi qua Email <Mail size={14} />
                      </a>
                    </div>

                    <button onClick={() => setSent(false)} className="mt-8 text-stone-400 text-[10px] font-bold uppercase tracking-widest border-b border-stone-200">Quay lại form</button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] w-full relative group bg-stone-100">
        <iframe 
          title="Thành Tâm - 53/56 Nguyễn Việt Dũng"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.473523179262!2d105.7876822!3d10.0299285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3ed65%3A0xc3f1a0e8d6411d35!2zNTMvNTYgTmd1eeG7hW4gVmnhu4d0IETFqW5nLCBBbiBUaOG7m2ksIELDrG5oIFRo4buneSwgQ-G6p24gVGjGoSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1715264350000!5m2!1sen!2s"
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
          allowFullScreen
          loading="lazy"
        ></iframe>
        <div className="absolute bottom-12 left-12 bg-white/95 backdrop-blur-md p-6 shadow-2xl border border-gold/20 max-w-xs transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-gold text-white flex items-center justify-center rotate-45">
              <MapPin size={16} className="-rotate-45" />
            </div>
            <h5 className="font-serif font-bold text-brown-dark leading-tight uppercase text-xs tracking-wider">Văn Phòng Thành Tâm</h5>
          </div>
          <p className="text-stone-500 text-[10px] leading-relaxed mb-4">
            53/56 Nguyễn Việt Dũng, Phường An Thới, Quận Bình Thủy, Cần Thơ
          </p>
          <a 
            href="https://maps.app.goo.gl/3f19Lg5XmR2M56wR8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-bold text-gold uppercase tracking-widest hover:text-brown-dark transition-colors"
          >
            Chỉ đường trên Google Maps →
          </a>
        </div>
      </section>
    </div>
  );
}
