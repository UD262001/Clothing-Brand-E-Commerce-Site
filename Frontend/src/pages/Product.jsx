import React, { useContext,useEffect,useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'
import { UserContext } from '../context/UserContext'

const Product = () => {


  const { Id } = useParams()
  const { products,currency,addToCart,setLastPathName } = useContext(ShopContext)
  const [image, setImaga] = useState(null)
  const [sizeSelected, setSizeSelected] = useState(null)

  

  const navigate = useNavigate()
  const location = useLocation()

  
  const { token } = useContext(UserContext)
  
  
  
  const productData = useMemo(() => {
    const foundProduct = products.find((item) => Id === item._id)
    return foundProduct
  },[Id,products])
  
  

  
  
  return productData ? (
    <div className='border-t-2 border-zinc-200 pt-10 transition-opacity ease-in duration-500 opacity-100 '>
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* product images */}

        <div className='flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex-1 flex sm:flex-col overflow-x-auto sm:overflow-y-scroll scrollbar-none justify-between sm:justify-normal'>
            {
              productData.image.map((item, index) => (
                <img onClick={()=>setImaga(item)} src={item} key={index} alt="" className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%] '>
            <img src={image||productData.image[0]} className='w-full h-auto' alt="" />
          </div>
        </div>

        
        {/* product info */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{ productData.name }</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3' />
            <img src={assets.star_icon} alt=""  className='w-3'/>
            <img src={assets.star_icon} alt=""  className='w-3'/>
            <img src={assets.star_icon} alt=""  className='w-3'/>
            <img src={assets.star_dull_icon} alt=""  className='w-3'/>
            <p className='pl-3'>(122)</p>
          </div>

          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => { setSizeSelected(prev => prev == item ? null : item) }} className={`border border-zinc-200 py-2 px-4 bg-gray-100 rounded-lg ${sizeSelected === item && 'border-2 border-zinc-500'}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={() => {
            console.log('cart clicked');
            
            if (!token) {
              setLastPathName(location.pathname)
              return navigate('/login')
            }
            addToCart(productData._id, sizeSelected)
            }} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 border border-zinc-300 ' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>

          </div>
        </div>
      </div>

{/* Description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border border-zinc-200 px-5 py-3 text-sm'>Description</b>
          <p className='border border-zinc-200 px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border border-zinc-200 mt-2 px-6 py-6 text-sm text-gray-700'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis odit officiis corporis dolores nulla, dignissimos saepe quibusdam quaerat excepturi voluptate possimus totam temporibus voluptates cupiditate iste nisi dicta velit reprehenderit. Aut, excepturi? Labore voluptatum voluptates voluptate laborum, cum recusandae dolorum quaerat eligendi, perspiciatis, ipsam non cupiditate fugit est eaque! Officiis.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nihil omnis reprehenderit sit sint, numquam eos repudiandae corrupti assumenda maiores veritatis nisi quisquam dicta unde enim odit tenetur esse recusandae?</p>
        </div>
      </div>
      
      {/* display related products */}

      <RelatedProducts id={productData._id} category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='flex justify-center items-center text-3xl font-semibold'> Product Not Found</div>
}

export default Product
