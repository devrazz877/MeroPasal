import React, { useEffect, useState } from 'react';
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import { setLogout } from '../../../redux/features/authSlice';
import decode from "jwt-decode";


const TopHeader = ({isAuthenticated ,user}) => {
  const [isDropDownShow, setIsDropDownShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage?.getItem("token")

  useEffect(()=>{
    if(userToken){
      const decodedToken = decode(userToken);
      if(decodedToken.exp * 1000 < new Date().getTime()){
            dispatch(setLogout());
            navigate("/login");

            toast.warn("session expired !! login first ");
      }
  
    }
  },[dispatch,navigate,userToken])

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
    toast.success("logout scucessfully");
  };
  return (
    <div className="bg-green-900 text-black py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <span className="mr-2">Call us: </span>
          <span className="font-Roboto-sans">9867310555</span>
        </div>
        <div className="flex items-center pl-100"></div>
        <span className="mr-10"> </span>
        <div className="py-2">
          <VscAccount />
        </div>
        <div className="relative">
          {isAuthenticated ? (
            <div className="flex items-center">
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setIsDropDownShow(!isDropDownShow)}
              >
                <img
                  src={user?.avatar?.url}
                  alt={user.fullname}
                  className="w-8 h-8 rounded-full"
                />
                <span>{user.fullname}</span>
              </button>
              {isDropDownShow && (
                <div className="fixed z-10 top-0 mt-12 bg-white shadow-sm rounded-sm">
                  <ul className="py-2">
                    <li className="px-4 py-2">
                      <NavLink to="/profile" className="hover:text-red-600">
                        Profile
                      </NavLink>
                    </li>
                    <li className="px-4 py-2">
                      <NavLink
                        to="/change/password"
                        className="hover:text-red-600"
                      >
                        Change password
                      </NavLink>
                    </li>
                    {user &&
                      user.role ===
                        "admin" && (
                          <li className="px-4 py-2">
                            <NavLink
                              to="/admin/meropasal-dashboard/panel"
                              className="hover:text-red-600"
                            >
                              Admin Dashboard
                            </NavLink>
                          </li>
                        )}
                    <li className="px-4 py-2">
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login">
                <button className="font-Roboto-sans">login/register</button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopHeader;