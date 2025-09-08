import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import { API_URL } from "@/Api/Api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const [loadingImages, setLoadingImages] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const swiperRef = useRef(null);
  const [isAutoplay, setIsAutoplay] = useState(false);

  const getImages = async () => {
    try {
      setLoadingImages(true);
      const response = await axios.get(API_URL.CARRUSEL_LISTAR_ADMIN, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const imagesWithUrls = response.data.data.map((img, index) => ({
        nameImg: `Banner-${index + 1}`,
        file: null,
        ...img,
        preview: img.url_imagen,
      }));
      setImagenes(imagesWithUrls);
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    getImages();
    cargarYoutubeAPI();
  }, []);

  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop();
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && !isAutoplay) swiperRef.current.autoplay.start();
  };

  const handleSlideChange = (swiper) => {
    swiper.autoplay.start();
  };

  const extraerVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]+)/
    );
    return match ? match[1] : null;
  };

  const cargarYoutubeAPI = () => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  };

  const handleImage = (img) => {
    if (!img.isVideo && img.detalle.cuerpo && img.detalle.titulo) {
      navigate(`/detalle/${img.id}`);
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Swiper
        modules={[EffectFade, Navigation, Autoplay]}
        effect="slide"
        slidesPerView={1}
        loop
        autoplay={{ delay: 30000, disableOnInteraction: true }}
        className="w-full" // ocupa todo el ancho
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        navigation
      >
        {imagenes.map((img) => {
          const videoId = img.isVideo ? extraerVideoId(img.url_imagen) : null;

          return (
            <SwiperSlide key={img.id}>
       {/* Contenedor 21:9 */}
  <div className="relative w-full aspect-[21/9]">
    <img
      onClick={() => handleImage(img)}
      src={img.url_imagen}
      alt={`Slide ${img.id}`}
      className="absolute inset-0 w-full h-full object-cover object-center"
      loading="lazy"
    />
  </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
