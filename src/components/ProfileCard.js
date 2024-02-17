import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProfileCard() {
    const avatar = useSelector(state => state.user.avtar);
    const [user, setUser] = React.useState(null)
    const navigate = useNavigate()


    const fetchUser = () => {
        if (localStorage.getItem('user') !== null) {

            setUser(JSON.parse(localStorage.getItem('user')))

        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }

    React.useEffect(() => {
        fetchUser()

    }, [])

    return (
        <div className='shadow-lg p-4 bg-white rounded-lg'>
            <div className='flex justify-center'>
                <img
                    src=
                    {
                        user !== null ?
                            `./images/Avatar/Avatar${avatar + 1}.jpg`
                            :
                            './images/sad-face.png'
                    }
                    
                    alt='profile'
                    className='rounded-full'
                    width='100'
                    height='100'

                />


            </div>
            <div className='text-center'>
                <h1 className='text-xl font-bold'>
                    {
                        user !== null ?
                            'Ansh'
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
