import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const HomeView = Loadable(lazy(() => import("./viewHome")));
const AboutUsView = Loadable(lazy(() => import("./viewAboutUs")));
const ContactUsView = Loadable(lazy(() => import("./viewContactUs")));

const homeRoutes = [
  {
    path: "/home",
    element: <HomeView />,
    auth: authRoles.admin,
  },
  {
    path: "/aboutUs",
    element: <AboutUsView />,
    auth: authRoles.admin,
  },
  {
    path: "/ContactUs",
    element: <ContactUsView />,
    auth: authRoles.admin,
  },
];

export default homeRoutes;
