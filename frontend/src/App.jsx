import { useEffect, useState } from 'react'
import {BrowserRouter , Routes, Route} from "react-router-dom"
import Dashboard from './components/dashboard'
import CreateTask from './components/createTask'
import { useLocation } from 'react-router-dom'

function App() {

function AppContent(){
  const location = useLocation()
  useEffect(()=>{
  

  if(location.pathname==="/dashboard"){
    document.body.classList.add("dashboard")
} else {
    document.body.classList.remove("dashboard")
}  
if(location.pathname === "/"){
  document.body.classList.add("home")
} else {
  document.body.classList.remove("home")
}
},[location.pathname])  //or we can also remove dependency
 return <Routes>
 <Route path="/" element={<CreateTask/>}></Route>
 <Route path='/dashboard' element={<Dashboard/>}></Route>
</Routes>
}
  return (
    <>
    
      <BrowserRouter>
        <AppContent/>
      </BrowserRouter>
    </>
  )
}


export default App
