import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const ReportsView = Loadable(lazy(() => import("./viewReports")));
const ReportView = Loadable(lazy(() => import("./viewReport")));
// const EditQuotation = Loadable(lazy(() => import("./EditQuotation")));

const reportRoutes = [
  {
    path: "/reports",
    element: <ReportsView />,
    auth: authRoles.admin,
  },
  {
    path: `/reports/:id`,
    element: <ReportView />,
    auth: authRoles.admin,
  },
  // {
  //   path: "/quotations/:orderId/edit",
  //   element: <EditQuotation />,
  //   auth: authRoles.admin,
  // },
];

export default reportRoutes;
