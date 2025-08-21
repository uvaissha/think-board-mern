import Note from '../model/Note.js'

export async function getAllnotes(req,res){
    try{
        const notes=await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
    }catch(error){
        console.error("error in getAllnotes controller",error)
        res.status(500).json({message:'Internal Server Error'})
    }

    
}
export async function getNotebyId(req,res){
    try{
        
        const note=await Note.findById(req.params.id)
        if(!note) return res.status(404).json({message:'Note not found'})
        res.json(note);
    }
    catch(error){
        console.error("Error in getNotebyId controller",error)
        res.status(500).json({message:'Internal Server Error'})


}
}

export async function createNotes(req,res){
    try{

        const{title,content}=req.body;
        const NewNote=new Note({title,content})
        const SavedNode=await NewNote.save()
        res.status(200).json(SavedNode)
    }
    catch(error){
        console.error("Error in createNotes controller",error)
        res.status(500).json({message:'Internal Server Error'})


    }
}

export async function updateNotes(req,res){
    try{
        const{title,content}=req.body;
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true});
        if(!updatedNote) return res.status(404).json({message:'Note not found'})
        res.status(200).json(updatedNote)
    }
    catch(error){
        console.error("Error in updateNotes controller",error)
        res.status(500).json({message:'Internal Server Error'})


}
}

export async function deleteNotes(req,res){
    try{
        const{title,content}=req.body;
        const deleteNote=await Note.findByIdAndDelete(req.params.id,{title,content},{new:true});
        if(!deleteNote) return res.status(404).json({message:'Note not found'})
        res.status(200).json(deleteNote)
    }
    catch(error){
        console.error("Error in  deleteNotes controller",error)
        res.status(500).json({message:'Internal Server Error'})


}
}
    
