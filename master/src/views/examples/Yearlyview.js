import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';

function Refunds() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/year')
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
        {data.map((iteam, index) => <div key={index} >
          <Table striped bordered hover>
            <thead>
              <tr>

                <th>Services Name</th>
                <th>Price</th>
                <th>Totalamount</th>
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


