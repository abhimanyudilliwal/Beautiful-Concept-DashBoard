import React, { useState } from "react";
import axios from 'axios'
import validator from 'validator'
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

const Register = () => {
  let history = useHistory();
  const [firstname, setFirstname] = useState({value:'',error:'',valid:false})
  const [lastname, setLastname] = useState({value:'',error:'',valid:false})
  const [email, setEmail] = useState({value:'',error:'',valid:false})
  const [phone, setPhone] = useState({value:'',error:'',valid:false})
  const [password, setPassword] = useState({value:'',error:'',valid:false})
  const[disabled,setDisabled] =useState(true)

  const submit = () => {
    console.log(firstname.value)
    console.log(lastname.value)
    console.log(email.value)
    console.log(phone.value)
    console.log(password.value)
    const data = {
      firstname: firstname.value,
      lastname: lastname.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    }


    console.log({data})
   // console.log(axios.post('http://localhost:3001/res', data))
   if(firstname.value == '' || lastname.value=='' || phone.value==''|| email.value == ''|| password.value =='' )
   {
    NotificationManager.error('wrong Registration');
   }else{
    axios.post('http://localhost:3001/res',data)
    .then((res) => {
     console.log(res); 
        console.log('helllo')
        console.log({res})
      console.log('helllo')
      NotificationManager.success('Success Registration');
      history.push("/");
    })
  
     .catch( (error)=> {
      console.log(error);
      console.log("error");
      NotificationManager.error('please fill the valid information');
     });
   }
  }
  const onDisable = () => {
    if(firstname.valid&& lastname.valid && email.valid && password.valid ){
      setDisabled(false)
    } 
    else{
      setDisabled(true)
    }
  }

  const onblurfirstname = () => {
    if (firstname.value == '') {
      setFirstname({ ...firstname, error: 'Fill the firstname',valid:false })
      onDisable ()
    }
    else {
      setFirstname({ ...firstname, error: '',valid:true })
      
    }
  }
  const onblurlastname = () => {
    if (lastname.value == '') {
      setLastname({ ...lastname, error: 'Fill the lastname',valid:false  })
      onDisable ()
    }
    else {
      setLastname({ ...lastname, error: '',valid:true })
      onDisable()

    }
  }
  const onblurphone = () => {
   const re= /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
   /* const digits = p.replace(/\D/g, ""); */
    if (!re.test(phone.value)){
      setPhone({ ...phone, error: 'Fill the phonenumber',valid:false  })
      onDisable ()
      

    }
    else {
      setPhone({ ...phone, error: '',valid:true })
      onDisable()

    }
  }
  const onbluremail = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email.value).toLowerCase()))
    setEmail({...email, error: "Email is not valid please Enter the Valid email",valid:false  });
    
  else {setEmail({...email, error: "",valid:true });
  onDisable()

}
  }
  const onblurpassword = () => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!re.test(password.value) ) {
      setPassword({ ...password, error: ' min 8 letter password, with at least a symbol, upper and lower case letters and a number',valid:false  })
      onDisable()
    }
    else {
      setPassword({ ...password, error: '',valid:true })
      onDisable()

    }
  }
  return (
    <>
            

      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          {/*  <CardHeader className="bg-transparent pb-5">
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
            {/*  <div className="text-center text-muted mb-4">
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
                  <Input placeholder="FirstName" type="text"  onChange={(event) => { setFirstname({ ...firstname, value: event.target.value }) }}
                        onFocus={(event => { setFirstname({ ...firstname, error: event.target.error }) })}
                        onBlur={onblurfirstname} />
                </InputGroup>
                <span style={{ color: 'red' }} >{firstname.error}</span>
                
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="LastName" type="text" onChange={(event) => { setLastname({ ...lastname, value: event.target.value }) }}
                        onFocus={(event => { setLastname({ ...lastname, error: event.target.error }) })}
                        onBlur={onblurlastname} />
                </InputGroup>
                <span style={{ color: 'red' }} >{lastname.error}</span>
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
              {/*  <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div> */}
              <Row className="my-4">
                <Col xs="12">
                 {/*  <div className="custom-control custom-control-alternative custom-checkbox">
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
                  onClick={submit} disabled={disabled}>
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
