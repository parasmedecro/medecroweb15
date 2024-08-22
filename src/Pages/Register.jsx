import React, { useContext } from "react";
import logo from "../Resources/logo.png";
import quote from "../Resources/health.jpg";
import { Link } from "react-router-dom";
import { userContext } from "../Context/UserContext";
import { useEffect } from "react";
import { PopupContext } from "../Context/PopupContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { userdata, updateData, handleNameChange } = useContext(userContext);
  const { displayPopup } = useContext(PopupContext);
  const navigate = useNavigate()

  const encrypt = (text, shift) => {
    return text.split('').map(char => {
        const charCode = char.charCodeAt(0);
        const shiftedCharCode = (charCode + shift) % 256;
        return String.fromCharCode(shiftedCharCode);
    }).join('');
  }

  const ClickHandler = () => {
    if(userdata.name==="" || userdata.email==="" || userdata.password==="")
    {
      displayPopup("Create an Account", "wrong");
      return;
    }
    displayPopup("Registered Successfully", "correct");
    setTimeout(() => {
      console.log(encrypt(userdata.password,3))
      updateData({...userdata,password:encrypt(userdata.password,3)})
      console.log(userdata)
      navigate('/Login')
    }, 1000);
  };

  const signup = useGoogleLogin(
    {
      onSuccess: async (credentialResponse) => {
        const accessToken = credentialResponse.access_token
        try
        {
          const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)
          if(response)
          {
              updateData({...userdata,name:response.data.name,email:response.data.email})
          }
          displayPopup("Google Sign Up Successful", "correct");
          setTimeout(() => { navigate("/Login") }, 1000);
        }
        catch (error) {
          console.error("Error fetching Google user data:", error);
          displayPopup("Sign Up With Google", "wrong");
        }
      },
      onError: (error) => console.log('Login Failed:', error)
    }
  )

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(userdata));
  }, [userdata]);

  return (
    <div
      style={{ fontFamily: "Poppins" }}
      className="flex items-center justify-center w-screen h-screen bg-violet-100"
    >
      <div className="flex items-center w-3/5 h-3/4 rounded-lg drop-shadow-2xl bg-violet-300 gap-x-10">
        <div className="w-1/2 flex justify-center ml-5">
          <div className="flex items-center justify-center flex-col mx-12 my-6">
            <img alt="logo" className="w-16" src={logo} />
            <h1 className="text-2xl font-medium mt-2 mb-5">Create Account</h1>
            <div
              className="flex items-center justify-center w-full bg-white rounded-full"
              onClick={signup}
            >
                <>
                  <img
                    alt="google icon"
                    className="w-9 h-9 cursor-pointer"
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  />
                  <p className="cursor-pointer">Sign Up with Google</p>
                </>
                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    updateData({
                      ...userdata,
                      name: details.name,
                      email: details.email,
                    });
                    displayPopup("Google Sign Up Successful", "correct");
                    setTimeout(() => {
                      navigate("/Login");
                    }, 2000);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /> */}
            </div>
            <p className="text-xs mt-4">
              ------- or Sign Up with Email -------
            </p>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="flex items-center justify-center w-full bg-white rounded-full my-4 px-3 py-2"
              onChange={handleNameChange}
            />
            <div className="w-full flex flex-col items-center">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="peer flex items-center justify-center w-full bg-white rounded-full mt-4 px-3 py-2 border-2 focus:outline-none focus:border-violet-800 focus:invalid:border-pink-500 focus:invalid:text-pink-600"
                onChange={(e) =>
                  updateData({ ...userdata, [e.target.name]: e.target.value })
                }
              />
              <p className="text-pink-600 invisible peer-invalid:visible">
                Please provide a valid email address
              </p>
            </div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="flex items-center justify-center w-full bg-white rounded-full my-4 px-3 py-2 "
              onChange={(e) =>
                updateData({ ...userdata, [e.target.name]: e.target.value })
              }
            />
            <button
              onClick={ClickHandler}
              className="flex items-center justify-center bg-violet-500 rounded-full w-full p-2 my-3 hover:scale-105"
            >
              Sign Up
            </button>
            <p className="text-sm">
              Been here before?{" "}
              <Link to="/Login" className="font-semibold text-violet-950">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="w-1/2 rounded-lg flex items-center justify-center m-3 mr-7">
          <img
            alt="Quotes image"
            className="rounded-3xl shadow-2xl w-11/12 h-11/12"
            src={quote}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
