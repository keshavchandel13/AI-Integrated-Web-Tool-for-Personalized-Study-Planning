import React from 'react'

export default function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className='bg-blue-300'>
        Welcome Back! {user.username}
      
    </div>
  )
}
