import React from 'react'

export default function ChatInput({query,setQuerychange, getResponse}) {
  return (
    <div className='flex w-full max-w-2xl gap-4'>
        
        <input 
        type="text" 
        name="" 
        id=""  
        placeholder='ask your doubt....'
        className='border w-full p-2 rounded-xl'
        value={query}
        onChange={setQuerychange}
         />
         <button type="button" className='border p-2 rounded-2xl hover:bg-green-800'
         onClick={getResponse}> send</button>
      
    </div>
  )
}
