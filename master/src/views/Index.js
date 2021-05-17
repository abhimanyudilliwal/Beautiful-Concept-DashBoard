import React, { useState, useEffect } from "react";

import classnames from "classnames";

import Chart from "chart.js";

import { Line, Bar } from "react-chartjs-2";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {Button,Modal} from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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
  const [show, setShow] = useState(false);
  const [mwork,setMwork] =useState(true)
  const [ywork,setYwork] =useState(false)
  const [upwork,setUpwork] =useState(false)
  const [apshow, setApShow] = useState(false);
  const [selected, setSelected] = useState({ id: '', project: "", description: "", field: ""})
  const [apselected, setApSelected] = useState({ id: '', project: "", description: "", field: ""})
  const AphandleClose = () => setApShow(false);
  const AphandleShow = () => setApShow(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [report, setReport] = useState([])
  const [user, setUser] = useState([])
  const [data, setData] = useState([])
  const loggedInUser = localStorage.getItem('id');
  console.log(loggedInUser)
  const foundUser = JSON.parse(loggedInUser);
  console.log(foundUser)


  useEffect(() => {
    monthly();
    yearly();
    vivek();
  }, []);

  const monthly = () => {
    const localid = localStorage.getItem('id')
    axios.get('http://localhost:3001/month/' + localid)
      .then((res) => {
        setData(res.data.data)
        console.log(data)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }

  const yearly = () => {
    const localid = localStorage.getItem('id')
    axios.get('http://localhost:3001/year/' + localid)
      .then((res) => {
        setUser(res.data.data)
        console.log(data)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }

  const vivek = () => {
    /* const localid= localStorage.getItem('id') */
    axios.get('http://localhost:3001/vandorreq')
      .then((res) => {
        setReport(res.data.data)
        console.log(data)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }
  const handleApprove = (iteam) => {
    setApShow(true)
    console.log(iteam)
    setApSelected(iteam)
  }

  
  const changeData = () => {
    /*   const id = localStorage.getItem('userid')
      console.log(id) */
      const data = {
        field: selected.field,
        description: selected.description,
       
      }
      console.log(data)
  
      axios.put('http://localhost:3001/editwork/' + selected.id, data)
        .then((res) => {
          console.log(res)
        }).catch((error) => {
          console.log(error);
          console.log("error");
        })
    }

  const handleEdit = (iteam) => {
    setShow(true)
    console.log(iteam)
    setSelected(iteam)
  
  }
const ApproveData = (iteam) => {
 const  approve="approve"
  const data= {
    userid:apselected.id,
    project:apselected.project,
    description:apselected.description,
    field:apselected.field,
    approve:approve
  }
  console.log(data)
  axios.post('http://localhost:3001/reqment', data)
        .then((res) => {
          console.log(res)
          NotificationManager.success('User Approveed');
        }).catch((error) => {
          console.log(error);
          NotificationManager.error('sometimes Wrong');
          console.log("error");
        })
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
     
      <Header  Userdashboard='Welcome to User DashBoard'/>
      <div className="container" style={{width:'100%'}} >
      <Button variant="outline-dark" size="lg" style={{width:'32%',fontStyle:'italic'}} onClick={ () => {setMwork(!mwork)}} >Monthly Work</Button>
      <Button variant="outline-dark" size="lg" style={{width:'32%',fontStyle:'italic'}} onClick={ () => {setYwork(!ywork)}}>YEARLY WORK</Button>
      <Button variant="outline-dark" size="lg" style={{width:'32%',fontStyle:'italic'}} onClick={ () => {setUpwork(!upwork)}}>Work Update</Button>
   </div>{/* <Button variant="outline-dark" size="lg" style={{width:'24%',fontStyle:'italic'}} onClick={ () => {setComplain(!complain)}} >Suggestion</Button> */} 
      <div className="container" >
        <div className="row">
          <div className='col-12'>
     { (mwork) ? <div> <h3 style={{textAlign:'center'}}> Monthly Action</h3>  {data.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>Services Name</th>
                  <th>Price</th>
                  <th>Totalamount</th>
                  <th>Stateus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.servicename}</td>
                  <td>{iteam.price}</td>
                  <td>{iteam.totalamount}</td>
                  <td style={{ color: "red" }}>Active</td>

                </tr>

              </tbody>
            </Table>

          </div>

          )}
       {/*  </div>
      </div> */}

     {/*  <div className="conatiner">
        <div className="row"> */}
        <h3 style={{textAlign:'center'}}> Monthly Timing</h3>
          {data.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>Serives Name</th>
                  <th>start date</th>
                  <th>End date</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.servicename}</td>
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

      <div className="container" >
        <div className="row">
          <div className='col-12'>
   { (ywork) ? <div><h3 style={{textAlign:'center'}}> Yearly Action</h3> {user.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>Services Name</th>
                  <th>Price</th>
                  <th>Totalamount</th>
                  <th>Stateus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.servicename}</td>
                  <td>{iteam.price}</td>
                  <td>{iteam.totalamount}</td>
                  <td style={{ color: "red" }}>Active</td>

                </tr>

              </tbody>
            </Table>

          </div>

          )}
     {/*    </div>
      </div>
 */}
     {/*  <div className="conatiner">
        <div className="row"> */}
        <h3 style={{textAlign:'center'}}> Yearly Timing</h3>
          {user.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>Serives Name</th>
                  <th>start date</th>
                  <th>End date</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.servicename}</td>
                  <td>{iteam.startdate}</td>
                  <td>{iteam.enddate}</td>
                </tr>
              </tbody>
            </Table>
          </div>

          )}
</div> : null }
        </div>
        </div>
      </div>
      <div className="conatiner">
        <div className="row">
          <div className='col-12'>
     { (upwork) ? <div style={{textAlign:'center'}}> <h3 >Work </h3>   {report.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th>project Name</th>
                  <th>Des</th>
                  <th>field</th>
                  <th>approve</th>
                  <th>modify</th>

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.project}</td>
                  <td>{iteam.description}</td>
                  <td>{iteam.field}</td>
                  <td><Button variant="primary" onClick={() => handleApprove(iteam)}>
                    approve
                      </Button></td>
                  <td><Button variant="primary" onClick={() => handleEdit(iteam)}>
                    Modify
                      </Button></td>
                </tr>
              </tbody>
            </Table>
          </div>
          )}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modify requirement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <input type="text"
                value={selected.project}
                onChange={(e) => { setSelected({ ...selected, projectName: e.target.value }) }} /> */}
                <label> Field</label>
              <input type="text"
                value={selected.field}
                onChange={(e) => { setSelected({ ...selected, field: e.target.value }) }} />
                  <br/>
                <label> description</label>
              <input type="text"
                value={selected.description}
                onChange={(e) => { setSelected({ ...selected, description: e.target.value }) }} />
              
                  
             
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
          </Button>
              <Button variant="primary" onClick={changeData}>
                Save Changes
          </Button>
            </Modal.Footer>
          </Modal>
           {/*########################## Approve ###################################### */}
          <Modal show={apshow} onHide={AphandleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Approve requirement</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <label> Project</label>
              <input type="text"
                value={apselected.project}
                /* onChange={(e) => { setSelected({ ...selected, projectName: e.target.value }) }} */ />
                <br />
                <label> Field</label>
              <input type="text"
                value={apselected.field}
               /*  onChange={(e) => { setSelected({ ...selected, field: e.target.value }) }} */ />
                  <br/>
                <label> description</label>
              <input type="text"
                value={apselected.description}
                /* onChange={(e) => { setSelected({ ...selected, description: e.target.value }) }} */ />
                <br/>
              
                <h5> Do You want the Approve the requirement</h5> 
             
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={AphandleClose}>
                Close
          </Button>
              <Button variant="primary" onClick={ApproveData}>
                Save Changes
          </Button>
            </Modal.Footer>
          </Modal>
        </div> :null}
        </div>
       </div>
      </div>




      
    </>
  );
};

export default Index;