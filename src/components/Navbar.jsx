import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navData = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Fundraising",
    url: "/fundraising",
  },
  {
    id: 3,
    title: "Events",
    url: "/events",
  },
  {
    id: 4,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 5,
    title: "About Us",
    url: "/about-us",
  },
  {
    id: 6,
    title: "Careers",
    url: "/careers",
  },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <nav className="flex justify-between">
        <div>
          <ul className="flex pt-4">
            {navData.map((item) => (
              <li key={item.id} className="px-2">
                <a
                  className={`${
                    location.pathname === item.url
                      ? "underline underline-offset-4"
                      : ""
                  }`}
                  onClick={() => navigate(item.url)}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
