import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import { usersRef } from '../config/firebase'
import { getDocs } from 'firebase/firestore'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { theme } from '../theme';
import { useNavigate } from 'react-router-dom';



const imageList = [

    '/images/Avatar/Avatar1.jpg',
    '/images/Avatar/Avatar2.jpg',
    '/images/Avatar/Avatar3.jpg',
    '/images/Avatar/Avatar4.jpg',
    '/images/Avatar/Avatar5.jpg',
    '/images/Avatar/Avatar6.jpg',

]

export default function SearchSection() {
    const navigate = useNavigate()
    
    const avatarlist = useSelector(state => state.user.AvtarList)
    const [userlist, setUserList] = React.useState([])
    const [searchlist, setSearchList] = React.useState([])
    const mode=useSelector(state=>state.user.theme)

    const fetchAllUsers = async () => {
        try {
            if (localStorage.getItem('user') === null) {
                navigate('/login')
                return
            }
            let uid = JSON.parse(localStorage.getItem('user')).uid
            if (uid === null) return

            let temp = []
            const data = await getDocs(usersRef)
            data.forEach((doc) => {
                temp.push({ ...doc.data(), id: doc.id })
            })
            setUserList(temp)


        } catch (error) {
            console.error("Error getting documents: ", error);
        }

    }






    React.useEffect(() => {
        fetchAllUsers()
        // eslint-disable-next-line
    }, [])

    const searchUser = (search) => {
        if (search.length < 3) {
            setSearchList([])
            return
        }


        let temp = []
        userlist.forEach((user) => {
            if (user.name.toLowerCase().includes(search.toLowerCase())) {
                temp.push(user)
            }
        })
        setSearchList(temp)
    }


    return (
        <div className={`shadow-lg p-4 my-2 ${mode?theme.black:theme.white}  rounded-lg`}>
            {/* // search card */}
            <div className='flex justify-center'>
                <div className={`flex items-center  rounded-lg p-2 w-full ${mode?'bg-black':'bg-gray-100'}`}>
                    <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
                    <input type='text' placeholder='Search' className={`bg-transparent  outline-none mb-1`}
                        onChange={(e) => searchUser(e.target.value)}
                    />
                </div>
            </div>

            {/* // recent searches */}
            <div className='mt-4'>
                <div className='mt-2 overflow-y-auto h-24 overflow-x-hidden'
                    style={{
                        paddingBottom: '10px',
                        scrollbarWidth: 'thin',
                        scrollBehavior: 'smooth',
                        scrollbarColor: '#137de7 #F4F4F4',

                    }}>

                    {/* // user profile box with name and image */}
                    {
                        searchlist?.map((user, index) => {
                            return (
                                <Link to={`/profile/${user.uid}`} key={index}>
                                    <div key={index} className={`flex items-center justify-between ${mode?'bg-black':'bg-gray-100'}  shadow-lg p-2 mb-1 rounded-lg`}>
                                        <div className='flex items-center gap-2'>
                                            <img
                                                src={
                                                    imageList[avatarlist.filter((item) => item.uid === user.uid)[0]?.avatar]
                                                }
                                                alt='avatar'
                                                className='h-8 w-8 rounded-full'
                                            />
                                            <p className='text-sm font-semibold'>{user.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })

                    }
                    {

                        searchlist.length === 0 && (
                            <div className='flex items-center justify-center h-full'>
                                <p className='text-gray-500'>
                                    No results found
                                </p>
                            </div>
                        )
                    }

                </div>
            </div>






        </div>
    )
}
