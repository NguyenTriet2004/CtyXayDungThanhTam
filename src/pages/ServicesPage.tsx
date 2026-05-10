import React from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Ruler,
  HardHat,
  Sofa,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const detailedServices = [
  {
    id: "architectural-design",
    title: "Thiết Kế Kiến Trúc",
    description:
      "Chúng tôi tạo ra những không gian sống độc bản, kết hợp giữa tính thẩm mỹ nghệ thuật và công năng sử dụng tối ưu. Mỗi bản thiết kế là một câu chuyện riêng biệt về phong cách của gia chủ.",
    icon: <Ruler className="text-gold" size={40} />,
    image: "/src/assets/images/thietkekientruc.jpg",
    features: [
      "Thiết kế kiến trúc biệt thự, nhà phố",
      "Quy hoạch mặt bằng tổng thể",
      "Diễn họa 3D kiến trúc ngoại thất",
      "Hồ sơ kỹ thuật thi công chi tiết",
    ],
  },
  {
    id: "construction",
    title: "Thi công Xây Dựng Trọn Gói",
    description:
      "Với đội ngũ kỹ sư và công nhân lành nghề, Thành Tâm cam kết chất lượng thi công đạt chuẩn cao nhất, đảm bảo tính bền vững và an toàn tuyệt đối cho mọi công trình.",
    icon: <HardHat className="text-gold" size={40} />,
    image: "/src/assets/images/thicongxaydung.jpg",
    features: [
      "Thi công phần thô & hoàn thiện",
      "Xây dựng trọn gói (Chìa khóa trao tay)",
      "Quản lý dự án chuyên nghiệp",
      "Cam kết không phát sinh chi phí",
    ],
  },
  {
    id: "interior-design",
    title: "Thiết Kế & Thi Công Nội Thất",
    description:
      "Hoàn thiện không gian sống với các món đồ nội thất tinh xảo, chất liệu cao cấp. Chúng tôi chuyên dòng nội thất Tân cổ điển & Luxury mang lại sự quyền quý cho ngôi nhà.",
    icon: <Sofa className="text-gold" size={40} />,
    image: "/src/assets/images/thietkenoithat.jpg",
    features: [
      "Sản xuất nội thất thủ công mỹ nghệ",
      "Trang trí phào chỉ - dát vàng",
      "Hệ thống ánh sáng & Smarthome",
      "Tư vấn vật liệu cao cấp",
    ],
  },
];

const steps = [
  {
    title: "Tiếp Nhận & Khảo Sát",
    desc: "Lắng nghe nhu cầu và khảo sát thực tế mặt bằng công trình.",
  },
  {
    title: "Ý Tưởng & Thiết Kế",
    desc: "Phác thảo ý tưởng và hoàn thiện bản vẽ kỹ thuật chi tiết.",
  },
  {
    title: "Báo Giá & Hợp Đồng",
    desc: "Minh bạch chi phí và ký kết hợp đồng thi công rõ ràng.",
  },
  {
    title: "Thi Công & Giám Sát",
    desc: "Triển khai công việc với sự giám sát chặt chẽ từ kỹ sư.",
  },
  {
    title: "Bàn Giao & Bảo Hành",
    desc: "Nghiệm thu công trình và thực hiện chính sách bảo trì.",
  },
];

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <div className="pt-20 bg-brown-light">
      {/* Page Header */}
      <section className="relative py-24 bg-brown-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-gold uppercase tracking-[0.4em] text-sm font-bold mb-4">
              What we do
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Dịch Vụ Chuyên Nghiệp
            </h1>
            <div className="h-1 w-24 bg-gold mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Main Services List */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {detailedServices.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col ${index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 items-center`}
            >
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 w-full"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 border border-gold/20 translate-x-4 translate-y-4 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[450px] object-cover shadow-2xl"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-3xl font-serif font-bold text-brown-dark mb-6">
                  {service.title}
                </h3>
                <p className="text-stone-600 mb-8 leading-relaxed text-lg">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-stone-500 text-sm"
                    >
                      <CheckCircle2 size={16} className="text-gold shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 text-brown-dark font-bold uppercase tracking-widest text-sm border-b-2 border-gold pb-1 hover:text-gold transition-colors"
                >
                  Yêu cầu tư vấn <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4">
              Quy Trình Làm Việc
            </h2>
            <h3 className="text-4xl font-serif font-bold text-brown-dark">
              Các Bước <span className="italic font-normal">Chuyên Nghiệp</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 bg-brown-light border border-gold/20 flex items-center justify-center rotate-45 mx-auto mb-10 group hover:bg-gold transition-colors">
                  <span className="text-gold group-hover:text-white font-serif font-bold text-xl -rotate-45">
                    {index + 1}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[65%] w-full h-[1px] bg-gold/20" />
                )}
                <h4 className="text-lg font-serif font-bold text-brown-dark mb-4">
                  {step.title}
                </h4>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-brown-dark p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-3xl -mr-32 -mt-32" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <ShieldCheck className="text-gold mx-auto mb-8" size={60} />
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 italic">
              Cam Kết Của Thành Tâm
            </h3>
            <p className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Chúng tôi không chỉ xây dựng những ngôi nhà, chúng tôi xây dựng sự
              an tâm. Mọi công trình đều được bảo hành kết cấu 5 năm và hỗ trợ
              bảo trì trọn đời.
            </p>
            <div className="flex flex-wrap justify-center gap-12 text-gold">
              <div>
                <p className="text-4xl font-serif font-bold mb-2">100%</p>
                <p className="text-xs uppercase tracking-widest text-stone-500">
                  Đúng Tiến Độ
                </p>
              </div>
              <div className="w-px h-12 bg-stone-800 hidden md:block" />
              <div>
                <p className="text-4xl font-serif font-bold mb-2">Không</p>
                <p className="text-xs uppercase tracking-widest text-stone-500">
                  Phát Sinh Chi Phí
                </p>
              </div>
              <div className="w-px h-12 bg-stone-800 hidden md:block" />
              <div>
                <p className="text-4xl font-serif font-bold mb-2">Sạch Sẽ</p>
                <p className="text-xs uppercase tracking-widest text-stone-500">
                  Công Trường Văn Minh
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
