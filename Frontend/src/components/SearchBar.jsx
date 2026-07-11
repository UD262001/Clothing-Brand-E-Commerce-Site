import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

    // const [visible, setVisible] = useState(false)

    const location = useLocation()


    // useEffect(() => {
    //     location.pathname.includes('Collection')? setVisible(true):setVisible(false)
    //     },[location])

    const visible = useMemo(() => {
        return location.pathname.includes('collection') ? true : false
    },[location])
    

    return showSearch && visible ? (
        <div className=" bg-gray-50 text-center">
            <div className="inline-flex justify-center items-center border border-gray-400 px-4 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="flex-1 outline-none bg-inherit text-medium" />
                <img className="w-4" src={assets.search_icon} alt="" />
            </div>
                <img className="inline w-3 cursor-pointer" onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="" />
        </div>
    ) : null
};

export default SearchBar;
