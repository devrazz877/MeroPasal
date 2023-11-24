import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { clearError, productDelete } from '../../../../redux/features/adminSlice';
import { toast } from 'react-toastify';


const ViewTable = ({item}) => {

  const {loading,error} = useSelector((state)=>state.admin)

  const dispatch = useDispatch();

  const handelDelete = (id)=>{
    dispatch(productDelete({id,toast}))
    
  }
  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearError())
    }
  },[dispatch,error])
  return (
    <>
      {" "}
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-bold text-green-900 whitespace-nowrap dark:text-green text-uppercase"
        >
          {item.productname}
        </th>
        <td className="px-6 py-4">
          <img
            src={item.productimage?.url}
            alt={item.productName}
            className="w-24 h-24 object-cover"
          />
        </td>
        <td className="px-6 py-4 text-green-900 font-bold">{item.category}</td>
        <td className="px-6 py-4 text-green-900 font-bold">{item.price}</td>
        <td className="px-6 py-4 text-green-900 font-bold">
          {item.manufacture}
        </td>
        <td className="px-6 py-4 text-green-900 font-bold">{item.isinstock}</td>
        <td className="px-6 py-4 text-green-900 font-bold">{item.ratings}</td>
        <td className="px-6 py-4 text-right">
          <div className="flex space-x-2">
            <Link to ={`/single/product/${item._id}`} className="text-green-900">
              <FaEye />
            </Link>
            <Link className="text-green-900">
              <FaPencilAlt />
            </Link>
            <Link className="text-green-900" onClick={()=>handelDelete(item._id)}>
              <FaTrashAlt />
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ViewTable