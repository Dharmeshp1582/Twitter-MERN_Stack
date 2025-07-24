import React, { useState } from "react";
import { USER_API_ENDPOINT } from "../utils/Constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(name, username, email, password);

    if (isLogin) {
      //login
      try {
        const response = await axios.post(
          `${USER_API_ENDPOINT}/login`,
          { email, password },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(getUser (response?.data?.user));
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //register
      try {
        const response = await axios.post(
          `${USER_API_ENDPOINT}/register`,
          { name, username, email, password },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          navigate("/login");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
     
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex">
      {/* Left side with Twitter logo */}
      <div className="hidden md:flex flex-1 bg-gray-100 items-center justify-center">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.KgP6GNtgqBpwPQNuS_GGCAHaHa?pid=Api&P=0&h=180"
          alt="Twitter Logo"
          className="w-64 h-64"
        />
      </div>
      {/* Right side with login form */}
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 py-10 rounded-2xl shadow-lg bg-gray-100">
          <div className="flex justify-center mb-8">
            <img
              src="https://tse1.mm.bing.net/th/id/OIP.KgP6GNtgqBpwPQNuS_GGCAHaHa?pid=Api&P=0&h=180"
              alt="Twitter Logo"
              className="w-12 h-12"
            />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-black text-center">
            {isLogin ? "Login to Twitter" : "Register to Twitter"}
          </h2>
          <form onSubmit={submitHandler}>
            {!isLogin && (
              <>
                {" "}
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all duration-200 text-base bg-white"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all duration-200 text-base bg-white "
                    required
                  />
                </div>
              </>
            )}

            <div className="mb-3">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all duration-200 text-base bg-white"
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-all duration-200 text-base bg-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-3 rounded-full font-bold text-lg hover:bg-gray-500 transition-colors shadow-md active:scale-95 mb-4 cursor-pointer"
            >
              {isLogin ? "Log In" : "Register"}
            </button>

            <div className="border-t pt-6 text-center">
              <span className="text-gray-600 text-base">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <span
                className="text-blue-500 font-semibold ml-1 hover:text-gray-500 text-base cursor-pointer"
                onClick={loginSignupHandler}
              >
                {isLogin ? "Create Account" : "Login"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
