import React from "react";
import { X } from "lucide-react";

const Product = ({ item, removeProduct, deleting }) => {
  return (
    <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border  border-gray-200 text-sm">
      <img className="w-12" src={item.image[0]} alt="" />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>{`${import.meta.env.VITE_CURRENCY} ${item.price}`}</p>

      <button
        disabled={deleting}
        onClick={() => {
          removeProduct(item._id);
        }}
        className="text-right md:text-center cursor-pointer text-lg"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Product;
