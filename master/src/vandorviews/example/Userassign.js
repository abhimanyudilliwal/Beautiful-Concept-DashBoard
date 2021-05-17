import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import axios from 'axios';
import member from  './data';
import './Userassign.css';

import { NotificationContainer, NotificationManager } from 'react-notifications';


const Userassign = () => {
    const[project,setProject]=useState('')
    const[name,setName]=useState('')
    const[single,setSingle]=useState('')
    const[team,setTeam]=useState('')
    const [data, setData] = useState([])
    const [checked, setChecked] = useState(false)
    const [teamchecked, setTeamChecked] = useState(false)
    const [disabled, setdisable] =useState(false)


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
        const information ={
            project:project,
            name:name,
            checked:checked,
            teamchecked:teamchecked,
            vandoruser:localStorage.getItem('vandoruser')
        }
        if( checked ==true && teamchecked== true ) {
            alert("please selcet single or team")
        }else{
        axios.post(`http://localhost:3001/userassign`,information)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            NotificationManager.success('Success request submitted');
        }).catch(function (error) {
            console.log('error')
            NotificationManager.error(' requestfailed');
        })}
    }

    return (
        <>

            <div className="containers">
                <div class="geeks"> 
                </div>
                <div>
                <h3 style={{ textAlign: 'center',fontStyle:'italic' }}>VANDOR ASSIGN FORM</h3>
                </div>
                <div className="main">
                    <h1 style={{ textAlign: 'center' }}>Work </h1>
                    <Form className="form">
                        {console.log("hello UserAssign")}
                        <Form.Group>
                        <Form.Label style={{fontStyle:'oblique',fontWeight: 'bold'}}> Project Name</Form.Label>
                            <Form.Control as="select" custom  onChange={(event) => {
                                    setProject(event.target.value)
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

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{fontStyle:'oblique',fontWeight: 'bold'}}> UserName</Form.Label>
                            <Form.Control type="text" placeholder="User Name"  onChange={(event) => { setName(event.target.value) }}  />{console.log(name)}
                        </Form.Group>


                  
                        <Form.Group controlId="formBasicEmail">
                            <label style={{fontWeight: 'bold'}} >
                                <input type="checkbox"
                                  
                                    onClick={() => setChecked(!checked)}
                                />
                                Single
                            </label >  { (checked) ? <Form.Group controlId="formBasicEmail">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Vandor Team</Form.Label>
                                <Form.Control as="select" custom onChange={(event) => { setSingle(event.target.value) }}>
                                    <option>select</option>
                                    <option>Single</option>
                                    
                                </Form.Control>{console.log(single)}
                            </Form.Group>
                        </Form.Group>
: null}

                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <label style={{fontWeight: 'bold'}} >
                                <input type="checkbox"
                                  
                                    onClick={() => setTeamChecked(!teamchecked)}
                                />
                                Team
                            </label>  { (teamchecked) ? <Form.Group controlId="formBasicEmail">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Vandor Team</Form.Label>
                                <Form.Control as="select" custom onChange={(event) => { setTeam(event.target.value) }}>{console.log(data)}
                                {
                                        member.map((item, index) => {
                                            return (
                                                <option key={index}>{item.team}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form.Group>
: null}

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
export default Userassign;
