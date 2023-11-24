import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError } from "../../../../redux/features/productSlice";
import Spinner from "react-bootstrap/esm/Spinner";
import { createProduct } from "../../../../redux/features/adminSlice";

const AddAdminProducts = () => {
  const { loading, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addValue, setAddValue] = useState({
    productname: "",
    description: "",
    manufacture: "",
    ratings: "",
    isinstock: "",
    SKU: "",
    price: "",
    category: "",
  });

  const {
    productname,
    category,
    manufacture,
    description,
    isinstock,
    SKU,
    ratings,
    price,
  } = addValue;

  const [productImgReview, setProductImgReview] = useState("");
  const [productimage, setProductimage] = useState("");

  const handelChange = (e) => {
    let { name, value } = e.target;
    setAddValue({ ...addValue, [name]: value });
  };

  const handelFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setProductImgReview(reader.result);
        setProductimage(file);
      };
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("SKU", SKU);
    formData.append("isinstock", isinstock);
    formData.append("ratings", ratings);
    formData.append("productimage", productimage);
    formData.append("manufacture", manufacture);

    dispatch(createProduct({ formData, toast, navigate }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);
  return (
    <div>
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handelSubmit} className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productname"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product name"
              value={productname}
              onChange={handelChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              step="0.01"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product price"
              value={price}
              onChange={handelChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">Ratings</label>
            <input
              type="number"
              name="ratings"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product ratings"
              value={ratings}
              onChange={handelChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">
              Manufacture
            </label>
            <input
              type="text"
              name="manufacture"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product manufacture"
              value={manufacture}
              onChange={handelChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input
              type="text"
              name="SKU"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product SKU"
              value={SKU}
              onChange={handelChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product category"
              value={category}
              onChange={handelChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">IsInStock</label>
            <input
              type="number"
              name="isinstock"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product isInStock"
              value={isinstock}
              onChange={handelChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">productImg</label>
            <input
              type="file"
              accept="image/*"
              name="productimage"
              step="0.1"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter productImg"
              onChange={handelFileChange}
            />
          </div>
          <img src={productImgReview} alt="product image" />
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter product description"
              onChange={handelChange}
              value={description}
              rows="4"
            ></textarea>
          </div>
          {/* Add other fields similar to the ones above */}
          <div className="w-full px-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring"
            >
              {loading && <Spinner animation="border" size="sm" />}Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdminProducts;
