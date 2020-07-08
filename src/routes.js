import Dashboard from "views/Dashboard.js";
import FieldOperator from "views/fieldoperator.js";
import Activejobs from "views/Activejobs.js";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/activejobs/:id",
    name: "Active",
    icon: "nc-icon nc-bank",
    component: Activejobs,
    layout: "/admin",
    showinsidebar: false
  },
  {
    path: "/fieldoperator",
    name: "Jobs Completed",
    icon: "nc-icon nc-diamond",
    component: FieldOperator,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Log out",
    icon: "nc-icon nc-simple-remove",
    layout: "",
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: UserPage,
  //   layout: "/admin",
  // }
];
export default routes;
