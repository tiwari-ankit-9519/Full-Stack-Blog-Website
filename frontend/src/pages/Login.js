import React, { useState } from "react";
import loginImage from "../assets/loginImage.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/userSlice";
import showAlert from "../utils/sweetAlert";
import Loader from "../components/Loader";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/");
          showAlert("Success", "success");
        }, 2000);
      })
      .catch((err) => {
        showAlert(err, "error");
      });
  };

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <main className="flex min-h-[calc(100vh-5rem)] lg:mx-44">
          <div className="flex justify-center items-center w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 mx-5">
            <LoginForm
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
              formData={formData}
              showPassword={showPassword}
              toggleShowPassword={toggleShowPassword}
            />
          </div>
          <div className="w-1/2 hidden sm:hidden md:hidden lg:block xl:block">
            <img
              src={loginImage}
              alt="loginImage"
              className="min-h-[calc(100vh-5rem)]"
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default Login;
