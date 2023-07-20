import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const StepperForm = Loadable(lazy(() => import("./addProduct")));
const ProductsView = Loadable(lazy(() => import("./viewProducts")));
// const Testing = Loadable(lazy(() => import("./testing")));
const ProductView = Loadable(lazy(() => import("./viewProduct")));

const productRoutes = [
  {
    path: "/addProduct",
    element: <StepperForm />,
    auth: authRoles.admin,
  },
  {
    path: "/products",
    element: <ProductsView />,
    auth: authRoles.admin,
  },
  // {
  //   path: "/testing",
  //   element: <Testing />,
  //   auth: authRoles.admin,
  // },
  {
    path: `/product/:productId/edit`,
    element: <ProductView />,
    auth: authRoles.admin,
  },
];

export default productRoutes;
