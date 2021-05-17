import React, { useState,useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import axios from 'axios'

import { NotificationContainer, NotificationManager } from 'react-notifications';


const WorkUpload = () => {

    const [ProjectName, setProjectName] = useState('')
    const [ProjectDescription, setProjectDescriptione] = useState('')
    const[data,setData] =useState([])
    const [uploadfile, setFile] = useState('')

    // const [file, setFile] = useState('')
    //  const[fullname,setFullname] =useStae('')
    useEffect(() => {
        get()

    }, [])

    const get = () => {
        axios.get(`http://localhost:3001/bud`)
            .then(res => {
                console.log(res);
                console.log(res.data.data);
                setData(res.data.data)
            }).catch(function (error) {
                console.log('error')
            })
    }


    const submit = () => {
        console.log(ProjectName)
        console.log(ProjectDescription)

        console.log(uploadfile)
        const data = {
            ProjectName: ProjectName,
            ProjectDescription: ProjectDescription,
            uploadfile: uploadfile
        }
        console.log(data)
        if (ProjectName == '' || ProjectDescription == '' || uploadfile == '') {
            NotificationManager.error('Some Thinks Wrong');
        } else {
            axios.post(`http://localhost:3001/workupload`, data)
                .then(res => {
                    console.log(res);
                    console.log(res.data)
                    NotificationManager.success('succesfully uploaded');
                }).catch(function (error) {
                    console.log('error')
                    NotificationManager.error('succesfully not uploaded');
                })
        }
    }
    // console.log(fullname)

    return (
        <>
            
            <div className="containers">
            <div class="upgeeks"> 
                </div>
                <div > <h3 style={{ textAlign: 'center',fontStyle:'italic' }}>We are Discuss the relevant Project Details</h3></div>
                <div className="main">
                    <h1 style={{textAlign: 'center',fontStyle:'italic' }}>Work </h1>
                    <Form className="form">
                        <Form.Group>
                        <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Project Name</Form.Label>
                            <Form.Control as="select" custom onChange={(event) => {
                                setProjectName(event.target.value)
                            }} >
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
                            <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>ProjectDescription</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="What do you want do" onChange={(event) => { setProjectDescriptione(event.target.value) }} />
                        </Form.Group>

                        <div className="mb-3" style={{ marginTop: '10px' }}>
                            <Form.File id="formcheck-api-regular">
                                <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}> uploadfile</Form.Label>
                                <Form.File.Input onChange={(event) => { setFile(event.target.value) }} />
                            </Form.File>
                        </div>
                        <Button variant="dark" type="button" className="submit"  style ={{marginLeft:'300px'}} onClick={submit}>
                            Submit
  </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default WorkUpload;