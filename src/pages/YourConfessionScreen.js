import React from 'react'
import Card from '../components/Card';
// import { confessionRef } from '../config/firebase';
// import { getDocs, where, query, orderBy } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
// import Loadar from '../components/Loadar';
import axios from 'axios';



export default function YourConfessionScreen() {

  const [confessions, setConfessions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()


  const fetchConfessions = async () => {
    try {
      setLoading(true)

      if (!localStorage.getItem('token')) {
        navigate('/login')
        return
      }
      // let uid = JSON.parse(localStorage.getItem('user')).uid
      // const q = query(confessionRef, where('uid', '==', uid), orderBy('createdAt', 'desc'))

      // const docSnap = await getDocs(q);
      // let data = []
      // docSnap.forEach((doc) => {
      //   data.push({ ...doc.data(), id: doc.id })
      // });
      // setConfessions(data)
      // console.log(data)

      const response = await axios.get('http://localhost:4000/api/userconfessions', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        setConfessions(response.data)
      } else {
        toast.error('Error fetching confessions')
      }

    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error('Error fetching confessions')


    }
    finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchConfessions();

    // eslint-disable-next-line
  }, [])


  return (
    <div className='w-full gap-4 col-span-2 h-full shadow-lg'>
      {/* // main content */}
      {

        loading ?
          <div className=' overflow-y-auto overflow-x-hidden'
            style={{
              scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px'
            }}
          >

            <Card key={0} data={{}} />
            <Card key={1} data={{}} />
            <Card key={2} data={{}} />
            <Card key={3} data={{}} />
            <Card key={4} data={{}} />
          </div>
          :

          <div className=' overflow-y-auto overflow-x-hidden'
            style={{
              scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px',
            }}>

            <h1 className='text-3xl font-semibold text-center mt-4 mb-4'>
              Your Confessions
            </h1>
            {
              confessions.length > 0 ?

                confessions.map((data, index) => {
                  return (
                    <Card key={index} data={data}
                      deleteConfession={true}
                    />
                  )
                })
                :
                <h1 className='text-3xl font-semibold text-center mt-4 mb-4'>
                  No Confessions Found
                </h1>

            }
          </div>
      }
    </div>

  )
}
