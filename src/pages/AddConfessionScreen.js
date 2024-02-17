import React from 'react'
import NavCard from '../components/NavCard';
import ProfileCard from '../components/ProfileCard';
import AddConfessionForm from '../components/AddConfessionForm';
import SearchSection from '../components/SearchSection';
import TrendingCards from '../components/TrendingCards';
export default function AddConfessionScreen() {
  
  return (

    <div className='grid-cols-1 grid md:grid-cols-4 gap-8  h-full p-4 m-2 fixed w-full' style={{ height: '100%' }}>
      <div className='hidden md:block gap-4 col-span-1'>
        <ProfileCard />
        <NavCard />
      </div>
      <div className='gap-4 col-span-2 h-full shadow-lg mr-5'>


        <AddConfessionForm />
      </div>
      <div className='mr-2 hidden md:block'>

        <SearchSection />
        <TrendingCards />
      </div>
    </div>
  )
}
