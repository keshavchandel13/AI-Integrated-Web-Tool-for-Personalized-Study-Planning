import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../Api/Auth'

export default function Signup({ setLogin }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  // Sign-up--> 
  const submitSignup = async (e) => {
    e.preventDefault()
    try {
      const res = await signup({ name, email, password })
      if (res) {
        alert("Signup successful! Please login.")
        navigate('/') // redirect to login page
      }
    } catch (err) {
      console.error("Error in signup: ", err)
      alert("Signup failed. Please try again.")
    }
  }
  // Handling form change -->
  const formChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') setEmail(value)
    else if (name === 'name') setName(value)
    else if (name === 'password') setPassword(value)
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200 mx-auto">
      <h1 className="text-center text-3xl font-bold mb-6">Signup</h1>
      <form onSubmit={submitSignup} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium">Name:</label>
          <input
            placeholder="Enter your name"
            onChange={formChange}
            type="text"
            value={name}
            name="name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input
            placeholder="Enter your email"
            onChange={formChange}
            type="email"
            value={email}
            name="email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password:</label>
          <input
            placeholder="Enter your password"
            onChange={formChange}
            type="password"
            value={password}
            name="password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition-colors"
        >
          Signup
        </button>
      </form>
      <button
        onClick={setLogin}
        className="mt-4 w-full bg-gray-200 text-gray-800 font-semibold py-2 rounded hover:bg-gray-300 transition-colors"
      >
        Login
      </button>
    </div>
  )
}
