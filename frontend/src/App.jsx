import React from 'react'
import { Route,Routes } from 'react-router'
import Homepage  from './pages/Homepage'
import Createpage from './pages/Createpage'
import Notedetailpage from './pages/Notedetailpage'
import toast from "react-hot-toast"

const App = () => {
  return (
    <div className="relative h-screen w-full">
    <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,rgba(0,255,157,0.25)_100%)]"></div>
      <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/create" element={<Createpage/>}/>
            <Route path="/note/:id" element={<Notedetailpage/>}/>
        </Routes>
      
        
      
      
    </div>
  )
}

export default App
