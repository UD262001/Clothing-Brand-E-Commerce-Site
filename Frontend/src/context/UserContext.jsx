import { useCallback, useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

   
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)
    
    const refresh = useCallback(() => {
        setToken(null)
        setUser(null)
    },[])
    
    const value = useMemo(() => ({
        token,
        setToken,
        user,
        setUser,
        refresh,
        loading,
        setLoading
    }), [token, user, loading, refresh])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
    
}

export default UserContextProvider