import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const productGridData = [
  {
    id: 1,
    name: "Product 1",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 2,
    name: "Product 2",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 3,
    name: "Product 3",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 4,
    name: "Product 4",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 5,
    name: "Product 5",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 6,
    name: "Product 6",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 7,
    name: "Product 7",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 8,
    name: "Product 8",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 9,
    name: "Product 9",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 10,
    name: "Product 10",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 11,
    name: "Product 11",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 12,
    name: "Product 12",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 13,
    name: "Product 13",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 14,
    name: "Product 14",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 15,
    name: "Product 15",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 16,
    name: "Product 16",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 17,
    name: "Product 17",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 18,
    name: "Product 18",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 19,
    name: "Product 19",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 20,
    name: "Product 20",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 21,
    name: "Product 21",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 22,
    name: "Product 22",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 23,
    name: "Product 23",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 24,
    name: "Product 24",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 25,
    name: "Product 25",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
  {
    id: 26,
    name: "Product 26",
    image:
      "https://cdn.shopify.com/s/files/1/0699/7403/2615/files/OZ.MASONJAR.jpg?v=1722514266",
  },
];

function divideArrayIntoChunks(arr, chunkSize) {
  const result = [];
  let i = 0;
  const lengths = [chunkSize, chunkSize - 1];

  while (i < arr.length) {
    const currentLength = lengths[result.length % 2];
    result.push(arr.slice(i, i + currentLength));
    i += currentLength;
  }

  return result;
}

const getChunkSizeBasedOnScreenWidth = (breakpoint) => {
  const values = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 5, // '2xl' gets the same value as 'xl'
  };

  return values[breakpoint] || 1; // Default to 1 if no valid breakpoint is found
};

const ProductParentGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [350, isInView ? -550 : 0]);

  return (
    <div ref={ref} className="h-[350px] overflow-hidden my-24">
      <motion.div style={{ y }}>
        {divideArrayIntoChunks(productGridData, 7).map((chunk, index) => (
          <ProductGrid key={chunk[0]?.id} products={chunk} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

const ProductGrid = ({ products, index }) => {
  const marginLeftClass = index % 2 === 0 ? "" : "";

  return (
    <div className={`flex gap-24 justify-center my-10 ${marginLeftClass}`}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="flex items-center gap-2 min-w-48">
      <div>
        <img className="w-32" alt="product image" src={product.image} />
      </div>
      <div>{product.name}</div>
    </div>
  );
};

export default ProductParentGrid;
