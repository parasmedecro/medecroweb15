import React, { useContext } from "react";
import wrong from "../Resources/cross.png";
import correct from "../Resources/checked.png";
import { PopupContext } from "../Context/PopupContext";

const Popup = () => {
  const { popuptype, popupMessage } = useContext(PopupContext);

  return (
    <div className="bg-white rounded-xl w-56 h-20 shadow-5xl absolute bottom-5 right-5 m-5 border-gray-300 border-4 py-2 flex items-center">
      <img src={popuptype == 'correct' ? correct : wrong} className="w-10 mx-5" />
      <p>{popupMessage}</p>
    </div>
  );
};

export default Popup;
