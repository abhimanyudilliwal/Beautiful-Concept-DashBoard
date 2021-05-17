import React, { useState, useEffect } from 'react'
import { Form, Button, Navbar,Nav,NavDropdown,FormControl } from 'react-bootstrap'
import axios from 'axios'

import { NotificationContainer, NotificationManager } from 'react-notifications';
import './Userassign.css';

const Refunds = () => {
    const[project, setProjectName]=useState('')
    const [description, setDescription] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        submit()

    }, [])


    const submit = () => {
        axios.get(`http://localhost:3001/bud`)
            .then(res => {
                console.log(res);
                console.log(res.data.data);
                setData(res.data.data)
            }).catch(function (error) {
                console.log('error')
            })
    }

    const save = () => {
        console.log(project)
        console.log(description)
        
        const data = {
          project: project,
          description: description,
         
        }
        axios.post('http://localhost:3001/Complain',data)
        .then((res) => {
         console.log(res); 
            console.log('helllo')
            console.log({res})
          console.log('helllo')
          NotificationManager.success('Success request submitted');
        }).catch( (error)=> {
          console.log(error);
          console.log("error");
          NotificationManager.error('sometimes Wrong');
         });
    
      }
  

 return (
        <>
        
            <div className="containers">
            <div class="sggeeks"> 
                </div>
            <div > <h3 style={{ textAlign: 'center',fontStyle:'italic' }}>Complaint Box</h3></div>
                <div className="main">
                 
                    <Form className="form">
                        
                              <Form.Group>
                               <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}> Project Name</Form.Label>
                     <Form.Control as="select" custom  onChange={(event) => {
                                    setProjectName(event.target.value)
                                }} >{console.log(project)}
                                {
                                    data.map((item, index) => {
                                        return (
                                            <option key={index}>{item.project}</option>
                                        )
                                    })
                                }
                         </Form.Control>
                        </Form.Group>
                             
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{fontStyle:'oblique',fontWeight: 'bold'}}>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="" onChange={(event) => { setDescription(event.target.value) }} />
                            {console.log(description)} 
                             </Form.Group>

                             <Button variant="dark" type="button" className="submit"  onClick={save} style ={{marginLeft:'300px'}} >
                            Submit
                         </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Refunds;