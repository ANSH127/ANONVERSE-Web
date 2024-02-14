import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchSection() {
    return (
        <div className='shadow-lg p-4 my-2 bg-white rounded-lg'>
            {/* // search card */}
            <div className='flex justify-center'>
                <div className='flex items-center bg-gray-100 rounded-lg p-2'>
                    <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
                    <input type='text' placeholder='Search' className='bg-transparent outline-none ml-2' />
                </div>
            </div>

            {/* // recent searches */}
            <div className='mt-4'>
                <h1 className='text-lg font-bold'>Recent Searches</h1>
                <div className='mt-2'>
                    <ul>
                        <li className='text-gray-500'>Search 1</li>
                        <li className='text-gray-500'>Search 2</li>
                        <li className='text-gray-500'>Search 3</li>
                    </ul>
                </div>
            </div>






        </div>
    )
}
