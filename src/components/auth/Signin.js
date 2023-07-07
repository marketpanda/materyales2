import React, {useEffect, useRef, useState} from 'react'
import { auth, providerFacebook, providerGoogle } from '../Firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import '../../new_css.css'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'

const LOGIN_URL =   '/auth';

const Signin = () => {
  
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    const signInNow = async (e) => {
        e.preventDefault()
        //setSuccess(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                
                const response = axios.post(
                    LOGIN_URL, 
                    JSON.stringify({email, password}), 
                        {
                            headers: {'Content-Type': 'application/json'},
                            withCredentials: true, 
                        }
                    
                    );
                console.log(userCredential)
                console.log('break line')
                //console.log(JSON.stringify(response?.data))
                //console.log(JSON.stringify(response?.data))
                setEmail('')
                setPassword('')
                setSuccess(true)
            }).catch((error) => {
                const errorCode = error.code
                const errMessage = error.message
                console.log(errMessage)

                if (errorCode == 'auth/invalid-email') {
                    setErrMsg('Invalid email')
                } else if (errorCode == 'auth/user-not-found') {
                    setErrMsg('User does not exists. Consider making an account')
                
                } else if (errorCode == 'auth/wrong-password') {
                    setErrMsg('Invalid password')
                } else {
                    setErrMsg('Could not log in')
                }
                
            }) 
    }

    const siginInViaGoogle = () => {
        signInWithPopup(auth, providerGoogle).then((data) => {
            setEmail(data.user.email)
            localStorage.setItem('email', data.user.email)
            localStorage.setItem('avatar', data.user.photoURL)
            localStorage.setItem('userName', data.user.displayName)
            console.log(data)
            console.log('avatar')
      
        })
    }

    const signInViaFacebook = () => {
        signInWithPopup(auth, providerFacebook).then((data) => {
            setEmail(data.user.email)
             
            localStorage.setItem('email', data.user.email)
            localStorage.setItem('avatar', data.user.photoURL)
            localStorage.setItem('userName', data.user.displayName)
            console.log(data)
        })
    }

    // useEffect(() => {
    //     setEmail(localStorage.getItem('email'))
    // }, [])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])
    

    return (
        <>
            {
                success ? 
                  
                <section>
                    <h3>You are logged in</h3>
                    <p>
                        Redirecting...
                    </p>
                </section> :
                 
                <section className='signUpForm'>
                
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                    {errMsg}
                </p>
                <h4>Log In to your account</h4>
                <form onSubmit={signInNow}>
                    
                    <label htmlFor='emailInput'>Email</label>
                    <input 
                        type='text'
                        id='emailInput'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        placeholder='enter your email'  
                        required
                    />
                    <label htmlFOr='passwordInput'>Password</label>
                    <input 
                        type='password'
                        id='passwordInput' 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        placeholder='enter your password'  
                        required 
                    />
                    <button type='submit'>Login</button>
                </form>
                <div>
                    <button onClick={siginInViaGoogle}>Sign in with Google</button>
                    <button onClick={signInViaFacebook}>Sign in with Facebook</button>
                </div>
                    
                </section>
            }
             
        </>
        
    )
}

export default Signin