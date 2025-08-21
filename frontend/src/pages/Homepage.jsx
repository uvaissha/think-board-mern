import React from 'react'
import { useState,useEffect } from 'react'
import Navbar from '../components/navbar'
import RateLimited from '../components/RateLimited'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../components/lib/axios.js'
import NotesNotFound from '../components/NotesNotFound.jsx'


const Homepage = () => {
    const [isRateLimited,setIsRateLimited]= useState(false);
    const[notes,setNotes] = useState([])
    const[loading,setLoading] = useState (true)

    useEffect(()=>{
        const fetchNotes=async ()=>{
            try{
                const res=await axios.get('http://localhost:5001/api/notes')
                console.log(res.data);
                setNotes(res.data)
                setIsRateLimited(false)

            }catch(error){
                console.log('error fetching notes')
                console.log(error)
                if(error.response?.status == 429){
                    setIsRateLimited(true)

                }else{
                    //toast.error('failed to load notes')
                }
            }finally{
                setLoading(false)
            }
        };
        fetchNotes();
    }, []);


    return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimited && <RateLimited/>}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text_center text-primary py-10'>Loading notes...</div>}

        {notes.length===0 && !isRateLimited && <NotesNotFound/>}


        {notes.length>0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note)=>(
                    <div>
                        <NoteCard key={note._id} note={note} setNotes={setNotes} />
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}

export default Homepage
