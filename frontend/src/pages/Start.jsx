import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div > 
      <div  className=' bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
        <img className='w-16 ml-8' src="https://th.bing.com/th/id/R.eadac11b662faa57e4b806263f8e7642?rik=dXbhLg7x49QVbg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuber-logo-vector-png-uber-icon-png-50-px-1600.png&ehk=hWY6TYYwZAYpPbHKLid%2f431JJx%2frKI7tiY%2b6i993Y1A%3d&risl=&pid=ImgRaw&r=0" alt=""/>
          <div className='bg-white pb-6 py-4 px-4'>
            <h2 className='text-2xl pl-9 font-bold'>Get Started with Uber</h2>
            <Link to='/login' className=' flex items-center justify-center w-full bg-black text-white py-3 rounded '>Continue</Link>
          </div>
      </div>
    </div>
  )
}

export default Start
