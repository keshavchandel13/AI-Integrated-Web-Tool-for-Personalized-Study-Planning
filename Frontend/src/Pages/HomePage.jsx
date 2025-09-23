import React from 'react'
import Subject from '../Components/Subject/Subject'

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className=''>
        <Subject userId={user.id}/>
      
    </div>
  )
}
