import React from 'react'

export default function MessageBubble({messages}) {
  return (
    <div>
        {messages.map((ms, i)=>(
            ms.role==="user"?(
                <p className='text-white bg-blue-950'>{ms.text}</p>
            )
            :
            (
                <p className='text-white bg-black'>{ms.text}</p>

            )
        ))}

      
    </div>
  )
}
