import React, { useState,useEffect } from "react";

import classnames from "classnames";

import Chart from "chart.js";

import { Line, Bar } from "react-chartjs-2";
import axios from 'axios'
import {Button} from 'react-bootstrap'

import {
 
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [user, setUser] = useState([])
  const [userdata, setUserData] = useState([])
  const[upwork,setUpwork] =useState([])
  const[usercomplain,setUserCompain] =useState([])
  const[vandorwork,setVandorwork] =useState(true)
  const[uploadwork,setUploadwork] =useState(false)
  const[sopwork,setSopwork] =useState(false)
  const[complain,setComplain] =useState(false)
  const loggedInUser = localStorage.getItem('id');
  console.log(loggedInUser)
  const foundUser = JSON.parse(loggedInUser);
  console.log(foundUser)
 
  
  useEffect(() => {
    vandoruser();
    SOPuser();
    uploadworkUser();
    setUserComplain();
 
  }, []);

  const vandoruser =() =>{
    const localid= localStorage.getItem('vandoruser')
    axios.get('http://localhost:3001/vandoruser/' + localid)
      .then((res) => {
        setUserData(res.data.data)
        console.log(userdata)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }

  const SOPuser =() =>{
    axios.get('http://localhost:3001/vandorreq')
      .then((res) => {
        setUser(res.data.data)
        console.log(userdata)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }
  const uploadworkUser =() =>{
    axios.get('http://localhost:3001/upwork')
      .then((res) => {
        setUpwork(res.data.data)
     console.log(upwork)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }

  const setUserComplain =() =>{
    axios.get('http://localhost:3001/complain')
      .then((res) => {
        setUserCompain(res.data.data)
     console.log(upwork)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }

const vandorworks = () => {
  setVandorwork(true)
}
const sopworks = () => {
  setSopwork(true)
}

/* const sopworks = () => {
  setSopwork(true)
} */


  

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  }; 
  return (
    <>
      <Header vandordashboard="Welcome to Vandor DashBoard" />
      <div className="container" style={{width:'100%'}} >
      <Button variant="outline-dark" size="lg" style={{width:'24%',fontStyle:'italic'}} onClick={ () => {setVandorwork(!vandorwork)}} >Vandor Work</Button>
      <Button variant="outline-dark" size="lg" style={{width:'24%',fontStyle:'italic'}} onClick={ () => {setSopwork(!sopwork)}}>Sop</Button>
      <Button variant="outline-dark" size="lg" style={{width:'24%',fontStyle:'italic'}} onClick={ () => {setUploadwork(!uploadwork)}}>Work Update</Button>
      <Button variant="outline-dark" size="lg" style={{width:'24%',fontStyle:'italic'}} onClick={ () => {setComplain(!complain)}} >Suggestion</Button>
      </div>
       <div className="container" >
        <div className="row">
          <div className="col-12"> 
   {vandorwork ?   <div> <h3 style={{textAlign:"center",fontStyle:'italic',marginTop:'20px'}}> VANDOR WORK</h3>
       {userdata.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>project</th>
                  <th>UserName</th>
                  <th>single</th>
                  <th>team</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.project_name}</td>
                  <td>{iteam.user_name}</td>
                  <td>{iteam.single}</td>
                  <td>{iteam.team}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          )}</div> :null}
          </div>
        </div>
      </div>
      <div className="container" >
        <div className="row">
          <div className="col-12"> 
   {sopwork ?   <div> <h3 style={{textAlign:"center",fontStyle:'italic',marginTop:'20px'}}>SOP REQUIEMENT</h3>
       {user.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>project</th>
                  <th>description</th>
                  <th>field</th>
      
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.project}</td>
                  <td>{iteam.description}</td>
                  <td>{iteam.field}</td>
                 
                </tr>
              </tbody>
            </Table>
          </div>
          )}</div> :null}
          </div>
        </div>
      </div>

      <div className="container" >
        <div className="row">
          <div className="col-12"> 
   {uploadwork ?   <div> <h3 style={{textAlign:"center",fontStyle:'italic',marginTop:'20px'}}>WORK Uploadwork</h3>
       {upwork.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>project</th>
                  <th>description</th>
                  <th>field</th>
      
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.ProjectName}</td>
                  <td>{iteam.ProjectDescription}</td>
                  <td>{iteam.uploadfile}</td>
                 
                </tr>
              </tbody>
            </Table>
          </div>
          )}</div> :null}
          </div>
        </div>
      </div>


    <div className="container" >
        <div className="row">
          <div className="col-12"> 
   { complain ?   <div> <h3 style={{textAlign:"center",fontStyle:'italic',marginTop:'20px'}}>COMPLAIN</h3>
       {usercomplain.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>project</th>
                  <th>description</th>
               
      
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.project}</td>
                  <td>{iteam.description}</td>
               
                 
                </tr>
              </tbody>
            </Table>
          </div>
          )}</div> :null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;