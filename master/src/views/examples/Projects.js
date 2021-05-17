import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import axios from 'axios'
import './projects.css'
import { NotificationContainer, NotificationManager } from 'react-notifications';




const Projectform = () => {

    const [project, setProject] = useState({value:'',error:''})
    const [message, setMessage] = useState({value:'',error:''})
    const [budget, setBudget] = useState({value:'',error:''})
    const [deadline, setDeadline] = useState({value:'',error:''})
    const [file, setFile] = useState(null)
    const [disabled,setDisabled] =useState(true)

    // const [file, setFile] = useState('')
    //  const[fullname,setFullname] =useStae('')
/* 
    const upload = () =>{
        if(files[0].size > 307200){
            alert("File is too big!");
            this.value = "";
         };
    }
 */
    const submit = (event) => {
      
        const data = {
            project: project.value,
            message: message.value,
            budget: budget.value,
            deadline:deadline.value,
            file: file.name
        }
        console.log(data)
        let files = file.size
        if (files >= 7000) {
           alert('Your File Size 7000kb')
        } else {
            axios.post(`http://localhost:3001/budget`,data)
                .then(res => {
                    console.log(res);
                    console.log(res.data.data);
                    if (res.data.status) {
                        NotificationManager.success('Success submit details');
                    } else {
                        NotificationManager.error('Some Thinks Wrong');
                    }
                }).catch(function (error) {
                    console.log(error)
                })
        }
    }
    // console.log(fullname)
    const fileUpload = () => {}

    const onDisable = () => {
        if(project.value == '' || message.value== ''|| budget.value =='' || deadline =='' ){
          setDisabled(false)
        } 
        else{
          setDisabled(true)
        }
      }
    
      const onblurProject = () => {
        if (project.value == '') {
          setProject({ ...project, error: 'Fill the Project Name' })
          onDisable ()
        }
        else {
          setProject({ ...project, error: '' })
          
        }
      }
      const onblurmessage = () => {
        if (message.value == '') {
          setMessage({ ...message, error: 'Fill the Message' })
          onDisable ()
        }
        else {
          setMessage({ ...message, error: '' })
          onDisable()
    
        }
      }
      const onblurbudget = () => {
        if (budget.value == '') {
          setBudget({ ...budget, error: 'Fill the Budget' })
          onDisable ()
        }
        else {
          setBudget({ ...budget, error: '' })
          onDisable()
    
        }
      }
      const onblurDeadline = () => {
        if (budget.value == '') {
          setDeadline({ ...deadline, error: 'Fill the Deadline' })
          onDisable ()
        }
        else {
          setDeadline({ ...deadline, error: '' })
          onDisable()
    
        }
      }
    return (
        <>
           
            <div className="containers">
                <div > <h3 style={{ textAlign: 'center',fontStyle:'italic'}}>We are Discuss the relevant Project Details</h3></div>
                <div className="main">
                    <h1 style={{ textAlign: 'center',fontStyle:'italic'}}>Project Query</h1>
                    <Form className="form">
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}> Project Name</Form.Label>
                        <Form.Control type="text" placeholder="Project Name" onChange={(event) => { setProject({ ...project, value: event.target.value }) }}
                        onFocus={(event => { setProject({ ...project, error: event.target.error }) })} />

                        </Form.Group>
                        <span style={{ color: 'red' }} >{project.error}</span>
                        {/*  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email Address" onChange={(event) => { setEmail(event.target.value) }} />

                </Form.Group>


                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="Number" placeholder="Phone Number" onChange={(event) => { setPhone(event.target.value) }} />

                </Form.Group> */}

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Work Defind</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="What do you want do" onChange={(event) => { setMessage({ ...message, value: event.target.value }) }}
                        onFocus={(event => { setMessage({ ...message, error: event.target.error }) })} />
                        </Form.Group>
                        <span style={{ color: 'red' }} >{message.error}</span>
                        <Form.Group controlId="formBasicRangeCustom">
                            <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>BUDGET SET</Form.Label>
                            <Form.Control variant="dark" type="range" min="5" max="10000" step="1" className="slider" onChange={(event) => { setBudget({ ...budget, value: event.target.value }) }}
                        onFocus={(event => { setBudget({ ...budget, error: event.target.error }) })} />${budget.value}
                        </Form.Group>
                        <span style={{ color: 'red' }} >{budget.error}</span>
                        <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>DeadLine</Form.Label>
                        <Form.Row>

                            <Col>
                                <Form.Control type='date' placeholder="time" onChange={(event) => { setDeadline({ ...deadline, value: event.target.value }) }}
                        onFocus={(event => { setDeadline({ ...deadline, error: event.target.error }) })} />
                            </Col>
                        </Form.Row>
                        <span style={{ color: 'red' }} >{deadline.error}</span>
                        <div className="mb-3" style={{ marginTop: '10px' }}>
                        
                        <input type="file" name="myFile" /* accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"  */
                        onChange={(event) => {setFile(event.target.files[0])}}  /* fileFilter={} */ />
                              
                </div>{console.log('hello',file)}
                                <Button variant="dark" type="button" className="submit" disabled={disabled} style ={{marginLeft:'300px'}} onClick={submit}>
                                    Submit
  </Button>
            </Form>
                        </div>
        </div>
        </>
          )
}
export default Projectform;