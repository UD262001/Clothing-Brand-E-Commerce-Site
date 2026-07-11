import React, { useContext, useMemo, } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ id, category, subCategory }) => {
  const { products } = useContext(ShopContext);

  const related = useMemo(() => {

    if (!products.length) {
      return []
    }

    let productsCopy = [...products]

    productsCopy = productsCopy.filter(product => category === product.category && subCategory === product.subCategory && id != product._id)
    
    return productsCopy.slice(0,5)


  },[products, category, subCategory, id])

  return (
    related.length && (
      <div className="my-24">
        <div className="text-center text-3xl py-2">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-5 gap-4 gap-y-6">
          {related.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default RelatedProducts;
