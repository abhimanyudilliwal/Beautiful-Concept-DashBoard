import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = (props) => {
  return (
    <>
      <div className="header pb-8 pt-5 pt-md-8" style={{background:'black',color:"white"}} >
        <Container fluid>
          <div className="header-body" style={{paddingTop:'150px'}}>
       <h1 style={{textAlign:"center"}}>{props.vandordashboard}</h1> 
       <h1 style={{textAlign:"center"}}>{props.vandorprojectdetails}</h1> 
       <h1 style={{textAlign:"center"}}>{props.Userdashboard}</h1> 
       <h1 style={{textAlign:"center"}}>{props.UserMaindashboard}</h1> 
       <h1 style={{textAlign:"center"}}>{props.Maindashboard}</h1> 
       <h1 style={{textAlign:"center"}}>{props.Mainservices}</h1> 
       <h1 style={{textAlign:"center"}}>{props.Mainrefunds}</h1> 
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;