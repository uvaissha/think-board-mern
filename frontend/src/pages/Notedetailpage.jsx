import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router'
import api from '../components/lib/axios.js'
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react'
import {Link} from 'react-router'

const Notedetailpage = () => {

    const[note,setNotes]=useState(null)
    const[loading,setLoading]=useState(true)
    const[saving,setSaving]=useState(false)

    const navigate=useNavigate()

    const { id } = useParams();




    useEffect(()=>{
        const fetchNote= async()=>{
            try{
                const res= await api.get(`/notes/${id}`)
                setNotes(res.data)
            }catch(error){
                console.log('error in fetching notes',error)
                toast.error('Failed to Fetch the note')
            }finally{
                setLoading(false)
            }
        }
        fetchNote();

    },[id]);

    const handleDelete=async ()=>{
        if(!window.confirm('Are you sure your want to delete this post ?')) return

        try{
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted");
            navigate('/')
        }catch(error){
            console.log('error deleting the notes',error)
            toast.error("failed to delete the note")


        }
    };
    const handleSave=async()=>{
        if(!note.title.trim() || !note.content.trim()){
            toast.error('please add a title or content')
            return
        }
        setSaving(true)
        
        try{
            await api.put(`/notes/${id}`,note)
            toast.success("Note updated Succesfully ")
            navigate('/')
        }catch(error){
            console.log("error saving the note",error)
            toast.error("failed to update the note")
        }finally{
            setSaving(false)
        }

    }

    if(loading){
        return(
            <div className='min-h-screen bg-base-200 flex items-center justify-center '>
                <LoaderIcon className='animate-spin size-10'/>
            </div>
        )
    }


  return (
    <div className='min-h-screen bg-base-200 '>
        <div className="container mx-auto px-4 py-8">
            <div className='max-w-2xl mx-auto'>
            <div className='flex items-center justify-between mb-6'>
                <Link to='/' className='btn btn-ghost'>
                <ArrowLeftIcon className='h-5 w-5'></ArrowLeftIcon>
                Back to Notes
                </Link>
                <button onClick={handleDelete} className='btn btn-error btn-outline'>
                    <Trash2Icon className='h-5 w-5'></Trash2Icon>
                    Delete Note
                </button>
            </div>

            <div className='card bg-base-100'>
                <div className="card-body">
                 <div className='form-control mb-4'>
                    <label className='label'>
                        <span className='label-text'>Title</span>
                    </label>
                    <input type="text" placeholder='Note Title' className='input input-bordered'
                        value={note.title} onChange={(e)=> setNotes({...note,title:e.target.value})} />
                 </div>
                 <div className='form-control mb-4'>
                    <label className='label'>
                        <span className='label-text'>Content</span>
                    </label>
                    <textarea placeholder='Write your note here ' className='textarea textarea-bordered h-32'
                        value={note.content} onChange={(e)=> setNotes({...note,content:e.target.value})} />
                 </div>
                 <div className='card-actions justify-end'>
                    <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                        {saving ? 'saving...' : "Save changes"}
                    </button>
                 </div>
                </div>
            </div>
            </div>
        </div>
      
    </div>
  )
}

export default Notedetailpage
