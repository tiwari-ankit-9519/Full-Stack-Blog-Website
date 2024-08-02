import { logoutUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import showAlert from "../UI/Modal";
import Loading from "../UI/Loading";
import { useState } from "react";
import { IconMenu4 } from "@tabler/icons-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const isAuthenticated = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(logoutUser());
    setTimeout(() => {
      showAlert("Logout successful!", "success");
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  const handleMobileMenuToggle = () => {
    if (mobileMenuOpen) {
      gsap.to(".mobileMenu", {
        opacity: 0,
        x: 200,
        duration: 0.5,
        onComplete: () => setMobileMenuOpen(false),
      });
    } else {
      setMobileMenuOpen(true);
      gsap.fromTo(
        ".mobileMenu",
        {
          opacity: 0,
          x: -200,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
        }
      );
    }
  };

  useGSAP(() => {
    if (mobileMenuOpen) {
      gsap.fromTo(
        ".mobileMenu",
        {
          opacity: 0,
          x: -500,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
        }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <nav className="flex justify-between text-white px-10 py-5 text-xl items-center font-roboto font-bold bg-zinc-800 shadow-md">
          <h3 className="font-bold">Blog</h3>
          <div>
            <IconMenu4
              className="block sm:block md:block lg:hidden xl:hidden cursor-pointer relative"
              onClick={handleMobileMenuToggle}
            />
            {mobileMenuOpen && (
              <div className="absolute right-1 top-[4.5rem] bg-zinc-800 mobileMenu z-50">
                <ul className="flex flex-col w-52 gap-2 px-5 py-5 rounded-md">
                  <Link
                    to="/"
                    className="bg-white/70 text-black px-4 text-center rounded-md py-2 "
                    onClick={handleMobileMenuToggle}
                  >
                    Home
                  </Link>
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        className="bg-white/70 text-black px-4 text-center rounded-md py-2"
                        onClick={handleMobileMenuToggle}
                      >
                        Signin
                      </Link>
                      <Link
                        to="/register"
                        className="bg-white/70 text-black px-4 text-center rounded-md py-2"
                        onClick={handleMobileMenuToggle}
                      >
                        Signup
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/create"
                        className="bg-white/70 text-black px-4 text-center rounded-md py-2"
                        onClick={handleMobileMenuToggle}
                      >
                        Write
                      </Link>
                      <Link
                        to="/profile"
                        className="bg-white/70 text-black px-4 text-center rounded-md py-2"
                        onClick={handleMobileMenuToggle}
                      >
                        {user.name.split(" ")[0]}
                      </Link>
                      <Link
                        to="/"
                        className="bg-red-500 rounded px-4 text-center py-2"
                        onClick={handleMobileMenuToggle}
                      >
                        Logout
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
          <ul className="hidden sm:hidden md:hidden lg:flex xl:flex gap-5 items-center">
            <Link to="/" className="hover:text-red-500 transition-all">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/create"
                  className="hover:text-red-500 transition-all"
                >
                  Write
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-red-500 transition-all flex items-center gap-2"
                >
                  <img
                    src={user.profileImage}
                    alt="pi"
                    className="w-10 h-10 flex justify-center items-center rounded-full"
                  />
                  {user.name.split(" ")[0]}
                </Link>
                <Link
                  to="/"
                  className="px-4 py-2 font-medium bg-red-500 rounded-md transition-all hover:bg-red-600"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-red-500 transition-all">
                  Signin
                </Link>
                <Link
                  to="/register"
                  className="hover:text-red-500 transition-all"
                >
                  Signup
                </Link>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
