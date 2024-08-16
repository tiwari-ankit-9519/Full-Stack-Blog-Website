import registerImage from "../assets/registerImage.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/userSlice";
import Loader from "../components/Loader";
import showAlert from "../utils/sweetAlert";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formDataWithFile = new FormData();
    formDataWithFile.append("name", formData.name);
    formDataWithFile.append("email", formData.email);
    formDataWithFile.append("phone", formData.phone);
    formDataWithFile.append("password", formData.password);
    formDataWithFile.append("age", formData.age);
    formDataWithFile.append("profileImage", formData.profileImage);

    dispatch(registerUser(formDataWithFile))
      .unwrap()
      .then(() => {
        setTimeout(() => {
          navigate("/login");
          showAlert("User registered successfully", "success");
        }, 2000);
      })
      .catch((err) => {
        showAlert("Error", err, "error");
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-[calc(100vh-5rem)] flex lg:mx-44">
          <div className="w-1/2 hidden lg:block">
            <img
              src={registerImage}
              alt=""
              className="min-h-[calc(100vh-5rem)]"
            />
          </div>
          <div className="flex justify-center items-center w-full sm:w-full md:w-full lg:w-1/2 mx-5">
            <RegisterForm
              handleFormSubmit={handleFormSubmit}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              formData={formData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
