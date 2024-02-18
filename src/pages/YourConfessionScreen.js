import React from 'react'
import Card from '../components/Card';
import { confessionRef } from '../config/firebase';
import { getDocs, where, query, orderBy } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'




export default function YourConfessionScreen() {
  const avatarlist = useSelector(state => state.user.AvtarList)

  const [confessions, setConfessions] = React.useState([])
  const navigate = useNavigate()


  const fetchConfessions = async () => {
    try {

      if (localStorage.getItem('user') === null) {
        navigate('/login')
        return
      }
      let uid = JSON.parse(localStorage.getItem('user')).uid
      const q = query(confessionRef, where('uid', '==', uid), orderBy('createdAt', 'desc'))

      const docSnap = await getDocs(q);
      let data = []
      docSnap.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      });
      setConfessions(data)
      // console.log(data)

    } catch (error) {
      console.error("Error getting documents: ", error);
      toast.error('Error fetching confessions')


    }
  }

  React.useEffect(() => {
    fetchConfessions();

    // eslint-disable-next-line
  }, [])


  return (
      <div className='gap-4 col-span-2 h-full shadow-lg'>
        {/* // main content */}
        <div className=' overflow-y-auto overflow-x-hidden'
          style={{
            scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px',
          }}>
          {
            confessions.map((data, index) => {
              return (
                <Card key={index} data={data}
                  avatarName={avatarlist.filter((item) => item.uid === data.uid)[0]?.avatar}
                  deleteConfession={true}

                />
              )
            })

          }
        </div>
      </div>
    
  )
}
