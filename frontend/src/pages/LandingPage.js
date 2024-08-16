import login from "../assets/login.png";
import signup from "../assets/signin.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="min-h-[calc(100vh-5rem)] flex overflow-hidden lg:mx-44">
      <section className="flex flex-col justify-center items-center w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 ">
        <div className="flex flex-col justify-center items-center">
          <img src={logo} alt="" />
          <h1 className="text-7xl font-extrabold text-center dark:text-white">
            The Blog - Personal Blog
          </h1>
        </div>
        <div className="flex items-center space-x-4 mt-10">
          <Link
            to="/login"
            className="text-black dark:text-white p-3 rounded-md font-bold"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-white px-8 py-3 dark:text-white bg-blue-600 rounded-md font-bold"
          >
            Signup
          </Link>
        </div>
      </section>
      <section className="relative w-1/2 hidden sm:hidden md:hidden lg:block xl:block ">
        <img src={login} alt="" className="absolute z-50 min-h-screen" />
        <img src={signup} alt="" className="absolute top-0 z-10 min-h-screen" />
      </section>
    </main>
  );
};

export default LandingPage;
