import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // State Variables
  const [images, setImages] = useState({
    image1: false,
    image2: false,
    image3: false,
    image4: false,
  });

  const { image1, image2, image3, image4 } = images;

  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestseller: false,
    sizes: [],
  });

  const { name, description, price, category, subCategory, bestseller, sizes } =
    productDetails;

  const [loading, setLoading] = useState(false);
  // Functions

  const onChangeHandler = (e) => {
    const { name, value, id, files } = e.target;

    if (
      id === "image1" ||
      id === "image2" ||
      id === "image3" ||
      id === "image4"
    ) {
      return setImages((prev) => ({ ...prev, [id]: files[0] }));
    }

    if (name === "bestseller") {
      return setProductDetails((prev) => ({ ...prev, [name]: !prev[name] }));
    }

    return setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const insertSizes = (value) => {
    let newSizes = [...sizes];
    if (newSizes.includes(value)) {
      newSizes = newSizes.filter((size) => size !== value);
      return setProductDetails((prev) => ({ ...prev, sizes: newSizes }));
    }
    return setProductDetails((prev) => ({
      ...prev,
      sizes: [...prev.sizes, value],
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Validation

      let image = [];

      image1 && image.push(image1);
      image2 && image.push(image2);
      image3 && image.push(image3);
      image4 && image.push(image4);

      if (!image.length) throw new Error("at least 1 image required");

      if (!name.trim() || !description.trim() || price <= 0 || !sizes.length) {
        throw new Error("Invalid Form Input");
      }

      const formData = new FormData();

      for (const key in productDetails) {
        if (Array.isArray(productDetails[key])) {
          // Convert array to comma-separated string for backend
          formData.append(key, productDetails[key].join(","));
        } else if (key === "bestseller") {
          // Convert boolean to string for backend
          formData.append(key, String(productDetails[key]));
        } else {
          formData.append(key, productDetails[key]);
        }
      }

      image.forEach((img, index) => {
        formData.append(`image${index + 1}`, img);
      });

     await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/add`,
        formData,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );

      toast.success("Product Added Successfull", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

        setImages({
        image1: false,
        image2: false,
        image3: false,
        image4: false,
        })
      
        setProductDetails({
        name: "",
        description: "",
        price: "",
        category: "Men",
        subCategory: "Topwear",
        bestseller: false,
        sizes: [],
      })
    } catch (error) {
      
      toast.error(error?.response?.data?.message||error.message || 'Unexpected Error' ,{
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p>Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt=""
            />

            <input
              onChange={onChangeHandler}
              type="file"
              name="image1"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
            />
            <input
              onChange={onChangeHandler}
              type="file"
              name="image2"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
            />
            <input
              onChange={onChangeHandler}
              type="file"
              name="image3"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
            />
            <input
              onChange={onChangeHandler}
              type="file"
              name="image4"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          name="name"
          value={name}
          onChange={onChangeHandler}
          id=""
          placeholder="Type here"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2 "
          type="text"
          name="description"
          value={description}
          onChange={onChangeHandler}
          id=""
          placeholder=""
        />
      </div>

      <div className="w-full max-w-[500px]  flex flex-col sm:flex-row gap-2 sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            className="w-full px-3 py-2"
            name="category"
            value={category}
            onChange={onChangeHandler}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Sub-Category</p>
          <select
            className="w-full  px-3 py-2"
            name="subCategory"
            value={subCategory}
            onChange={onChangeHandler}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full sm:max-w-[180px] px-3 py-1.5"
            type="number"
            name="price"
            value={price}
            onChange={onChangeHandler}
            id=""
            placeholder="e.g 25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>

        <div className="flex gap-3">
          <div onClick={() => insertSizes("S")}>
            <p
              className={`${sizes.includes("S") ? "bg-[#ffebf5] border border-[#c586a5]" : "bg-slate-200"} px-3 py-1 cursor-pointer"`}
            >
              S
            </p>
          </div>

          <div onClick={() => insertSizes("M")}>
            <p
              className={`${sizes.includes("M") ? "bg-[#ffebf5] border border-[#c586a5]" : "bg-slate-200"} px-3 py-1 cursor-pointer"`}
            >
              M
            </p>
          </div>

          <div onClick={() => insertSizes("L")}>
            <p
              className={`${sizes.includes("L") ? "bg-[#ffebf5] border border-[#c586a5]" : "bg-slate-200"} px-3 py-1 cursor-pointer"`}
            >
              L
            </p>
          </div>

          <div onClick={() => insertSizes("XL")}>
            <p
              className={`${sizes.includes("XL") ? "bg-[#ffebf5] border border-[#c586a5]" : "bg-slate-200"} px-3 py-1 cursor-pointer"`}
            >
              XL
            </p>
          </div>

          <div onClick={() => insertSizes("XXL")}>
            <p
              className={`${sizes.includes("XXL") ? "bg-[#ffebf5] border border-[#c586a5]" : "bg-slate-200"} px-3 py-1 cursor-pointer"`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          name="bestseller"
          onChange={onChangeHandler}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to BestSeller
        </label>
      </div>

      <button
        disabled={loading}
        className="w-full flex items-center justify-center max-h-15 sm:max-w-[500px] py-3 mt-4 bg-black text-white"
      >
        {loading ? (
          <div className="aspect-square h-7 border-3 border-gray-500 border-t-amber-50 rounded-full animate-spin" />
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};

export default Add;
