import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { logoutUser, userProfile } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DarkModeButton from "./DarkModeButton";
import Loader from "./Loader";
import { Bars4Icon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 2000);
  };

  useEffect(() => {
    const handleProfile = () => {
      dispatch(userProfile());
    };

    if (isAuthenticated) {
      handleProfile();
    }
  }, [dispatch, isAuthenticated]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex py-1 h-20 justify-between items-center dark:text-white lg:mx-44 p-5">
          <Link to="/">
            <img src={logo} alt="logo" className="h-16 w-28" />
          </Link>
          <div className="">
            <Bars4Icon
              className="w-8 h-8 block lg:hidden cursor-pointer"
              onClick={() => setMobileMenu(!mobileMenu)}
            />
            {mobileMenu && (
              <div className="absolute top-20 right-0 w-96 lg:w-96 z-50 bg-white text-black min-h-[calc(50%-5rem)] block lg:hidden">
                <ul className="flex flex-col gap-5 w-full justify-center items-center">
                  <Link to="/home">Home</Link>
                  {!isAuthenticated ? (
                    <>
                      <Link to="/login">Signin</Link>
                      <Link to="/register">Signup</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/write">Write</Link>
                      {user && <Link to="/profile">{user.name}</Link>}
                      <button
                        onClick={handleLogout}
                        className="p-2 bg-red-600 rounded-md text-white"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          <div className="hidden lg:flex gap-5 items-center">
            <ul className="flex gap-5 items-center">
              <Link to="/home">Home</Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/login">Signin</Link>
                  <Link to="/register">Signup</Link>
                </>
              ) : (
                <>
                  <Link to="/write">Write</Link>
                  {user && <Link to="/profile">{user.name}</Link>}
                  <button
                    onClick={handleLogout}
                    className="p-2 bg-red-600 rounded-md text-white"
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
            <DarkModeButton />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
