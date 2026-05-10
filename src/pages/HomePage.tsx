import React from 'react';
import Layout from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import Hero from '@/src/components/sections/Hero';
import Services from '@/src/components/sections/Services';
import FeaturedProjects from '@/src/components/sections/FeaturedProjects';
import Reviews from '@/src/components/sections/Reviews';

import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brown-light">
      <Hero />
      <div className="relative z-10 -mt-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 bg-white border border-gold/20 shadow-2xl">
          <div className="p-10 border-b md:border-b-0 md:border-r border-gold/10">
            <h4 className="text-gold font-serif text-2xl mb-4">15+ Năm</h4>
            <p className="text-sm text-stone-400 uppercase tracking-widest">Kinh nghiệm trong ngành</p>
          </div>
          <div className="p-10 border-b md:border-b-0 md:border-r border-gold/10">
            <h4 className="text-gold font-serif text-2xl mb-4">500+ Dự Án</h4>
            <p className="text-sm text-stone-400 uppercase tracking-widest">Đã hoàn thành xuất sắc</p>
          </div>
          <div className="p-10">
            <h4 className="text-gold font-serif text-2xl mb-4">100% Phản Hồi</h4>
            <p className="text-sm text-stone-400 uppercase tracking-widest">Khách hàng hài lòng</p>
          </div>
        </div>
      </div>
      <Services />
      <FeaturedProjects />
      <div className="py-24 px-6 bg-brown flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/10 blur-[120px] -z-10" />
        <h2 className="text-white font-serif text-4xl md:text-5xl font-bold mb-8 italic">Bạn đã sẵn sàng xây dựng ngôi nhà mơ ước?</h2>
        <p className="text-white max-w-2xl mb-10 text-lg italic">Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí bởi các chuyên gia kiến trúc hàng đầu.</p>
        <Link to="/contact" className="bg-white text-brown-dark px-12 py-5 rounded-sm font-bold uppercase tracking-[0.2em] hover:bg-gold hover:text-white transition-all shadow-xl inline-block">Liên hệ ngay</Link>
      </div>
      <Reviews />
    </div>
  );
}
