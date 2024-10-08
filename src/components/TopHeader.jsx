import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { LuShoppingCart } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import VerticalSeparator from "../components/VerticalSeparator";
import HorizontalSeparator from "../components/HorizontalSeparator";
import useAuthStore from "../zustand/authStore";
import { SlLogin } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";
import { logOutUser } from "../utils/userManagementUtils";
import { Badge, Button, Empty, Modal } from "antd";
import { MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const productsData = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  {
    id: 3,
    name: "Cotton Fleece Joggers",
    href: "#",
    color: "Indigo",
    price: "$85.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-03.jpg",
    imageAlt:
      "Indigo cotton fleece joggers with elastic waist and white drawstring.",
  },
];

const MAX_QUANTITY = 100;

function calculateCartProductsTotal(products) {
  return products?.reduce((total, product) => {
    const price = parseFloat(product.price.replace("$", "")); // Convert price string to a number
    return total + price * product.quantity; // Multiply price by quantity and add to total
  }, 0);
}

const TopHeader = () => {
  const navigate = useNavigate();
  const { auth, removeAuth } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState();

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleLogout = () => {
    logOutUser();
    removeAuth();
    navigate("/sign-in");
  };

  const handleMinusQuantity = (id, currentQuantity) => {
    if (currentQuantity === 1) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handlePlusQuantity = (id, currentQuantity) => {
    if (currentQuantity === MAX_QUANTITY) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const showConfirmLogout = () => {
    Modal.confirm({
      title: "Are you sure you want to logout?",
      content: "You will be logged out of the application.",
      centered: true,
      okText: "Yes, Logout",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleLogout();
      },
      okButtonProps: {
        className: "!bg-red-500 !text-white",
      },
      onCancel() {
        console.log("Logout cancelled");
      },
      cancelButtonProps: {
        className: "hover:!border-black hover:!text-black",
      },
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mt-2 my-5">
        <div className="h-full flex items-center">
          <div className="font-jua text-3xl" onClick={() => navigate("/")}>
            <p className="cursor-pointer">Share a</p>
            <p className="-mt-1 cursor-pointer">Candle</p>
          </div>
        </div>
        <div className="h-full flex items-center">
          <Navbar />
        </div>
        <div className="flex gap-3 mt-5">
          <button>
            <IoLocationOutline className="text-2xl" />
          </button>
          <VerticalSeparator height="35px" margin={1} />
          {auth.token && (
            <>
              <button onClick={() => setOpen(true)}>
                <Badge
                  color="black"
                  className="mt-2"
                  count={products ? products.length : 0}
                >
                  <LuShoppingCart className="text-2xl" />
                </Badge>
              </button>
              <VerticalSeparator height="35px" margin={1} />
            </>
          )}

          {auth && auth.token ? (
            <button>
              <GrLogout
                title="Logout"
                className="text-2xl"
                onClick={() => showConfirmLogout()}
              />
            </button>
          ) : (
            <button>
              <SlLogin
                title="Login"
                className="text-2xl"
                onClick={() => navigate("/sign-in")}
              />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: open ? 0 : "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed z-50 top-0 right-0 p-0 h-screen w-full max-w-[500px] bg-white shadow-xl px-4 py-6 sm:px-6"
        >
          <div className="flex flex-col min-h-[95vh] max-h-[95vh]">
            <div className="w-full text-3xl font-semibold flex items-center">
              <div>Your Cart</div>
              <MdClose
                onClick={() => setOpen(false)}
                className="text-2xl ms-auto cursor-pointer hover:bg-gray-200 transition"
              />
            </div>
            <HorizontalSeparator />

            {products?.length === 0 ? (
              <div className="flex-1 grid place-items-center">
                <Empty description="Your cart is empty" />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {products?.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              alt={product.imageAlt}
                              src={product.imageSrc}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <div className="font-semibold">
                                  <a href={product.href}>{product.name}</a>
                                </div>
                                <p className="ml-4 text-xl">{product.price}</p>
                              </div>
                              <p className="text-sm text-gray-400">
                                {product.color}
                              </p>
                            </div>
                            <div className="mt-5 flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-400">Quantity</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex mt-2">
                                <QuantitySelectorButton
                                  value="-"
                                  onClick={() =>
                                    handleMinusQuantity(
                                      product.id,
                                      product.quantity
                                    )
                                  }
                                />
                                <input
                                  value={product.quantity}
                                  type="number"
                                  className="w-10 !text-center p-1 border"
                                  readOnly
                                />
                                <QuantitySelectorButton
                                  value="+"
                                  onClick={() =>
                                    handlePlusQuantity(
                                      product.id,
                                      product.quantity
                                    )
                                  }
                                />
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-gray-400 hover:text-gray-300 transition"
                                  onClick={() =>
                                    setProducts((prev) =>
                                      prev.filter((p) => p.id !== product.id)
                                    )
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            <HorizontalSeparator />

            <div className="border-gray-200">
              <div className="flex justify-between text-2xl text-black font-semibold">
                <p>Subtotal</p>
                <p>${calculateCartProductsTotal(products)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Button className="w-full" type="primary">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
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

export default TopHeader;
