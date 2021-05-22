import { useState } from "react";

export const useCurrentPath = () => {
  const [currentPath, setCurrentPath] = useState([
    { pathValue: "root", name: "Домашняя папка" },
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

  const backToDirectory = (indexPath) => {
    setCurrentPath([...currentPath].slice(0, indexPath + 1));
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
    backToDirectory,
    getFullPath,
  };
};
