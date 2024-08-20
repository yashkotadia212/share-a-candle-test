import React from "react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "City View",
    description: "Beautiful city skyline during sunset.",
    image: "https://source.unsplash.com/random/800x800/?city,sunset",
  },
  {
    id: 2,
    title: "Night City",
    description: "City lights glowing at night.",
    image: "https://source.unsplash.com/random/800x800/?city,night",
  },
  {
    id: 3,
    title: "Space View",
    description: "A distant planet in space.",
    image: "https://source.unsplash.com/random/800x800/?planet,space",
  },
  {
    id: 4,
    title: "Galactic Wonder",
    description: "A beautiful galaxy in the night sky.",
    image: "https://source.unsplash.com/random/800x800/?galaxy,night",
  },
];

const ImageSlider = () => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[500px] bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h2 className="text-2xl font-semibold">{slide.title}</h2>
                <p className="mt-2 text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
