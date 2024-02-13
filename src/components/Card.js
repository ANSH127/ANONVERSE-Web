import React from 'react'
import { HeartIcon, FlagIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline'
export default function Card() {
  return (

    <div className='shadow-lg p-4 bg-white rounded-lg'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <img
            src='./images/Avatar.jpg'
            alt='profile'
            className='rounded-full'
            width='50'
            height='50'
          />
          <div>
            <h1 className='text-lg font-bold'>John Doe</h1>
            <p className='text-gray-500'>Software Developer</p>
          </div>
        </div>
        {/* // report button */}
        <div>
          <FlagIcon className='h-8 w-8' />
        </div>

      </div>
      <div className='mt-4'>
        <p className='text-lg'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
          voluptatibus, quibusdam, doloribus, quos officiis quia
          exercitationem quas voluptate quod aperiam
        </p>

        {/* // read more gray color text */}
        <p className='text-gray-500 mt-2'>Read More</p>

      </div>
      {/* // like and comment button */}
      <div className='flex justify-between mt-4'>
        <div className='flex items-center space-x-2'>
          <HeartIcon className='h-8 w-8 text-red-500' />
          <ChatBubbleBottomCenterIcon className='h-8 w-8' />
        </div>
      </div>
    </div>

  )
}
