// SwiperComponent.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const ThreeDCarousel = () => {
  // return (
  //   <div className="swiper-container min-h-[400px] border">
  //     <Swiper
  //       modules={[Pagination, Navigation]}
  //       slidesPerView={1}
  //       loop={true}
  //       effect="coverflow"
  //       grabCursor={true}
  //       centeredSlides={true}
  //       spaceBetween={-100}
  //       coverflowEffect={{
  //         rotate: 0,
  //         stretch: 0,
  //         depth: 800,
  //         modifier: 1,
  //         slideShadows: false,
  //       }}
  //       pagination={{
  //         clickable: true,
  //       }}
  //       navigation={true}
  //       className="swiper-container"
  //     >
  //       {[...Array(20).keys()].map((index) => (
  //         <SwiperSlide key={index} className="swiper-slide">
  //           <div className="w-24 h-24 border">{`Slide ${index + 1}`}</div>
  //         </SwiperSlide>
  //       ))}
  //     </Swiper>
  //     {/* <div className="swiper-button-prev"></div>
  //     <div className="swiper-button-next"></div> */}
  //   </div>
  // );

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      ...
    </Swiper>
  );
};

export default ThreeDCarousel;
