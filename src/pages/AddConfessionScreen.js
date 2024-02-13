import React from 'react'
import NavCard from '../components/NavCard';
import ProfileCard from '../components/ProfileCard';
import Card from '../components/Card';
export default function AddConfessionScreen() {
  return (

    <div className='grid-cols-1 grid md:grid-cols-4 gap-8  h-full p-4 m-2 fixed w-full' style={{ height: '100%' }}>
      <div className='hidden md:block gap-4 col-span-1'>
        <ProfileCard />
        <NavCard />
      </div>
      <div className='gap-4 col-span-2 h-full'>
        <div className='' style={{ height: '100%', width: '100%' }}>

          <div className="flex justify-center">
            <img src='./images/confession.jpg' alt='confession' className='rounded-lg '
            width='60%' height={100}
             />
          </div>
          <div className="flex flex-col gap-4 p-4">


            {/* // select name profile name or anonymous */}
            <select className="w-full p-2 border-2 border-gray-300 rounded-lg">
              <option value="Profile Name">Profile Name</option>
              <option value="Anonymous">Anonymous</option>
            </select>


            <textarea placeholder="Confession" className="w-full p-2 border-2 border-gray-300 rounded-lg" rows={4}  />
            <button className="p-2 bg-blue-500 text-white rounded-lg">Submit</button>
          </div>




        </div>
      </div>
      <div className='hidden md:block'>
        <h1>Section 3</h1>
      </div>
    </div>
  )
}
