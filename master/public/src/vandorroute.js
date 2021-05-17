
/* import Index from "views/Index.js"; */
import Index from "vandorviews/index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "vandorviews/example/Registration.js";
import Login from "vandorviews/example/login";
import Userassign from "vandorviews/example/Userassign";
import Suggestion from "vandorviews/example/Suggestion";
import Requests from "vandorviews/example/Request";
import uploadfile from "vandorviews/example/Uploadfile";
import Dailyreport from "vandorviews/example/Dailyreport";
import Projectdetails from "vandorviews/example/Projectdetails";
import Hourly from "vandorviews/example/Hourly";
import Cash from "vandorviews/example/Cash";
import SOP from "vandorviews/example/SOP";
import SOP1 from "vandorviews/example/SOP1";
import SOP2 from "vandorviews/example/SOP2";
import Team from "vandorviews/example/Team";


import 'react-notifications/lib/notifications.css';
import Approve from "vandorviews/example/Approve";


var vandors = [ {
  path: "/index",
  name: "Dashboard",
  icon: "ni ni-tv-2 text-white",
  component: Index,
  layout: "/vandoradmin",
},/* {
  path: "/operation",
  name: "Operation",
  icon: "ni ni-tv-2 text-primary",
  component: Operation,
  layout: "/vandoradmin",
}, */{
  path: "/projectdetails",
  name: "projectdetails",
  icon: "ni ni-tv-2 text-white",
  component: Projectdetails,
  layout: "/vandoradmin",
},
  {
    path: "/Userassign",
    name: "Userassign",
    icon: "ni ni-app text-white",
    component: Userassign,
    layout: "/vandoradmin",
  }, 
  {
    path: "/Suggestion",
    name: "Suggestion",
    icon: "ni ni-shop text-white",
    component: Suggestion,
    layout: "/vandoradmin",
  },
  {
    path: "/Requests",
    name: "Requests",
    icon: "ni ni-world text-white",
    component: Requests,
    layout: "/vandoradmin",
  },
  {
    path: "/uploadfile",
    name: "uploadfile",
    icon: "ni ni-ui-04 text-white",
    component: uploadfile,
    layout: "/vandoradmin",
  },
  {
    path: "/dailyreport",
    name: "Dailyreport",
    icon: "ni ni-circle-08 text-white",
    component: Dailyreport,
    layout: "/vandoradmin",
  },/* {
    path: "/SOP1",
    name: "SOP1",
    icon: "ni ni-circle-08 text-pink",
    component: SOP1,
    layout: "/vandoradmin",
  },{
    path: "/SOP2",
    name: "SOP2",
    icon: "ni ni-circle-08 text-pink",
    component: SOP2,
    layout: "/vandoradmin",
  }, */{
    path: "/sop",
    name: "SOP",
    icon: "ni ni-air-baloon text-white",
    component: SOP,
    layout: "/vandoradmin",
  },
   {
    path: "/hourly",
    name: "Hourly",
    icon: "ni ni-tag text-white",
    component: Hourly,
    layout: "/vandoradmin",
  },
  {
    path: "/cash",
    name: "Cash",
    icon: "ni ni-note-03 text-white",
    component: Cash,
    layout: "/vandoradmin",
  },
  {
    path: "/dailyreport",
    name: "Dailyreport",
    icon: "ni ni-tie-bow text-white",
    component: Dailyreport,
    layout: "/vandoradmin",
  },{
    path: "/Team",
    name: "Team",
    icon: "ni ni-user-run text-white",
    component: Team,
    layout: "/vandoradmin",
  },
  {
    path: "/Approve",
    name: "Approve",
    icon: "ni ni-circle-08 text-white",
    component: Approve,
    layout: "/vandoradmin",
  },{
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-white",
    component: Login,
    layout: "/vandor",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-white",
    component: Register,
    layout: "/vandor",
  },

];
export default vandors;
