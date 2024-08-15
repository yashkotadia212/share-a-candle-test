// StoreProductsSlider.js
import React, { useEffect } from "react";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { LuMoveRight, LuMoveLeft } from "react-icons/lu"; // Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const StoreProductsSlider = ({ totalProducts, chunkSize = 8 }) => {
  const [chunkedProducts, setChunkedProducts] = React.useState([]);
  // Split products into chunks of 8 for each slide

  useEffect(() => {
    const chunkedProducts = [];
    for (let i = 0; i < totalProducts.length; i += chunkSize) {
      chunkedProducts.push(totalProducts.slice(i, i + chunkSize));
    }
    setChunkedProducts(chunkedProducts);
  }, [totalProducts, chunkSize]);

  return (
    <div className="px-16 mt-10 store-product-slider relative">
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop
      >
        {chunkedProducts?.map((productChunk, index) => (
          <SwiperSlide className="w-full" key={index}>
            <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-5">
              {productChunk?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute left-0 right-0 top-1/2">
        <div className="swiper-button-prev rounded-full border border-black !h-10 !w-10 p-2">
          <LuMoveLeft className="text-black text-2xl" />
        </div>

        <div className="swiper-button-next rounded-full border border-black !h-10 !w-10 p-2">
          <LuMoveRight className="text-black text-2xl" />
        </div>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, event, teamMember }) => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full max-w-[350px] h-[420px] rounded-xl border border-gray-200 shadow-lg bg-gray-50 hover:shadow-xl cursor-pointer transition"
      onClick={() => navigate("/product-details")}
    >
      <div
        className="w-full h-72 rounded-lg"
        style={{
          backgroundImage: `url(${product?.image?.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="m-1 flex flex-col h-[210px] p-2">
        <div className="text-xl font-semibold underline">
          {product?.title?.replace(/-/g, " ")}
        </div>
        <div className="text-xl absolute right-5 top-5 text-black font-semobold backdrop-blur-xl rounded-full p-1 px-2">
          ${5}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {product?.body_html?.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100)}
        </div>
      </div>
    </div>
  );
};

export default StoreProductsSlider;
