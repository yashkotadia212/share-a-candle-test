import { register } from "swiper/element";

export const apiRoutes = {
  users: {
    getSingle: "/user",
    register: "/user/register",
    login:
      "/user/login" /* -------- /user/login/?email=email@email.com ------------*/,
  },
  event: {
    create: "/event/register",
  },
};
