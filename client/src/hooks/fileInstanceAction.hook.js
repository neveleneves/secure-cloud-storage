import { useContext, useState } from "react";
import { DirectoryPathContext } from "../context/directoryPathContext";

import { useRequest } from "./request.hook";

export const useFileAction = (file) => {
  const { getFullPath } = useContext(DirectoryPathContext);

  const [loadingDownloadFile, setLoadingDownloadFile] = useState(false);
  const [loadingDeleteFile, setLoadingDeleteFile] = useState(false);
  const [fileState, setFileState] = useState(file);
  const { ajaxRequest } = useRequest();

  const downloadFileOnClickHandler = async () => {
    try {
      setLoadingDownloadFile(true);

      const response = await fetch(
        `/api/storage/download/file/${file.unique_name}`
      );
      if (response.ok) {
        let { protocol, hostname, port } = window.location;
        hostname === "localhost"
          ? (port = "5000")
          : ({ port } = window.location);

        window.open(
          `${protocol}//` +
            `${hostname}` +
            `:${port}` +
            `/api/storage/download/file/${file.unique_name}`,
          "_blank"
        );
      }

      setLoadingDownloadFile(false);
    } catch (e) {
      setLoadingDownloadFile(false);
      console.warn("Не удалось загрузить файл с сервера: ", e.message);
    }
  };

  const deleteFile = async () => {
    try {
      setLoadingDeleteFile(true);

      const fileDeleted = await ajaxRequest(
        `/api/storage/delete/file/${file.unique_name}`,
        "DELETE"
      );

      if (fileDeleted) {
        setFileState(null);
        setLoadingDeleteFile(false);
      }
    } catch (e) {
      setLoadingDeleteFile(false);
      console.warn("Не удалось удалить файл с сервера: ", e.message);
    }
  };

  return {
    loadingDownloadFile,
    loadingDeleteFile,
    fileState,
    getFullPath,
    downloadFileOnClickHandler,
    deleteFile,
  };
};
