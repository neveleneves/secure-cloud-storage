import { useState } from "react";

export const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState([
    { pathValue: "root", name: "Домашняя папка" },
    //KEY WARNING BY SIMULAR NAME
  ]);

  const changeCurrentPath = (toDirectory) => {
    setCurrentPath([
      ...currentPath,
      {
        pathValue: `/${toDirectory}`,
        name: `${toDirectory}`,
      },
    ]);
  };

  const getFullPath = () => {
    const fullPath = currentPath.reduce((path, dirItem) => {
      return path + dirItem.pathValue;
    }, "");
    return fullPath;
  };

  return {
    currentPath,
    changeCurrentPath,
    getFullPath
  };
};
