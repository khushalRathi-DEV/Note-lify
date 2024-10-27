import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../../services/ApiEndPoint';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const [loginval,setLoginval] = useState({
    email :"",
    password : ""
  })
  const handleChange= (e) =>{
    setLoginval({
      ...loginval,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit =async(e) => {
    e.preventDefault();
    try {
      const request = await post('/auth/login',loginval);
      const response = request.data;
      if(response.success){
        toast.success(response.message);
      }
      navigate('/');
      console.log("object",response);
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  } 
  

  return (
    <div className='container-fluid min-vh-100 d-flex justify-content-center align-items-center bgimage' >
      <div className='form-container border shadow p-5 rounded-4 bg-white '>
        <h2 className='text-center mb-4 fw-bold'>Login</h2>
        <form className='d-flex flex-column'onSubmit={handleSubmit} >

          <div className="form-group mb-3">
          <label htmlFor="email" className='form-label'>Email</label>

            <input type="email" name='email' className="form-control" placeholder="Email" value={loginval.email} onChange={handleChange} aria-label="Email" aria-describedby="basic-addon2"/>
          </div>

          <div className='form-group mb-3'>
            
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" name='password' className='form-control' value={loginval.password} onChange={handleChange} placeholder='Enter your password' id="password"/>
          </div>

          <button className='btn btn-success w-100 mb-3'>Login</button>

          <div className='text-center'>
            <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
