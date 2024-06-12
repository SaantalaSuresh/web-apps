import React from 'react'
import Login from './pages/Login/login'
import {
    Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import Register from './pages/register/register'
import Home from './pages/Home/home';
import "./App.css"

const App = () => {
  return (
   <div className='container'>
    <BrowserRouter>
   <Routes>
    <Route exact path="/register" Component={Register} />
    <Route exact path='/login' Component={Login} />
    <Route exact path='/' Component={Home} />
   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
