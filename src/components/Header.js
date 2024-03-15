import React from 'react'
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setTheme } from '../redux/slices/user';


export default function Header() {
    const navigate = useNavigate();
    const [mode, setMode] = useState('dark')
    const dispatch = useDispatch()

    // add a function to toggle between light and dark mode
    const toggleTheme = () => {
        if (mode === 'light') {
            dispatch(setTheme(1)) 
            setMode('dark')
        } else {
            dispatch(setTheme(0)) 
            setMode('light')
        }

    }
    return (
        <div className={`flex justify-between items-center p-3 shadow-sm text-2xl font-bold ${mode==='light'?theme.white:theme.black}`}>
            <h1>AnonVerse</h1>
            <div className='flex flex-row'>

                {/* // add a toggle button to switch between light and dark mode */}
                <button onClick={toggleTheme} className={`p-2 rounded-full`}>
                    {mode === 'light' ? <MoonIcon className='h-8 w-8' /> : <SunIcon className='h-8 w-8' />}

                </button>

                <button className='hidden md:block p-2 rounded-full bg-gray-200'
                    onClick={() => navigate('/profile')}
                >
                    <UserCircleIcon className='h-8 w-8' />
                </button>
            </div>
        </div>
    )
}

