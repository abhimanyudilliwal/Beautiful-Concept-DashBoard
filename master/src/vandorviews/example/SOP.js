import React, { useState,useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';


const SOP = () => {
    let history = useHistory();
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
    const [fields, setFields] = useState([{ value: '' }]);
    const [projectName, setProjectName] = useState('')
    const [complaint, setComplaint] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')
    const [disabled, setDisabled] = useState(false)

    const [Team, setTeamName] = useState('')
    const [Hourly, setHourly] = useState('')
    const [Days, setDays] = useState('')

    const [team, setTeam] = useState('')
    const [data, setData] = useState([])
    const [checked, setChecked] = useState(false)
    const [teamchecked, setTeamChecked] = useState(false)

    useEffect(() => {
        submit()

    }, [])

 

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
  
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
      
      };
   /*    localStorage.setItem('value',inputList.firstName) */
      // handle click event of the Remove button
      const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
      };
     
      // handle click event of the Add button
      const handleAddClick = () => {
        setInputList([...inputList, { firstName: "", lastName: "" }]);
      };

    /*    function handleChange(i, event) {
           const values = [...fields];
           values[i].value = event.target.value;
           setFields(values);
           console.log(values)
   
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
       } */
    const save = () => {

        let requirements = ""


        inputList.forEach((item) => {
            console.log(item.firstName)
            // requirements.push(item.firstName)
            requirements = requirements + item.firstName + ", " + item.lastName

        })

       
        console.log(requirements)
        console.log(inputList)

        // hello, umesh

        const data = {
            projectname: projectName,
            description: description,
            field: requirements
        }
        if(projectName == ''|| requirements =='')
        {
            alert("please fill the requiements")
        }else{
        axios.post(`http://localhost:3001/SOP`, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                NotificationManager.success('successfully add requirement');
            }).catch(function (error) {
                console.log('error')
            })
        }
    }
    return (
        <>
          
            <div className="containers">
                <div > <h3 style={{ textAlign: 'center',fontStyle:'italic' }}>SOP</h3></div>
                <div className="main">
                    <h4 style={{ textAlign: 'center' }}></h4>
                    <Form className="form">
                    <Form.Group>
                            <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}> Project Name</Form.Label>
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


                        {/* <Form.Label>List Of Requirements</Form.Label>
                        {fields.map((field, idx) => {
                            return (

                                <div key={`${field}-${idx}`}>
                                    <button type="button" onClick={() => handleAdd()}>
                                        +
                                        </button>
                                    <input
                                        type="text"
                                        placeholder="Enter text"
                                        value={fields.value}
                                        onChange={e => handleChange(idx, e)}
                                    />
                                    <button type="button" onClick={() => handleRemove(idx)}>
                                        X
            </button>

                                </div>
                            );
                        })} */}
                        {/*             <div className="mb-3" style={{ marginTop: '10px' }}>
    <input type="file" name="myFile" accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                        onChange={(event) => {setFile(event.target.value)}}  />
                              
                </div> */}

                        <div className="box">
                                
                            <label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>list Of Requirements</label>
                            {inputList.map((x, i) => {
                                return (
                                    <div className="Container-fluid">
                                        <div className='row'>
                                            <div className='col-4 mb-1'>
                                        <input
                                            name="firstName"
                                            placeholder="Title"
                                            value={x.firstName}
                                            onChange={e => handleInputChange(e, i)}
                                        />
                                        </div>
                                        <div className='col-4 mb-1'>
                                        <input 
                                            className="ml10"
                                            name="lastName"
                                            placeholder="Detail"
                                            value={x.lastName}
                                            onChange={e => handleInputChange(e, i)}
                                        />
                                        </div>
                                        <div className='col-4'>
                                       
                                            {inputList.length !== 1 && <Button
                                                className="p-1" variant="dark" type="button"
                                                onClick={() => handleRemoveClick(i)} >Remove</Button>}
                                            {inputList.length - 1 === i && <Button variant="dark"  type="button" onClick={handleAddClick}>Add</Button>}
                                        </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {/*  <div style={{ marginTop: 20 }}>{ JSON.stringify(inputList)}</div>  */}
                        
                        
                        </div>



                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="" onChange={(event) => { setDescription(event.target.value) }} />


                        </Form.Group>

                        <div>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                {/*    {          <Form.Label>Final SOP</Form.Label>}
                  { <Form.Control as="textarea" rows={3} placeholde}r="" onChange={(event) => { setDescription(event.target.value) }} />
                  {          {console.log(description)}{console.log}(fields)}
                  {        }
                  {  <Form.Label>SOP Approve or Modify</Form.Label>} */}
                              {/*   <Form.Group controlId="formBasicEmail">
                                    <label >
                                        <input type="checkbox"

                                            onClick={() => setChecked(!checked)}
                                        />
                             Approve
                            </label>  {(checked) ? <Form.Group controlId="formBasicEmail">
                                        <Form.Group controlId="exampleForm.SelectCustom">

                                            <Form.Control as="select" custom disabled={disabled} onChange={(event) => { setHourly(event.target.value) }}>
                                                <option>Full Time</option>
                                                <option>Custom</option>

                                            </Form.Control>{console.log(Hourly)}
                                        </Form.Group>
                                    </Form.Group>
                                        : null}
                                </Form.Group> */}

                         {/* <Form.Group controlId="formBasicEmail">
                                    <label >
                                        <input type="checkbox"

                                            onClick={() => setTeamChecked(!teamchecked)}
                                        />
                              Modify
                            </label>  {(teamchecked) ? <Form.Group controlId="formBasicEmail">
                                        <Form.Group controlId="exampleForm.SelectCustom">

                                            <Form.Control as="select" custom onChange={(event) => { setDays(event.target.value) }}>
                                                <option>select</option>
                                                <option>Adding new content</option>
                                                <option>make A change </option>




                                            </Form.Control>{console.log(Days)}
                                        </Form.Group>
                                    </Form.Group>
                                        : null}
                                </Form.Group> */}
                            </Form.Group>
                        </div>
                        <Button variant="dark" type="button" style ={{marginLeft:'300px'}} className="submit" onClick={save}>
                            Submit
                      </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default SOP;