import React from 'react'
import {Button,Table,Form,Col,Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useEffect,useState} from 'react'
function ShowUsers() {
    const [empDetails,setempDetails]=useState([]);
    const [empDetailsByDesignation,setempDetailsByDesignation]=useState([])
    const [formChecked,setformChecked]=useState(false)
    const [empDes,setempDes]=useState(false)
    function handleCheckbox(e)
    {
      if(e.target.checked)
      {
        console.log("Checked")
        setformChecked(true)
      }
      else{
        setformChecked(false)
        setempDes(false)
      }
    }
    useEffect(()=>{
        fetch("http://localhost:5035/api/Employee")
        
        .then(response=>response.json())
        .then(data=>{
            setempDetails(data);
        })
    })
    function handleDesignation(e)
    {
       e.preventDefault();
       fetch("http://localhost:5035/api/Employee/GetEmployeesByDesignation/"+e.target.EmpDesignation.value)
        
        .then(response=>response.json())
        .then(data=>{
            setempDetailsByDesignation(data)
            setempDes(true)
        })
       
    }
    function deleteEmployee(id)
    {
        var text="Are you sure you want to delete?"
        if(window.confirm(text))
        {

        
        fetch("http://localhost:5035/api/Employee/"+id,{
        method:'DELETE',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        }
    }
   )
    .then(res=>res.json())
    .then((result)=>
    {
       alert("Employee details deleted")
    },
    (error)=>{
        alert(error)
    }

    )
}
    }
    return(
    <div>
        <Container>
        <Col lg={3} style={{"margin-top":"15px"}}>
        <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        label="Filter by designation" name="FilterDesignation" onChange={handleCheckbox}
      />
      
      </Form>
      <br/>
      {formChecked?
        
        <Form onSubmit={handleDesignation}>
      <Form.Group className="mb-3" controlId="formEmpDesignation">
        
        <Form.Control type="text" placeholder="Enter name" name="EmpDesignation"  required/>
        
      </Form.Group>
      <Button variant="primary" type="submit">Submit</Button>
      </Form>
      :""}
      </Col>
      

     <br/>
{formChecked && empDes?
     <Table striped bordered hover>
            <thead>
                <tr>
                
                <th>EmployeeName</th>
                <th>Band</th>
                <th>Role</th>
                <th>Responsibilities</th>
                <th>Designation</th>
                </tr>
            </thead>
            <tbody>
           {empDetailsByDesignation.map((e,index)=>
            
            <tr key={index}>
           
            <td>{e.name}</td>
            <td>{e.band}</td>
            <td>{e.role}</td>
            <td>{e.responsibilities}</td>
            <td>{e.designation}</td>
            <td><Button variant="danger" onClick={()=>deleteEmployee(e.empId)}>Delete</Button></td>
            <td><Link to={`/editEmployee/${e.empId}`}> <Button variant="warning">Edit</Button></Link></td>
           
           </tr>
           
          
           )}
           </tbody>
           </Table>


      :<Table striped bordered hover>
            <thead>
                <tr>
                
                <th>EmployeeName</th>
                <th>Band</th>
                <th>Role</th>
                <th>Responsibilities</th>
                <th>Designation</th>
                </tr>
            </thead>
            <tbody>
           {empDetails.map((e,index)=>
            
            <tr key={index}>
           
            <td>{e.name}</td>
            <td>{e.band}</td>
            <td>{e.role}</td>
            <td>{e.responsibilities}</td>
            <td>{e.designation}</td>
            <td><Button variant="danger" onClick={()=>deleteEmployee(e.empId)}>Delete</Button></td>
            <td><Link to={`/editEmployee/${e.empId}`}> <Button variant="warning">Edit</Button></Link></td>
           
           </tr>
           
          
           )}
           </tbody>
           </Table>}
           </Container>
    </div>
  )
}

export default ShowUsers