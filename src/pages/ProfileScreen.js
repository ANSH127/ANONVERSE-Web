import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAvtar } from '../redux/slices/user';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { theme } from '../theme';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Footer from '../components/Footer'
import axios from 'axios'

export default function ProfileScreen() {
  const mode = useSelector(state => state.user.theme)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myavtar = useSelector(state => state.user.avtar);
  const [changeAvatar, setChangeAvatar] = React.useState(false)
  const [avatar, setAvatar] = React.useState(1)
  const [userData, setUserData] = React.useState({})

  const fetchUserDetails = async () => {
    try {


      let token = localStorage.getItem('token');
      if (!token) {
        navigate('/login')
        return
      }

      const response = await axios.get('http://localhost:4000/api/getuserdetails', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      console.log(response.data);
      setUserData(response.data);



    } catch (error) {

      console.error("Error getting documents: ", error);
      toast.error('Error fetching user details')


    }

  }

  const updateAvatar = async () => {
    try {

      const response = await axios.patch('http://localhost:4000/api/update-avatar', {
        avatar: avatar - 1
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(response.data);

      if (response.status === 200) {
        toast.success('Avatar updated successfully')
        setChangeAvatar(!changeAvatar)
        localStorage.setItem('user', JSON.stringify({ ...userData, avatar: avatar - 1 }))
        dispatch(setAvtar(avatar-1))
      }


    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error('Error updating avatar')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.href = '/'
    toast.success('Logged out successfully')
  }

  React.useEffect(() => {
    fetchUserDetails()
    // eslint-disable-next-line
  }, [])





  return (
    <div className='gap-4 w-full col-span-2 h-full shadow-lg mr-5'>
      {/* // main content */}
      {!changeAvatar && <div className=' '>

        {/* // user profile */}
        <div className='items-center justify-center flex flex-col py-4'>
          <img
            src={
              userData === null ?
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
            {userData.username || <Skeleton width={100} />}
          </h1>
        </div>
        {/* // email address */}
        <div className='flex justify-center gap-4 items-center space-y-4'>
          <label className={` ${mode ? theme.black : theme.white} font-semibold pt-2`}>Email</label>

          <input type='email' className={` ${mode ? theme.black : theme.white} border border-gray-300 rounded-lg p-2 w-3/4`} placeholder='Email Address' defaultValue={userData.email} disabled />

        </div>
        {/* // logout button */}
        <div className='flex justify-center mt-4'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={handleLogout}>
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

      <Footer />

    </div>

  )
}
