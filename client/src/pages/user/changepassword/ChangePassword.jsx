import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { changePassword, clearError } from "../../../redux/features/authSlice";
import Spinners from "../../../component/layout/spinner/Spinners";


const ChangePassword = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading,error} = useSelector((state)=>state.auth)
  const [changeValue, setChangeValue] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changeError, setChangeError] = useState({});
  const { oldPassword, newPassword, confirmPassword } = changeValue;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(changePassword({changeValue,toast,navigate}))
    }else{

      return toast.warn("Invalid Input!")
    }
  };
  const validateForm = () => {
    let newErrors = {};
    if (!oldPassword) {
      newErrors.oldPassword = "Old Password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New Password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "New Password must be 8 digits";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword.length < 8) {
      newErrors.confirmPassword = "Confirm Password must be 8 digits";
    }
    setChangeError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    setChangeValue({ ...changeValue, [name]: value });
  };


  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearError())
    }
  })
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={oldPassword}
            onChange={handleChange}
          />
          {changeError && (
            <span className="text-red-500 text-sm">
              {changeError.oldPassword}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={newPassword}
            onChange={handleChange}
          />
          {changeError && (
            <span className="text-red-500 text-sm">
              {changeError.newPassword}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={confirmPassword}
            onChange={handleChange}
          />
          {changeError && (
            <span className="text-red-500 text-sm">
              {changeError.confirmPassword}
            </span>
          )}
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading && <Spinners />} Save
          </button>
        </div>
      </form>
    </div>
  );
};
export default ChangePassword;
