import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { setAvtar } from '../redux/slices/user';
import { toast } from 'react-toastify'
import { theme } from '../theme';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';

export default function ProfileCard() {
    const [user, setUser] = React.useState(null)
    const mode = useSelector(state => state.user.theme)
    const myavatar = useSelector(state => state.user.avtar);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)


    const fetchUser = async () => {

        const response = await axios.get(`http://localhost:4000/api/getuserdetails`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (response.status === 200) {
            setUser(response.data);
            dispatch(setAvtar(response.data.avatar))

        } else {
            toast.error('Error fetching user details');
        }
        setLoading(false);
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
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
                    loading ? <Skeleton circle={true} width={100} height={100} />
                        :
                    <img
                    src=
                    {
                        user !== null ?
                            `./images/Avatar/Avatar${myavatar + 1}.jpg`
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
                        loading ?
                            <Skeleton width={100} />
                            :
                        user !== null ?
                            user?.username || <Skeleton width={100} />

                            :
                            'You Haven\'t Logged In'
                    }

                </h1>
                {/* <p className='text-gray-500'>Software Developer</p> */}
                {/* // login button */}
                <div className='flex justify-center mt-4'>
                    {
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
