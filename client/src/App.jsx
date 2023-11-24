import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./component/home/Home";
import Header from "./component/header/Header";
import About from "./pages/aboutUs/About";
import Moreinfo from "./pages/moreinfo/Moreinfo";
import Footer from "./component/footer/Footer";
import TopHeader from "./component/header/topHeader/TopHeader";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Contact from "./pages/contact/Contact";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Register from "./pages/user/register/Register";
import Login from "./pages/user/login/Login";
import Profile from "./pages/user/profile/Profile";
import ChangePassword from "./pages/user/changepassword/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./redux/features/authSlice";
import ProtectedRoute from "./utilis/protectedRoute/ProtectedRoute";
import AdminDashboard from "./component/admin/adminDashboard/AdminDashboard";
import AddAdminProducts from "./component/admin/adminDashboard/addAdminProducts/AddAdminProducts";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(profile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      <Router>
        <ToastContainer />
        <TopHeader isAuthenticated={isAuthenticated} user={user} />
        <Header />

        <Routes>
          <Route
            path="/admin/meropasal-dashboard/panel"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add/admin/product"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                adminRoute={true}
                isAdmin={user && user.role === "admin"}
              >
                <AddAdminProducts />
              </ProtectedRoute>
            }
          />

          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/change/password" element={<ChangePassword />} />

          <Route path="/product/details/:id" element={<ProductDetails />} />

          <Route path="/about/" element={<About />} />

          <Route path="/more-info" element={<Moreinfo />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
