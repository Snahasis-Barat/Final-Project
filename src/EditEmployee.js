import React from 'react'
import { Card,Form,Button ,Container} from 'react-bootstrap'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './EditEmployee.css'
function EditEmployee() {
    const  navigate=useNavigate();
    const params=useParams();
    const [oldName,newName]=useState("");
    const [oldRole,newRole]=useState("");
    const [oldBand,newBand]=useState("");
    const [oldResponsibilities,newResponsibilities]=useState("");
    const [oldDesignation,newDesignation]=useState("");
    const [error,setError]=useState(false);

    useEffect(()=>{
        fetch("http://localhost:5035/api/Employee/"+params.empId)
        .then(response=>response.json())
        .then(data=>{
          console.log(data);
          newName(data.name)
          newBand(data.band)
          newDesignation(data.designation)
          newResponsibilities(data.responsibilities)
         newRole(data.role)
        })
      },[])

      function handleSubmit(e)
      {
        e.preventDefault();
        var re = /\d/;
    if(oldName==""||oldBand==""||oldRole==""||oldResponsibilities==""||oldDesignation=="")
    {
        setError(true)
    }
    else if (re.test(oldName) || re.test(oldRole) || re.test(oldBand) || re.test(oldDesignation) || re.test(oldResponsibilities))
    {
        setError(true)
    }
        
       else{
        var text="Are you sure you want to submit?"
        if(window.confirm(text))
        {
        fetch("http://localhost:5035/api/Employee/"+params.empId,{
          method:'PUT',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
         
          body:JSON.stringify({
            
            name:e.target.EmpName.value,
            role:e.target.EmpRole.value,
           band:e.target.EmpBand.value,
            responsibilities:e.target.EmpResponsibilities.value,
            designation:e.target.EmpDesignation.value
          })
        })
        .then(res=>res.json())
        .then((result)=>
        {
          alert("Details are saved")
          navigate('/')
          
        },
        
       (error)=>{
        alert('failed');
       } ,
       
        )
      }
    }
      }


    function handleName(e)
    {
        newName(e.target.value)
    }
    function handleRole(e)
    {
        newRole(e.target.value)
    }
    function handleBand(e)
    {
        newBand(e.target.value)
    }
    function handleResponsibilities(e)
    {
        newResponsibilities(e.target.value)
    }
    function handleDesignation(e)
    {
        newDesignation(e.target.value)
    }

  return (
    <div class='center'>
        <Container>
    <Card style={{ width: '30rem' }}>
    <Card.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formEmpName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="EmpName" value={oldName} onChange={handleName}/>
        
      </Form.Group>
       {error && oldName==""?<p style={{color:"red"}}>Name is required!!</p>:""}
       {error && /\d/.test(oldName)?<p style={{color:"red"}}>Name should not contain digits!!</p>:""}
      <Form.Group className="mb-3" controlId="formEmpBand">
        <Form.Label>Band</Form.Label>
        <Form.Control type="text" placeholder="Enter Band" name="EmpBand" value={oldBand} onChange={handleBand}/>
        
      </Form.Group>
      {error && oldBand==""?<p style={{color:"red"}}>Band is required!!</p>:""}
      {error && /\d/.test(oldBand)?<p style={{color:"red"}}>Band should not contain digits!!</p>:""}
      <Form.Group className="mb-3" controlId="formEmpRole">
        <Form.Label>Role</Form.Label>
        <Form.Control type="text" placeholder="Enter role" name="EmpRole" value={oldRole} onChange={handleRole}/>
        
      </Form.Group>
      {error && oldRole==""?<p style={{color:"red"}}>Role is required!!</p>:""}
      {error && /\d/.test(oldRole)?<p style={{color:"red"}}>Role should not contain digits!!</p>:""}
      <Form.Group className="mb-3" controlId="formEmpDesignation">
        <Form.Label>Designation</Form.Label>
        <Form.Control type="text" placeholder="Enter designation" name="EmpDesignation" value={oldDesignation} onChange={handleDesignation}/>
        
      </Form.Group>
      {error && oldDesignation==""?<p style={{color:"red"}}>Designation is required!!</p>:""}
      {error && /\d/.test(oldResponsibilities)?<p style={{color:"red"}}>Designation should not contain digits!!</p>:""}
      <Form.Group className="mb-3" controlId="formEmpResponsibilities">
        <Form.Label>Responsibilities</Form.Label>
        <Form.Control type="text" placeholder="Enter responsibilities" name="EmpResponsibilities" value={oldResponsibilities} onChange={handleResponsibilities}/>
        
      </Form.Group>
      {error && oldResponsibilities==""?<p style={{color:"red"}}>Responsibilities is required!!</p>:""}
      {error && /\d/.test(oldResponsibilities)?<p style={{color:"red"}}>Responsibilities should not contain digits!!</p>:""}
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </Card.Body>
    </Card>
    </Container>
    
    </div>
  )
}

export default EditEmployee