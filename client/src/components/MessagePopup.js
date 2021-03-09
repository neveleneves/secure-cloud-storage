import React from "react";

export const MessagePopup = (props) => {
  alert(props)
  return (
    <div className="message">
      <div className="message__wrapper">
        <h2 className="message__text">
          Неправильный пароль, введите снова
        </h2>
      </div>
    </div>
  );
};
