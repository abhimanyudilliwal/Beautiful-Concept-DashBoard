
import React, { useState } from "react";
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from "react-router-dom";

// reactstrap components
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
} from "reactstrap";

const Login = () => {
 let history = useHistory();
  const [email,setEmail]=useState({value:'',error:''})
  const [password,setPassword]=useState({value:'',error:''})


  // const data={
  //   email:email,
  //   password:password,
  // }


  const submit =() =>{
    const params = new URLSearchParams()
    params.append("email", email.value)
    params.append("password", password.value)
  
    console.log(email.value)
    console.log(password.value)
    axios.post('http://localhost:3001/login',params)
    .then((res) => {
     console.log(res); 
     if(res.data.status)
     {
      NotificationManager.success('Success login');
      localStorage.setItem('id',res.data.data[0].id)
      localStorage.setItem('usermail',res.data.data[0].email)
     
     history.push("/admin");
     }else{
      NotificationManager.error('Your email and password wrong');

     }
        console.log('helllo')
        console.log({res})
      console.log('helllo')
     
    }).catch( (error)=> {
      console.log(error);
      console.log("error");
      NotificationManager.error('sometimes fe Wrong');

     

     });
  }

  const onblurlogin = () => {
    if (email.value == '') {
      setEmail({ ...email, error: 'Fill the Email' })
    }
    else {
      setEmail({ ...email, error: '' })
    }
  }
  const onblurpassword = () => {
    if (password.value == '') {
      setPassword({ ...password, error: 'Fill the password' })
    }
    else {
      setPassword({ ...password, error: '' })
    }
  }

  const forget = () => {
   
    history.push("/auth/reset");
  }

  const vandorGo = () => {
    history.push('/vandor/login')
  }

  return (
    <>
              

      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
       {/*    <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with</small>
            </div>
            <div className="btn-wrapper text-center">
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
              <small>Or sign in with credentials</small>
            </div> */}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange= {(e) => {setEmail({...email,value:e.target.value})}}
                    onFocus={(event => { setEmail({ ...email, error: event.target.error }) })}
                    onBlur={onblurlogin} 
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
                    onChange= {(e) => {setPassword({...password,value:e.target.value})}}
                    onFocus={(event => { setPassword({ ...password, error: event.target.error }) })}
                    onBlur={onblurpassword} 
                  />
                </InputGroup>
                <span style={{ color: 'red' }} >{password.error}</span>

              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
               {/*  <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label> */}
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" 
                onClick={submit}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <button onClick={forget}>Forgot password?</button>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            {/* <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            > */}
              <small style={{color:'red'}}  onClick ={vandorGo} >Are You vandor Please Click its's</small>
           {/*  </a> */}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
