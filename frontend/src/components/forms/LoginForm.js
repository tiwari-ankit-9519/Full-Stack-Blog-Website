import React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const LoginForm = ({
  handleFormSubmit,
  handleFormChange,
  formData,
  showPassword,
  toggleShowPassword,
}) => {
  return (
    <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
      <h1 className="text-4xl lg:text-7xl font-extrabold text-center dark:text-white">
        Welcome Back 👋
      </h1>
      <p className="dark:text-white text-zinc-400 font-semibold transition-all">
        Not registered yet?{" "}
        <Link to="/signup" className="hover:text-blue-600">
          Signup
        </Link>
      </p>
      <div className="flex flex-col gap-2">
        <label className="font-bold dark:text-white">Email</label>
        <div className="flex flex-col">
          <input
            type="text"
            name="email"
            value={formData.email}
            className="p-4 border border-zinc-400 focus:outline-none focus:border-2 focus:border-blue-600 rounded-md"
            placeholder="Email"
            onChange={handleFormChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold dark:text-white">Password</label>
        <div className="flex flex-col relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="p-4 border border-zinc-400 focus:outline-none focus:border-2 focus:border-blue-600 rounded-md pr-12"
            placeholder="Password"
            value={formData.password}
            onChange={handleFormChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {showPassword ? (
              <EyeIcon
                className="h-6 w-6 cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <EyeSlashIcon
                className="h-6 w-6 cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        </div>
      </div>
      <button className="p-4 border-blue-500 border hover:bg-blue-600 transition-all rounded-md text-black hover:text-white dark:text-white mt-5 font-bold">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
