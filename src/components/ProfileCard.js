import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { theme } from '../theme';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProfileCard() {
    const avatar = useSelector(state => state.user.avtar);
    const userName = useSelector(state => state.user.user);
    const [user, setUser] = React.useState(null)
    const mode = useSelector(state => state.user.theme)
    const navigate = useNavigate()


    const fetchUser = () => {
        if (localStorage.getItem('user') !== null) {

            setUser(JSON.parse(localStorage.getItem('user')))

        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        window.location.href = '/'
        toast.success('Logged Out Successfully')
    }

    React.useEffect(() => {
        fetchUser()

    }, [])

    return (
        <div className={`shadow-lg p-4 ${mode ? theme.black : theme.white}  rounded-lg`}>
            <div className='flex justify-center'>
                {
                    userName?.name === undefined  && user!==null?
                        <Skeleton circle={true} height={100} width={100} />
                        :

                        <img
                            src=
                            {
                                user !== null ?
                                    `./images/Avatar/Avatar${avatar + 1}.jpg`
                                    :
                                    mode ? './images/sad-face2.png' : './images/sad-face.png'
                            }

                            alt='profile'
                            className='rounded-full cursor-pointer border-4 border-blue-500 shadow-lg hover:border-2'
                            width='100'
                            height='100'
                            onClick={() => navigate('/profile')}

                        />}


            </div>
            <div className='text-center'>
                <h1 className='text-xl font-bold'>
                    {
                        user !== null ?
                            userName?.name || <Skeleton width={100} />

                            :
                            'You Haven\'t Logged In'
                    }

                </h1>
                {/* <p className='text-gray-500'>Software Developer</p> */}
                {/* // login button */}
                <div className='flex justify-center mt-4'>
                    {
                    userName?.name === undefined  && user!==null?
                        <Skeleton width={100} height={30} />
                        :
                        user !== null ?
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            :
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                    }

                </div>
            </div>



        </div>
    )
}
