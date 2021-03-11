import React from "react";
import s from './MessageError.module.css'

export const MessageError = (props) => {
  const message = props.message;

  return (
    <div className={s.message}>
      <div className={s.wrapper}>
        <h2 className={s.text}>
          {message}
        </h2>
      </div>
    </div>
  );
};
