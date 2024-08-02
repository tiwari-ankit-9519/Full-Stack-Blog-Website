/* eslint-disable react/prop-types */
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ProfileCard = ({ name, email, age, phone, profileImage }) => {
  useGSAP(() => {
    gsap.fromTo(
      "#profile-card",
      {
        opacity: 0,
        scale: 0.5,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power4.inOut",
      }
    );
  }, []);

  return (
    <div className="flex justify-center items-center w-[100%] min-h-[100vh] ">
      <div
        className="flex flex-col relative mx-5 rounded-md z-10 border-white border "
        id="profile-card"
      >
        <div className="relative h-[32rem] w-[25rem] rounded-md bg-white" />
        <div className="absolute top-10 z-50 left-[29%] sm:left-[31%] md:left-[31%] lg:left-[31%] xl:left-[31%]">
          <img
            src={profileImage}
            alt="profile"
            className=" flex items-center justify-center rounded-full border w-40 h-40 "
          />
        </div>
        <div className="flex flex-col justify-center px-20 w-[25rem] gap-3 mt-12 text-black font-roboto absolute top-48">
          <h1 className="text-3xl font-bold">Name: {name}</h1>
          <p className="text-xl font-medium">Email: {email}</p>
          <p className="text-xl font-medium">Age: {age}</p>
          <p className="text-xl font-medium">Phone: {phone}</p>
          <button className="text-md bg-green-600 rounded-md px-4 py-2 font-medium hover:bg-green-700 text-white">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
