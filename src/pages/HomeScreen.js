import React, { useEffect } from 'react';
import Card from '../components/Card';
import NavCard from '../components/NavCard';
import ProfileCard from '../components/ProfileCard';
import TrendingCards from '../components/TrendingCards';
import SearchSection from '../components/SearchSection';
import {confessionRef } from '../config/firebase';
import { getDocs, query, orderBy } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const navigate = useNavigate()
  const [confessions, setConfessions] = React.useState([])


  const fetchConfessions = async () => {
    try {
      if(localStorage.getItem('user')===null){
        navigate('/login')
      }

      const q = query(confessionRef, orderBy('createdAt', 'desc'));
      const docSnap = await getDocs(q);
      let data = []
      docSnap.forEach((doc) => {
        data.push(doc.data())
      });
      setConfessions(data)
      console.log(data)

    } catch (error) {
      console.error("Error getting documents: ", error);


    }
  }


  useEffect(() => {
    fetchConfessions();

    // eslint-disable-next-line
  }, [])


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
            {
              confessions.map((data, index) => {
                return (
                  <Card key={index} data={data} />
                )
              })
            
            }
        </div>
      </div>
      <div className='mr-2 hidden md:block'>

        <SearchSection />
        <TrendingCards />
      </div>
    </div>
  );
}
