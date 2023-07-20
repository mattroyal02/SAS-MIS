import AuthGuard from "app/auth/AuthGuard";
import accountProfileRoutes from "app/views/account/AccountRoutes";
import dashboardRoutes from "app/views/dashboard/DashboardRoutes";
import reportRoutes from "app/views/orders/ReportRoutes";
import productRoutes from "./views/product/ProductRoutes";
import projectRoutes from "./views/project/ProjectRoutes";
import tokenRoutes from "./views/tokens/TokensRoutes";

import materialRoutes from "app/views/material-kit/MaterialRoutes";
import NotFound from "app/views/sessions/NotFound";
import sessionRoutes from "app/views/sessions/SessionRoutes";
import { Navigate } from "react-router-dom";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import homeRoutes from "./views/home/homeRoutes";

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,

      ...reportRoutes,
      ...materialRoutes,
      ...accountProfileRoutes,
      ...tokenRoutes,
      ...projectRoutes,
      ...productRoutes,
      // ...homeRoutes,
    ],
  },

  ...homeRoutes,
  ...sessionRoutes,

  { path: "/", element: <Navigate to="dashboard/default" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
