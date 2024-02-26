import React from 'react'
import { HeartIcon, FlagIcon, ChatBubbleBottomCenterIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { formatDistance } from 'date-fns'

import { confessionRef } from '../config/firebase'
import { updateDoc, doc, deleteDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom';
import { HeartIcon as HeartIcon2, FlagIcon as FlagIcon2 } from '@heroicons/react/24/solid'
import {toast} from 'react-toastify'




export default function Card({ data, avatarName, deleteConfession }) {
  // console.log(data);
  const navigate = useNavigate()
  const [liked, setLiked] = React.useState(data?.likedby.indexOf(JSON.parse(localStorage.getItem('user')).uid) !== -1 ? true : false)
  const [message, setMessage] = React.useState(false)
  const [mesageData, setMessageData] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [loading2, setLoading2] = React.useState(false)
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
      toast.error('Error liking confession')
      

    }
    finally {
      setLiked(!liked);
      setLoading(false);
    }
  }

  const handleComment = async () => {
    if (mesageData.length < 3) {
      toast.warning('Comment should be atleast 3 characters long')
      return;
    }
    else {
      setLoading2(true);

      let docid = data.id;
      let uid = JSON.parse(localStorage.getItem('user')).uid;
      try {

        let newComment = {
          comment: mesageData,
          uid: uid,
          createdAt: new Date().toISOString()
        }
        await updateDoc(doc(confessionRef, docid), {
          comments: [...data.comments, newComment]
        })
        setMessage('')
        data.comments.push(newComment);

      } catch (error) {
        toast.error('Error commenting on confession')

      }
      finally {
        setLoading2(false);
      }
    }
  }

  const handleDelete = async () => {
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    let docid = data.id;
    try {
      if (uid === data.uid) {
        // use window.confirm to ask user to confirm the delete
        if (window.confirm('Are you sure you want to delete this confession?')) {
          await deleteDoc(doc(confessionRef, docid));
          toast.success('Confession deleted successfully')
          navigate('/');
        }
      } else {
        toast.error('You are not authorized to delete this confession')
      }

    } catch (error) {
      toast.error('Error deleting confession')
    }
  }

  const handleReport = () => {
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    let docid = data.id;
    try {
      if (data.reportedBy.indexOf(uid) === -1) {
        if (window.confirm('Are you sure you want to report this post?')) {
          updateDoc(doc(confessionRef, docid), {
            reportedBy: [...data.reportedBy, uid]
          })
          toast.success('Post reported successfully')
          data.reportedBy.push(uid);
        }

      }
      else {
        toast.warning('You have already reported this post')
      }

    } catch (error) {
      toast.error('Error reporting post')
    }

  }


  const handleDeleteComment = async (obj) => {
    let docid = data.id;
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    try {
      if (uid === obj.uid) {
        if (window.confirm('Are you sure you want to delete this comment?')) {
          let index = data.comments.indexOf(obj);
          data.comments.splice(index, 1);
          await updateDoc(doc(confessionRef, docid), {
            comments: data.comments
          })

          toast.success('Comment deleted successfully')
          setMessage(false)
        }

      }
      else {
        toast.error('You are not authorized to delete this comment')
      }
    } catch (error) {
      toast.error('Error deleting comment')
    }
  }

  return (

    <div className='shadow-lg p-4 bg-white rounded-lg mb-10 mr-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <img
            src={
              avatarName !== null ?
                `./images/Avatar/Avatar${avatarName + 1}.jpg`
                :
                './images/sad-face.png'
            }
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
        {/* // report and delete button */}
        <div className='flex space-x-2'>

          {
            data?.uid === JSON.parse(localStorage.getItem('user')).uid && deleteConfession &&
            <TrashIcon className='h-8 w-8 text-red-500' onClick={handleDelete} />}

          {
            data?.uid !== JSON.parse(localStorage.getItem('user')).uid &&
            <div>
              {data?.reportedBy.indexOf(JSON.parse(localStorage.getItem('user')).uid) !== -1 ?
                <FlagIcon2 className='h-8 w-8 text-red-600' />
                :
                <FlagIcon className='h-8 w-8' onClick={handleReport} />}
            </div>
          }
        </div>

      </div>
      <div className='mt-2'>
        {
          data.reportedBy.length >5 &&  data.uid===JSON.parse(localStorage.getItem('user')).uid  &&
          <p className='text-red-500 font-semibold'>
            This post has been reported by many users and may be not visible to others.
          </p>

        }
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
              value={mesageData}
              onChange={(e) => setMessageData(e.target.value)}
            ></textarea>

            {
              loading2 ?
                <img src='./images/loadar.gif' alt='loading' width='30' height='30' />
                :
                <PaperAirplaneIcon className='h-8 w-8 text-blue-500'
                  onClick={handleComment}
                />
            }
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

                    {
                      comment?.uid === JSON.parse(localStorage.getItem('user')).uid &&
                      <div className='ml-auto cursor-pointer'>
                        <TrashIcon className='h-5 w-5  text-red-500' 
                        onClick={()=>handleDeleteComment(comment)} />
                      </div>}

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
