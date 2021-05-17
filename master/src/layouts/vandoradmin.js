import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import { Container } from "reactstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/VandorSidebar";

import vandors from "vandorroute.js";

const Vandoradmin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getvandors = (vandors) => {
    return vandors.map((prop, key) => {
      if (prop.layout === "/vandoradmin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < vandors.length; i++) {
      if (
        props.location.pathname.indexOf(vandors[i].layout + vandors[i].path) !==
        -1
      ) {
        return vandors[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      <Sidebar
        {...props}
        vandors={vandors}
        logo={{
          innerLink: "/admin/index",
          imgSrc: require("../assets/img/brand/argon-react.png").default,
          imgAlt: "...",
        }}
      />
      <div className="main-content" ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getvandors(vandors)}
          <Redirect from="*" to="/vandoradmin/index" />
        </Switch>
        <Container fluid>
        {/*   <AdminFooter /> */}
        </Container>
      </div>
    </>
  );
};

export default Vandoradmin;
