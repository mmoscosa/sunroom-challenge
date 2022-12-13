import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Home from './pages'
import Login from './pages/login'

function App() {
  const { isAuthenticated } = useAuth0()
  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Home />} exact />
        ) : (
          <Route path="/" element={<Login />} exact />
        )}
      </Routes>
    </Router>
  )
}

export default App
