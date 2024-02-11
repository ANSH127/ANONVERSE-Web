import React from 'react'
import { UserCircleIcon } from "@heroicons/react/24/solid";


export default function Header() {
    return (
        <div className='flex justify-between items-center p-3 bg-white shadow-sm text-2xl font-bold'>
            <h1>AnonVerse</h1>
            <div>
                <button className='hidden md:block p-2 rounded-full bg-gray-200'>
                    <UserCircleIcon className='h-8 w-8' />
                </button>
            </div>
        </div>
    )
}

