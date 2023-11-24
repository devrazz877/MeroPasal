import React from "react"
import Logo from "../../assets/Images/meropasal.png"
import { NavLink } from "react-router-dom"


import { FcFaq } from "react-icons/fc"
const Header = () => {
  return (
    <>
      <div className="flex justify-evenly">
        <NavLink to ="/">
          <img className="w-28 h-35 py-4 " src={Logo} alt="logo" />
        </NavLink>
        <div className="py-4">
          <NavLink to="/">Home</NavLink>
        </div>
        <div className="py-4">
          <NavLink to="/about">About Us</NavLink>
        </div>
        <div className="flex  py-4">
          <input
            type="text"
            className="block w-full h-full text-red-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
          />
          <button className="px-4 text-white bg-green-600 border-l rounded ">
            Search
          </button>
        </div>
        <div className="w-28 py-4">
          <FcFaq />
        </div>
        <NavLink to="/"></NavLink>

        <div className="py-4">Wishlist</div>
      </div>
    </>
  );
}
export default Header