import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const encrypt = (text, shift) => {
    return text.split('').map(char => {
        const charCode = char.charCodeAt(0);
        const shiftedCharCode = (charCode + shift) % 256;
        return String.fromCharCode(shiftedCharCode);
    }).join('');
  }


  const [userdata, setuserdata] = useState({
    name: "Dummy Patient",
    email: "dummy@gmail.com",
    password: encrypt("123456A",3),
    userId:'sath7277',
    role:'patient',
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
