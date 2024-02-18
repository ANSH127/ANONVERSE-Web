import React from 'react'
import { PlusCircleIcon, HomeIcon, ViewColumnsIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';

export default function NavCard() {
  return (
    <div className='shadow-lg p-4 bg-white rounded-lg mt-4'>
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
