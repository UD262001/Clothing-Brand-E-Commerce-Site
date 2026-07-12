import { createContext, useCallback, useContext, useEffect, useRef, useState, useMemo } from "react"
// import { products } from '../assets/frontend_assets/assets'
import { toast } from 'react-toastify';
import axios from 'axios'
import { UserContext } from "./UserContext";
import useDebounce from "../Hooks/useDebounce";



export const ShopContext = createContext()


const ShopContextProvider = ({ children }) => {


    const { token } = useContext(UserContext)
    
    const currency = '$'
    const delivery_fee = 10
    const [search, setSearch] = useState('')
    const [products,setProducts]=useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [lastPathName,setLastPathName] = useState(null)
    const [cartItems, setCartItems] = useState({}) // problem here
    const isFirstRender = useRef(true)

    
    

    const debouncedValue = useDebounce(cartItems)
    
    
    

    
    
    
    const addToCart = useCallback(async (itemId, size) => {
        
        if (!size) {
            return toast.error('Please select size', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            
        }

        setCartItems(prev => {
            const cartData = structuredClone(prev || {})
            if (!cartData[itemId]) cartData[itemId] = {}
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }

            return cartData
        })
    }, [])

    
    const getCartCount = useCallback(() => {
        let totalCount = 0

        for (const items in cartItems) {
            
            for (const item in cartItems[items]) {
             
                    if (cartItems?.[items]?.[item]) {
                        totalCount += cartItems[items][item]
                    }
                }
            }
            return totalCount

    }, [cartItems])
    

    const updateQuantity = useCallback((itemId, size, quantity) => {
        setCartItems(prev => {
            const cartData = structuredClone(prev || {})
            if (!cartData[itemId] || !cartData[itemId][size]) return cartData

            if (quantity <= 0) {
                delete cartData[itemId][size]
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId]
                }
            } else {
                cartData[itemId][size] = quantity
            }

            return cartData
        })
    }, [])

    const getCartAmount = useCallback(() => {
        let totalAmount = 0
        for (const items in cartItems) {
            const itemInfo = products.find(product => product._id === items)
            if (!itemInfo) continue

            for (const item in cartItems[items]) {
                if (cartItems[items][item]) {
                    totalAmount += itemInfo.price * cartItems[items][item]
                }
            }
        }
        return totalAmount
    }, [cartItems, products])
    

    
    
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/productList`)
            setProducts(response.data.products)
        } catch (error) {
            console.log(error);
            
        }
        
    }
    
    useEffect(() => {
        getProductsData()
    }, [])
    
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        if (!token) return

        if (Object.keys(debouncedValue).length === 0) return
        

        const updateCart = async () => {
            try { 
                
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/updateCart`, debouncedValue, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                })
            } catch (error) {
                
                toast.error(error.response?.data?.message || 'Error while updating the Cart', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        }

        updateCart()
    }, [debouncedValue,token])

    const value = useMemo(() => ({
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        lastPathName,
        setLastPathName
    }), [products, search, showSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, lastPathName])

    return (

        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )



}

export default ShopContextProvider
