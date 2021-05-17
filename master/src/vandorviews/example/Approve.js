import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Table} from "react-bootstrap"

function Approve() {
    const [data,setData] =useState([])

    useEffect(() => {
        ApporveProject();
       
    }, [])

    const ApporveProject = () => {
        axios.get('http://localhost:3001/Approveproject' )
        .then((res) => {
            setData(res.data.data)
          console.log(data)
        }).catch((error) => {
          console.log(error);
          console.log("error");
        })
      
    }
    return (
        <div className="container"  >
        <div className="row" >
          <div className='col-12'  style={{marginTop:'150px'}}><h3 style={{textAlign:'center' , fontStyle:'italic'}}>Free Active Services</h3>
          {data.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>  
                <tr>
                  <th>Project Name</th>
                  <th>Approve</th>   
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.Project}</td>
                  <td style={{color:'green'}}>{iteam.approve}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          )}
        </div>
        </div>
      </div>

    )
}

export default Approve
