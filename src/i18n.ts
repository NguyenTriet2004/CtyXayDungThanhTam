import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      vi: {
        translation: {
          nav: {
            home: 'Trang Chủ',
            services: 'Dịch Vụ',
            projects: 'Công Trình',
            blog: 'Kiến Thức',
            about: 'Giới Thiệu',
            contact: 'Liên Hệ',
            login: 'Đăng Nhập',
            logout: 'Đăng Xuất',
          },
          hero: {
            title: 'Xây Dựng Niềm Tin, Kiến Tạo Tương Lai',
            subtitle: 'Công ty TNHH Thành Tâm - Giải pháp xây dựng toàn diện với phong cách sang trọng và bền vững.',
            cta: 'Khám Phá Công Trình',
          },
          services: {
            title: 'Dịch Vụ Của Chúng Tôi',
            design: 'Thiết Kế Kiến Trúc',
            build: 'Thi công Xây Dựng',
            interior: 'Hoàn Thiện Nội Thất',
          },
          projects: {
            title: 'Dự Án Tiêu Biểu',
            viewAll: 'Xem Tất Cả Công Trình',
          },
          reviews: {
            title: 'Khách Hàng Nói Gì Về Chúng Tôi',
          },
          footer: {
            about: 'Thành Tâm - 53/56 Nguyễn Việt Dũng. Chuyên tư vấn thiết kế và thi công xây dựng chuyên nghiệp.',
            contact: 'Liên Hệ',
          }
        }
      },
      en: {
        translation: {
          nav: {
            home: 'Home',
            services: 'Services',
            projects: 'Projects',
            blog: 'Blog',
            about: 'About',
            contact: 'Contact',
            login: 'Login',
            logout: 'Logout',
          },
          hero: {
            title: 'Building Trust, Creating Future',
            subtitle: 'Thanh Tam Co., Ltd - Comprehensive construction solutions with luxury and sustainable style.',
            cta: 'Explore Projects',
          },
          services: {
            title: 'Our Services',
            design: 'Architectural Design',
            build: 'Construction',
            interior: 'Interior Finishing',
          },
          projects: {
            title: 'Featured Projects',
            viewAll: 'View All Projects',
          },
          reviews: {
            title: 'Client Testimonials',
          },
          footer: {
            about: 'Thanh Tam - 53/56 Nguyen Viet Dung. Professional architectural design and construction services.',
            contact: 'Contact Us',
          }
        }
      }
    }
  });

export default i18n;
