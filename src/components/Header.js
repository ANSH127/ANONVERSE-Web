import React from 'react'
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const navigate = useNavigate();
    return (
        <div className='flex justify-between items-center p-3 bg-white shadow-sm text-2xl font-bold fixed'>
            <h1>AnonVerse</h1>
            <div>
                <button className='hidden md:block p-2 rounded-full bg-gray-200'
                onClick={() => navigate('/profile')}
                >
                    <UserCircleIcon className='h-8 w-8' />
                </button>
            </div>
        </div>
    )
}

