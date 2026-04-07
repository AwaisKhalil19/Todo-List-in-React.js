import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between items-center bg-[#1E293B] text-white py-2'>
        <div className="logo">
            <span className='font-bold text-2xl mx-7'>iTask</span>
        </div>
        <ul className='flex gap-8 mx-8'>
            <li className='cursor-pointer text-lg transiton-all  hover:font-bold'>Home</li>
            <li className='Cursor-pointer  text-lg transition-all  hover:font-bold'>Your-Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
