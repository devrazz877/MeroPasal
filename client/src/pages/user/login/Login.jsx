import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, login, register } from "../../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinners from "../../../component/layout/spinner/Spinners";
const Login = () => {

    const {loading,error} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

  const [loginErr, setLoginErr] = useState({});

  const { email, password } = loginValue;

  const validatedForm = () => {
    let newErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email) {
      newErrors.email = "email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "invalid email";
    }
    if (!password) {
      newErrors.password = "password is required";
    } else if (password.length > 8) {
      newErrors.password = "password must be at least 8 digit long";
    }
    setLoginErr(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setLoginValue({ ...loginValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatedForm()) {
        dispatch(login({loginValue,toast,navigate}))
    } else {
      return toast.warning("invalid input");
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
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
            {loginErr && <span className="text-red-500">{loginErr.email}</span>}
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
            {loginErr && (
              <span className="text-red-500">{loginErr.password}</span>
            )}
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {loading && <Spinners/>}Login
            </button>
          </div>
          <span>
            Dont have a account ?
            <Link to ="/register" className="text-red-500">Register</Link>
          </span>
        </form>
      </div>
      ;
    </>
  );
};

export default Login;
