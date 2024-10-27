import express from 'express'
import { Create, deleteNotes, GetNotes, updateNotes } from '../controllers/Notes.js';
import { verifyToken } from '../middlewares/Verificationtoken.js'

const NotesRoutes = express.Router();

NotesRoutes.post('/createnote',verifyToken,Create);
NotesRoutes.put('/updateNotes/:id',verifyToken,updateNotes);
NotesRoutes.delete('/deleteNotes/:id',verifyToken,deleteNotes);
NotesRoutes.get('/GetNotes',verifyToken,GetNotes);

export default NotesRoutes;