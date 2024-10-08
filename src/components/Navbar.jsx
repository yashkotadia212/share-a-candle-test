import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const navData = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 3,
    title: "Events",
    url: "/events",
  },
  {
    id: 5,
    title: "About Us",
    url: "/about-us",
  },
  {
    id: 7,
    title: "Organize an Event",
    url: "/organize-event",
  },
  {
    id: 8,
    title: "Join Team",
    url: "/join-team",
  },
  {
    id: 9,
    title: "Store",
    url: "/store",
  },
  {
    id: 10,
    title: "Admin",
    url: "/admin",
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
              <li key={item.id} className="px-2 cursor-pointer">
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
