import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Product from "../components/Product";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/productList`,
      );

      setList(response.data.products);
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeProduct = useCallback(
    async (id) => {
      setDeleting(true);
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/remove/${id}`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );

        setList((prev) => prev.filter((item) => item._id !== id));

        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.responce?.data?.message || error.message);
      } finally {
        setDeleting(false);
      }
    },
    [token],
  );

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2 relative">
        {/* List table Title */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border border-gray-200 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Product List */}

        {loading ? (
          <Loader />
        ) : list.length ? (
          list.map((item) => (
            <Product
              key={item._id}
              item={item}
              deleting={deleting}
              removeProduct={removeProduct}
            />
          ))
        ) : (
          <div className="flex py-5 justify-center mt-10">
            <p className="text-5xl font-medium text-gray-400">No Products</p>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
