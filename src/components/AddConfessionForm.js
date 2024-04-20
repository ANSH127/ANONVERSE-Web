import React from 'react'

import { usersRef, confessionRef, storage } from '../config/firebase'
import { getDocs, query, where, addDoc } from 'firebase/firestore'
import Loadar from './Loadar'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'


export default function AddConfessionForm() {
    const [name, setName] = React.useState('Profile Name')
    const [confession, setConfession] = React.useState('')
    const [imageUpload, setImageUpload] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const mode = useSelector(state => state.user.theme)

    const handleSubmit = async (e) => {
        if (confession === '') {
            toast.error('Confession cannot be empty')
            return
        }
        if (imageUpload?.size > 5000000) {
            toast.error('Image size should be less than 5MB')
            return
        }
        e.preventDefault()
        let uid = JSON.parse(localStorage.getItem('user'))?.uid
        if (!uid) {
            toast.error('Please login to submit confession')
            return
        }
        let Username = name;
        var imageurl = null

        try {
            setLoading(true)
            if (imageUpload) {
                const storageRef = ref(storage, `images/${imageUpload.name}`)
                const snapshot = await uploadBytes(storageRef, imageUpload)
                imageurl = await getDownloadURL(snapshot.ref)

            }
            if (name === 'Profile Name') {
                const userRef = await getDocs(query(usersRef, where('uid', '==', uid)))
                userRef.forEach((doc) => {
                    Username = doc.data().name
                })
            }
            const doc = await addDoc(confessionRef, {
                name: Username,
                description: confession,
                uid,
                createdAt: new Date().toISOString(),
                likes: 0,
                comments: [],
                likedby: [],
                reportedBy: [],
                image: imageurl ? imageurl : null
            })

            if (doc) {
                toast.success('Confession submitted successfully')
                setConfession('')
                setImageUpload(null)
            }

        } catch (error) {
            // console.log(error)
            toast.error('Error submitting confession')

        }
        finally {
            setLoading(false)
        }


    }
    return (


        <div className=' overflow-y-auto overflow-x-hidden'
            style={{
                scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px',
            }}>

            <div className="flex justify-center">
                <img src='./images/conf.png' alt='confession' className='rounded-lg '
                    width='auto' height='auto'
                />
            </div>
            <div className="flex flex-col gap-4 p-4">


                {/* // select name profile name or anonymous */}
                <select className={`w-full p-4 border-2 ${mode ? "bg-black" : 'bg-white'} border-gray-300 rounded-lg`}
                    onChange={(e) => setName(e.target.value)}
                    defaultValue="Anonymous"
                >
                    <option value="Profile Name">Profile Name</option>
                    <option value="Anonymous">Anonymous</option>
                </select>



                <input type="file" className={`w-full p-4 border-2 ${mode ? "bg-black" : 'bg-white'} border-gray-300 rounded-lg`}
                    onChange={(e) => setImageUpload(e.target.files[0])}
                    accept='image/png, image/jpeg'
                    placeholder='Upload Image(Optional)'
                />



                <textarea placeholder="Confession" className={`w-full p-4 border-2 ${mode ? "bg-black" : 'bg-white'} border-gray-300 rounded-lg`} rows={4}
                    onChange={(e) => setConfession(e.target.value)}
                    value={confession}
                />
                {
                    loading ?
                        <Loadar />
                        :

                        <button className="p-2 bg-blue-500 text-white rounded-lg"
                            onClick={handleSubmit}
                        >Submit</button>
                }
            </div>




        </div>
    )
}
