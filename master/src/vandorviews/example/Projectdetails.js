import React, { useState,useEffect } from "react";

import classnames from "classnames";

import Chart from "chart.js";

import { Line, Bar } from "react-chartjs-2";
import axios from 'axios'

import {
  Button,
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
  const [data, setData] = useState([])
  const loggedInUser = localStorage.getItem('id');
  console.log(loggedInUser)
  const foundUser = JSON.parse(loggedInUser);
  console.log(foundUser)
 
  
  useEffect(() => {
  projectdetail()
  
  }, []);

  const projectdetail =() =>{
 
    axios.get('http://localhost:3001/projectdetail')
      .then((res) => {
        setData(res.data.data)
        console.log(data)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }



  

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
      <Header vandorprojectdetails="We Are Showing All Running Project" />

      <div className="container" >
        <div className="row">
          <div className="col-12"><h3 style={{textAlign:'center' ,fontStyle:'italic',marginTop:'20px'}}>PROJECT DETAILS</h3>
          {data.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>project name</th>
                  <th>Message</th>
                  <th>Budget</th>
                  <th>deadline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.project}</td>
                  <td>{iteam.message}</td>
                  <td>{iteam.budget}</td>
                  <td style={{color: "red"}}>{iteam.deadline}</td>

                </tr>
          
              </tbody>
            </Table>
            
          </div>

          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default Index;