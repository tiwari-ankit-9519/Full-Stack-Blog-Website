import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import showAlert from "../UI/Modal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import regBG from "../assets/regBG.jpg";
import Loading from "../UI/Loading";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    profileImage: null,
  });

  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  useGSAP(() => {
    gsap.fromTo(
      ".inputs",
      {
        opacity: 0,
        x: -200,
      },
      {
        opacity: 1,
        x: 0,
        duration: 2,
        stagger: {
          amount: 1,
          grid: "auto",
        },
      }
    );

    gsap.fromTo(
      "img",
      {
        opacity: 0,
        x: 200,
        overflow: "hidden",
      },
      {
        opacity: 1,
        x: 0,
        overflow: "hidden",
        duration: 2,
      }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    dispatch(registerUser(data))
      .unwrap()
      .then(() => {
        showAlert("User created successfully", "success");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        showAlert(error, "error");
        console.error(error);
      });
  };

  const handleMouseEnter = () => {
    gsap.to("#btn", {
      scale: 1.1,
      backgroundColor: "#3498db",
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    gsap.to("#btn", {
      scale: 1,
      backgroundColor: "#1F2937",
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 min-h-screen">
          <form className="flex flex-col justify-center h-full font-roboto">
            <div className="flex justify-center items-center flex-col gap-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white inputs">
                Welcome to Blogism
              </h1>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-3 focus:outline-none w-96 rounded-md text-white bg-zinc-800/70 inputs"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 focus:outline-none w-96 rounded-md text-white bg-zinc-800/70 inputs"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="px-4 py-3 focus:outline-none w-96 rounded-md text-white bg-zinc-800/70 inputs"
              />
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="px-4 py-3 focus:outline-none w-96 rounded-md text-white bg-zinc-800/70 inputs"
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-3 focus:outline-none w-96 rounded-md text-white bg-zinc-800/70 inputs"
              />
              <input
                type="file"
                name="profileImage"
                onChange={handleChange}
                className="px-4 py-3 focus:outline-none w-96 rounded-md text-white bg-zinc-800/70 inputs"
              />
              <button
                type="submit"
                onClick={handleSubmit}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                id="btn"
                className="px-4 py-3 focus:outline-none w-96 rounded-md text-white bg-zinc-800/70 inputs"
              >
                Signup
              </button>
              <p className="text-white inputs">
                Already have an account?{" "}
                <Link to="/login" href="/login">
                  <span className="hover:text-blue-500 transition-all">
                    Login
                  </span>
                </Link>
              </p>
            </div>
          </form>
          <section className="hidden sm:hidden md:hidden lg:block overflow-hidden w-full h-full">
            <img
              src={regBG}
              alt="regBG"
              className="w-full h-full object-cover"
            />
          </section>
        </main>
      )}
    </>
  );
}
