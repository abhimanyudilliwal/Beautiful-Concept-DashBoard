

import Services from "Main/example/Services";
import Login from "Main/example/login";
import Index from "Main/index";
import 'react-notifications/lib/notifications.css';
import Refunds from "Main/example/Refunds";




var mainroute = [
  {
    path: "/index",
    name: "deshboard",
    icon: "ni ni-circle-08 text-pink",
    component: Index,
    layout: "/mainadmin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/mainauth",
  },
  {
    path: "/services",
    name: "Services",
    icon: "ni ni-circle-08 text-pink",
    component: Services,
    layout: "/mainadmin",
  },
  {
    path: "/refund",
    name: "refunds",
    icon: "ni ni-circle-08 text-pink",
    component: Refunds,
    layout: "/mainadmin",
  },
  
];
export default mainroute;
