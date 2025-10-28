import React from 'react'
import Subject from '../Components/Subject/Subject'
import TodayTopics from '../Components/Subject/TodayTopics'

export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className=''>
        <Subject userId={user.id}/>
      <TodayTopics userId={user.id}/>
      
    </div>
  )
}
