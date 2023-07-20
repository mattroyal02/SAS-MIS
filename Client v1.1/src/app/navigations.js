export const navigations = (role) => [
  ...(role !== "admin"
    ? [
        {
          name: "MIS Dashboard",
          path: "/dashboard/default",
          icon: "dashboard",
        },
        // {
        //   name: "TESTING",
        //   path: "/testing",
        //   icon: "dashboard",
        // },
        { label: "REPORTS", type: "label" },
        {
          name: "Game",
          path: "/levels",
          icon: "view_agenda",
        },
        { label: "ACCOUNT", type: "label" },

        { name: "My Profile", path: "/profile", icon: "person_pin" },
      ]
    : [
        {
          name: "MIS Dashboard",
          path: "/dashboard/default",
          icon: "dashboard",
        },
        // {
        //   name: "TESTING",
        //   path: "/testing",
        //   icon: "dashboard",
        // },
        { label: "REPORTS", type: "label" },
        {
          name: "View Reports",
          path: "/reports",
          icon: "assessment",
        },
        {
          name: "Add a Report",
          path: "/addReport",
          icon: "summarize",
        },
        { label: "SETTINGS", type: "label" },
        {
          name: "Configure Bin Products",
          path: "/products",
          icon: "settings_input_component",
        },
        {
          name: "Configure Scale Products",
          path: "/scales",
          icon: "settings",
        },
        {
          name: "Configure Multipliers",
          path: "/reports",
          icon: "phonelink_setup",
        },
        { label: "ACCOUNT", type: "label" },

        { name: "My Profile", path: "/profile", icon: "person_pin" },
        { name: "form", path: "/material/form", icon: "add" },
      ]),
];
