import React from 'react'
import { confessionRef } from '../config/firebase';
import { getDocs, query, orderBy, limit } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { formatDistance } from 'date-fns'
import { useSelector } from 'react-redux';
import { theme } from '../theme';



const imageList = [

    './images/Avatar/Avatar1.jpg',
    './images/Avatar/Avatar2.jpg',
    './images/Avatar/Avatar3.jpg',
    './images/Avatar/Avatar4.jpg',
    './images/Avatar/Avatar5.jpg',
    './images/Avatar/Avatar6.jpg',

]

export default function TrendingCards() {
    const avatarlist = useSelector(state => state.user.AvtarList);
    const navigate = useNavigate()
    const [confessions, setConfessions] = React.useState([])
    const mode=useSelector(state=>state.user.theme)

    const fetchConfessions = async () => {
        try {
            if (localStorage.getItem('user') === null) {
                navigate('/login')
                return
            }

            const q = query(confessionRef, orderBy('likes', 'desc'), orderBy('comments', 'desc'), orderBy('createdAt', 'desc'), limit(3));
            const docSnap = await getDocs(q);
            let data = []
            docSnap.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            });
            setConfessions(data)

        } catch (error) {
            console.log(error.message);
            console.error("Error getting documents: ", error);


        }
    }

    React.useEffect(() => {
        fetchConfessions();

        // eslint-disable-next-line
    }, [])



    return (

        <div className={`shadow-lg p-4 my-4 h-full ${mode?theme.black:theme.white} rounded-lg`}>

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
                    confessions?.map((confession, index) => (
                        <div key={index} className={`shadow-lg ${mode?theme.black:theme.white} rounded-lg mb-5`}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center space-x-2'>
                                    <img
                                        src={
                                            imageList[avatarlist.find((item) => item.uid === confession.uid)?.avatar]
                                        }
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
                    confessions.length === 0 && (
                        <div className='flex items-center justify-center h-80'>
                            <p className='text-gray-500'>No Confessions</p>
                        </div>
                    )

                }



            </div>


        </div>
    )
}
