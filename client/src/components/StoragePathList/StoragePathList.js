import React, { useContext } from "react";

import s from "./StoragePathList.module.css";

import { StoragePathInstance } from "../StoragePathInstance/StoragePathInstance";

import { DirectoryPathContext } from "../../context/directoryPathContext";

export const StoragePathList = () => {
  const { currentPath, backToDirectory } = useContext(DirectoryPathContext);

  return (
    <ul className={s.filePathList}>
      {currentPath.map((pathInstance, index, fullPath) => {
        return (
          <StoragePathInstance
            indexPath={index}
            name={pathInstance.name}
            stateActive={index === fullPath.length - 1 ? true : false}
            backToDirectory={backToDirectory}
            key={`${pathInstance.name}-${index}`}
          />
        );
      })}
    </ul>
  );
};
