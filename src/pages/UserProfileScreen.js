import React from 'react'
import { useParams } from 'react-router-dom'
import { usersRef, confessionRef } from '../config/firebase'
import { getDocs, where, query, orderBy } from 'firebase/firestore'
import Card from '../components/Card'

export default function UserProfileScreen() {
    const { uid } = useParams()

    const [userData, setUserData] = React.useState({})
    const [confessions, setConfessions] = React.useState([])

    const fetchUserDetails = async () => {
        try {
            const q = query(usersRef, where('uid', '==', uid));
            const querySnapshot = await getDocs(q);
            let temp = {}
            querySnapshot.forEach((doc) => {
                temp = { ...doc.data(), id: doc.id }
            });
            setUserData(temp)
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    }

    const fetchConfessions = async () => {
        try {
            if (uid === null) {
                return
            }
            const q = query(confessionRef, where('uid', '==', uid), orderBy('createdAt', 'desc'))
            const docSnap = await getDocs(q);
            let data = []
            docSnap.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            });
            // filter the confessions which are not anonymous
            data = data.filter((data) => data.name !== 'Anonymous')
            setConfessions(data)
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    }



    React.useEffect(() => {
        fetchUserDetails()
        fetchConfessions()
        // eslint-disable-next-line
    }, [uid])
    return (

        <div className='gap-4 col-span-2 h-full shadow-lg w-full mr-5'>
            {/* // main content */}
            {<div className=' '>

                {/* // user profile */}
                <div className='items-center justify-center flex flex-col py-4'>
                    <img
                        src={`/images/Avatar/Avatar${userData.avatar + 1}.jpg`}


                        alt='profile'
                        className='rounded-full hover:border-2 border-blue-500'

                        width='150'
                        height='150'

                    />

                    <h1 className='text-2xl py-2 font-bold'>
                        {userData.name}

                    </h1>
                </div>




            </div>}

            <div className=' overflow-y-auto overflow-x-hidden'
                style={{
                    scrollbarWidth: 'thin', height: '100vh', paddingBottom: '300px',
                    scrollbarColor: '#137de7 #F4F4F4',
                    
                    
                }}>

                <h1 className='text-xl font-semibold m-4  underline'>
                    Confessions
                </h1>
                {
                    confessions.length > 0 ?

                        confessions.map((data, index) => {
                            return (
                                <Card key={index} data={data}
                                    avatarName={userData.avatar}

                                />
                            )
                        })
                        :
                        <h1 className='text-xl font-semibold text-center m-4 '>
                            No Confessions Found
                        </h1>

                }
            </div>

        </div>
    )
}
