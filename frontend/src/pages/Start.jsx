import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div > 
      <div  className=' bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
        <img className='w-16 ml-8' src="https://cdn-icons-png.flaticon.com/512/89/89131.png" alt=""/>
          <div className='bg-white pb-6 py-4 px-4'>
            <h2 className='text-2xl pl-9 font-bold'>Get Started with TAXI</h2>
            <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded '>Continue</Link>
          </div>
      </div>
    </div>
  )
}

export default Start
