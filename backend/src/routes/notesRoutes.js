import express from 'express';
import {getAllnotes,getNotebyId,createNotes,updateNotes,deleteNotes} from '../controllers/notesController.js'
const router=express.Router();

router.get('/',getAllnotes)

router.get('/:id',getNotebyId)


router.post('/',createNotes)


router.put('/:id',updateNotes)

router.delete('/:id',deleteNotes)

export default router
