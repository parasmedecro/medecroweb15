import React, { useContext, useState } from "react";
import { userContext } from "../Context/UserContext";
import { useEffect } from "react";

function InputField({ name, label, value, onChange, placeholder }) {
  return (
    <div className=" mr-4">
      <label className="block text-lg font-semibold m-2">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full border border-gray-300 rounded-sm py-2 px-3"
      />
    </div>
  );
}

// Main form component
const GeneralInfo = () => {
  const { userdata, updateData, handleNameChange } = useContext(userContext);
  const [newdata, setnewdata] = useState(userdata);

  const copyUserIdToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(newdata.userId);
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    console.log(newdata);
  }, [newdata]);

  const handleChange = (e) => {
    setnewdata({ ...newdata, [e.target.name]: e.target.value });
  };

  const NameChange = (e) => {
    handleChange(e);
    handleNameChange(e);
  };

  return (
    <div className="flex">
      <div className="mt-8 ml-16 rounded-xl w-1/3">
        <div className="relative text-center h-1/3">
          <img
            className="mb-20 w-11/12 h-42 bg-gray-300 rounded-lg z-0"
            src="https://png.pngtree.com/thumb_back/fh260/background/20190828/pngtree-dark-vector-abstract-background-image_302715.jpg"
            alt="background card profile"

          />
          <img
            className="absolute z-10 top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-white rounded-full mt-5 hover:scale-110"
            alt="React"
            src="https://th.bing.com/th/id/OIG3.yqL0ZX6lhjYsggUxMId1?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
            }}
          />
          <div className="absolute top-2/3 mt-6 text-2xl bg-white h-2/3 rounded-xl text-center w-11/12 pt-20 z-0 font-semibold">{userdata.name}</div>
        </div>
      </div>
      <div className="p-8 bg-violet-300 m-5 rounded-3xl mx-8 shadow-xl">
        <h2 className="text-xl font-semibold text-left mb-4">Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            name="name"
            value={userdata.name}
            label="Name"
            onChange={NameChange}
            placeholder="Enter your name"
          />
          <InputField
            name="userId"
            value={userdata.userId}
            label="User ID (read only)"
            onChange={handleChange}
            placeholder="User ID will be generated automatically"
            readOnly
            id="userId"
          />
          <div className="mr-4">
            <label className="block text-lg font-semibold m-2">Birthday</label>
            <input
              type="date"
              name="dob"
              value={newdata.dob}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-sm py-2 px-3"
            />
          </div>
          <InputField
            name="bloodType"
            value={newdata.bloodType}
            label="Blood Group"
            onChange={handleChange}
            placeholder="Enter your Blood Group"
          />
          <InputField
            name="number"
            value={newdata.number}
            label="Mobile Number"
            onChange={handleChange}
            placeholder="Enter your Mobile Number"
          />
          <InputField
            name="familyMemberContact"
            value={newdata.familymembernumber}
            label="Family Member Contact"
            onChange={handleChange}
            placeholder="Enter family member contact"
          />
        </div>
        <button
          onClick={() => {
            updateData(newdata);
            localStorage.setItem("userdata", JSON.stringify(newdata));
          }}
          className="mt-9 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-3xl hover:scale-105"
        >
          Save All
        </button>
        <button
          onClick={copyUserIdToClipboard}
          className="mt-9 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-3xl ml-4 hover:scale-105"
        >
          Copy User ID
        </button>
      </div>
    </div>
  );
};

export default GeneralInfo;
