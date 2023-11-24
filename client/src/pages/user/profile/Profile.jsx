import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, profile, profileUpdate } from "../../../redux/features/authSlice";
import { toast } from "react-toastify";
import Loader from "../../../component/layout/loader/Loader";
import Spinner from "react-bootstrap/esm/Spinner";

const Profile = () => {
  const { user, loading,isLoading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const shownToastOnce = useRef(false);

  const [updateValue, setUpdateValue] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    role: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatar, setAvatar] = useState("");

  const { fullName} = updateValue;

  const handleChange = (e) => {
    let { name, value } = e.target;

    setUpdateValue({ ...updateValue, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
      };
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault()

    const updateForm = new FormData()
    updateForm.append("fullName",fullName)
    updateForm.append("avatar", avatar);


    dispatch(profileUpdate({updateForm,toast}));
  }

  useEffect(()=>{
    if(user){
      setUpdateValue({
        fullName:user.fullName || ""
      })
      setAvatarPreview(user?.avatar?.url || "")
    }
  },[user])

  useEffect(() => {
    if (error && !shownToastOnce.current) {
      toast.error(error);
      dispatch(clearError());
      shownToastOnce.current = true;
    }
    dispatch(profile());
  }, [dispatch, error]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap ">
            <div className="max-w-md mx-auto mt-8 p-4 mb-4 lg:mb-8 lg:w-1/2 xl:w-1/3 ">
              <h2 className="text-2xl font-semibold mb-4">Information</h2>
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
                    value={user.email}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile number
                  </label>
                  <input
                    type="number"
                    id="mobileNo"
                    name="mobileNo"
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    value={user.mobileNo}
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                    value={user.role}
                    disabled
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {isLoading && <Spinner animation="border" size="sm" />}Save
                  </button>
                </div>
              </form>
            </div>
            <>
              <div className="aaa mt-4 lg:mt-8 lg:w-1/2 xl:w-1/3">
                <label>Your Image</label>
                <img
                  src={avatarPreview}
                  alt="avatarImg"
                  className="w-64 h-64 object-contain rounded-lg border border-gray-300 p-2"
                ></img>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileInputChange}
                ></input>
              </div>
            </>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
