import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, register } from "../../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import Spinners from "../../../component/layout/spinner/Spinners";

const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
  });

  const [registerErr,setRegisterErr] = useState({})

  const { fullName, email, mobileNo, password, confirmPassword } = formData;

  const validatedForm = ()=>{
    let newErrors ={}
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if(!fullName){
      newErrors.fullName= "Full-name is required"
    }
    if(!email){
      newErrors.email = "email is required"
    }
    else if(!emailRegex.test(email)){
      newErrors.email = "email doesnt matched"
    }
    if(!mobileNo){
      newErrors.mobileNo = "Mobile Number is required"
    }
    else if(mobileNo.length !== 10){
      newErrors.mobileNo = "Mobile numbers is less than 10"
    }
    if(!password){
      newErrors.password = "Password is needed"
    }
     else if(password.length <8){
      newErrors.password = "Password must be eight digit long"
    }
    if(!confirmPassword){
      newErrors.confirmPassword = " Please confirm the password"
    }
     else if(password !== confirmPassword){
      newErrors.confirmPassword = "Password must be match"
    }

    setRegisterErr(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validatedForm()){
      dispatch(register({ formData, toast, navigate }));

    }else{
      return toast.warning("Invalid input!")
    }
  
  };

  useEffect(()=>{
    if(error){
      toast.error(error)
      dispatch(clearError())
    }
  },[dispatch,error])
  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={fullName}
              onChange={handleChange}
            />
            {registerErr && 
              <span className="text-red-500">{registerErr.fullName}</span>
            }
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={handleChange}
            />
            {registerErr && 
              <span className="text-red-500">{registerErr.email}</span>
            }
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNo"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="mobileNo"
              name="mobileNo"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={mobileNo}
              onChange={handleChange}
            />
            {registerErr && 
              <span className="text-red-500">{registerErr.mobileNo}</span>
            }
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={handleChange}
            />
            {registerErr && 
              <span className="text-red-500">{registerErr.password}</span>
            }
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
            {registerErr && 
              <span className="text-red-500">{registerErr.confirmPassword}</span>
            }
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading && <Spinners />} Register
            </button>
          </div>
        </form>
      </div>
      ;
    </>
  );
};

export default Register;
