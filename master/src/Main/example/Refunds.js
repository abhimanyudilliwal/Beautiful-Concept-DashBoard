import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap'

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

const Refunds = (props) => {
    const [show, setShow] = useState(false);
    const [hwork,setHwork] =useState(true)
    const [cwork,setCwork] =useState(true)
    const [showcash, setShowcash] = useState(false);
    const [selected, setSelected] = useState({ id: '', hourwork: '' })
    const [selectcash, setSelectcash] = useState({ id: '', hourwork: '' })
    const handleClosecash = () => setShowcash(false);
    const handleShowcash = () => setShowcash(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [hour, setHour] = useState([])
    const [cash, setCash] = useState([])



    useEffect(() => {
        Gethour();
        Getcash();
      }, []);
    

    const Gethour = () => {

        axios.get('http://localhost:3001/gethourAdmin')
            .then((res) => {
                setHour(res.data.data)
                console.log(hour)
            }).catch((error) => {
                console.log(error);
                console.log("error");
            })

    }

    const Getcash = () => {

        axios.get('http://localhost:3001/getcashAdmin')
            .then((res) => {
                setCash(res.data.data)
                console.log(cash)
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

    const handlecash = (iteam) => {
        setShowcash(true)
        console.log(iteam)
        setSelectcash(iteam)

    }

    const changeData = () => {
        /*   const id = localStorage.getItem('userid')
          console.log(id) */
        const data = {
            hourwork: selected.hourwork,
        }
        console.log(data)

        axios.put('http://localhost:3001/edithour/' + selected.id, data)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error);
                console.log("error");
            })
    }
    const changecash = () => {
        
        const data = {
            hourwork: selectcash.hourwork,
        }
        console.log(data)

        axios.put('http://localhost:3001/editcash/' + selectcash.id, data)
            .then((res) => {
                console.log(res)
            }).catch((error) => {
                console.log(error);
                console.log("error");
            })
    }


    return (
        <>
            <Header Mainrefunds='SHOW ALL THE MONEY INFOMATION' />


            <div className="container" style={{width:'100%'}} >
      <Button variant="outline-dark" size="lg" style={{width:'49%',fontStyle:'italic'}} onClick={ () => {setHwork(!hwork)}} >Hourly </Button>
      <Button variant="outline-dark" size="lg" style={{width:'49%',fontStyle:'italic'}} onClick={ () => {setCwork(!cwork)}}>Cash </Button>
      {/* <Button variant="outline-dark" size="lg" style={{width:'32%',fontStyle:'italic'}} onClick={ () => {setUpwork(!upwork)}}>Work Update</Button> */}
   </div>

            <div className="container" >
                <div className="row">
                    <div className='col-12'>
        { (hwork) ? <div> <h1 style={{textAlign:'center',fontStyle:'italic',marginTop:'10px'}}>Hour Work Edit</h1>
                    {hour.map((iteam, index) => <div key={index} >
                        <Table striped bordered hover>
                            <thead>

                                <tr>

                                    <th>project</th>
                                    <th>team</th>
                                    <th> hour Work</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{iteam.project}</td>
                                    <td>{iteam.team}</td>
                                    <td>{iteam.hourwork}</td>
                                    <td>
                                        <Button variant="outline-dark"
                                            onClick={() => handleEdit(iteam)}>
                                            edit
      </Button>  </td>
                                </tr>

                            </tbody>
                        </Table>

                    </div>
                    )}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Hour Work</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="text"
                                value={selected.hourwork}
                                onChange={(e) => { setSelected({ ...selected, hourwork: e.target.value }) }} />

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
                    </div> : null }
                    </div> 
                </div>
            </div>

            <div className="container" >
                <div className="row">
                  <div className='col-12' >
       { (cwork) ? <div>       <h1 style={{textAlign:'center',fontStyle:'italic',marginTop:'10px'}}>Cash Work </h1>        
                    {cash.map((iteam, index) => <div key={index} >
                        <Table striped bordered hover>
                            <thead>
                                <tr>

                                    <th>Project</th>
                                    <th>Team</th>
                                    <th>Cash Work</th>
                                    <th>Edit</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{iteam.project}</td>
                                    <td>{iteam.team}</td>
                                    <td>{iteam.hourwork}</td>
                                    <td><Button variant="outline-dark"
                                        onClick={() => handlecash(iteam)}>
                                        edit
      </Button></td>
                                </tr>

                            </tbody>
                        </Table>

                    </div>
                    )}
                    <Modal show={showcash} onHide={handleClosecash}>
                        <Modal.Header closeButton>
                            <Modal.Title>cash Work</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="text"
                                value={selectcash.hourwork}
                                onChange={(e) => { setSelectcash({ ...selectcash, hourwork: e.target.value }) }} />

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-danger" onClick={handleClosecash}>
                                Close
          </Button>
                            <Button variant="outline-dark" onClick={changecash}>
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

export default Refunds;