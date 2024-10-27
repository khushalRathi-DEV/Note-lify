import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Notes from '../components/Notes'
import NoteModal from '../components/NoteModal'
import { dele, get, post, put } from '../../services/ApiEndPoint'
import toast from 'react-hot-toast'
import UpdateModal from '../components/UpdateModal'
import DeleteModal from '../components/DeleteModal'

const Home = () => {
  const [notes,setNotes] = useState([]);
  const [title,setTitle] = useState("");
  const [refresh,setRefresh] = useState(false);
  const [updatenote,setUpdatenote] = useState("");
  const [noteId,setNotesId] = useState('');
 
  useEffect(() => {
    const getnotes = async() => {
      try {
        const request = await get('/notes/GetNotes');
        const response = request.data;
        setNotes(response.Notes);
        // console.log('object',response);
      } catch (error) {
        console.log(error);
      }
    }
    getnotes();
  },[refresh]);

  const formatDate =(dateString) =>{
    const options = {year : 'numeric' , month :'long' , day : 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined,options);
  };

  const handleCreateNote= async() =>{
    try {
      const request = await post ('/notes/createnote',{title});
      const resposne = request.data;
      if(resposne.success){
        toast.success(resposne.message);
        setRefresh(!refresh);
      }
      console.log("create not response:",resposne);
    } catch (error) {
      console.log(error);
      if(error.message){
        toast.error(error.response.data.message);
      }
    }
  }
  const handleUpdateNote = async() =>{
    try {
      const request = await put(`/notes/updateNotes/${noteId}`,{title:updatenote});
      const response = request.data;
      console.log(response);
      if(response.success){
        toast.success(response.message);
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
      if(error.message){
        toast.error(error.response.data.message);
      }
    }
  }

  const handelNotesDelete= async() =>{
    try {
    const request = await dele(`notes/deleteNotes/${noteId}`);
    const response = request.data;
      console.log(response);
      if(response.success){
        toast.success(response.message);
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
      if(error.message){
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <>
    <NoteModal title={'Create Note'} value={title} handleTitleChange={(e) => setTitle(e.target.value)} handleCreateNote={handleCreateNote}/>
    <UpdateModal title={'Update Note'} value={updatenote} handleTitleChange={(e) => setUpdatenote(e.target.value)} handleUpdateNote={handleUpdateNote}/>
    <DeleteModal handelNotesDelete={handelNotesDelete}/>
    <div className='container-fluid'>
      <div className="row">
        <div className="col-lg-2 col-md-2 min-vh-100 shadow bgimage3">
          <Sidebar />       
        </div>
        <div className='col-lg-10 col-md-10 bgimage2'>
          <Navbar />
          <div className='mt-3 mx-5'>
            <h1 className='fs-2 fw-bold'>NOTES</h1>
          </div>
          <div className='row mt-4 mx-3'>
            { notes && notes.map((elem) => {
              return(
            <div className='col-md-4 mb-5 col-lg-4'> 
              <Notes date={formatDate(elem.createdAt)} title={elem.title} handleUpdate={() => {setNotesId(elem._id)}}/>
            </div>              
              )
            })}
          </div>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default Home
