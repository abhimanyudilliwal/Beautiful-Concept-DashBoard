import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import axios from 'axios'

import { NotificationContainer, NotificationManager } from 'react-notifications';
import './Userassign.css';



const Project1 = () => {
    
    const [questions, setQuestions] = useState('')
    const [about, setAbout] = useState('')
    const [problems, setProblems] = useState('')
    const [uploadfile, setFile] = useState('')

   // const [file, setFile] = useState('')
    //  const[fullname,setFullname] =useStae('')

    const submit = () => {
        console.log(questions)
        console.log(about)
        console.log(problems)
        console.log(uploadfile)
        
        const data = {
            questions: questions,
            about: about,
            problems: problems,
            uploadfile:uploadfile
        }
       console.log(data)
        axios.post(`http://localhost:3001/request`,data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                if(res.data.status){
                    NotificationManager.success('Success request submitted');
                }else{
                    NotificationManager.error('Some Thinks Wrong');
                }
            }).catch(function (error) {
                console.log('error')
            })
    }
    // console.log(fullname)

    return (
        <>
        
        <div className="containers">
        <div class="rqgeeks"> 
                </div>
            <div > <h3 style={{textAlign: 'center',fontStyle:'italic' }}>REQUEST</h3></div>
        <div className="main">
            <h3 style={{textAlign:'center',fontStyle:'italic'}}>USER REQUEST</h3>
            <Form className="form">
            <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{fontStyle:'oblique',fontWeight: 'bold'}}>Questions</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="What do you want to Ask" onChange={(event) => { setQuestions(event.target.value) }} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{fontStyle:'oblique',fontWeight: 'bold'}}>About</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="About" onChange={(event) => { setAbout(event.target.value) }} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Problems</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="which problem is ocured" onChange={(event) => { setProblems(event.target.value) }} />
                </Form.Group>
               
                

               

                <div className="mb-3" style={{marginTop:'10px'}}>
                    <Form.File id="formcheck-api-regular">
                    <Form.Label style={{fontStyle:'oblique',fontWeight: 'bold'}}> Uploadfile</Form.Label>
                        <Form.File.Input  accept=".bmp, .doc, .pdf" onChange={ (event) => {setFile(event.target.value)}} />
                    </Form.File>
                </div>
                <Button variant="dark" type="button" className="submit" onClick={submit} style ={{marginLeft:'300px'}}>
                    Submit
  </Button>
            </Form>
        </div>
        </div>
        </>
          )
}
export default Project1; 