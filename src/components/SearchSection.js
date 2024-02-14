import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchSection() {
    return (
        <div className='shadow-lg p-4 my-2 bg-white rounded-lg'>
            {/* // search card */}
            <div className='flex justify-center'>
                <div className='flex items-center bg-gray-100 rounded-lg p-2 w-full'>
                    <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
                    <input type='text' placeholder='Search' className='bg-transparent outline-none mb-1' />
                </div>
            </div>

            {/* // recent searches */}
            <div className='mt-4'>
                <div className='mt-2 overflow-y-auto h-24 overflow-x-hidden'
                    style={{
                        paddingBottom: '10px',
                        scrollbarColor: 'rgba(0, 0, 0, 0.1) transparent',
                        scrollbarWidth: 'thin',
                        scrollBehavior: 'smooth',
                    }}>

                    {/* // user profile box with name and image */}
                    <div className='flex items-center justify-between bg-gray-100 p-2 mb-1 rounded-lg'>
                        <div className='flex items-center gap-2'>
                            <img
                                src='./images/Avatar/Avatar1.jpg'
                                alt='avatar'
                                className='h-8 w-8 rounded-full'
                            />
                            <p className='text-sm font-semibold'>John Doe</p>
                        </div>

                    </div>
                    <div className='flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-1'>
                        <div className='flex items-center gap-2'>
                            <img
                                src='./images/Avatar/Avatar1.jpg'
                                alt='avatar'
                                className='h-8 w-8 rounded-full'
                            />
                            <p className='text-sm font-semibold'>John Doe</p>
                        </div>

                    </div>
                    <div className='flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-1'>
                        <div className='flex items-center gap-2'>
                            <img
                                src='./images/Avatar/Avatar1.jpg'
                                alt='avatar'
                                className='h-8 w-8 rounded-full'
                            />
                            <p className='text-sm font-semibold'>John Doe</p>
                        </div>

                    </div>
                    <div className='flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-1'>
                        <div className='flex items-center gap-2'>
                            <img
                                src='./images/Avatar/Avatar1.jpg'
                                alt='avatar'
                                className='h-8 w-8 rounded-full'
                            />
                            <p className='text-sm font-semibold'>John Doe</p>
                        </div>

                    </div>
                    <div className='flex items-center justify-between bg-gray-100 p-2 rounded-lg mb-1'>
                        <div className='flex items-center gap-2'>
                            <img
                                src='./images/Avatar/Avatar1.jpg'
                                alt='avatar'
                                className='h-8 w-8 rounded-full'
                            />
                            <p className='text-sm font-semibold'>John Doe</p>
                        </div>

                    </div>








                </div>
            </div>






        </div>
    )
}
