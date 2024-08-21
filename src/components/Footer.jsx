import { Link, useNavigate } from "react-router-dom";
import { navData } from "../components/Navbar";
import CustomButton from "./CustomButton";

const activeRoute = "underline underline-offset-4 text-primary-color2";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-container px-10 py-12 bg-theme-background">
      <div className="container max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="col-span-1 md:col-span-3 mb-6">
            <div className="footer-logo">
              <div className="font-jua text-3xl" onClick={() => navigate("/")}>
                <p className="cursor-pointer">Share a</p>
                <p className="-mt-1 cursor-pointer">Candle</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-6 mb-6 pl-0 lg:pl-12">
            <div className="footer-links mb-8 lg:mb-20">
              <ul className="grid md:grid-cols-3 grid-cols-2 gap-y-5">
                {navData?.map((item) => (
                  <li
                    key={item.id}
                    className={`font-poppins text-base font-normal leading-[20px] capitalize text-gray-500 hover:text-black transition ${
                      location.pathname === item.url ? activeRoute : ""
                    }`}
                  >
                    <Link to={item.url}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-primary-color12 w-[45px] h-[1px] border-t-1"></div>
            <div className="pt-7">
              <p className="font-poppins text-base font-normal leading-[24px] text-primary-color2">
                000 000 0000
              </p>
              <span className="font-poppins text-base font-normal leading-[24px] mb-5 text-primary-color2">
                Loremipsum@gmail.com
              </span>
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 flex lg:justify-end">
            <CustomButton type="primary" onClick={() => navigate("/store")}>
              Get in touch
            </CustomButton>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
