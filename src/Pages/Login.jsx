import React, { useContext, useEffect, useState } from "react";
import logo from "../Resources/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../Context/UserContext";
import { PopupContext } from "../Context/PopupContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';

const Login = () => {
  const { userdata } = useContext(userContext);
  const [loginemail, setloginemail] = useState("");
  const [loginpass, setpass] = useState("");
  const { displayPopup } = useContext(PopupContext);
  const navigate = useNavigate()

  useEffect(() => {
    const storeddata = localStorage.getItem("userdata");
    console.log("Stored data",storeddata)
  }, []);

  const decrypt = (text, shift) => {
    return text.split('').map(char => {
        const charCode = char.charCodeAt(0);
        const shiftedCharCode = (charCode - shift) % 256;
        return String.fromCharCode(shiftedCharCode);
    }).join('');
  }

  const ClickHandler = () => {
    if(userdata.email==="")
    {
      displayPopup("Enter Email", "wrong");
      return;
    }
    if (userdata.email === loginemail) {
      console.log(userdata.password)
      if (decrypt(userdata.password,3) === loginpass) {
        displayPopup("Login Successful", "correct");
        if(userdata.role=="Patient")
        {
          setTimeout(() => {
            navigate('/dashBoard')
          }, 1000);
        }
        else
        {
          setTimeout(() => {
            navigate('/DocDashboard')
          }, 1000);
        }
      } else {
        displayPopup("Invalid Password", "wrong");
      }
    } else {
      displayPopup("Invalid Email Id", "wrong");
    }
  };


  const login = useGoogleLogin({
    onSuccess:async (credentialResponse) => {
      const accessToken = credentialResponse.access_token
      try
      {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)
        console.log("google",response.data)
        console.log("context",userdata)
        if (
          response.data.name === userdata.name &&
          response.data.email === userdata.email
        ) {
          displayPopup("Google Login Successful", "correct");
          setTimeout(() => {
            navigate("/dashBoard")
          }, 1000);
        }
        else
        {
          displayPopup("Sign Up With Google","wrong")
        }
      }
      catch (error) {
        // console.error("Error fetching Google user data:", error);
        displayPopup("Sign Up With Google", "wrong");
      }
        },
        onError: (error) => console.log('Login Failed:', error)
  })

  return (
    <div
      style={{ fontFamily: "Poppins" }}
      className="flex items-center justify-center w-screen h-screen bg-violet-100"
    >
      <div className="flex flex-row w-3/5 h-3/7 rounded-2xl drop-shadow-2xl bg-violet-300">
        <div className="w-6/12 rounded-lg">
          <img
            alt="loginImg"
            className="rounded-lg w-full h-full"
            src="https://img.freepik.com/premium-photo/doctors-day-poster-flyer-banner-doctors-day-free-photos_539191-37613.jpg?w=740"
          />
        </div>
        <div className="w-6/12">
          <div className="flex items-center justify-center flex-col mx-10 my-7">
            <h2 className="flex items-center justify-center text-violet-800 font-semibold">
              <img alt="googlelogo" className="w-12" src={logo} /> HealthMate
            </h2>
            <h1 className="text-2xl font-medium my-5 mx-14">
              Sign in to HealthMate
            </h1>
            <div
              className="flex items-center justify-center w-9/12 bg-white rounded-full"
              onClick={login}
            >
                <>
                  <img
                    alt="google icon"
                    className="w-9 h-9 cursor-pointer"
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  />
                  <p className="cursor-pointer">Sign In with Google</p>
                </>
            </div>
            <p className="text-sm mt-6">
              ------- or Sign in with Email -------
            </p>
            <div className="w-full flex flex-col items-center">
              <input
                type="email"
                placeholder="Email"
                className="peer flex items-center justify-center w-9/12 bg-white rounded-full mt-5 mb-2 px-3 py-2 border-2 focus:outline-none focus:border-violet-800 focus:invalid:border-pink-500 focus:invalid:text-pink-600"
                onChange={(e) => setloginemail(e.target.value)}
              />
              <p className="text-pink-600 invisible peer-invalid:visible">
                Please provide a valid email address
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <input
                type="password"
                placeholder="Password"
                className="peer flex items-center justify-center w-9/12 bg-white rounded-full mt-2 mb-2 px-3 py-2 border-2 focus:outline-none focus:border-violet-800 focus:invalid:border-pink-500 focus:invalid:text-pink-600"
                onChange={(e) => setpass(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") ClickHandler();
                }}
              />
              <p className="text-pink-600 invisible peer-invalid:visible">
                Please provide a valid password
              </p>
            </div>
            <button
              onClick={ClickHandler}
              className="flex items-center justify-center bg-violet-500 rounded-full w-9/12 p-2 my-2 hover:scale-105"
            >
              login
            </button>
            <p className="text-sm">
              Not Yet Registered?{" "}
              <Link to="/Register" className="font-semibold text-violet-950">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
