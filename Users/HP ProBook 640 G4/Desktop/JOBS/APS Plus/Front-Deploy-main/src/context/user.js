import React, { createContext, useState } from 'react'

export const UserContext = createContext({})

export function UserContextProvider(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [email, setEmail] = useState(null)
    const [token, setToken] = useState(null)
    const [memedToken, setMemedToken] = useState(null)
    const [userType, setUserType] = useState(null)

    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser,
                userId,
                setUserId,
                email,
                setEmail,
                token, 
                setToken,
                userType,
                setUserType
            }}>
            {props.children}
        </UserContext.Provider>
    )
}

