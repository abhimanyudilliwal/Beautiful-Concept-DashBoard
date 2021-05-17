import React, { useState, useContext } from 'react'
import { Form } from 'react-bootstrap'
import free from './ServicesData';
import monthly from './Servicesdata1';
import yearly from './Servicesdata2';
import { StoreContext } from '../../StoreProvider'
import { useHistory } from "react-router-dom";



// import img from './Image/hello.jpg'

const Services = (props) => {
    let history = useHistory();

    const context = useContext(StoreContext)
    const [first, setFirstname] = useState(0);
    const [second, setSecond] = useState(0)
    const [Third, setThird] = useState(0);
    const [forth, setForth] = useState('');


    const setData = () => {
          localStorage.setItem("JobData", JSON.stringify(free[first]))
          history.push("/admin/Billing");
    }
    const setmon = () => {
        localStorage.setItem("JobData", JSON.stringify(monthly[second]))
        history.push("/admin/Billingmontly");
  }
  const setyear = () => {
    localStorage.setItem("JobData", JSON.stringify(yearly[Third]))
    history.push("/admin/Billingyearly");
}

    console.log(history)
    console.log("context oin service", context)
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-4'>
                        <Form style={{ paddingTop: '150px' }}>
                            <Form.Group>
                                <Form.Label><h4>FREE SERVICES</h4></Form.Label>
                                <Form.Control as="select" custom onChange={(event) => {
                                    setFirstname(event.target.value)
                                }}>
                                    {
                                        free.map((item, index) => {
                                            return (
                                                <option value={index}>{item.title}</option>
                                            )
                                        })
                                    }

                                    {/* <option value = '0'>1</option>
                    <option value = '1'>2</option>
                    <option value = '2' >3</option>
                    <option value ='3'>4</option>
                    <option value = '4'>5</option> */}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='col-4'>
                        <Form style={{ paddingTop: '150px' }}>
                            <Form.Group>
                                <Form.Label><h4>MONTHLY SERVICES</h4> </Form.Label>
                                <Form.Control as="select" custom onChange={(event) => { setSecond(event.target.value) }}>
                                    {
                                        monthly.map((item, index) => {
                                            return (
                                                <option value={index}>{item.title}</option>
                                            )
                                        })
                                    }

                                    {/* <option value = '0'>1</option>
                    <option value = '1'>2</option>
                    <option value = '2' >3</option>
                    <option value ='3'>4</option>
                    <option value = '4'>5</option> */}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='col-4'>
                        <Form style={{ paddingTop: '150px' }}>
                            <Form.Group>
                                <Form.Label><h4>YEARLY SERVICES</h4></Form.Label>
                                <Form.Control as="select" custom onChange={(event) => { setThird(event.target.value) }}>
                                    {
                                        yearly.map((item, index) => {
                                            return (
                                                <option value={index}>{item.title}</option>
                                            )
                                        })
                                    }

                                    {/* <option value = '0'>1</option>
                    <option value = '1'>2</option>
                    <option value = '2' >3</option>
                    <option value ='3'>4</option>
                    <option value = '4'>5</option> */}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </div>
                </div>

            </div>
            <div className='container'>
                <div className='row' style={{ padding: '17px' }}>
                    <div className='col-4' style={{ height: '500px' }} >
                        {/*  <img  src = {free[first].imageUrl} style = {{height: 40, width: 40}}/>
        {/* {} */}

                        <h3 style={{ textAlign: 'center', color: '#11cdef', boxShadow: '2px 0px 2px 0px' }}>{free[first].title}</h3>
                        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>{free[first].Describtion}</p>
                        <button   style={{ textAlign: 'center', marginLeft: '100px', width: '50px', borderRadius: '0px 20px 0px 20px' }} onClick={
                            setData
                            // () => { 
                            // context.setValue({ ...context.value, name: free[first].title, price: free[first].price, discount: free[first].discount }) }
                            }>{monthly[second].link}</button>
                            
                    </div>

                    <div className='col-4' style={{ height: '500px' }}>
                        <h3 style={{ textAlign: 'center', color: '#11cdef', boxShadow: '2px 0px 2px 0px' }}>{monthly[second].title}</h3>
                        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>{monthly[second].Describtion}</p>
                        <button onClick={setmon} style={{ textAlign: 'center', marginLeft: '100px', width: '50px', borderRadius: '0px 20px 0px 20px' }}>{monthly[first].link}</button>

                        <div>

                        </div>
                    </div>
                    <div className='col-4'>
                        <h3 style={{ textAlign: 'center', color: '#11cdef', boxShadow: '2px 0px 2px 0px' }}>{yearly[Third].title}</h3>
                        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>{yearly[Third].Describtion}</p>
                        <button onClick={setyear} style={{ textAlign: 'center', marginLeft: '100px', width: '50px', borderRadius: '0px 20px 0px 20px' }}>{yearly[Third].link}</button>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Services;
