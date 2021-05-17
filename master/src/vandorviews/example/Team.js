import React from 'react'
import team from './data.js'
import {Table} from 'react-bootstrap'
function Team() {
    return(
        <>
       
{/* <div style={{padding:'150px'}}>
        <table >
  <tr>
    <th>Id</th>
    <th>Team name</th>
    <th>Member name</th>
  </tr>
 
  {
team.map((item, index) => {
return (
    
    <tr>
<td key={index}>{item.id}</td>
<td key={index}>{item.team}</td>
<td key={index}>{item.name}</td>

</tr>

)
})
}

  
</table>
</div> */}
<div className="container"  >
        <div className="row">
          <div className="col-12"><h3 style={{textAlign:'center' ,fontStyle:'italic',marginTop:'100px'}}>Team Memebers</h3>
          {team.map((iteam, index) => <div key={index} >
            <Table striped bordered hover>
              <thead>
                <tr>

                  <th style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>ID</th>
                  <th style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Team Name</th>
                  <th style={{fontStyle:'oblique' ,fontWeight: 'bold'}}>Member</th>
                
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{iteam.id}</td>
                  <td>{iteam.team}</td>
                  <td>{iteam.name}</td>
             

                </tr>
          
              </tbody>
            </Table>
            
          </div>

          )}
        </div>
      </div>
      </div>


</>   
)}

export default Team
