import React from 'react'
import { FaPlus } from "react-icons/fa6";
const Sidebar = () => {
  return (
    <div className='mt-5 mx-4'>
     <h1 className='fs-2 fw-bold text-white'>NoteMaster</h1>
     <div className=' mt-5 mx-3 mb-5 d-flex justify-content-center align-items-center rounded-circle' style={{backgroundColor:"orange",height:"50px", width : "50px" , cursor: "pointer"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
        <FaPlus size={30} className='text-white'></FaPlus>
     </div>
     <h2 style={{ color: "white", fontWeight: "bold" }}>
  All your notes, to-dos, and ideas simplified!
</h2>

    </div>
  )
}

export default Sidebar