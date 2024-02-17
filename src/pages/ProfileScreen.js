import React from 'react'
import NavCard from '../components/NavCard'
import ProfileCard from '../components/ProfileCard'
import SearchSection from '../components/SearchSection'
import TrendingCards from '../components/TrendingCards'
import { useSelector } from 'react-redux'


export default function ProfileScreen() {
  const myavtar=useSelector(state=>state.user.avtar);
  const [changeAvatar, setChangeAvatar] = React.useState(false)
  const [avatar, setAvatar] = React.useState('')

  



  return (

    <div className='grid-cols-1 grid md:grid-cols-4 gap-8  h-full p-4 m-2 fixed w-full' style={{ height: '100%' }}>
      <div className='hidden md:block gap-4 col-span-1'>
        {/* // profile card */}
        <ProfileCard />
        {/* // navigation card */}
        <NavCard />


      </div>
      <div className='gap-4 col-span-2 h-full shadow-lg mr-5'>
        {/* // main content */}
        {!changeAvatar && <div className=' '>

          {/* // user profile */}
          <div className='items-center justify-center flex flex-col py-4'>
            <img
              src={
                myavtar === '' ?
                  './images/sad-face.png'
                  :
                  `./images/Avatar/Avatar${myavtar+1}.jpg`

              }
              alt='profile'
              className='rounded-full hover:border-2 border-blue-500'

              width='150'
              height='150'

            />
            <p className='text-red-500 text-xs cursor-pointer pt-2'
              onClick={() => setChangeAvatar(!changeAvatar)}
            >Change Avatar</p>

            <h1 className='text-2xl py-2 font-bold'>John Doe</h1>
          </div>
          {/* // email address */}
          <div className='flex justify-center gap-4 items-center space-y-4'>
            <label className='text-gray-500 pt-2'>Email</label>

            <input type='email' className='border border-gray-300 rounded-lg p-2 w-3/4' placeholder='Email Address' defaultValue="anshagrawal12348gmail.com" disabled />

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
                onClick={() => setChangeAvatar(!changeAvatar)}
              >
                Save
              </button>
            </div>


          </div>

        }

      </div>
      <div className='mr-2 hidden md:block'>

        <SearchSection />
        <TrendingCards />
      </div>
    </div>
  )
}
