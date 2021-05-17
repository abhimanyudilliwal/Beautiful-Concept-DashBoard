
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";


import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-inputs/styles/material.css";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import VandorLayout from "layouts/vandor.js";
import VandoradminLayout from "layouts/vandoradmin.js";
import Mainauth from "layouts/Mainauth";
import Mainadmin from "layouts/Mainadmin"
import 'bootstrap/dist/css/bootstrap.min.css';
import {StoreProvider} from './StoreProvider'

ReactDOM.render(
  <StoreProvider>
    <NotificationContainer/>
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/vandor" render={(props) => <VandorLayout {...props} />} />
      <Route path="/vandoradmin" render={(props) => <VandoradminLayout {...props} />} />
      <Route path="/mainauth" render={(props) => <Mainauth {...props} />} />
      <Route path="/mainadmin" render={(props) => <Mainadmin {...props} />} />
      <Redirect exact from="/admin" to="/admin/index" />
      <Redirect exact from="/" to="/auth/login" />
      <Redirect exact from="/vandoradmin" to="/vandoradmin/index" />
      <Redirect exact from="/mainadmin" to="/mainadmin/index" />
    </Switch>
    
  </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);
