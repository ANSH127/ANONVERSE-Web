import React from 'react'

// import { usersRef, confessionRef, storage } from '../config/firebase'
// import { getDocs, query, where, addDoc } from 'firebase/firestore'
import Loadar from './Loadar'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Footer from './Footer';
import axios from 'axios';

export default function AddConfessionForm() {
    const [name, setName] = React.useState('Anonymous')
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
        try {

            if (!localStorage.getItem('token')) {
                toast.error('Please login to submit confession')
                return
            }

            setLoading(true)

            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', confession);
            formData.append('comments', JSON.stringify([]));
            formData.append('likes', 0);
            formData.append('likedby', JSON.stringify([]));
            formData.append('reportedby', JSON.stringify([]));
            if (imageUpload) {
                formData.append('image', imageUpload);
            }

            const response = await axios.post('http://localhost:4000/api/addconfession',formData , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 201) {
                toast.success('Confession submitted successfully')
                setConfession('')
                setImageUpload(null)
            } else {
                toast.error('Error submitting confession')
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
            <Footer />




        </div>
    )
}
