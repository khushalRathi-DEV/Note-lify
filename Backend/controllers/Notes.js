import Notesmodel from "../models/Notes.js";

const Create = async(req,res) => {
  try {
    const userId = req.userid;
    const {title} = req.body;
    console.log(userId);
    if(!title){
      return res.status(303).json({
        success : false,
        message : 'Please provide the title'
      })
    }

    const NewNotes = await Notesmodel.create({
      title,userId
    })
    return res.status(200).json({
      success : true,
      message : 'Note created successfully',
      Notes : NewNotes
    })

  } catch (error) {
      console.log(error);
      return res.status(500).json({
        success : false,
        message : 'Internal Server Error:',error
      })
  }
}
const updateNotes = async (req, res) => {
  try {
    const userId = req.userid;  
    const NotesId = req.params.id;  
    const { title } = req.body;  

    const FindNotes = await Notesmodel.findById({ _id: NotesId });

    if (!FindNotes) {
      return res.status(404).json({ success: false, message: "Notes Not Found" });
    }
    // Checking if the user owns the note
    const NotesuserId = FindNotes.userId;  
    // console.log('Authenticated userId:', userId);
    // console.log('Note creator userId:', NotesuserId); //checking
    if (NotesuserId.toString() !== userId.toString()) { 
      return res.status(403).json({ success: false, message: "Unauthorized user" });
    }

    // Update the note's title
    const updatedNotes = await Notesmodel.findByIdAndUpdate(
      { _id: NotesId },
      { title },
      { new: true }  // Return the updated document
    );

    // Respond with the updated note
    res.status(200).json({ success: true, message: 'Notes Updated successfully', updatedNotes });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const deleteNotes = async (req,res) => {
  try {
    const userId = req.userid;
    const NotesId = req.params.id;
    const FindNotes = await Notesmodel.findById({_id:NotesId});

    if(!FindNotes)
      return res.status(404).json({success : false ,message : 'Notes Not Found' });

    const NotesuserId = FindNotes.userId;

    if(NotesuserId.toString() !== userId.toString())
      return res.status(403).json({success : false ,message :"Unauthorized User" });

    const DeletedNote = await Notesmodel.findByIdAndDelete({_id : NotesId});
    res.status(200).json({success : true , message : "Note deleted successfully",deleteNotes});

  } catch (error) {
         console.log(error);
      return res.status(404).json({success : false,message:"Internal Server Error"});
  }
}

const GetNotes = async (req,res) => { 
  try {
    const userId = req.userid;
    const Notes = await Notesmodel.find({userId:userId});
    if(!Notes){
      return res.status(404).json({success : false , message : 'No data found'});
    }
    res.status(200).json({success : true ,Notes});
  } catch (error) {
    console.log(error);
      return res.status(404).json({success : false,message:"Internal Server Error"});
  }
}

export { Create , updateNotes ,deleteNotes, GetNotes}