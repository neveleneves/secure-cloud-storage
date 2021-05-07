import { useState } from "react";

import { useRequest } from "./request.hook";

export const useFileAction = (file) => {
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [fileState, setFileState] = useState(file);
  const { ajaxRequest } = useRequest();

  const downloadOnClickHandler = async () => {
    try {
      setLoadingDownload(true);

      const response = await fetch(`/api/storage/download/${file.name}`);
      if (response.ok) {
        let { protocol, hostname, port } = window.location;
        hostname === "localhost"
          ? (port = "5000")
          : ({ port } = window.location);

        window.open(
          `${protocol}//` +
            `${hostname}` +
            `:${port}` +
            `/api/storage/download/${file.name}`,
          "_blank"
        );
      }

      setLoadingDownload(false);
    } catch (e) {
      setLoadingDownload(false);
      console.warn("Не удалось загрузить файл с сервера: ", e.message);
    }
  };

  const deleteFile = async () => {
    try {
      setLoadingDelete(true);

      const fileDeleted = await ajaxRequest(
        `/api/storage/delete/${file.name}`,
        "DELETE"
      );

      if (fileDeleted) {
        setFileState(null);
        setLoadingDelete(false);
        // await updateStorage();
      }
    } catch (e) {
      setLoadingDelete(false);
      console.warn("Не удалось удалить файл с сервера: ", e.message);
    }
  };

  return {
    loadingDownload,
    loadingDelete,
    fileState,
    downloadOnClickHandler,
    deleteFile,
  };
};
