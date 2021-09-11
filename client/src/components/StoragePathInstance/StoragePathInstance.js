import React from "react";

import s from "./StoragePathInstance.module.css";

import { ReactComponent as PathSpliter } from "../../img/right-small.svg";

//Компонент по обновлению текущего пути в файловой системе
export const StoragePathInstance = (props) => {
  //Получение свойств из общего объекта props
  const { name, indexPath = null, stateActive, backToDirectory = null} = props;

  const anchorDirOnClickHandler = () => {
    backToDirectory(indexPath);
  };

  //JSX шаблон компонента
  return (
    <li className={s.pathItem}>
      <PathSpliter />
      <button
        className={
          stateActive ? `${s.pathLink} ${s.activePathLink}` : `${s.pathLink}`
        }
        onClick={anchorDirOnClickHandler}
        disabled={stateActive}
      >
        {name}
      </button>
    </li>
  );
};

