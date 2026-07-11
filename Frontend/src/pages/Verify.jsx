import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { CheckCircleIcon, XCircle} from 'lucide-react'


const Verify = () => {

  const { user, token } = useContext(UserContext);
  const { setCartItems } = useContext(ShopContext);

  const [paymentStatus, setPaymentStatus] = useState("pending");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("orderId");
  const success = searchParams.get("success");

  useEffect(() => {
    let timeout;

    if (!token || !user?._id || !orderId || success === null) return;

    const verifyStripe = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/verifyStripe`,
          { success, orderId, userId: user._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data.success) {
          setCartItems({});
          setPaymentStatus("Success");
          // toast.success('Payment Done')
          timeout = setTimeout(() => {
            navigate("/orders");
          }, 500);
          return;
        }

        setPaymentStatus('Failed')
        timeout = setTimeout(() => {
          navigate('/place-order')
        },500)
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    };

    verifyStripe();

    return () => {
      clearTimeout(timeout);
    };
  }, [token, user?._id, orderId, success]);

  return (
    <div className="w-full h-[75vh] flex flex-col justify-center items-center gap-2">

      { paymentStatus === "Success" && (
        <>
          <div className="h-15 aspect-square bg-green-500 rounded-full flex items-center justify-center "><CheckCircleIcon size={40} color="white"/></div>
          
          <p className="text-xl sm:text-2xl font-medium">
            Payment Done
          </p>
        </>
      )}

      { paymentStatus === "Failed" && (
        <>
          <div className="h-15 aspect-square bg-red-500 rounded-full flex items-center justify-center "><XCircle size={40} color="white"/></div>
          
          <p className="text-xl sm:text-2xl font-medium">
            Payment Done
          </p>
        </>
      )}

      {paymentStatus === 'pending' && <>
      <div className="  h-15 aspect-square border-5 border-gray-500 border-b-amber-50 rounded-full animate-spin flex justify-center items-center">
        <div className="h-10 aspect-square border-5 border-gray-400 border-b-amber-50 rounded-full animate-spin"></div>
      </div>
      <p className="text-xl sm:text-2xl font-medium">Verifying Payment...</p>
      </>
      }



      </div>

  );
};

export default Verify;
