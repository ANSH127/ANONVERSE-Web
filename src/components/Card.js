import React from 'react'
import { HeartIcon, FlagIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { formatDistance } from 'date-fns'

import { confessionRef, auth } from '../config/firebase'
import { updateDoc, doc, deleteDoc } from 'firebase/firestore'


import { HeartIcon as HeartIcon2 } from '@heroicons/react/24/solid'
export default function Card({ data }) {
  const [liked, setLiked] = React.useState(data?.likedby.indexOf(JSON.parse(localStorage.getItem('user')).uid) !== -1 ? true : false)
  const [message, setMessage] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleLike = async () => {
    try {
      setLoading(true);
      let docid = data.id;
      let uid = JSON.parse(localStorage.getItem('user')).uid;
      if (!liked && data.likedby.indexOf(uid) === -1) {

        await updateDoc(doc(confessionRef, docid), {
          likes: data.likes + 1,
          likedby: [...data.likedby, uid]
        })
        data.likes = data.likes + 1;
        data.likedby.push(uid);
      }
      else {
        let index = data.likedby.indexOf(uid);
        data.likedby.splice(index, 1);
        await updateDoc(doc(confessionRef, docid), {
          likes: data.likes - 1,
          likedby: data.likedby
        })
        data.likes = data.likes - 1;


      }

    } catch (error) {
      alert(error.message)

    }
    finally {
      setLiked(!liked);
      setLoading(false);
    }
  }

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
            <h3 className='font-bold'>
              {data?.name}
            </h3>
            {/* time */}
            <p className='text-gray-500 text-xs'>
              {formatDistance(new Date(data?.createdAt), new Date(), { addSuffix: true })}

            </p>
          </div>
        </div>
        {/* // report button */}
        <div>
          <FlagIcon className='h-8 w-8' />
        </div>

      </div>
      <div className='mt-2'>
        <p className=''>
          {data?.description}
        </p>

        {/* // read more gray color text */}
        <p className='text-gray-500 '>Read More</p>

      </div>
      {/* // like and comment button */}
      <div className='flex justify-between mt-2'>
        <div className='flex items-center space-x-2'>
          {loading ?
            <img src='./images/loading2.gif' alt='loading' width='30' height='30' />
            :
            <div>
              {
                liked || data?.likedby.indexOf(JSON.parse(localStorage.getItem('user')).uid) !== -1 ?
                  <HeartIcon2 className='h-8 w-8 text-red-500 cursor-pointer'
                    onClick={handleLike} />
                  :
                  <HeartIcon className='h-8 w-8 text-red-500 cursor-pointer'
                    onClick={handleLike}
                  />
              }
            </div>
          }
          {/* // like count */}
          <p className='text-gray-500'>
            {data?.likes} likes</p>
          <ChatBubbleBottomCenterIcon className='h-8 w-8 cursor-pointer'
            onClick={() => setMessage(!message)}
          />
          {/* // comment count */}
          <p className='text-gray-500'>{data?.comments.length}  comments</p>
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
          {
            data?.comments.map((comment, index) => {
              return (
                <div key={index} className=' mt-4  bg-gray-100 p-2 rounded-lg'>
                  <div className='flex space-x-2  items-center'>
                    <img
                      src='./images/Avatar.jpg'
                      alt='profile'
                      className='rounded-full'
                      width='30'
                      height='30'
                    />
                    <div>

                      <h1 className='text-sm font-semibold'>Anonymous</h1>
                      <p className='text-gray-500 text-xs'>{formatDistance(new Date(comment.createdAt), new Date(), { addSuffix: true })}</p>
                    </div>
                  </div>
                  <div>
                    <p className='text-gray-500'>{comment.comment}</p>
                  </div>
                </div>
              )
            })
          }


        </div>

      }

    </div>

  )
}
