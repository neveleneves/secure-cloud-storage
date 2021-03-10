import React from "react";

export const MessageError = (props) => {
  const message = props.message;

  return (
    <div className="message">
      <div className="message__wrapper">
        <h2 className="message__text">
          {message}
        </h2>
      </div>
    </div>
  );
};
