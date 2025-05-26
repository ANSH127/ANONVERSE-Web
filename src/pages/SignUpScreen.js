import React from 'react'
import { Link } from 'react-router-dom';
import Loadar from '../components/Loadar';
// import { createUserWithEmailAndPassword, sendEmailVerification, getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth'
// import { auth, usersRef } from '../config/firebase'
// import { addDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { theme } from '../theme';
import { useSelector } from 'react-redux'
import Footer from '../components/Footer';
import axios from 'axios';



export default function SignUpScreen() {
    const mode = useSelector(state => state.user.theme)
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [Name, setName] = React.useState('')

    // const provider = new GoogleAuthProvider()

    const handleSignUp = async () => {
        if (email === '' || password === '' || Name === '') {
            toast.warning('Name, Email and password cannot be empty')
            return
        }
        else {
            setLoading(true)
            try {
                // const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                // const user = userCredential.user
                // await sendEmailVerification(user)

                // await addDoc(usersRef, {
                //     name: Name,
                //     email: email,
                //     uid: user.uid,
                //     createdAt: new Date().toISOString(),
                //     avatar: 0
                // })

                const response = await axios.post('http://localhost:4000/api/signup', {
                    username: Name,
                    email: email,
                    password: password
                })

                if (response.status === 201) {
                    localStorage.setItem('token', response.data.token)



                    toast.success('User created successfully, Please verify your email')
                    setEmail('')
                    setPassword('')
                    setName('')
                    
                }else{
                    toast.error('Error signing up')
                }

            } catch (error) {
                console.log(error)
                toast.error('Error signing up')
            }
            finally {
                setLoading(false)
            }

        }
    }


    // const handleGoogleAuth = async () => {
    //     const auth = getAuth()
    //     try {
    //         setLoading(true)
    //         const result = await signInWithPopup(auth, provider)
    //         const user = result.user
    //         const { isNewUser } = getAdditionalUserInfo(result)
    //         if (isNewUser) {
    //             await addDoc(usersRef, {
    //                 name: user.displayName,
    //                 email: user.email,
    //                 uid: user.uid,
    //                 createdAt: new Date().toISOString(),
    //                 avatar: 0
    //             })
    //         }
    //         localStorage.setItem('user', JSON.stringify(user))
    //         toast.success('Login successfull')
    //         window.location.href = '/'
    //     } catch (error) {
    //         console.log(error)
    //         toast.error('Error signing in')
    //     }
    //     finally {
    //         setLoading(false)
    //     }

    // }

    return (
        <div className=' w-full gap-4 col-span-2 h-full shadow-lg mr-5'>
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

                    <input type="text" placeholder="Full Name" className={`w-full p-4 border-2 ${mode ? theme.black : theme.white} border-gray-300 rounded-lg`}
                        onChange={(e) => setName(e.target.value)}
                        value={Name}
                    />
                    <input type="text" placeholder="Email" className={`w-full p-4 border-2 ${mode ? theme.black : theme.white} border-gray-300 rounded-lg`}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input type="password" placeholder="Password" className={`w-full p-4 border-2 ${mode ? theme.black : theme.white} border-gray-300 rounded-lg`}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
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
                            </button>
                    }
                    <h3 className="text-center">Or</h3>
                    <div className="flex justify-center gap-4">
                        <img src='/images/googleIcon.png' alt='google' className='w-10 h-10 rounded-full cursor-pointer' />
                    </  div>

                </div>



                <Footer />

            </div>


        </div>
    )
}
