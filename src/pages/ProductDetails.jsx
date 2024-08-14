import React from "react";
import TopHeaderResponsive from "../components/TopHeaderResponsive";
import HorizontalSeparator from "../components/HorizontalSeparator";
import { Button, Select } from "antd";
import { GrCart } from "react-icons/gr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const productdetailsData = [
  {
    title: "Jar color",
    value: "Blue",
  },
  {
    title: "Wax color",
    value: "White",
  },
  {
    title: "Material",
    value: "Glass",
  },
  {
    title: "Weight",
    value: "150 gm",
  },
];

const MAX_QUANTITY = 100;

const productImages = [
  { src: "https://via.placeholder.com/600x400?text=Image+1" },
  { src: "https://via.placeholder.com/600x400?text=Image+2" },
  { src: "https://via.placeholder.com/600x400?text=Image+3" },
];

const ProductDetails = () => {
  const [quantity, setQuantity] = React.useState(1);
  const [fragrance, setFragrance] = React.useState("blueberry_cobbler");

  const handleMinusQuantity = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  const handlePlusQuantity = () => {
    if (quantity === MAX_QUANTITY) return;
    setQuantity((prev) => prev + 1);
  };

  const handleMore = () => {
    document
      .getElementById("product-details-desc")
      .scrollIntoView({ behavior: "smooth" });
  };

  const handleLess = () => {
    document
      .getElementById("product-details-top")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <TopHeaderResponsive />
      <div className="grid grid-cols-2 mt-10 max-w-[1400px] m-auto">
        <div className="flex flex-col justify-center items-center">
          <ProductDetailImagesSlider images={productImages} />
        </div>
        <div className="p-10">
          <div className="text-2xl font-semibold">Product Name</div>
          <div className="text-xl mt-3">$ {"30.00"}</div>
          <HorizontalSeparator />
          <div className="h-[170px] overflow-auto no-scrollbar">
            <div id="product-details-top"></div>
            <TitleGray title="Product Details" />
            <div className="mt-2">
              {productdetailsData.map((item, index) => (
                <ProductDetailsItem
                  key={index}
                  title={item.title}
                  value={item.value}
                />
              ))}
            </div>
            <div>
              <Button
                type="link"
                className="-ms-[1.6rem] underline text-black hover:!text-black font-semibold"
                onClick={() => handleMore()}
              >
                More
              </Button>
            </div>

            <div id="product-details-desc">
              <div className="mt-2">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                <Button
                  type="link"
                  className="-ms-[1.6rem] -mt-3 underline text-black hover:!text-black font-semibold"
                  onClick={() => handleLess()}
                >
                  Less
                </Button>
              </div>
            </div>
          </div>
          <div>
            <TitleGray title="Choose Fragrance" />
            <Select
              value={fragrance}
              className="w-full mt-2"
              defaultValue="blueberry_cobbler"
              style={{ width: 280 }}
              options={[
                { label: "Blueberry Cobbler", value: "blueberry_cobbler" },
                { label: "Rose", value: "rose" },
                { label: "Jasmine", value: "jasmine" },
              ]}
              onChange={(value) => setFragrance(value)}
            />
          </div>
          <div>
            <TitleGray title="Quantity" />
            <div className="flex mt-2">
              <QuantitySelectorButton value="-" onClick={handleMinusQuantity} />
              <input
                value={quantity}
                type="number"
                className="w-10 !text-center p-1"
                readOnly
              />
              <QuantitySelectorButton value="+" onClick={handlePlusQuantity} />
            </div>
          </div>
          <div className="mt-7 w-full border">
            <Button className="w-full flex" type="primary">
              <div>
                <GrCart className="text-xl" />
              </div>
              <div>Add to Cart</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TitleGray = ({ title }) => {
  return <div className="text-gray-400 text-sm mt-5">{title}</div>;
};

const ProductDetailsItem = ({ title, value }) => {
  return (
    <div className="flex text-sm max-w-[220px]">
      <div className="w-1/2">{title}</div>
      <div className="w-1/2 flex gap-2">
        <div>:</div>
        <div>{value}</div>
      </div>
    </div>
  );
};

const QuantitySelectorButton = ({ value = "+", onClick }) => {
  return (
    <button
      className="bg-black pt-px px-2 text-white cursor-pointer"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

const ProductDetailImagesSlider = ({ images }) => {
  return (
    <div className="relative w-full max-w-xl">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        spaceBetween={10}
        slidesPerView={1}
        loop
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.src}
              alt={`Product Image ${index + 1}`}
              className="w-full max-w-md h-auto min-h-[450px] object-cover rounded-lg m-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute left-0 right-0 top-1/2">
        <div className="swiper-button-prev !h-10 !w-10 p-2">
          <GoChevronLeft className="text-black text-2xl" />
        </div>

        <div className="swiper-button-next !h-10 !w-10 p-2">
          <GoChevronRight className="text-black text-2xl" />
        </div>
      </div>

      {/* Custom Pagination Element */}
      <div className="custom-pagination absolute !left-[46%] !top-[105%]"></div>
    </div>
  );
};

export default ProductDetails;
