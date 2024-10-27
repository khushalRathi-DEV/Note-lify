import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  title : {
    type : String
  },
  userId : {
    type : String               // can also write object it 
  }

},{timestamps : true})

const Notesmodel = mongoose.model("Notes",NotesSchema);

export default Notesmodel;