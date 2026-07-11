import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Navbar = React.memo(() => {
  const [visible, setVisible] = useState(false);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { setShowSearch, getCartCount, setCartItems } = useContext(ShopContext);

  const { token, refresh } = useContext(UserContext);

  const navigate = useNavigate();

  const location = useLocation();

  const logOut = async () => {
      try {
        
          await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/logout`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
              withCredentials:true
          })

          

         refresh();
          setCartItems({});
          
        navigate("/login");
      } catch (error) {
          console.log(error);
          
    }
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium sticky top-0 bg-white">
      <Link to={"/"}>
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />

        <div
          onMouseEnter={() => {
            setShowProfileMenu(true);
          }}
          onMouseLeave={() => {
            setShowProfileMenu(false);
          }}
          className="relative"
        >
          <img
            onClick={() => {
              setShowProfileMenu((prev) => !prev);
            }}
            src={assets.profile_icon}
            className="w-5"
            alt=""
          />

          {showProfileMenu && (
            <div className={`absolute right-0 pt-4 `}>
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {token ? (
                  <>
                    <p className="cursor-poi hover:text-black">My Profile</p>
                    <p
                      onClick={() => {
                        navigate("/orders");
                      }}
                      className="cursor-pointer hover:text-black"
                    >
                      Orders
                    </p>
                    <p
                      onClick={logOut}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </>
                ) : (
                  <p
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    Login
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <Link to={"/cart"} className={`relative ${!token && "hidden"}`}>
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[12px]">
            {getCartCount()}
          </p>
        </Link>

        <img
          onClick={() => {
            setVisible(true);
          }}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar menu for small screan */}

      <div
        className={`fixed top-0 right-0  h-screen overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => {
              setVisible(false);
            }}
            className="flex items-center gap-4 p-3"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>

          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 pl-6 border border-zinc-300"
            to={"/"}
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 pl-6 border border-zinc-300"
            to={"/collection"}
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 pl-6 border border-zinc-300"
            to={"/about"}
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => {
              setVisible(false);
            }}
            className="py-2 pl-6 border border-zinc-300"
            to={"/contact"}
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
});

export default Navbar;
