import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';


const SOP1 = () => {
    let history =useHistory()
    const [fields, setFields] = useState([{ value: null }]);
    const [projectName, setProjectName] = useState('')
     const [complaint, setComplaint] = useState('') 
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')
    const[disabled,setDisabled] =useState(false)
    
    const[Team, setTeamName]=useState('')
    const[Hourly,setHourly]=useState('')
    const[Days,setDays]=useState('')
    
    const[team,setTeam]=useState('')
    const [data, setData] = useState([])
    const [checked, setChecked] = useState(false)
    const [teamchecked, setTeamChecked] = useState(false)
  


    // const [file, setFile] = useState('')
    //  const[fullname,setFullname] =useStae('')

    const submit = () => {
        history.push("/vandoradmin/SOP2")
        /* console.log(projectName)
        console.log(description)
        console.log(fields)
       
        const data = {
            ProjectName: projectName,
            Complaint: complaint,
            Description: description


        }
         console.log(data)
        if (projectName == '' || fields == '' ||description == '') {
            NotificationManager.error('Some Thinks Wrong');
        } else {
            axios.post(`http://localhost:3001/projectvendor`, data)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (res.data.status) {
                        NotificationManager.success('Success login');
                    } else {
                        NotificationManager.error('Some Thinks Wrong');
                    }
                }).catch(function (error) {
                    console.log('error')
                })
        }  */
    } 
    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    return (
        <>
           
            <div className="containers">
                <div > <h3 style={{ textAlign: 'center' }}>SOP</h3></div>
                <div className="main">
                    <h4 style={{ textAlign: 'center' }}></h4>
                    <Form className="form">
                        {/* <Form.Group controlId="formBasicEmail">
                            <Form.Label> ProjectName</Form.Label>
                            <Form.Control type="text" placeholder="" onChange={(event) => { setProjectName(event.target.value) }} />
                        </Form.Group>{console.log(projectName)}


                        <Form.Label>List Of Requirements</Form.Label>
                        {fields.map((field, idx) => {
                            return (
                             
                                <div key={`${field}-${idx}`}>
                                    <button type="button" onClick={() => handleAdd()}>
                                        +
                                        </button>
                                    <input
                                        type="text"
                                        placeholder="Enter text"
                                        onChange={e => handleChange(idx, e)}
                                    />
                                    <button type="button" onClick={() => handleRemove(idx)}>
                                        X
            </button> 
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="" onChange={(event) => { setDescription(event.target.value) }} />
                            {console.log(description)}{console.log(fields)}
                          
                         </Form.Group>
                                </div>
                           );
                        })} */}
                        <div className="mb-3" style={{ marginTop: '10px' }}>
    <input type="file" name="myFile" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                        onChange={(event) => {setFile(event.target.value)}}  />
                              
                </div>


<div>
<Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Final SOP</Form.Label>
                   <Form.Control as="textarea" rows={3} placeholder="" onChange={(event) => { setDescription(event.target.value) }} />
                            {console.log(description)}{console.log(fields)}
                          
                    <Form.Label>SOP Approve or Modify</Form.Label>
                        <Form.Group controlId="formBasicEmail">
                            <label >
                                <input type="checkbox"
                                  
                                    onClick={() => setChecked(!checked)}
                                />
                             Approve
                            </label>  { (checked) ? <Form.Group controlId="formBasicEmail">
                            <Form.Group controlId="exampleForm.SelectCustom">
                              
                                <Form.Control as="select" custom disabled={disabled} onChange={(event) => { setHourly(event.target.value) }}>
                                    <option>Full Time</option>
                                    <option>Custom</option>
                                   
                                </Form.Control>{console.log(Hourly)}
                            </Form.Group>
                        </Form.Group>
: null}
</Form.Group>

                <Form.Group controlId="formBasicEmail">
                            <label >
                                <input type="checkbox"
                                  
                                    onClick={() => setTeamChecked(!teamchecked)}
                                />
                              Modify
                            </label>  { (teamchecked) ? <Form.Group controlId="formBasicEmail">
                            <Form.Group controlId="exampleForm.SelectCustom">
                             
                                <Form.Control as="select" custom onChange={(event) => { setDays(event.target.value) }}>
                                    <option>select</option>
                                    <option>Adding new content</option>
                                    <option>make A change </option>
                                   



                                </Form.Control>{console.log(Days)}
                            </Form.Group>
                        </Form.Group>
: null}
 </Form.Group>
  </Form.Group>
</div>
              <Button variant="primary" type="button" className="submit" onClick={submit}>
                            Submit
                      </Button>
                      <Button variant="primary" type="button" className="submit" onClick={ () => {history.goBack()}}>
                            Back
                      </Button>
                       </Form>
                </div>
            </div>
        </>
    )
}
export default SOP1;