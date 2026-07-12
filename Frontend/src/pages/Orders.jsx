import React, { useContext, useMemo } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { toastConfig } from "../config/config";

const Orders = () => {
  const { currency } = useContext(ShopContext);
  
  const { token } = useContext(UserContext);

  const [orders, setOrders] = useState([]);

 

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/userOrders`,
          {
            headers: {
              Authorization: `bearer ${token} `,
            },
          },
        );
        setOrders(response.data.orders);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "error while fetchig orders!",
          toastConfig
        );
      }
    };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const ordersData = useMemo(() => {
    return orders.flatMap((order) => {
      return order.items.map(item=>({...item,paymentMethod:order.paymentMethod,status:order.status,date:order.date}))
    });
    
  }, [orders]);
  
  return (
    <div className="border-t border-zinc-200 pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {ordersData.map((item,index) => (
          <div
            key={item._id + index}
            className="py-4 border-t border-zinc-200 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-start gap-4 "
          >
            <div className="flex items-start gap-6 text-sm md:w-1/2">
              <Link to={`/product/${item._id}`}>
                <img
                  className="w-16 cursor-pointer"
                  src={item.image[0]}
                  alt="product image"
                />
              </Link>
              <div>
                <p className=" sm:text-base font-medium">{item.name}</p>
                <div className=" flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity :{item.quantity}</p>
                  <p>Size :{item.size}</p>
                </div>
                <p className="mt-2">
                  Date :{" "}
                  <span className="text-gray-400">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                  </span>
                </p>

                <p className="mt-2">
                  Payment :{" "}
                  <span className="text-gray-400">
                    {item.paymentMethod.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className={`w-2 h-2 rounded-full ${item.status==='Cancelled'?'bg-red-500':'bg-green-500'} inline-block`}></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={fetchOrders} className="border border-zinc-200 px-4 py-2 text-sm font-medium rounded-sm">
                Track order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
