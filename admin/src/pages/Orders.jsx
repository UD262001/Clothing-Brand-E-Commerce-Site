import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets.js";
import { ShopContext } from "../../../Frontend/src/context/ShopContext.jsx";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);


  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(response.data.orders);

    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Error Occured!",
      );
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/status`, { orderId, status: e.target.value }, {
        headers: {
           Authorization:`Bearer ${token}`
         }
      })
      
      await fetchAllOrders()
      toast.success(response.data.message)

    } catch (error) {
      toast.error(error.response?.data?.message||error.message||'Error Occured')
    }

  }
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size} ,</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{`${order.address.firstName} ${order.address.lastName}`}</p>
              <div>
                <p>{`${order.address.street} ,`}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode} `}</p>
              </div>
              <p>{order.contact}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items :{order.items.length }</p>
              <p className="mt-3">Payment Method :{order.paymentMethod.toUpperCase()}</p>
              <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date:{new Date(order.date).toLocaleDateString() }</p>
            </div>
            <p className="text-sm sm:text-[15px]">Total Amount: {import.meta.env.VITE_CURRENCY} {order.amount}</p>
            <select onChange={(e)=>{statusHandler(e,order._id)}} value={order.status} className="p-2 font-semibold" >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped"Shipped>Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
