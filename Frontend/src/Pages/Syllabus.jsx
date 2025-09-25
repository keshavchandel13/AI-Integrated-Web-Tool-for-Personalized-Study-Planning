import React from 'react'
import Subject from '../Components/Syllabus/Subject'

export default function Syllabus() {
    const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div>
        <Subject userId={user.id}/>
      
    </div>
  )
}
