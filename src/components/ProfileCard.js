import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfileCard() {
    const navigate = useNavigate()
    return (
        <div className='shadow-lg p-4 bg-white rounded-lg'>
            <div className='flex justify-center'>
                <img
                    src='./images/sad-face.png'
                    alt='profile'
                    className='rounded-full'
                    width='100'
                    height='100'

                />


            </div>
            <div className='text-center'>
                <h1 className='text-xl font-bold'>
                You Haven't Logged In

                </h1>
                {/* <p className='text-gray-500'>Software Developer</p> */}
                {/* // login button */}
                <div className='flex justify-center mt-4'>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md'
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </div>
            </div>



        </div>
    )
}
