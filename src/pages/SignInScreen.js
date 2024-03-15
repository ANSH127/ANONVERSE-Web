import React from 'react'
import { Link } from 'react-router-dom';
import Loadar from '../components/Loadar';
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {toast} from 'react-toastify'
import { theme } from '../theme';
import { useSelector } from 'react-redux'

export default function SignInScreen() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const mode=useSelector(state=>state.user.theme)
  const handleSignIn = async () => {
    if (email === '' || password === '') {
      toast.warning('Email and password cannot be empty')
      return
    }
    else {
      setLoading(true)
      try {
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        if(user.emailVerified){
          localStorage.setItem('user',JSON.stringify(user))

          toast.success('Login successfull')
          setEmail('')
          setPassword('')
          window.location.href='/'

        }
        else{
          toast.warning('Please verify your email')
        }

      } catch (error) {
        console.log(error)
        toast.error('Error signing in')

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
            scrollbarWidth: 'none', height: '100vh', paddingBottom: '200px',
          }}>

          <div className="flex justify-center">
            <img src='./images/login.png' alt='confession' className='rounded-lg '
              width='auto' height='auto'
            />
          </div>
          <div className="flex flex-col gap-4 p-4">
            {/* // signin form */}

            <input type="text" placeholder="Email" className={`w-full  ${mode?theme.black:theme.white} p-4 border-2 border-gray-300 rounded-lg`}
              onChange={(e) => setEmail(e.target.value)}  autoComplete
            />
            <input type="password" placeholder="Password" className={`w-full p-4 border-2  ${mode?theme.black:theme.white} border-gray-300 rounded-lg`}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="text-center">Don't have an account?
              <Link to='/signup' className="text-blue-500"> Sign Up</Link>
            </p>

            {
              loading ?
                <Loadar />
                :
                <button className="p-2 bg-blue-500 text-white rounded-lg"
                  onClick={handleSignIn}>
                  Sign In
                </button>
            }
          </div>




        </div>


      </div>
  )
}
