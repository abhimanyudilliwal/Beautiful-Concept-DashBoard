
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Project from "views/examples/Projects.js";
import Service from "views/examples/Services.js";
import Billing from "views/examples/Billing.js";
import Refunds from "views/examples/Refunds.js";
import Billingmontly from 'views/examples/Billingmontly.js'
import Billingyearly from 'views/examples/BillingYearly.js'
import MonthlyView from 'views/examples/MonthlyView.js'
import Yearlyview from 'views/examples/Yearlyview.js'
import 'react-notifications/lib/notifications.css';
import Approve from "views/examples/Approve";
import Reset from 'views/examples/resetpassword'


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-white",
    component: Index,
    layout: "/admin",
  },
   {
    path: "/projects",
    name: "Project",
    icon: "ni ni-collection text-white",
    component: Project,
    layout: "/admin",
  },
  {
    path: "/Service",
    name: "Service",
    icon: "ni ni-hat-3 text-white",
    component: Service,
    layout: "/admin",
  },
  {
    path: "/Billing",
    name: "Billing",
    icon: "ni ni-money-coins text-white",
    component: Billing,
    layout: "/admin",
  },
  {
    path: "/Billingmontly",
    name: "Billingmontly",
    icon: "ni ni-active-40 text-white",
    component: Billingmontly,
    layout: "/admin",
  },
  {
    path: "/Billingyearly",
    name: "Billingyearly",
    icon: "ni ni-app text-white",
    component: Billingyearly,
    layout: "/admin",
  },
  {
    path: "/Refunds",
    name: "User_Action",
    icon: "ni ni-box-2 text-white",
    component: Refunds,
    layout: "/admin",
  },
  {
    path: "/MonthlyView",
    name: "MonthlyView",
    icon: "ni ni-diamond text-white",
    component: MonthlyView,
    layout: "/admin",
  },
  {
    path: "/Yearlyview",
    name: "Yearlyview",
    icon: "ni ni-chat-round text-white",
    component: Yearlyview,
    layout: "/admin",
  },{
    path: "/approve",
    name: "Approve",
    icon: "ni ni-building text-white",
    component: Approve,
    layout: "/admin",
  },
  /* {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  }, */
 /*  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  }, */
  /* {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  }, */
  /* {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  }, */
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-white",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-white",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/reset",
    name: "Rese",
    icon: "ni ni-circle-08 text-white",
    component: Reset,
    layout: "/auth",
  },
];
export default routes;
