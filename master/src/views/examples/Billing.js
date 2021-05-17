/* import React from 'react'

function Billing() {
    return (
        <div>
            chacha
        </div>
    )
}

export default Billing
 */
import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Col,Modal } from 'react-bootstrap'
import axios from 'axios'
import './projects.css'
import { StoreContext } from '../../StoreProvider'
import { useHistory } from "react-router-dom"

import { NotificationContainer, NotificationManager } from 'react-notifications';





const Billing = () => {
    let history = useHistory()
    const context = useContext(StoreContext)
    const [ServiceName, setServiceName] = useState('')
    const [Price, setPrice] = useState('')
    const [Discounts, setDiscounts] = useState('')
    const [TotalAmount, setTotalAmount] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [jobData, setJobData] = useState({})
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("JobData"))
        setJobData(data)
    }, [])
    const goBack =() =>{
        history.goBack()
      }


    console.log("context in ", { context })

    // const [file, setFile] = useState('')
    //  const[fullname,setFullname] =useStae('')

    const submit = () => {
        console.log(ServiceName)
        console.log(Price)
        console.log(Discounts)
        console.log(TotalAmount)
        setShow(true)
       /*  const data = {
            ServiceName: ServiceName,
            Price: Price,
            Discounts: Discounts,
            TotalAmount: TotalAmount,
            from: from,
            to: to

        }
        console.log(data)
        axios.post(`http://localhost:3001/sing`, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                setShow(true)
            }).catch(function (error) {
                console.log('error')
            }) */
    }


    const Apicall =() => {
    
        const data = {
                ServiceName: jobData.title,
                Price: jobData.price,
                Discounts: jobData.discount,
                TotalAmount: jobData.total
            }

            console.log(data)
            axios.post(`http://localhost:3001/apicall`, data)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    NotificationManager.success('Your request Have been Submited');
                }).catch(function (error) {
                    console.log('error')
                    NotificationManager.success('Some Think Wrong');
                })
        
    }
    // console.log(fullname)

    return (
        <>
        
        
        <div className="containers">
        <div><h3 style={{ textAlign: 'center',fontStyle:'italic'}}>BILLING INFORMATION</h3></div>
            <div className="main">
                <Form className="form">
                <div><h4 style={{ textAlign: 'center',fontStyle:'italic'}}>INFOMATION</h4></div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}> Service Name</Form.Label>
                        <Form.Control type="text"
                            //  value = {context.value.name}
                            value={jobData.title}
                            disabled={true} onChange={(event) => { setServiceName(event.target.value) }} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Price</Form.Label>
                        <Form.Control type="Number" value={jobData.price}
                            disabled={true} onChange={(event) => { setPrice(event.target.value) }} />

                    </Form.Group>


                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Discounts</Form.Label>
                        <Form.Control type="text" value={jobData.discount}
                            disabled={true} onChange={(event) => { setDiscounts(event.target.value) }} />

                    </Form.Group>



                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>TotalAmount</Form.Label>
                        <Form.Control type="text" value={jobData.total}
                            disabled={true} onChange={(event) => { setTotalAmount(event.target.value) }} />

                    </Form.Group>


                    {/*  <Form.Label>Duration</Form.Label>
               { <Form.Row>
                
                    <Col>
                        <Form.Control type='date' placeholder="date" onChange={ (event) => {setFrom(event.target.value)}} />
                    </Col>
                    <Col>
                        <Form.Control type='date' placeholder="date" onChange={ (event) => {setTo(event.target.value)}} />
                    </Col>
                </Form.Row>} */}
                    <br />
                    <Button variant="outline-dark" type="button" style ={{marginLeft:'250px'}} className="submit" onClick={submit}>
                        Purchase
                </Button>
                <Button variant="outline-warning"  type="button" className="submit" onClick={goBack}>
                      Back
                </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Purchessing Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <p style={{fontWeight:'bold'}}>Services name</p>
                                        <p style={{fontWeight:'bold'}}>Discount</p>
                                        <p style={{fontWeight:'bold'}}>total</p>

                                    </div>
                                    <div className='col-6'>
                                        <p>{jobData.title}</p>
                                        <p>{jobData.discount}</p>
                                        <p>{jobData.total}</p>
                                    </div>
                                </div>

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
          </Button>
                            <Button variant="primary" onClick={Apicall}>
                                Confirm
          </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
            </div>
        </div>
        </>
    )
}
export default Billing;