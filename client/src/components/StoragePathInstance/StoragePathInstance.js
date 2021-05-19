import React from "react";

import s from "./StoragePathInstance.module.css";

import { ReactComponent as PathSpliter } from "../../img/right-small.svg";

export const StoragePathInstance = (props) => {
  const {name, pathValue} = props;

  return (
    <li className={s.pathItem}>
      <PathSpliter />
      <a className={`${s.pathLink} ${s.activePathLink}`} href="/">
        {`${name}`}
      </a>
    </li>
  );
};
