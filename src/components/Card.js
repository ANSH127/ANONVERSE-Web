import React from 'react'
import { HeartIcon, FlagIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

import { HeartIcon as HeartIcon2 } from '@heroicons/react/24/solid'
export default function Card() {
  const [liked, setLiked] = React.useState(false)
  const [message, setMessage] = React.useState(false)
  return (

    <div className='shadow-lg p-4 bg-white rounded-lg mb-10 mr-5'>
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
            <h3 className='font-bold'>John Doe</h3>
            {/* time */}
            <p className='text-gray-500 text-xs'>2 hours ago</p>
          </div>
        </div>
        {/* // report button */}
        <div>
          <FlagIcon className='h-8 w-8' />
        </div>

      </div>
      <div className='mt-2'>
        <p className=''>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
          voluptatibus, quibusdam, doloribus, quos officiis quia
          exercitationem quas voluptate quod aperiam
        </p>

        {/* // read more gray color text */}
        <p className='text-gray-500 '>Read More</p>

      </div>
      {/* // like and comment button */}
      <div className='flex justify-between mt-2'>
        <div className='flex items-center space-x-2'>
          {
            liked ?
              <HeartIcon2 className='h-8 w-8 text-red-500 cursor-pointer'
                onClick={() => setLiked(!liked)} />
              :
              <HeartIcon className='h-8 w-8 text-red-500 cursor-pointer'
                onClick={() => setLiked(!liked)}
              />}
              {/* // like count */}
          <p className='text-gray-500'>5 likes</p>
          <ChatBubbleBottomCenterIcon className='h-8 w-8 cursor-pointer'
            onClick={() => setMessage(!message)}
          />
          {/* // comment count */}
          <p className='text-gray-500'>2 comments</p>
        </div>
      </div>

      {/* // comment section */}
      {message &&
        <div className='mt-4'>
          {/* // comment box here with black border */}
          <div className='flex items-center space-x-2'>
            <textarea
              className='w-full border border-gray-300 rounded-lg p-2'
              placeholder='Type your comment here'
            ></textarea>

            <PaperAirplaneIcon className='h-8 w-8 text-blue-500' />
          </div>
          {/* // user comment box with profile image and name and comment in bg-grey */}
          <div className=' mt-4  bg-gray-100 p-2 rounded-lg'>
            <div className='flex space-x-2  items-center'>
              <img
                src='./images/Avatar.jpg'
                alt='profile'
                className='rounded-full'
                width='30'
                height='30'
              />
              <div>

              <h1 className='text-sm font-semibold'>John Doe</h1>
              <p className='text-gray-500 text-xs'>2 hours ago</p>
              </div>
            </div>
            <div>
              <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>


        </div>

      }

    </div>

  )
}
