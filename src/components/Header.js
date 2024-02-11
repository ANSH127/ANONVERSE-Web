import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between items-center p-3 bg-white shadow-sm text-xl font-bold'>
        <h1>AnonVerse</h1>
        <div>
            <button className=' text-black font-bold py-2 px-4 rounded'>
                Login
            </button>
        </div>


    </div>
  )
}
