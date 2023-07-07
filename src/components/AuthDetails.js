import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from './Firebase'

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState({
        isSignedIn: false,
        pendingSignedIn: true,
        user: null
    })

    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
            setAuthUser({
                user,
                pendingSignedIn: false,
                isSignedIn: !!user
            })
        })

        return () => {
            unregisterAuthObserver()
        }
    }, [])
 
  return { auth, ...authUser  }

}

export default AuthDetails