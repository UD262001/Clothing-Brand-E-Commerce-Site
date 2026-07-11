import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {
    
    console.log('User Context');
    

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)
    
    const refresh = useCallback(() => {
        setToken(null)
        setUser(null)
    },[])
    
    const value = {
        token,
        setToken,
        user,
        setUser,
        refresh,
        loading,
        setLoading

    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
    
}

export default UserContextProvider