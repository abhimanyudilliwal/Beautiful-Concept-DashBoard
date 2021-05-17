import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Form, Button, Col,Modal } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { NotificationContainer, NotificationManager } from 'react-notifications';

function Billingmontly() {
    let a = moment().toDate()
    console.log(a)
    const b = moment().add(30, 'day')
    console.log('hello')
    let q = moment(a).add(30, "day").format("YYYY/MM/DD")
    console.log(q)
    // console.log(moment(a).add(5, "day").format("YYYY/MM/DD"))
    const [show, setShow] = useState(false);
    let history = useHistory()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [jobData, setJobData] = useState({})
    useEffect(() => {

        const data = JSON.parse(localStorage.getItem("JobData"))
        setJobData(data)
    }, [])

    const goBack =() =>{
        history.goBack()
      }

    const submit = () => {
      
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

    const monthly =() => {
    console.log(a)
    console.log(q)
        const data = {
                ServiceName: jobData.title,
                Price: jobData.price,
                Discounts: jobData.discount,
                TotalAmount: jobData.total,
                Startdate: a,
                Enddate: q,
                userid: localStorage.getItem('id')
            }
console.log('data')
            console.log(data)
            axios.post(`http://localhost:3001/monthly`, data)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    NotificationManager.success('Your request Have been Submited');
                }).catch(function (error) {
                    console.log('error')
                    NotificationManager.error('SomeThing Wrong');
                })
        
    }



    return (
        <div className='container' style={{ paddingTop: '150px',border:'2px solid black',boxShadow:'2px 2px 2px 2px' }}>
              
            <div className='row' >
                <div className='col-6' style={{padding:'20px'}}>
                    <label style={{ marginBottom: '25px',fontWeight:'bold' }}>Service name</label><br />
                    <label style={{ marginBottom: '25px',fontWeight:'bold' }}>Prices</label><br />
                    <label style={{ marginBottom: '25px',fontWeight:'bold' }}>Discounts</label><br />
                    <label style={{ marginBottom: '25px',fontWeight:'bold' }}>Total Amount</label><br />
                    <label style={{ marginBottom: '25px',fontWeight:'bold' }}>From</label><br />
                    <label style={{ marginBottom: '25px',fontWeight:'bold' }}>To</label><br />
                </div>
                <div className='col-6' style={{ textAlign: 'center',padding:'20px' }}>
                    <input value={jobData.title} disabled={true} style={{ marginBottom: '20px', paddingLeft: '20px' }} /><br />
                    <input value={jobData.price} disabled={true} style={{ marginBottom: '20px', paddingRight: '20px' }} /><br />
                    <input value={jobData.discount} disabled={true} style={{ marginBottom: '20px', paddingRight: '20px' }} /><br />
                    <input value={jobData.total} disabled={true} style={{ marginBottom: '20px', paddingRight: '20px' }} /><br />
                    <input value={a} disabled={true} style={{ marginBottom: '20px', paddingRight: '20px' }} /><br />
                    <input value={q} disabled={true} style={{ marginBottom: '20px', paddingRight: '20px' }} /><br />
                    <Button variant="outline-dark" type="button" className="submit" onClick={submit}>
                        Purchase
                </Button>
                <Button variant="outline-warning" type="button" className="submit" onClick={goBack}>
                      Back
                </Button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Purchasing Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6'>
                                <p style={{fontWeight:'bold'}}>Services name</p>
                                <p style={{fontWeight:'bold'}} >Discount</p>
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
                    <Button variant="outline-danger" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="outline-success" onClick={monthly}  >
                        Confirm
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Billingmontly
