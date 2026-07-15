import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { name, email, password } = credentials;

  const { setToken, setUser } = useContext(UserContext);

  const { lastPathName, setCartItems } = useContext(ShopContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response =
        currentState === "Sign Up"
          ? await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
              name,
              email,
              password,
            },{withCredentials:true})
          : await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
              email,
              password,
          },{withCredentials:true});
      
     
      setCredentials({
        name: "",
        email: "",
        password: "",
      });
      setToken(response.data.accessToken);
      setUser(response.data.user);
      setCartItems(response.data?.user?.cartData);
      navigate(lastPathName || "/");
    } catch (error) {
      toast.error(error?.response?.message || "Invalid Credentials", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[96%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prate-regular text-3xl ">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          onChange={onChangeHandler}
          value={name}
          name="name"
          required
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Email"
        onChange={onChangeHandler}
        value={email}
        name="email"
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder="Password"
        onChange={onChangeHandler}
        value={password}
        name="password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" && (
          <p className="cursor-pointer hover:underline">
            Forgot your password ?
          </p>
        )}

        {currentState === "Sign Up" ? (
          <p
            onClick={() => {
              setCurrentState("Login");
              setCredentials({
                name: "",
                email: "",
                password: "",
              });
            }}
            className="cursor-pointer hover:underline"
          >
            Already a user ? Login Here
          </p>
        ) : (
          <p
            onClick={() => {
              setCurrentState("Sign Up");
              setCredentials({
                name: "",
                email: "",
                password: "",
              });
            }}
            className="cursor-pointer hover:underline"
          >
            Create an Account
          </p>
        )}
      </div>
      <button className="w-full bg-black text-white py-3 text-xl font-light">
        {currentState === "Login" ? "Log in" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
