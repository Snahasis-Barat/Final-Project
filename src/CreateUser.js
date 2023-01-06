import React, { useState } from 'react'
import { Container,Col,Form,Button,Card } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom';
import './CreateUser.css'
function CreateUser() {
  const  navigate=useNavigate();
    const [oldName,newName]=useState("");
    const [oldRole,newRole]=useState("");
    const [oldBand,newBand]=useState("");
    const [oldResponsibilities,newResponsibilities]=useState("");
    const [oldDesignation,newDesignation]=useState("");
    const [error,setError]=useState(false);
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
    fetch("http://localhost:5035/api/Employee",{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        
        name:e.target.EmpName.value,
        band:e.target.EmpBand.value,
        role:e.target.EmpRole.value,
        responsibilities:e.target.EmpResponsibilities.value,
        designation:e.target.EmpDesignation.value
      })
    })
    .then(res=>res.json())
    .then((result)=>
    {
      alert("Your details are saved")
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
       
      <div style={{backgroundImage:`url("https://www.globallogic.com/in/wp-content/uploads/sites/21/2021/07/GlobalLogic-Social-1.jpg")`}}>    
  <div className='center' >
  <Container>
    <Card style={{ width: '30rem' }}>
      
    <Card.Body>
      <h4>Enter Employee details</h4>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formEmpName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="EmpName" onChange={handleName}/>
        
      </Form.Group>
       {error && oldName==""?<p style={{color:"red"}}>Name is required!!</p>:""}
       {error && /\d/.test(oldName)?<p style={{color:"red"}}>Name should not contain digits!!</p>:""}
      <Form.Group className="mb-3" controlId="formEmpBand">
        <Form.Label>Band</Form.Label>
        <Form.Control type="text" placeholder="Enter Band" name="EmpBand" onChange={handleBand}/>
        
      </Form.Group>
      {error && oldBand==""?<p style={{color:"red"}}>Band is required!!</p>:""}
      {error && /\d/.test(oldBand)?<p style={{color:"red"}}>Band should not contain digits!!</p>:""}
      <Form.Group className="mb-3" controlId="formEmpRole">
        <Form.Label>Role</Form.Label>
        <Form.Control type="text" placeholder="Enter role" name="EmpRole" onChange={handleRole}/>
        
      </Form.Group>
      {error && oldRole==""?<p style={{color:"red"}}>Role is required!!</p>:""}
      {error && /\d/.test(oldRole)?<p style={{color:"red"}}>Role should not contain digits!!</p>:""}
      <Form.Group className="mb-3" controlId="formEmpDesignation">
        <Form.Label>Designation</Form.Label>
        <Form.Control type="text" placeholder="Enter designation" name="EmpDesignation" onChange={handleDesignation}/>
        
      </Form.Group>
      {error && oldDesignation==""?<p style={{color:"red"}}>Designation is required!!</p>:""}
      {error && /\d/.test(oldDesignation)?<p style={{color:"red"}}>Designation should not contain digits!!</p>:""}
      <Form.Group className="mb-3" controlId="formEmpResponsibilities">
        <Form.Label>Responsibilities</Form.Label>
        <Form.Control type="text" placeholder="Enter responsibilities" name="EmpResponsibilities" onChange={handleResponsibilities}/>
        
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
    </div>
    )
  
}

export default CreateUser