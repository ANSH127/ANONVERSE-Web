import React from 'react'
import { PlusCircleIcon, HomeIcon, ViewColumnsIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { useSelector } from 'react-redux'


export default function NavCard() {
  const mode=useSelector(state=>state.user.theme)
  return (
    <div className={`shadow-lg p-4  rounded-lg mt-4 ${mode?theme.black:theme.white}`}>
          <ul className='space-y-3'>
            <li className='flex items-center space-x-2 text-lg hover:text-blue-500'>
              <HomeIcon className='h-8 w-8' />
              <Link to='/'>Home</Link>
            </li>
            <li className='flex items-center space-x-2  text-lg hover:text-blue-500'>
              <ViewColumnsIcon className='h-8 w-8' />
              <Link to='/yourconfession'>Confession</Link>
            </li>
            <li className='flex items-center space-x-2  text-lg hover:text-blue-500'>
              <PlusCircleIcon className='h-8 w-8' />
              <Link to='/addconfession'>Add</Link>
            </li>
          </ul>

        </div>
  )
}
