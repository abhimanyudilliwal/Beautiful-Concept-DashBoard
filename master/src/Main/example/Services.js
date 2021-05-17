import React, { useState,useEffect } from "react";
import axios from 'axios'

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
import vandors from "vandorroute";
import {Button} from 'react-bootstrap'

const Index = (props) => {
  const [fwork,setFwork]=useState(true)
  const [mwork,setMwork]=useState(false)
  const [ywork,setYwork]=useState(false)
  const [fservices, setFservices] = useState([])
  const [mservices, setMservices] = useState([])
  const [yservices, setYservices] = useState([])


  useEffect(() => {
    getFreeservices();
    getMonthlyservices();
    getyearlyservices();
  }, []);

  const getFreeservices = () => {
  
      axios.get('http://localhost:3001/getFreeservices' )
      .then((res) => {
        setFservices(res.data.data)
        console.log(fservices)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      })
    
  }

  const getMonthlyservices = () => {
  
      axios.get('http://localhost:3001/getmonthlyservices' )
      .then((res) => {
        setMservices(res.data.data)
        console.log(mservices)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      })
    
  }
  const getyearlyservices = () => {
  
    axios.get('http://localhost:3001/getyearlyservices' )
    .then((res) => {
      setYservices(res.data.data)
      console.log(yservices)
    }).catch((error) => {
      console.log(error);
      console.log("error");
    })
  
}
  return (
    <>
      <Header Mainservices='ShOW All SERVICES' />


      <div className="container" style={{width:'100%'}} >
      <Button variant="outline-dark" size="lg" style={{width:'32%',fontStyle:'italic'}} onClick={ () => {setFwork(!fwork)}} >FREE SERVICES</Button>
      <Button variant="outline-dark" size="lg" style={{width:'32%',fontStyle:'italic'}} onClick={ () => {setMwork(!mwork)}}>MONTHLY SERVICES</Button>
      <Button variant="outline-dark" size="lg" style={{width:'32%',fontStyle:'italic'}} onClick={ () => {setYwork(!ywork)}}>YEARLY SERVICES</Button>
   </div>

    
      <div className="container" >
        <div className="row">
          <div className='col-12'>
 { (fwork)  ? <div>  <h1 style={{textAlign:'center',fontStyle:'italic',marginTop:'10px'}}>Free Active Services</h1>    
  {fservices.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
             
                <tr>

                  <th>services name</th>
                  <th>prices</th>
                  <th>totalamount</th>
                 
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.servicename}</td>
                  <td>{iteam.price}</td>
                  <td>{iteam.totalamount}</td>
         
                 

                </tr>
          
              </tbody>
            </Table>
            
          </div>

          )}
        </div> : null }
        </div>
      </div>
      </div>

      <div className="container" >
        <div className="row">
      <div className='col-12' >
        { (mwork) ? <div > <h1 style={{textAlign:'center',fontStyle:'italic',marginTop:'10px'}}>monthly</h1>
          {mservices.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>services Name</th>
                  <th>Price</th>
                  <th>totalamount</th>
                
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.servicename}</td>
                  <td>{iteam.price}</td>
                  <td>{iteam.totalamount}</td>
                </tr>
          
              </tbody>
            </Table>
            
          </div>

          )}
        </div> :null }
        </div >
        </div>
      </div>

      <div className="container" >
        <div className="row">
      <div className = 'col-12'>
        { (ywork) ? <div> <h1 style={{textAlign:'center',fontStyle:'italic',marginTop:'10px'}}>yearly</h1>
          {yservices.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>services Name</th>
                  <th>Price</th>
                  <th>totalamount</th>
                  <th>start date</th>
                  <th>end date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.servicename}</td>
                  <td>{iteam.price}</td>
                  <td>{iteam.totalamount}</td>
                  <td>{iteam.startdate}</td>
                  <td>{iteam.enddate}</td>

                </tr>
          
              </tbody>
            </Table>
            
          </div>

          )}
        </div> :null }
        </div>
      </div>
      </div>
    </>
  );
};

export default Index;