import React, { useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import About from './components/about/About'
import { BrowserRouter as Router, Routes, Route } from'react-router-dom'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import Todo from './components/todo/Todo'
import { useDispatch } from 'react-redux';
import { authActions } from '../src/store';

const App = () => {

  const dispatch = useDispatch();
  
  useEffect(() => {
    const id = sessionStorage.getItem("id")
    if(id){
      dispatch(authActions.login())
    }
  },[])

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App