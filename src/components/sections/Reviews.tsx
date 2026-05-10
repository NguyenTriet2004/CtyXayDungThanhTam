import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import levanminh from "../../assets/images/levanminh.jpg";
import nguyenthicam from "../../assets/images/nguyenthicam.jpg";
import regenedratedImage from "../../assets/images/regenerated_image_1778332926942.png";
const reviews = [
  {
    name: "Ông Nguyễn Văn Hùng",
    position: "Chủ đầu tư biệt thự Ninh Kiều",
    comment:
      "Tôi rất hài lòng với sự tận tâm và chuyên nghiệp của Thành Tâm. Ngôi nhà của tôi được hoàn thiện đẹp hơn cả mong đợi.",
    rating: 5,
    avatar: regenedratedImage,
  },
  {
    name: "Bà Trần Thị Cẩm",
    position: "Giám đốc chuỗi Spa Harmony",
    comment:
      "Phong cách thiết kế cổ điển của công ty rất đẳng cấp. Mọi chi tiết đều được chăm chút tỉ mỉ, tạo nên một không gian vô cùng sang trọng.",
    rating: 5,
    avatar: nguyenthicam,
  },
  {
    name: "Ông Lê Văn Minh",
    position: "Chủ khách sạn Grand Hotel",
    comment:
      "Tiến độ thi công nhanh chóng nhưng vẫn đảm bảo chất lượng tuyệt đối. Đây chắc chắn là đối tác tin cậy lâu dài của chúng tôi.",
    rating: 5,
    avatar: levanminh,
  },
];

export default function Reviews() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6 bg-brown-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gold uppercase tracking-[0.3em] text-sm font-bold mb-4">
              {t("reviews.title")}
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-brown-dark">
              Đối Tác & <span className="italic font-normal">Sự Hài Lòng</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="p-10 bg-brown-light border border-gold/10 relative shadow-sm"
            >
              <Quote
                className="absolute top-6 right-8 text-gold/10"
                size={60}
              />

              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="text-stone-600 italic mb-8 leading-relaxed font-light">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full border border-gold/20 object-cover"
                />
                <div>
                  <h5 className="text-brown-dark font-serif font-bold">
                    {review.name}
                  </h5>
                  <p className="text-stone-400 text-xs uppercase tracking-widest mt-1">
                    {review.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
