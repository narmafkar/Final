import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

const dashboardRoutes = [
  {
    path: "crud",
    name: "CRUD",
    icon: Dashboard,
    layout: "/",
  },
  {
    path: "userProfile",
    name: "userProfile",
    icon: Person,
    layout: "/",
  },
  {
    path: "Login",
    name: "Login",
    icon: Dashboard,
    layout: "/",
  },
  {
    path: "Payment",
    name: "Payment",
    icon: Person,
    layout: "/",
  },
  {
    path: "verification",
    name: "verification",
    icon: Dashboard,
    layout: "/",
  },
];
export default dashboardRoutes;
