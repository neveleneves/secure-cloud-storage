import React from "react";

import s from "./StoragePathInstance.module.css";

import { ReactComponent as PathSpliter } from "../../img/right-small.svg";

export const StoragePathInstance = (props) => {
  const { name, indexPath, stateActive, backToDirectory } = props;
  
  const anchorDirOnClickHandler = () => {
    backToDirectory(indexPath);
  }

  return (
    <li className={s.pathItem}>
      <PathSpliter />
      <button
        className={
          stateActive ? `${s.pathLink} ${s.activePathLink}` : `${s.pathLink}`
        }
        onClick={anchorDirOnClickHandler}
        disabled={stateActive}
      >{name}</button>
    </li>
  );
};
