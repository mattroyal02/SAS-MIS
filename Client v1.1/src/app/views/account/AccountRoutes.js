import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const ProfileView = Loadable(lazy(() => import("./AccountProfileView")));

const accountProfileRoutes = [
  {
    path: "/profile",
    element: <ProfileView />,
    auth: authRoles.admin,
  },
];

export default accountProfileRoutes;
