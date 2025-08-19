import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Importa estilos y módulo de autoplay
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

import img1 from "@/assets/empresas/inter.webp";
import img2 from "@/assets/empresas/loginter1.webp";
import img3 from "@/assets/empresas/oca.webp";
import img4 from "@/assets/empresas/pavetron.webp";
import img5 from "@/assets/empresas/urbano.webp";
import img6 from "@/assets/empresas/OCASA_optimized.webp";
import img7 from "@/assets/empresas/andesmar.webp";
import img8 from "@/assets/empresas/wq.webp";

function HeaderBottom() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div className='w-full px-2 py-6 bg-gradient-to-r from-blue-50 to-indigo-50'>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={5000}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 15 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 25 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
          1280: { slidesPerView: 6, spaceBetween: 35 },
        }}
        className='mySwiper'
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center h-64 p-2 bg-white rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
              <img
                src={img}
                alt={`Logo ${index}`}
                className="max-w-full h-[250px] object-contain block"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjcyODAiPkxvZ28gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3ZnPg==';
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeaderBottom;