import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Home, HardHat, PenTool, Ruler, ShieldCheck, Zap } from 'lucide-react';

const services = [
  {
    icon: <Home className="text-gold" size={32} />,
    title: 'Xây Dựng Dân Dụng',
    desc: 'Thi công biệt thự, nhà phố với tiêu chuẩn kỹ thuật cao và thẩm mỹ tối ưu.'
  },
  {
    icon: <Ruler className="text-gold" size={32} />,
    title: 'Thiết Kế Kiến Trúc',
    desc: 'Sáng tạo không gian sống đẳng cấp, mang đậm dấu ấn cá nhân của gia chủ.'
  },
  {
    icon: <PenTool className="text-gold" size={32} />,
    title: 'Thiết Kế Nội Thất',
    desc: 'Hoàn thiện không gian nội thất sang trọng, tiện nghi và tinh tế.'
  },
  {
    icon: <HardHat className="text-gold" size={32} />,
    title: 'Xây Dựng Công Nghiệp',
    desc: 'Giải pháp xây dựng nhà xưởng, kho bãi chuyên nghiệp và bền vững.'
  },
  {
    icon: <ShieldCheck className="text-gold" size={32} />,
    title: 'Giám Sát Công Trình',
    desc: 'Đảm bảo chất lượng và tiến độ thi công chính xác theo cam kết.'
  },
  {
    icon: <Zap className="text-gold" size={32} />,
    title: 'Sửa Chữa & Cải Tạo',
    desc: 'Làm mới không gian sống của bạn với các giải pháp cải tạo hiện đại.'
  }
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-brown-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4">{t('services.title')}</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brown-dark mb-6">Giải Pháp Xây Dựng <span className="italic font-normal">Toàn Diện</span></h3>
            <div className="h-1 w-20 bg-gold mx-auto" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-10 bg-brown-light border border-gold/10 hover:border-gold/30 hover:-translate-y-2 transition-all duration-300 group shadow-sm"
            >
              <div className="mb-6 p-4 rounded-full border border-gold/20 inline-block group-hover:bg-gold/10 transition-all">
                {service.icon}
              </div>
              <h4 className="text-xl font-serif font-bold text-brown-dark mb-4 group-hover:text-gold transition-colors">{service.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
