import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext.jsx";
import { toastConfig } from "../config/config.js";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState(null);

  const { user, token } = useContext(UserContext);
  const { getCartAmount, cartItems, setCartItems, products } =
    useContext(ShopContext);

  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    contact: "",
  });

  useEffect(() => {
    if (!user) return;

    setDeliveryDetails((prev) => ({
      ...prev,
      firstName: user?.name?.split(" ")[0] || prev.firstName || "",
      lastName: user?.name?.split(" ")[1] || prev.lastName || "",
      email: user?.email || prev.email || "",
    }));
  }, [user]);

  const {
    firstName,
    lastName,
    email,
    address: { street, city, state, zipCode, country },
    contact,
  } = deliveryDetails;

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setDeliveryDetails((prev) => {
      if (name in prev.address)
        return { ...prev, address: { ...prev.address, [name]: value } };
      return { ...prev, [name]: value };
    });
  };

  //   const initPay = (order) => {

  //     const options = {
  //       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //       amount: order.amount,
  //       currency: order.currency,
  //       name: 'Order Payment',
  //       description: 'Order Payment',
  //       order_id: order.id,
  //       receipt: order.receipt,
  //       handler: async (response) => {
  //         console.log(response);
  //         try {
  //           const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/verifyRazorpay`,response, {
  //             headers: {
  //             Authorization:`Bearer ${token}`
  //             }
  //           })

  //           navigate('/orders')
  //           setCartItems({})

  //         } catch (error) {
  //           toast.error(error?.response?.data?.message||error.message)
  //         }
  //       }
  //     }

  //     const rzp = new window.Razorpay(options)
  //     rzp.open()

  // }


  // Input Validation

  const validateInput = () => {
    if (
      !firstName.trim().length ||
      !email.trim().length ||
      !street.trim().length ||
      !city.trim().length ||
      !state.trim().length ||
      zipCode <= 0 ||
      !country.trim().length ||
      contact <= 0 ||
      contact.toString().length < 10
    ) {
      throw new Error("Person and Delivery Details Needed");
    }
    if (!paymentMethod) throw new Error("Select Payment method");
  };



  // function which returns cartData for orders

  const getCartData = async () => {
    let cartData = [];

    for (const items in cartItems) {
      let itemInfo =
        structuredClone(products.find((product) => product._id === items)) ||
        (await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/single/${items}`,
        ));
      const { sizes, ...rest } = itemInfo?.data?.product || itemInfo;

      cartData = [
        ...cartData,
        Object.keys(cartItems[items]).map((size) => ({
          ...rest,
          size,
          quantity: cartItems[items][size],
        })),
      ].flat();
    }

    return cartData;
  };

  // Placer order with COD

  const withCod = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/placeOrder/cod`,
        {
          ...deliveryDetails,
          cartData: await getCartData(),
          paymentMethod,
          amount: getCartAmount(),
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      setCartItems({});
      toast.success(
        response.message || "Order Placed Successfully",
        toastConfig,
      );

      navigate("/orders");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Error Occurred! Try Again",
      );
    }
  };




  // const withStripe = async () => {

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/orders/placeOrder/stripe`,
  //        {...deliveryDetails,cartData:getCartData(), paymentMethod, amount: getCartAmount() },
  //       {
  //         headers: {
  //           Authorization: `bearer ${token}`,
  //         },
  //       },
  //     );

  //     const { session_url } = response.data

  //     window.location.replace(session_url)

  //   } catch (error) {
  //     toast.error(error?.response?.data?.message||error.message || "Error Occurred! Try Again", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: true,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  // const withRazorPay = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/orders/placeOrder/razorpay`, {
  //         headers: {
  //         Authorization:`Bearer ${token}`
  //       }},
  //       { ...deliveryDetails, paymentMethod, amount: getCartAmount() },
  //       {
  //         headers: {
  //           Authorization: `bearer ${token}`,
  //         },
  //       },
  //     );

  //     initPay(response.data.order)

  //   } catch (error) {
  //     toast.error(error.response?.data?.message || error
  //       .message|| "Error Occurred! Try Again", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: true,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  

  const placeOrder = (method) => {
    try {
      validateInput();

      switch (method) {
        case "cod":
          withCod();
          break;
      }


    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Error While Placing Order",
      );
    }
  };

  return (
    <div className=" flex flex-col sm:flex-row justify-between gap-4 pt-5 s:pt-14 min-h[80vh] border-t border-zinc-200">
      {/* Left side */}

      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className=" tex-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            name="firstName"
            value={firstName}
            id=""
            placeholder="First Name"
            onChange={onChangeHandler}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            name="lastName"
            value={lastName}
            id=""
            placeholder="Last Name"
            onChange={onChangeHandler}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="email"
          name="email"
          value={email}
          id=""
          placeholder="Email"
          onChange={onChangeHandler}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="text"
          name="street"
          value={street}
          id=""
          placeholder="Street"
          onChange={onChangeHandler}
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            name="city"
            value={city}
            id=""
            placeholder="City"
            onChange={onChangeHandler}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            name="state"
            value={state}
            id=""
            placeholder="State"
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="number"
            name="zipCode"
            value={zipCode}
            id=""
            placeholder="ZipCode"
            onChange={onChangeHandler}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
            type="text"
            name="country"
            value={country}
            id=""
            placeholder="Country"
            onChange={onChangeHandler}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full "
          type="number"
          name="contact"
          value={contact}
          id=""
          placeholder="Phone"
          onChange={onChangeHandler}
        />
      </div>

      {/* Right Side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row ">

            {/* Stripe payment Gateway */}


            {/* <div
              onClick={() => {
                setPaymentMethod("stripe");
              }}
              className="flex items-center gap-3 border border-zinc-200 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-zinc-200 rounded-full ${paymentMethod === "stripe" && "bg-green-400"}`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div> */}

            
          {/* Razorpay Payment Gateway */}

            {/* <div
              onClick={() => {
                setPaymentMethod("razorpay");
              }}
              className="flex items-center gap-3 border border-zinc-200 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-zinc-200 rounded-full ${paymentMethod === "razorpay" && "bg-green-400"}`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>   */}

            


            <div
              onClick={() => {
                setPaymentMethod("cod");
              }}
              className="flex items-center gap-3 border border-zinc-200 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-zinc-200 rounded-full ${paymentMethod === "cod" && "bg-green-400"}`}
              ></p>
              <p className="text-black-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full sm:text-end mt-8">
            <button
              onClick={() => {
                placeOrder(paymentMethod);
              }}
              className="bg-black w-full sm:max-w-60 text-white px-16 py-3 text-medium"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
