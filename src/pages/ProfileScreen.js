import React from 'react'
import { useSelector } from 'react-redux'

import {usersRef } from '../config/firebase'
import { updateDoc, getDocs, doc, where, query } from 'firebase/firestore'

import { useDispatch } from 'react-redux'
import {  setAvtar } from '../redux/slices/user';
import { useNavigate } from 'react-router-dom'


export default function ProfileScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myavtar = useSelector(state => state.user.avtar);
  const [changeAvatar, setChangeAvatar] = React.useState(false)
  const [avatar, setAvatar] = React.useState('')
  const [userData, setUserData] = React.useState({})

  const fetchUserDetails = async () => {
    try {


      let uid = JSON.parse(localStorage.getItem('user'))?.uid;
      if (!uid)
      {
        navigate('/login')
        return
      }  
      const q = query(usersRef, where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      let temp = {}
      querySnapshot.forEach((doc) => {
        temp = { ...doc.data(), id: doc.id }
      });
      setUserData(temp)
    } catch (error) {
      console.error("Error getting documents: ", error);


    }

  }

  const updateAvatar = async () => {
    let docid = userData.id;
    try {
      await updateDoc(doc(usersRef, docid), {
        avatar: avatar-1
      });
      dispatch(setAvtar(avatar-1))
      setChangeAvatar(!changeAvatar)

    } catch (error) {
      console.error("Error updating document: ", error);
      alert(error.message)
    }
  }

  React.useEffect(() => {
    fetchUserDetails()
    // eslint-disable-next-line
  }, [])





  return (
      <div className='gap-4 col-span-2 h-full shadow-lg mr-5'>
        {/* // main content */}
        {!changeAvatar && <div className=' '>

          {/* // user profile */}
          <div className='items-center justify-center flex flex-col py-4'>
            <img
              src={
                myavtar === null ?
                  './images/sad-face.png'
                  :
                  `./images/Avatar/Avatar${myavtar + 1}.jpg`

              }
              alt='profile'
              className='rounded-full hover:border-2 border-blue-500'

              width='150'
              height='150'

            />
            <p className='text-red-500 text-xs cursor-pointer pt-2'
              onClick={() => setChangeAvatar(!changeAvatar)}
            >Change Avatar</p>

            <h1 className='text-2xl py-2 font-bold'>
              {userData.name}
            </h1>
          </div>
          {/* // email address */}
          <div className='flex justify-center gap-4 items-center space-y-4'>
            <label className='text-gray-500 pt-2'>Email</label>

            <input type='email' className='border border-gray-300 rounded-lg p-2 w-3/4' placeholder='Email Address' defaultValue={userData.email} disabled />

          </div>
          {/* // logout button */}
          <div className='flex justify-center mt-4'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
              Logout
            </button>
          </div>




        </div>}

        {/* // change avatar section */}
        {changeAvatar &&
          <div className=' overflow-y-auto overflow-x-hidden'
            style={{
              scrollbarWidth: 'none', height: '100vh', paddingBottom: '250px',
            }}>
            {/* // display all avtar images here */}
            <div className='flex flex-wrap gap-4 justify-around items-center'>
              <img
                src='./images/Avatar/Avatar1.jpg'
                alt='profile'
                width='150'
                height='150'
                onClick={() => setAvatar('1')}
                className={avatar === '1' ?
                  'rounded-full border-4 border-blue-500 shadow-lg'
                  :
                  'rounded-full  hover:border-2 border-blue-500 '}



              />
              <img
                src='./images/Avatar/Avatar2.jpg'
                alt='profile'

                width='150'
                height='150'
                onClick={() => setAvatar('2')}

                className={avatar === '2' ?
                  'rounded-full border-4 border-blue-500 shadow-lg'
                  :
                  'rounded-full  hover:border-2 border-blue-500 '}


              />
              <img
                src='./images/Avatar/Avatar3.jpg'
                alt='profile'

                width='150'
                height='150'
                onClick={() => setAvatar('3')}

                className={avatar === '3' ?
                  'rounded-full border-4 border-blue-500 shadow-lg'
                  :
                  'rounded-full  hover:border-2 border-blue-500 '}


              />
              <img
                src='./images/Avatar/Avatar4.jpg'
                alt='profile'

                width='150'
                height='150'
                onClick={() => setAvatar('4')}

                className={avatar === '4' ?
                  'rounded-full border-4 border-blue-500 shadow-lg'
                  :
                  'rounded-full  hover:border-2 border-blue-500 '}

              />
              <img
                src='./images/Avatar/Avatar5.jpg'
                alt='profile'

                width='150'
                height='150'
                onClick={() => setAvatar('5')}

                className={avatar === '5' ?
                  'rounded-full border-4 border-blue-500 shadow-lg'
                  :
                  'rounded-full  hover:border-2 border-blue-500 '}

              />
              <img
                src='./images/Avatar/Avatar6.jpg'
                alt='profile'

                width='150'
                height='150'
                onClick={() => setAvatar('6')}

                className={avatar === '6' ?
                  'rounded-full border-4 border-blue-500 shadow-lg'
                  :
                  'rounded-full  hover:border-2 border-blue-500 '}

              />
            </div>
            {/* // save button */}
            <div className='flex justify-center mt-4'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md'
                onClick={() => updateAvatar()}
              >
                Save
              </button>
            </div>


          </div>

        }

      </div>
    
  )
}
