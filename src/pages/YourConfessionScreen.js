import React from 'react'
import Card from '../components/Card';
import NavCard from '../components/NavCard';
import ProfileCard from '../components/ProfileCard';


export default function YourConfessionScreen() {
  return (

    <div className='grid-cols-1 grid md:grid-cols-4 gap-8  h-full p-4 m-2 fixed w-full' style={{ height: '100%' }}>
      <div className='hidden md:block gap-4 col-span-1'>
        {/* // profile card */}
        <ProfileCard />
        {/* // navigation card */}
        <NavCard />


      </div>
      <div className='gap-4 col-span-2 h-full shadow-lg'>
        {/* // main content */}
        <div className=' overflow-y-auto overflow-x-hidden'
          style={{
            scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px',
          }}>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div className='hidden md:block'>
        <h1>Section 3</h1>
      </div>
    </div>
  )
}
