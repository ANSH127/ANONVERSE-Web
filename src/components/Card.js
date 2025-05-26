import React from 'react'
import { HeartIcon, FlagIcon, ChatBubbleBottomCenterIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { formatDistance } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon as HeartIcon2, FlagIcon as FlagIcon2 } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { theme } from '../theme';
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';

export default function Card({ data, deleteConfession }) {
  const mode = useSelector(state => state.user.theme);
  // console.log(data);
  const navigate = useNavigate()
  const [message, setMessage] = React.useState(false)
  const [mesageData, setMessageData] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [loading2, setLoading2] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)
  const handleLike = async () => {
    try {
      setLoading(true);
      let docid = data._id;
      const response = await axios.patch(`http://localhost:4000/api/updatelikes/${docid}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status === 200) {
        toast.success('Confession liked successfully')
        data.likes = response.data.likes;
        data.likedby = response.data.likedby;
      } else {
        toast.error('Error liking confession')
      }

    } catch (error) {
      toast.error('Error liking confession')


    }
    finally {
      setLoading(false);
    }
  }

  const handleComment = async () => {
    if (mesageData?.length < 3) {
      toast.warning('Comment should be atleast 3 characters long')
      return;
    }
    else {
      setLoading2(true);

      let docid = data._id;
      try {

        let newComment = {
          comment: mesageData,
          createdAt: new Date().toISOString(),
          reportedBy: []

        }

        const response = await axios.patch(`http://localhost:4000/api/addcomment/${docid}`, newComment, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.status === 200) {
          toast.success('Comment added successfully')
          // console.log(response.data);
        }
        else {
          toast.error('Error adding comment')
        }

        data.comments.push(response.data);

      } catch (error) {
        toast.error('Error commenting on confession')
        console.log(error);


      }
      finally {
        setMessage(false);
        setMessageData('');
        setLoading2(false);
      }
    }
  }

  const handleDelete = async () => {
    let uid = JSON.parse(localStorage.getItem('user'))._id;
    let docid = data._id;
    try {
      if (uid === data.uid._id) {
        // use window.confirm to ask user to confirm the delete
        if (window.confirm('Are you sure you want to delete this confession?')) {

          const response = await axios.delete(`http://localhost:4000/api/deleteconfession/${docid}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          if (response.status === 200) {
            toast.success('Confession deleted successfully')
            navigate('/');
          } else {
            toast.error('Error deleting confession')
          }


        }
      } else {
        toast.error('You are not authorized to delete this confession')
      }

    } catch (error) {
      toast.error('Error deleting confession')
    }
  }

  const handleReport = () => {
    let uid = JSON.parse(localStorage.getItem('user'))._id;
    let docid = data._id;
    try {
      if (data?.reportedBy?.indexOf(uid) === -1) {
        if (window.confirm('Are you sure you want to report this post?')) {
          // updateDoc(doc(confessionRef, docid), {
          //   reportedBy: [...data.reportedBy, uid]
          // })

          const response = axios.post(`http://localhost:4000/api/reportconfession/${docid}`, {},
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            }
          )
          if (response.status === 200) {
            toast.success('Post reported successfully')
            data.reportedBy.push(uid);

          }
          else {
            toast.error('Error reporting post')
          }
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
    let docid = data._id;
    let uid = JSON.parse(localStorage.getItem('user'))._id;
    try {
      if (uid === obj.uid) {
        if (window.confirm('Are you sure you want to delete this comment?')) {
          try {
            const response = await axios.patch(`http://localhost:4000/api/deletecomment/${docid}/${obj._id}`, {}, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
            })
            if (response.status === 200) {



              let index = data?.comments?.indexOf(obj);
              data.comments.splice(index, 1);
              toast.success('Comment deleted successfully')
              setMessage(false)
            }

          } catch (error) {
            toast.error('Error deleting comment')
            console.error(error);

          }


        }

      }
      else {
        toast.error('You are not authorized to delete this comment')
      }
    } catch (error) {
      toast.error('Error deleting comment')
    }
  }

  const handleReportComment = async (obj) => {

    let docid = data.id;
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    try {
      // if (window.confirm('Are you sure you want to report this comment?')) {
      //   let index = data?.comments?.indexOf(obj);
      //   data.comments[index].reportedBy = data.comments[index].reportedBy || [];
      //   if (data?.comments[index]?.reportedBy?.indexOf(uid) === -1) {
      //     data.comments[index].reportedBy.push(uid);
      //     await updateDoc(doc(confessionRef, docid), {
      //       comments: data.comments
      //     })
      //     toast.success('Comment reported successfully')
      //   }
      //   else {
      //     toast.warning('You have already reported this comment')
      //   }

      // }


    } catch (error) {
      toast.error('Error reporting comment')

    }
  }

  return (

    <div className={`shadow-lg p-4  rounded-lg mb-10 mr-5 ${mode ? theme.black : theme.white} `} >
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-2'>


          {
            data?.name!=="Anonymous"?
            (data?.name?
              <Link to={`/profile/${data?.uid?._id}`}>
                <img
                  src={`/images/Avatar/Avatar${data?.uid?.avatar + 1}.jpg`}
                  alt='profile'
                  className='rounded-full border-blue-500 shadow-lg hover:border-2'
                  width='50'
                  height='50'

                />
              </Link>
              :
              
              <Skeleton width={50} height={50} borderRadius={1} count={1} duration={2} circle={true} />
            )
            :
            <img
              src={`/images/Avatar/Avatar${data?.uid?.avatar + 1}.jpg`}
              alt='profile'
              className='rounded-full border-blue-500 shadow-lg hover:border-2'
              width='50'
              height='50'
            />


          }

          <div>
            <h3 className='font-bold'>
              {
                data?.name ||
                <Skeleton width={100} height={20} count={1} duration={2} />
              }
            </h3>
            {/* time */}
            <p className='text-gray-500 text-xs'>
              {
                data?.createdAt ?
                  formatDistance(new Date(data?.createdAt), new Date(), { addSuffix: true })
                  : <Skeleton width={100} height={15} count={1} duration={2} />
              }

            </p>
          </div>
        </div>
        {/* // report and delete button */}
        <div className='flex space-x-2'>

          {
            data?.uid?._id === JSON.parse(localStorage.getItem('user'))?._id && deleteConfession &&
            <TrashIcon className='h-8 w-8 text-red-500' onClick={handleDelete} />}

          {
            data?.uid?._id !== JSON.parse(localStorage.getItem('user'))?._id &&
            <div>

              {
                data?.createdAt ?

                  data?.reportedBy?.indexOf(JSON.parse(localStorage.getItem('user'))?._id) !== -1 ?
                    <FlagIcon2 className='h-8 w-8 text-red-600' />
                    :
                    <FlagIcon className='h-8 w-8' onClick={handleReport} />
                  :
                  <Skeleton width={60} height={30} count={1} duration={2} />
              }
            </div>
          }
        </div>

      </div>

      {/* // image */}
      {
        data?.image &&
        <div className='mt-2'>
          <img
            src={data.image}
            alt=''
            className={`w-full rounded-lg transition-all duration-500 ${imageLoaded ? '' : 'blur-md'}`}
            onLoad={() => {
              setImageLoaded(true);
            }}
            onError={() => setImageLoaded(false)}


          />
          {
            !imageLoaded &&
            <div className='mt-2'>
              <img
                src='/images/blur-img.jpg'
                alt='placeholder'
                className='w-full rounded-lg transition-all duration-500'
              />
            </div>
          }
        </div>}

      {/* // description */}
      <div className='mt-2'>
        {
          data?.reportedBy?.length > 5 && data.uid._id === JSON.parse(localStorage.getItem('user')).uid &&
          <p className='text-red-500 font-semibold'>
            This post has been reported by many users and may be not visible to others.
          </p>

        }
        <p className=''>
          {
            data?.description ||
            <Skeleton height={20} count={4} duration={2} />
          }
        </p>

        {/* // read more gray color text */}
        {/* <p className='text-gray-500 '>Read More</p> */}

      </div>
      {/* // like and comment button */}
      <div className='flex justify-between mt-2'>
        <div className='flex items-center space-x-2'>
          {loading ?
            <img src='/images/loading2.gif' alt='loading' width='30' height='30' />
            :
            <div>
              {
                data?.createdAt ?

                  (data?.likedby?.indexOf(JSON.parse(localStorage.getItem('user'))._id) !== -1 ?
                    <HeartIcon2 className='h-8 w-8 text-red-500 cursor-pointer'
                      onClick={handleLike} />
                    :
                    <HeartIcon className='h-8 w-8 text-red-500 cursor-pointer'
                      onClick={handleLike}
                    />)
                  :
                  <Skeleton width={60} height={30} count={1} duration={2} />
              }
            </div>
          }
          {/* // like count */}
          {
            data?.createdAt &&
            <p className='text-gray-500'>{data?.likes} likes</p>}
          {
            data?.createdAt ?

              (
                <>
                  <ChatBubbleBottomCenterIcon className='h-8 w-8 cursor-pointer'
                    onClick={() => setMessage(!message)}

                  />

                  {/* // comment count */}
                  <p className='text-gray-500'>{data?.comments?.length}  comments</p>
                </>)
              :
              <Skeleton width={60} height={30} count={1} duration={2} />

          }
        </div>
      </div>

      {/* // comment section */}
      {message &&
        <div className='mt-4'>
          {/* // comment box here with black border */}
          <div className='flex items-center space-x-2'>
            <textarea
              className={`w-full border ${mode ? theme.black : ' border-gray-300'} rounded-lg p-2`}
              placeholder='Type your comment here'
              value={mesageData}
              onChange={(e) => setMessageData(e.target.value)}
            ></textarea>

            {
              loading2 ?
                <img src='/images/loadar.gif' alt='loading' width='30' height='30' />
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
                (comment?.reportedby?.length) < 5 &&
                <div key={index} className={` mt-4 ${mode ? theme.black : 'bg-gray-100'}  p-2 rounded-lg`}>
                  <div className='flex space-x-2  items-center'>
                    <img
                      src='/images/Avatar.jpg'
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
                      comment?.uid === JSON.parse(localStorage.getItem('user'))._id &&
                      <div className='ml-auto cursor-pointer'>
                        <TrashIcon className='h-5 w-5  text-red-500'
                          onClick={() => handleDeleteComment(comment)} />
                      </div>}

                    {
                      comment?.uid !== JSON.parse(localStorage.getItem('user'))._id &&
                      comment?.reportedBy?.indexOf(JSON.parse(localStorage.getItem('user'))._id) === -1
                      &&
                      <div className='ml-auto cursor-pointer'>
                        <FlagIcon className='h-5 w-5'
                          onClick={
                            () => handleReportComment(comment)
                          } />
                      </div>
                    }

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
