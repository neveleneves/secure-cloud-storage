import React, { useContext } from "react";

import s from "./StoragePathList.module.css";

import { StoragePathInstance } from "../StoragePathInstance/StoragePathInstance";

import {DirectoryPathContext} from "../../context/directoryPathContext"

export const StoragePathList = () => {
  const {currentPath, changeCurrentPath} = useContext(DirectoryPathContext);

  return (
    <ul className={s.filePathList}>
      {currentPath.map((pathInstance) => {
        return (
        <StoragePathInstance
        pathValue={pathInstance.pathValue}
        name={pathInstance.name}
        key={pathInstance.pathValue}
         />
        )
      })}
    </ul>
  );
};
