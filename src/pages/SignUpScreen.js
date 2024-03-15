import React from 'react'
import { Link } from 'react-router-dom';
import Loadar from '../components/Loadar';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth, usersRef } from '../config/firebase'
import { addDoc } from 'firebase/firestore'
import {toast} from 'react-toastify'
import { theme } from '../theme';
import { useSelector } from 'react-redux'


export default function SignUpScreen() {
    const mode=useSelector(state=>state.user.theme)
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [Name, setName] = React.useState('')

    const handleSignUp = async () => {
        if (email === '' || password === '' || Name === '') {
            toast.warning('Name, Email and password cannot be empty')
            return
        }
        else {
            setLoading(true)
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user
                await sendEmailVerification(user)

                await addDoc(usersRef, {
                    name: Name,
                    email: email,
                    uid: user.uid,
                    createdAt: new Date().toISOString(),
                    avatar: 0
                })


                toast.success('User created successfully, Please verify your email')
                setEmail('')
                setPassword('')
                setName('')

            } catch (error) {
                console.log(error)
                toast.error('Error signing up')
            }
            finally {
                setLoading(false)
            }

        }
    }

    return (
        <div className='gap-4 col-span-2 h-full shadow-lg mr-5'>
            <div className=' overflow-y-auto overflow-x-hidden'
                style={{
                    scrollbarWidth: 'none', height: '100vh', paddingBottom: '250px',
                }}>

                <div className="flex justify-center">
                    <img src='./images/signup.png' alt='confession' className='rounded-lg '
                        width='auto' height='auto'
                    />
                </div>
                <div className="flex flex-col gap-4 p-4">

                    <input type="text" placeholder="Full Name" className={`w-full p-4 border-2 ${mode?theme.black:theme.white} border-gray-300 rounded-lg`}
                        onChange={(e) => setName(e.target.value)} autoComplete
                    />
                    <input type="text" placeholder="Email" className={`w-full p-4 border-2 ${mode?theme.black:theme.white} border-gray-300 rounded-lg`}
                        onChange={(e) => setEmail(e.target.value)} autoComplete
                    />
                    <input type="password" placeholder="Password" className={`w-full p-4 border-2 ${mode?theme.black:theme.white} border-gray-300 rounded-lg`}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="text-center">Already have an account?
                        <Link to='/login' className="text-blue-500"> Sign In</Link>
                    </p>

                    {
                        loading ?
                            <Loadar />
                            :
                            <button className="p-2 bg-blue-500 text-white rounded-lg"
                                onClick={handleSignUp}>Sign Up
                            </button>}

                </div>




            </div>


        </div>
    )
}
