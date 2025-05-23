import react from 'react'
import { BrowserRouter, Routes, Route , Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CreateNotes from './pages/CreateNotes'

function Logout(){
  localStorage.clear()
  return <Navigate to = "/login" /> 
}

function RegisterAndLogut(){
  localStorage.clear()
  return <Register/> 
}

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {
          <ProtectedRoute>
            <Home/>
            </ProtectedRoute>
          }/>

        <Route path = "/create-notes" element = {
          <ProtectedRoute>
            <CreateNotes/>
            </ProtectedRoute>
          }/>

        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/logout" element = {<Logout/>}/>
        <Route path = "/register" element = {<RegisterAndLogut/>}/>
        <Route path = "*" element = {<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
