import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
    userId:'sath7277',
    bloodType:'AB+',
    dob:"2004-10-24",
    number:"9087079062",
    familymembernumber:'123456789'
  });

  useEffect(() => {
    console.log("UserData",userdata);
  }, [userdata]);
  
  const updateData = (newData) => {
    setuserdata({...newData });
  };

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return randomNumber.toString().substring(0, 5);
  };
  
  const handleNameChange = (e) => {
    const newuserId = e.target.value.substring(0, 4).toLowerCase() + generateRandomNumber();
    updateData({...userdata, [e.target.name]:e.target.value,userId:newuserId });
  };

  return (
    <userContext.Provider value={{ userdata, updateData,handleNameChange }}>
      {children}
    </userContext.Provider>
  );
};
