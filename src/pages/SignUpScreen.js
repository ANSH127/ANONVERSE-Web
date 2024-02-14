import React from 'react'
import NavCard from '../components/NavCard';
import ProfileCard from '../components/ProfileCard';
import { Link } from 'react-router-dom';


export default function SignUpScreen() {
    return (

        <div className='grid-cols-1 grid md:grid-cols-4 gap-8  h-full p-4 m-2 fixed w-full' style={{ height: '100%' }}>
            <div className='hidden md:block gap-4 col-span-1'>
                <ProfileCard />
                <NavCard />
            </div>
            <div className='gap-4 col-span-2 h-full shadow-lg mr-5'>
                <div className=' overflow-y-auto overflow-x-hidden'
                    style={{
                        scrollbarWidth: 'none', height: '100vh', paddingBottom: '250px',
                    }}>

                    <div className="flex justify-center">
                        <img src='./images/signup.png' alt='confession' className='rounded-lg '
                            width='auto' height='auto'
                        />
                    </div>
                    <div className="flex flex-col gap-4 p-4">

                        <input type="text" placeholder="Full Name" className="w-full p-4 border-2 border-gray-300 rounded-lg" />
                        <input type="text" placeholder="Email" className="w-full p-4 border-2 border-gray-300 rounded-lg" />
                        <input type="password" placeholder="Password" className="w-full p-4 border-2 border-gray-300 rounded-lg" />

                        <p className="text-center">Already have an account?
                            <Link to='/signin' className="text-blue-500"> Sign In</Link>
                        </p>

                        <button className="p-2 bg-blue-500 text-white rounded-lg">Sign Up</button>

                    </div>




                </div>


            </div>
            <div className='hidden md:block'>
            </div>
        </div>
    )
}
