import React, { createContext, useState } from 'react';

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupMessage, setPopupMessage] = useState('correct');
  const [popuptype, setPopuptype] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const displayPopup = (message,type) => {
    setShowPopup(true);
    setPopuptype(type);
    setPopupMessage(message);
    setTimeout(() => {
      setShowPopup(false);
      setPopuptype('correct');
      setPopupMessage('');
    }, 1500);
  };

  return (
    <PopupContext.Provider value={{ popupMessage, showPopup, displayPopup,popuptype }}>
      {children}
    </PopupContext.Provider>
  );
};
