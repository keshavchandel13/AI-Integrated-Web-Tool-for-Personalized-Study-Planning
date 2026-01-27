import React, { useState } from 'react'
import Login from '../Components/Auth/Login'
import Signup from '../Components/Auth/Signup'
import { ToastContainer, toast } from 'react-toastify'
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md glass-card  text-white p-10 rounded-xl shadow-xl border border-gray-200">

        {/* Component Swap */}
        {isLogin ? (
          <Login setLogin={() => setIsLogin(false)} />
        ) : (
          <Signup setLogin={() => setIsLogin(true)} />
        )}

      </div>
    </div>
  )
}
