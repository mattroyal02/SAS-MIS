import Loadable from "app/components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";

const AddingProjectView = Loadable(lazy(() => import("./addProject")));
const TestUpload = Loadable(lazy(() => import("./addProjectTesting")));
const StepperForm1 = Loadable(lazy(() => import("./addProjectTesting2")));
const StepperForm = Loadable(lazy(() => import("./addReport")));
const ProjectsView = Loadable(lazy(() => import("./viewProjects")));
const ProjectView = Loadable(lazy(() => import("./viewProject")));

const projectRoutes = [
  {
    path: "/addReport",
    // // element: <AddingProjectView />,
    // element: <TestUpload />,
    element: <StepperForm />,
    auth: authRoles.admin,
  },
  {
    path: "/reports",
    element: <ProjectsView />,
    auth: authRoles.admin,
  },
  {
    path: `/report/:id/edit`,
    element: <ProjectView />,
    auth: authRoles.admin,
  },
];

export default projectRoutes;
