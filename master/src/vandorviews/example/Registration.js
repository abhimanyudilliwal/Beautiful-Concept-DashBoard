import React, { useState } from "react";
import axios from 'axios'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Modal,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const VendorRegister = () => {

  let history = useHistory();
  const [name, setName] = useState({value:'',error:''})
  const [email, setEmail] = useState({value:'',error:''})
  const [phone, setPhone] = useState({value:'',error:''})
  const [dob, setDOB] = useState({value:'',error:''})
  const [gender, setGender] = useState({value:'',error:''})
  const [securityQuestions, setSecurityQuestions] = useState({value:'',error:''})
  const [securityanswer, setSecurityanswer] = useState({value:'',error:''})
  const [password, setPassword] = useState({value:'',error:''})
  const [confirmpassword, setConfirmpassword] = useState({value:'',error:''})

  const submit = () => {
    console.log(name.value)
    console.log(email.value)
    console.log(phone.value)
    console.log(dob.value)
    console.log(gender.value)
    console.log(securityQuestions.value)
    console.log(securityanswer.value)
    console.log(password.value)
    console.log(confirmpassword.value)
    const data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      dob: dob.value,
      gender: gender.value,
      securityQuestions: securityQuestions.value,
      password: password.value,
      confirmpassword: confirmpassword.value,
    }
    console.log({ data })
    if (password.value != confirmpassword.value) {
      NotificationManager.error('password does not match');
    } else {
      axios.post('http://localhost:3001/register', data)
        .then((res) => {
          console.log(res);
          console.log({ res })
          NotificationManager.success('Success Registration');
          history.push("/vandor/login");
        })

        .catch((error) => {
          console.log(error);
          console.log("error");
          NotificationManager.error('please check the field is not valid');
        });
    }
  }

  const onblurname = () => {
    if (name.value == '') {
      setName({ ...name, error: 'Fill the Name' })
     
    }
    else {
      setName({ ...name, error: '' })
      
    }
  }
  const onblurDOB = () => {
    if (dob.value == '') {
      setDOB({ ...dob, error: 'Fill the DOB' })
     
    }
    else {
      setDOB({ ...dob, error: '' })
     

    }
  }
  const onblurGender = () => {
    if (gender.value == '') {
      setEmail({ ...gender, error: 'Fill the Gender' })
     
    }
    else {
      setEmail({ ...gender, error: '' })
     

    }
  }
  const onblurSecurity = () => {
    if (securityQuestions.value == '') {
      setSecurityQuestions({ ...securityQuestions, error: 'Fill the SecurityQuestion' })
     
    }
    else {
      setSecurityQuestions({ ...securityQuestions, error: '' })
     

    }
  }
  const onblurSecurityanswer = () => {
    if (securityanswer.value == '') {
      setSecurityanswer({ ...securityanswer, error: 'Fill the SecurityAnswer' })
     
    }
    else {
      setSecurityanswer({ ...securityanswer, error: '' })
     

    }
  }
  const onblurphone = () => {
   const re= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
   /* const digits = p.replace(/\D/g, ""); */
    if (!re.test(phone.value)){
      setPhone({ ...phone, error: 'Fill the phonenumber' }) 

    }
    else {
      setPhone({ ...phone, error: '' })
     

    }
  }
  const onbluremail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email.value).toLowerCase()))
    setEmail({...email, error: "Email is not valid please Enter the Valid email"  });
    
  else {setEmail({...email, error: "",valid:true });
 

}
  }
  const onblurpassword = () => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!re.test(password.value) ) {
      setPassword({ ...password, error: ' min 8 letter password, with at least a symbol, upper and lower case letters and a number',valid:false  })
     
    }
    else {
      setPassword({ ...password, error: '',valid:true })

    }
  }

  const alreadylogin = () =>{
    history.push("/vandor/login");

  }
  return (
    <>
      

      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          {/* <CardHeader className="bg-transparent pb-5">
<div className="text-muted text-center mt-2 mb-4">
<small>Sign up with</small>
</div>
<div className="text-center">
<Button
className="btn-neutral btn-icon mr-4"
color="default"
href="#pablo"
onClick={(e) => e.preventDefault()}
>
<span className="btn-inner--icon">
<img
alt="..."
src={
require("../../assets/img/icons/common/github.svg")
.default
}
/>
</span>
<span className="btn-inner--text">Github</span>
</Button>
<Button
className="btn-neutral btn-icon"
color="default"
href="#pablo"
onClick={(e) => e.preventDefault()}
>
<span className="btn-inner--icon">
<img
alt="..."
src={
require("../../assets/img/icons/common/google.svg")
.default
}
/>
</span>
<span className="btn-inner--text">Google</span>
</Button>
</div>
</CardHeader> */}
          <CardBody className="px-lg-5 py-lg-5">
            {/* <div className="text-center text-muted mb-4">
<small>Or sign up with credentials</small>
</div> */}
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Name" type="text" onChange={(event) => { setName({ ...name, value: event.target.value }) }}
                        onFocus={(event => { setName({ ...name, error: event.target.error })})}
                        onBlur={onblurname} />
                </InputGroup>
                <span style={{ color: 'red' }} >{name.error}</span>
              </FormGroup>
              <FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      onChange={(event) => { setEmail({ ...email, value: event.target.value }) }}
                        onFocus={(event => { setEmail({ ...email, error: event.target.error }) })}
                        onBlur={onbluremail}
                    />
                  </InputGroup>
                  <span style={{ color: 'red' }} >{email.error}</span>
                </FormGroup>


                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Phone Number" type="phone" onChange={(event) => { setPhone({ ...phone, value: event.target.value }) }}
                        onFocus={(event => { setPhone({ ...phone, error: event.target.error }) })}
                        onBlur={onblurphone} />
                  </InputGroup>
                  <span style={{ color: 'red' }} >{phone.error}</span>
                </FormGroup>




                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-watch-time" />
                      </InputGroupText>

                  {/*     <input placeholder="DOB" type="date" onChange={(event) => { setDOB(event.target.value) }} /> */}
                      <Input placeholder="DOB" type="date" onChange={(event) => { setDOB({ ...dob, value: event.target.value }) }}
                        onFocus={(event => { setDOB({ ...dob, error: event.target.error }) })}
                        onBlur={onblurDOB} />
                   {/*    </InputGroupAddon>
                 </InputGroup>
                      </FormGroup> */}


                         {/* <FormGroup>
                         <InputGroup className="input-group-alternative mb-3">
                         <InputGroupAddon addonType="prepend"> */}
                      <InputGroupText style={{ marginLeft: '40px' }}  >
                        <i className="ni ni-support-16" />
                      </InputGroupText>

                     {/*  {<select name="cars" style={{ width: '180px' }} onChange={(event) => { setGender(event.target.value) }} >
                        <option value="volvo">Gender</option>
                        <option value="saab">Male</option>
                        <option value="mercedes">female</option>}

                      </select> */}
                      <Input type="select" custom  onChange={(event) => { setGender({ ...gender, value: event.target.value }) }}
                        onFocus={(event => { setGender({ ...gender, error: event.target.error }) })}
                        onBlur={onblurGender} >
                      <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gender&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                      <option>Male</option>
                      <option>female</option>
                      
                     
                    </Input>
                    
                    </InputGroupAddon>
                   {/*  <span style={{ color: 'red' }} >{dob.error}</span>
                    <span style={{ color: 'red' }} >{gender.error}</span> */}
                  </InputGroup>
                </FormGroup>


                <FormGroup>
                  <InputGroup className="input-map-big mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-mobile-button" />
                      </InputGroupText>
                    </InputGroupAddon>
                     {/* <select name="cars" style={{ width: '430px' }} onChange={(event) => { setSecurityQuestions(event.target.value) }}  >
                      <option value="volvo">Security Questions</option>
                      <option value="saab"> your pet name</option>
                      <option value="mercedes">your DoB</option>
                      <option value="audi">best friend name</option>
                    </select> */}
                    <Input type="select" custom   onChange={(event) => { setSecurityQuestions({ ...securityQuestions, value: event.target.value }) }}
                        onFocus={(event => { setSecurityQuestions({ ...securityQuestions, error: event.target.error }) })} onBlur={onblurSecurity}>
                      <option>Security Questions</option>
                      <option>your pet name</option>
                      <option>your DoB</option>
                      <option>best friend name</option>
                     
                    </Input>
                    
                  </InputGroup>
                  <span style={{ color: 'red' }} >{securityQuestions.error}</span>
                </FormGroup>

                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-bulb-61" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Answer"
                      type="text"
                      autoComplete="new-password"
                      onChange={(event) => { setSecurityanswer({ ...securityanswer, value: event.target.value }) }}
                        onFocus={(event => { setSecurityanswer({ ...securityanswer, error: event.target.error }) })}
                        onBlur={onblurSecurityanswer}
                    />
                  </InputGroup>
                  <span style={{ color: 'red' }} >{securityanswer.error}</span>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      onChange={(event) => { setPassword({ ...password, value: event.target.value }) }}
                        onFocus={(event => { setPassword({ ...password, error: event.target.error }) })}
                        onBlur={onblurpassword}
                    />
                  </InputGroup>
                  <span style={{ color: 'red' }} >{password.error}</span>
                </FormGroup>



                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirmpassword"
                      type="password"
                      autoComplete="Confirmpassword"
                      onChange={(event) => { setConfirmpassword({ ...confirmpassword, value: event.target.value })}}
                        onFocus={(event => { setConfirmpassword({ ...confirmpassword, error: event.target.error })})}
                        onBlur={onblurpassword}
                    />
                  </InputGroup>
                </FormGroup>






              </FormGroup>



              {/* <div className="text-muted font-italic">
<small>
password strength:{" "}
<span className="text-success font-weight-700">strong</span>
</small>
</div> */}
              <Row className="my-4">
                <Col xs="12">
                  {/* <div className="custom-control custom-control-alternative custom-checkbox">
<input
className="custom-control-input"
id="customCheckRegister"
type="checkbox"
/>
<label
className="custom-control-label"
htmlFor="customCheckRegister"
>
<span className="text-muted">
I agree with the{" "}
<a href="#pablo" onClick={(e) => e.preventDefault()}>
Privacy Policy
</a>
</span>
</label>
</div> */}
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button"
                  onClick={submit}>
                  Create account
</Button>
              </div>
              <div className="text-center">
                <Button className="mt-4" color="warning" type="button"
                  onClick={alreadylogin}>
                  Already Login
</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default VendorRegister;