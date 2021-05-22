import { useContext, useState } from "react";

import { DirectoryPathContext } from "../context/directoryPathContext";

import { useRequest } from "./request.hook";

export const useDirAction = (directory) => {
  const { getFullPath, changeCurrentPath } = useContext(DirectoryPathContext);

  const [loadingDownloadDir, setLoadingDownloadDir] = useState(false);
  const [loadingDeleteDir, setLoadingDeleteDir] = useState(false);
  const [directoryState, setDirectoryState] = useState(directory);
  const { ajaxRequest } = useRequest();

  const downloadDirOnClickHandler = async () => {
    try {
      setLoadingDownloadDir(true);

      const pathToDirectory = getFullPath() + `/${directory.name}`;

      const response = await fetch(
        `/api/storage/download/dir/${pathToDirectory}`
      );
      if (response.ok && response.status !== 204) {
        let { protocol, hostname, port } = window.location;
        hostname === "localhost"
          ? (port = "5000")
          : ({ port } = window.location);

        window.open(
          `${protocol}//` +
            `${hostname}` +
            `:${port}` +
            `/api/storage/download/dir/${pathToDirectory}`,
          "_blank"
        );
      }

      setLoadingDownloadDir(false);
    } catch (e) {
      setLoadingDownloadDir(false);
      console.warn("Не удалось загрузить директорию с сервера: ", e.message);
    }
  };

  const deleteDirectory = async () => {
    try {
      setLoadingDeleteDir(true);

      const pathToDirectory = getFullPath() + `/${directory.name}`;

      const directoryDeleted = await ajaxRequest(
        `/api/storage/delete/dir/${pathToDirectory}`,
        "DELETE"
      );
      if (directoryDeleted) {
        setDirectoryState(null);
        setLoadingDeleteDir(false);
      }
    } catch (e) {
      setLoadingDeleteDir(false);
      console.warn("Не удалось удалить директорию с сервера: ", e.message);
    }
  };

  const moveOnClickHandler = async () => {
    changeCurrentPath(directory.name);
  };

  return {
    loadingDownloadDir,
    loadingDeleteDir,
    directoryState,
    downloadDirOnClickHandler,
    deleteDirectory,
    moveOnClickHandler,
  };
};
