import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import {
 /*  Button, */
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

const Index = (props) => {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [uwork,setUwork] =useState(true);
  const [vwork,setVwork] =useState(false);
  const [vandorshow, setVandorShow] = useState(false);
  const [selected, setSelected] = useState({ id: '', firstname: "", lastname: "", email: "", phone: ""})
  const [newselected, setNewselected] = useState({ id: '', Vandor: "", email: "", contact: "", dob: "" })
  const VandorhandleClose = () => setVandorShow(false);
  const VandorhandleShow = () => setVandorShow(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user, setUser] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {


      userdata()
      vandordata()
    
  },[])

  const userdata = () => {

    axios.get('http://localhost:3001/getuser')
      .then((res) => {
        console.log({ res })
        console.log(res.data.data[0].id)
        setUser(res.data.data)
        /*   localStorage.setItem('user',res.data.data[0].id) */
      }).catch((error) => {
        console.log(error);

      })

  }

  const vandordata = () => {

    axios.get('http://localhost:3001/getvandor')
      .then((res) => {
        setData(res.data.data)
        console.log(res.data.data[0].id)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      })

  }

  const handleEdit = (iteam) => {
    setShow(true)
    console.log(iteam)
    setSelected(iteam)
  /*   console.log(selected) */
    // localStorage.setItem('userid',iteam.id)
  }
 

  const changeData = () => {
  /*   const id = localStorage.getItem('userid')
    console.log(id) */
    const data = {
      firstname: selected.firstname,
      lastname: selected.lastname,
      phone: selected.phone,
      email: selected.email
    }
    console.log(data)

    axios.put('http://localhost:3001/edituser/' + selected.id, data)
      .then((res) => {
        console.log(res)
        NotificationManager.success('Successfully');
      }).catch((error) => {
        console.log(error);
        console.log("error");
      })
  }

  const handleDelete = (iteam) => {
    console.log(iteam.id)
    axios.delete('http://localhost:3001/getuserdelet/' + iteam.id)
      .then((res) => {
        console.log({res})
        NotificationManager.success('successfully');
      }).catch((error) => {
        console.log(error);
        console.log("error");
      })
  }


  const handlevandorEdit = (iteam) => {
    setVandorShow(true)
    console.log(iteam)
    console.log(iteam.id)
    setNewselected(iteam)
    // localStorage.setItem('userid',iteam.id)
  }

  const vandorchangeData = () =>  {
    /* const id = localStorage.getItem('userid')
    console.log(id) */
    const data = {
      Vandor: newselected.Vandor,
      email: newselected.email,
      contact: newselected.contact,
      dob: newselected.dob
    }
    console.log(data)

    axios.put('http://localhost:3001/editvandor/' + newselected.id, data)
      .then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error);
        console.log("error");
      })

  }
  const handlevandordelete = (iteam) => {
    console.log(iteam.id)
    axios.delete('http://localhost:3001/getvandordelet/' + iteam.id)
      .then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error);
      
      })
  }

  const UserDashBoard = () => {
    history.push("/");
  }

  const VandorDashBoard = () => {
    history.push('/vandor/login')
  }
  
  return (
    <>      
    <NotificationContainer/>
      <Header UserMaindashboard='Welcome to Admin DashBoard' />
      <div className="container" style={{width:'100%'}} >
      <Button variant="outline-dark" size="lg" style={{width:'49%',fontStyle:'italic'}} onClick={ () => {setUwork(!uwork)}}  >USER DATA</Button>
      <Button variant="outline-dark" size="lg" style={{width:'49%',fontStyle:'italic'}} onClick={ () => {setVwork(!vwork)}}  >VANDOR DATA</Button>
      <Button variant="outline-dark" size="lg" style={{width:'49%',fontStyle:'italic'}} onClick={UserDashBoard} >User DashBoard</Button>
      <Button variant="outline-dark" size="lg" style={{width:'49%',fontStyle:'italic'}} onClick ={VandorDashBoard} >Vandor DashBoard</Button>
   </div>
   
      <div className="container" >
        <div className="row">
          <div className='col-12'>
{ (uwork) ? <div><h1 style={{textAlign:'center',fontStyle:'italic',marginTop:'10px'}}>USER DATA</h1>
          {user.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>firstname</th>
                  <th>lastname</th>
                  <th>email</th>
                  <th>phone</th>
                  <th>edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.firstname}</td>
                  <td>{iteam.lastname}</td>
                  <td>{iteam.email}</td>
                  <td>{iteam.phone}</td>
                  <td>  <Button variant="outline-dark" onClick={() => handleEdit(iteam)}>
                    edit
                  </Button></td>
                  <td>  <Button variant="outline-danger" onClick={() => handleDelete(iteam)}>
                    Delete
               </Button></td>
                </tr>
              </tbody>
            </Table>
          </div>
          )} 
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title >User Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" 
              value={selected.firstname} 
              onChange={(e) => { setSelected({ ...selected, firstname: e.target.value }) }} />
              <input type="text" 
              value={selected.lastname} 
              onChange={(e) => { setSelected({ ...selected, lastname: e.target.value }) }} />
              <input type="text" 
              value={selected.phone} 
              onChange={(e) => { setSelected({ ...selected, phone: e.target.value }) }} />
              <input type="text" 
              value={selected.email} 
              onChange={(e) => { setSelected({ ...selected, email: e.target.value }) }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={handleClose}>
                Close
          </Button>
              <Button variant="outline-dark" onClick={changeData}>
                Save Changes
          </Button>
            </Modal.Footer>
          </Modal>
          </div> :null }
        </div>
      </div>
      </div>

      <div className="container" >
        <div className="row">
          <div className='col-12'>
      { (vwork) ?      <div><h1 style={{textAlign:'center',fontStyle:'italic',marginTop:'10px'}}>VANDOR DATA</h1>
          {data.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>vandor</th>
                  <th>email</th>
                  <th>contect</th>
                  <th>dob</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.Vandor}</td>
                  <td>{iteam.email}</td>
                  <td>{iteam.contact}</td>
                  <td>{iteam.dob}</td>
                  <td><Button variant="outline-dark" onClick={() => handlevandorEdit(iteam)}>
                    edit
      </Button></td>
                  <td><Button variant="outline-danger" onClick={() => handlevandordelete(iteam)}>
                    Delete
      </Button></td>
                </tr>
              </tbody>
            </Table>

          </div>
          )}
          <Modal show={vandorshow} onHide={VandorhandleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Vandor Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" 
              value={newselected.Vandor} 
              onChange={(e) => { setNewselected({ ...newselected,Vandor: e.target.value }) }} />
              <input type="text" 
              value={newselected.email} 
              onChange={(e) => { setNewselected({ ...newselected,email: e.target.value }) }} />
              <input type="text"
               value={newselected.contact} 
              onChange={(e) => { setNewselected({ ...newselected,contact: e.target.value }) }} />
              <input type="text" 
              value={newselected.dob} 
              onChange={(e) => { setNewselected({ ...newselected,dob: e.target.value }) }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={VandorhandleClose}>
                Close
          </Button>
              <Button variant="outline-dark" onClick={vandorchangeData}>
                Save Changes
          </Button>
            </Modal.Footer>
          </Modal>
        </div> :null }
        </div>
        </div>
      </div>
    </>
  );
};

export default Index;