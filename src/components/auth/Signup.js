import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [warningSignUp, setWarningSignUp] = useState('')

    const signUpNow = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(userCredential)
                }).catch((error) => {
                    console.log(error)
                }).then(setWarningSignUp('Registration successful')
                ) 

        } else {
            setWarningSignUp('Passwords do not match')
            setPassword('')
            setConfirmPassword('')   
        }

    }

    return (
        <>
        <div className='signUpForm'> 
            <form onSubmit={signUpNow}>
                <h5>Create your account</h5>
                <input 
                    type='text' 
                    placeholder='enter your email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                <input 
                    type='password' 
                    placeholder='enter a password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                <input 
                    type='password' 
                    placeholder='re enter password' 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                
                <button type='submit'>Sign up</button>
            </form>
            {warningSignUp}
        </div>
        </>
    )
}

export default Signup