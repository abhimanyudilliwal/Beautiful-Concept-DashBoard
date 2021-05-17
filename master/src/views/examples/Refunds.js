import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';

function Refunds() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/amount')
      .then((res) => {
        console.log(res.data);
        console.log(res.data);
        setData(res.data.data)
        console.log(data)
        console.log('helllo')
      }).catch((error) => {
        console.log(error);
        console.log("error");
      });
  }, []);

  /* const user = () => {
    
    } */


  return (
    <>
      <div style={{ paddingTop: '150px' }}>
      <div > <h3 style={{ textAlign: 'center',fontStyle:'italic'}}>WE ARE SHOW ALL DETAILS</h3></div>
        {data.map((iteam, index) => <div key={index} >
          <Table striped bordered hover>
            <thead>
              <tr>

                <th style={{fontWeight:'bold'}}>Services Name</th>
                <th style={{fontWeight:'bold'}}>Price</th>
                <th style={{fontWeight:'bold'}}>Totalamount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{iteam.servicename}</td>
                <td>{iteam.price}</td>
                <td>{iteam.totalamount}</td>

              </tr>
            </tbody>
          </Table>
        </div>

        )}

      </div> </>


  )
}
export default Refunds


