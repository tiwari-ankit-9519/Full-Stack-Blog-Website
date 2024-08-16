import { Link } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const RegisterForm = ({
  handleFormSubmit,
  handleChange,
  formData,
  handleImageChange,
}) => {
  return (
    <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
      <h1 className="text-4xl lg:text-7xl font-extrabold dark:text-white">
        Create an account
      </h1>
      <p className="dark:text-white text-zinc-400 font-semibold transition-all">
        Already have an account?{" "}
        <Link to="/signup" className="hover:text-blue-600">
          Sign in
        </Link>
      </p>
      <label className="font-bold dark:text-white">Name</label>
      <div className="flex flex-col relative">
        <input
          type="text"
          name="name"
          className="p-3 border border-zinc-400 focus:outline-none focus:border-2 focus:border-blue-600 rounded-md pl-14"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <div className="absolute inset-y-0 flex items-center pr-4 ml-5">
          <UserIcon className="h-6 w-6 " />
        </div>
      </div>

      <label className="font-bold dark:text-white">Email</label>
      <div className="flex flex-col relative">
        <input
          type="email"
          name="email"
          className="p-3 border dark:text-white border-zinc-400 focus:outline-none focus:border-2 focus:border-blue-600 rounded-md pl-14"
          placeholder="abc@example.com"
          onChange={handleChange}
          value={formData.email}
        />
        <div className="absolute inset-y-0 flex items-center pr-4 ml-5">
          <EnvelopeIcon className="h-6 w-6 " />
        </div>
      </div>
      <div className="flex gap-5 flex-col sm:flex-col md:flex-col lg:flex-row">
        <div className="flex flex-col w-full gap-3 sm:w-full md:w-full lg:w-1/2">
          <label className="font-bold dark:text-white">Age</label>
          <div className="flex relative">
            <input
              type="number"
              name="age"
              className="p-3 border border-zinc-400 focus:outline-none focus:border-2 focus:border-blue-600 rounded-md pl-14 w-full"
              placeholder="Age"
              onChange={handleChange}
              value={formData.age}
            />
            <div className="absolute inset-y-0 flex items-center pr-4 ml-5">
              <UserIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-3 sm:w-full md:w-full lg:w-1/2">
          <label className="font-bold dark:text-white">Phone</label>
          <div className="flex relative">
            <input
              type="text"
              name="phone"
              className="p-3 border border-zinc-400 focus:outline-none focus:border-2 focus:border-blue-600 rounded-md pl-14 w-full"
              placeholder="Phone Number"
              onChange={handleChange}
              value={formData.phone}
            />
            <div className="absolute inset-y-0 flex items-center pr-4 ml-5">
              <PhoneIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      <label className="font-bold dark:text-white">Password</label>
      <div className="flex flex-col relative">
        <input
          type="password"
          name="password"
          className="p-3 border dark:text-white border-zinc-400 focus:outline-none focus:border-2 focus:border-blue-600 rounded-md pl-14"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <div className="absolute inset-y-0 flex items-center pr-4 ml-5">
          <LockClosedIcon className="h-6 w-6 " />
        </div>
      </div>
      <label className="font-bold dark:text-white">Profile Image</label>
      <div className="flex flex-col relative">
        <input
          type="file"
          name="profileImage"
          onChange={handleImageChange}
          className="w-full dark:text-white text-gray-400 font-semibold text-sm bg-white border border-zinc-400 file:cursor-pointer cursor-pointer file:border-0 file:py-4 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
        />
        <p className="text-xs text-gray-400 mt-2">PNG and JPG are Allowed.</p>
      </div>
      <button className="border dark:text-white border-blue-500 hover:bg-blue-600 hover:text-white transition-all p-3 rounded-md font-bold">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
