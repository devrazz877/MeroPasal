import React from 'react'
import { Link } from 'react-router-dom'

const TopPicks = ({product}) => {
  return (
    <>
    <div className='bg-gray-200 flex flex-col items-center p-4 space-y-2'>
       <Link to ={`/product/details/${product._id}`}>
        
       <img src={product.productimage.url} alt={product.productname}
         className="w-32 h-32 object-cover rounded-md mb-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 sm:mb-4" />
        <h2 className=' font-sans text-xl text-green-600'>{product.productname}</h2>
        <p className='text-gray-500'>Rs. {product.price}</p>
       
       </Link>
    </div>
    </>
  )
}

export default TopPicks