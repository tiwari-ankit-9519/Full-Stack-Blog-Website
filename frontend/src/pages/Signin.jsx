import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/userSlice";
import { useState } from "react";
import Loading from "../UI/Loading";
import showAlert from "../UI/Modal";
import logBG from "../assets/logBG.jpg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        showAlert("Login successful!", "success");
        navigate("/");
      })
      .catch((error) => {
        showAlert(error, "error");
        console.error(error);
      });
  };

  useGSAP(() => {
    gsap.fromTo(
      ".inputs",
      {
        opacity: 0,
        x: 200,
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
        x: -200,
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
          <section className="hidden sm:hidden md:hidden lg:block xl:block overflow-hidden w-full h-full">
            <img
              src={logBG}
              alt="login background"
              className="h-full w-full object-cover"
            />
          </section>
          <form
            className="flex flex-col justify-center h-full font-roboto text-white"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center items-center flex-col gap-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white inputs">
                Welcome Back!
              </h1>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="px-4 py-3 focus:outline-none bg-zinc-800/70 w-96 rounded-md inputs"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="px-4 py-3 focus:outline-none bg-zinc-800/70 w-96 rounded-md inputs"
                onChange={handleChange}
              />
              <button
                className="px-4 py-3 text-white bg-zinc-800/70 w-96 rounded-md hover:scale-[1.1] hover:bg-[#3498db] inputs"
                id="btn"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Sign In
              </button>
              <p className="inputs">
                Don&apos;t have an account?
                <span className="hover:text-blue-500 cursor-pointer transition-all">
                  {" "}
                  Singup
                </span>
              </p>
            </div>
          </form>
        </main>
      )}
    </>
  );
};

export default Signin;
