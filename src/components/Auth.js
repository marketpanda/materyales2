import React, {useEffect, useState} from 'react'
import  {app, auth} from './Firebase';
import {onAuthStateChanged, getAuth} from 'firebase/auth'
 

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
        })
    }, [])

    return (
        <AuthContext.Provider
            value = {{currentUser}}
        >
            {children}
        </AuthContext.Provider>
    )
}