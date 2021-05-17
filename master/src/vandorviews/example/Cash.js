import React, { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import axios from 'axios';
import member from './data';


import { NotificationContainer, NotificationManager } from 'react-notifications';


const Project1 = () => {
    const [project, setProjectName] = useState('')
    const [team, setTeamName] = useState('')
    const [fileupload, setFile] = useState('')
    const [description, setDescription] = useState('')
    const [data, setData] = useState([])
    const [day, setDay] = useState(false)
    const [hour, setHour] = useState(false)
    const [hourwork, setHourwork] = useState('')
    const [daywork, setDaywork] = useState('')
    const [fields, setFields] = useState([{ value: null }]);
    const[timingwork ,setTimingwork]=useState('')
    const[timing ,setTiming]=useState('')




    useEffect(() => {
        submit()

    }, [])

   /*  const save = () => {
        setChecked(!checked)
        setdisable(!disabled)
    }
    const check = () => {
        setTeamChecked(!teamchecked)
        setdisable(!disabled)
    } */

    const submit = () => {
        console.log('data',data)
        axios.get(`http://localhost:3001/bud`)
            .then(res => {
                console.log(res);
                console.log(res.data.data);
                setData(res.data.data)
            }).catch(function (error) {
                console.log('error')
            })
    }
    // console.log(fullname)
   /*  function handleChange(i, event) {
  
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
 */

const saveaction = () => {
    console.log(project)
    console.log(team)
    console.log(hourwork)
    console.log(timingwork)

   
    const data = {
        project:project,
        team:team,
        hourwork:hourwork,
        timingwork:timingwork
        
    }
    
    axios.post(`http://localhost:3001/paycash`,data)
    .then(res => {
        console.log(res);
        console.log(res.data.data);
        NotificationManager.success('Success request submitted');
    }).catch(function (error) {
        console.log('error')
        NotificationManager.error(' requestfailed');
    })

}

    return (
        <>

            <div className="containers">
                <div > <h3 style={{ textAlign: 'center',fontStyle:'italic'}}>Pay As Cash</h3></div>
                <div className="main">
                    <h1 style={{ textAlign: 'center',fontStyle:'italic'}}>Cash</h1>
                    <Form className="form">
               
                        <Form.Group>
                            <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}> Project Name</Form.Label>
                            <Form.Control as="select" custom onChange={(event) => {
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
                        <Form.Group>
                            <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}> Team Name</Form.Label>
                            <Form.Control as="select" custom onChange={(event) => {
                                setTeamName(event.target.value)
                            }} >{console.log(team)}
                                {
                                    member.map((item, index) => {
                                        return (
                                            <option key={index}>{item.team}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Label></Form.Label>
                        {/* <div className="mb-3" style={{ marginTop: '10px' }}>

                            <input type="file" name="myFile" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={(event) => { setFile(event.target.value) }} />
                            {console.log(setFile)} {console.log(fileupload)}


                        </div> */}
                       {/*  {fields.map((field, idx) => {
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
                                        {console.log(description)} {console.log(field)}
                                    </Form.Group>


                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label> Total Work in Hour </Form.Label>
                                        <Form.Control type="Text" placeholder="" onChange={(event) => { setTotalWork(event.target.value) }} />
                                        {console.log(TotalWork)}{console.log(field)}
                                    </Form.Group>
                                </div>


                            );
                        })}
 */}

 <Form.Group controlId="formBasicEmail">
                            <label style={{fontStyle:'oblique' ,fontWeight: 'bold'}} >
                                <input type="checkbox"
                                  
                                    onClick={() => setHour(!hour)}
                                />
                                Pay as cash
                            </label>  { (hour) ? <Form.Group controlId="formBasicEmail">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Total Work</Form.Label>
                                <Form.Control type="text" placeholder="total hour"  onChange={(event) => { setHourwork(event.target.value) }}  /><br />
                                <Form.Label>Timing</Form.Label>
                                <Form.Control type="date" placeholder="Timing"  onChange={(event) => { setTimingwork(event.target.value) }}  />
                            </Form.Group>
                        </Form.Group>
: null}

                        </Form.Group>
                        {/* <Form.Group controlId="formBasicEmail">
                            <label >
                                <input type="checkbox"
                                  
                                    onClick={() => setDay(!day)}
                                />
                                Pay as Days
                            </label>  { (day) ? <Form.Group controlId="formBasicEmail">
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Total Work</Form.Label>
                                <Form.Control type="text" placeholder="total hour"  onChange={(event) => { setDaywork(event.target.value) }}  />
                                <Form.Control type="text" placeholder="timing"  onChange={(event) => { setTiming(event.target.value) }}  />
                            </Form.Group>
                        </Form.Group>
: null} */}

                       {/*  </Form.Group> */}
                        <Button variant="dark" type="button" className="submit" style ={{marginLeft:'300px'}} onClick={saveaction} >
                            Submit
</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default Project1;