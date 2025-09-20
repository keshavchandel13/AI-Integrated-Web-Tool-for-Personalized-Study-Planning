import React from 'react'
import { useState } from 'react'
import Login from '../Components/Auth/Login'
import Signup from '../Components/Auth/Signup'

export default function AuthPage() {
    const [login, setLogin] = useState(true)
    const toggleButton=()=>{
        login?setLogin(false):setLogin(true)
    }
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg border border-gray-200">
        {login ? <Login setLogin={toggleButton} /> : <Signup setLogin={toggleButton} />}
      </div>
    </div>
    )
}
