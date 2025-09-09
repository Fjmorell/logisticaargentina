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
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        className="h-[420px] sm:h-[300px] md:h-[450px] xl:h-[600px] max-h-[90vh] w-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        navigation
      >
        {imagenes.map((img) => {
          const videoId = img.isVideo ? extraerVideoId(img.url_imagen) : null;

          return (
            <SwiperSlide key={img.id}>
              {img.isVideo && img.url_imagen.includes("youtube") && videoId ? (
                <iframe
                  id={`youtube-player-${videoId}`}
                  className="h-full w-full rounded-md"
                  src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                  title={`YouTube video ${videoId}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  onLoad={() => {
                    if (window.YT && window.YT.Player) {
                      new window.YT.Player(`youtube-player-${videoId}`, {
                        events: {
                          onStateChange: (event) => {
                            const state = event.data;
                            if (state === window.YT.PlayerState.PLAYING) {
                              swiperRef.current?.autoplay?.stop?.();
                              setIsAutoplay(true);
                            } else if (state === window.YT.PlayerState.PAUSED) {
                              swiperRef.current?.autoplay?.start?.();
                              setIsAutoplay(false);
                            } else if (state === window.YT.PlayerState.ENDED) {
                              setIsAutoplay(false);
                              swiperRef.current?.autoplay?.start?.();
                            }
                          },
                        },
                      });
                    }
                  }}
                />
              ) : (
                <img
                  onClick={() => handleImage(img)}
                  src={img.url_imagen}
                  alt={`Slide ${img.id}`}
                  className="w-full h-full object-cover"
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
