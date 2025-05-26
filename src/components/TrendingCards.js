import React from 'react'
import { useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns'
import { useSelector } from 'react-redux';
import { theme } from '../theme';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import axios from 'axios';



export default function TrendingCards() {
    const navigate = useNavigate()
    const [confessions, setConfessions] = React.useState([])
    const mode = useSelector(state => state.user.theme)
    const [loading, setLoading] = React.useState(true)

    const fetchConfessions = async () => {
        try {
            if (localStorage.getItem('token') === null) {
                navigate('/login')
                return
            }
            const response = await axios.get('http://localhost:4000/api/trendingconfessions', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setConfessions(response.data)


        } catch (error) {
            console.log(error.message);
            console.error("Error getting documents: ", error);
        }
        finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchConfessions();

        // eslint-disable-next-line
    }, [])



    return (

        <div className={`shadow-lg p-4 my-4 h-full ${mode ? theme.black : theme.white} rounded-lg`}>

            {/* // trending confesssions */}

            <h1 className='text-lg font-bold'>Trending Confessions</h1>

            <div className='mt-2 overflow-y-auto h-96 overflow-x-hidden'
                style={{
                    paddingBottom: '120px',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#137de7 #F4F4F4',

                    scrollBehavior: 'smooth',
                }}>

                {
                    loading && (
                        <div className='flex flex-col space-y-2'>
                            <Skeleton height={50} />
                            <Skeleton height={50} />
                            <Skeleton height={50} />
                            <Skeleton height={50} />
                        </div>
                    )
                }

                {
                    confessions?.map((confession, index) => (
                        <div key={index} className={`shadow-lg ${mode ? theme.black : theme.white} rounded-lg mb-5`}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-2'>
                                    <img
                                        src={`/images/Avatar/Avatar${confession?.uid?.avatar + 1}.jpg`}
                                        alt='profile'
                                        className='rounded-full'
                                        width='40'
                                        height='40'
                                    />
                                    <div>
                                        <p className='font-semibold text-sm'>{confession.name}</p>
                                        {/* time */}
                                        <p className='text-gray-500 text-xs'>
                                            {formatDistance(new Date(confession?.createdAt), new Date(), { addSuffix: true })}

                                        </p>
                                    </div>
                                </div>

                            </div>
                            <div className='mt-2 pb-2'>
                                <p className='text-xs'>
                                    {confession.description}
                                </p>

                                {/* // read more gray color text */}
                                {/* <p className='text-gray-500 text-xs '>Read More</p> */}

                            </div>
                        </div>
                    ))

                }
                {
                    confessions.length === 0 && !loading && (
                        <div className='flex items-center justify-center h-80'>
                            <p className='text-gray-500'>No Confessions</p>
                        </div>
                    )

                }



            </div>


        </div>
    )
}
