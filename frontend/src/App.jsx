import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import AppRoutes from './routes/appRoutes'
import Navbar from './pages/Navbar'
// import './App.css'

function App() {
  
  return (
    <>
    <Navbar/>
    <AppRoutes />

    </>
  )
}

export default App
