import React from 'react'
import { post } from '../../services/ApiEndPoint'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async() =>{
    try{
    const request = await post('auth/logout');
    const response = request.data;
      console.log(response);
      if(response.success){
        toast.success(response.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      if(error.message){
        toast.error(error.response.data.message);
      }
    }
  }
  const handleLogin = () =>{
    try {
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <nav className='navbar'>
      <div className='container-fluid p-2'>

        <input type='text' name="" id="" className='mx-3 searchinput' placeholder='Search'/>
        <div>
        <button className='btn btn-dark text-white mx-3' onClick={handleLogout}>Logout</button>
        <button className='btn btn-dark text-white mx-3' onClick={handleLogin}>Login</button>
        </div>

      </div> 
    </nav>
    </>
  )
}

export default Navbar