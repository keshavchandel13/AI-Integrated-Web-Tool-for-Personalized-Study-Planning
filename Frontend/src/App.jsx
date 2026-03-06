import React from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import AppRoutes from './Routes/AppRoutes'

function App() {

  return (
    <>
    <div >
      <ToastContainer position="top-right" autoClose={3000} />

        <AppRoutes/>
    </div>
    </>
  )
}

export default App
