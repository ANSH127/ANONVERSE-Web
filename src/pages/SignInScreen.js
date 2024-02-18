import React from 'react'
import { Link } from 'react-router-dom';
import Loadar from '../components/Loadar';
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export default function SignInScreen() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      alert('All fields are required')
      return
    }
    else {
      setLoading(true)
      try {
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        if(user.emailVerified){
          localStorage.setItem('user',JSON.stringify(user))

          alert('Login success')
          setEmail('')
          setPassword('')
          navigate('/')

        }
        else{
          alert('Please verify your email to login')
        }

      } catch (error) {
        alert(error.message)

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

            <input type="text" placeholder="Email" className="w-full p-4 border-2 border-gray-300 rounded-lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="Password" className="w-full p-4 border-2 border-gray-300 rounded-lg"
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
