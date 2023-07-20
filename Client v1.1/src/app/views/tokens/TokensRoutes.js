import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const TokensView = Loadable(lazy(() => import("./viewTokens")));
const TokenView = Loadable(lazy(() => import("./viewToken")));

const tokenRoutes = [
  {
    path: "/tokens",
    element: <TokensView />,
    auth: authRoles.admin,
  },
  {
    path: `/tokens/:id`,
    element: <TokenView />,
    auth: authRoles.admin,
  },
];

export default tokenRoutes;
