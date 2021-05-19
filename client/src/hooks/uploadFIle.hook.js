import { useContext, useRef, useState } from "react";
import { DirectoryPathContext } from "../context/directoryPathContext";

export const useUploadFile = (s) => {
  const {getFullPath} = useContext(DirectoryPathContext);

  const [loadingProcess, setLoading] = useState(false);
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [sendButtonStyle, setSendButtonStyle] = useState(
    `${s.sendFileDisable}`
  );

  const uploadOnClickHandler = () => {
    hiddenFileInput.current.click();
  };

  const uploadOnChangeHandler = (event) => {
    const newFile = event.target.files[0];

    if (newFile) {
      setFile(newFile);
      setSendButtonStyle(`${s.sendFileActive}`);
    }
  };

  const sendToServer = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const fullPath = getFullPath();

      const response = await fetch(`/api/storage/upload/${fullPath}`, {
        method: "POST",
        body: formData,
      });
      const uploadFile = await response.json();

      if (!response.ok) {
        throw new Error(uploadFile.message || "Запрос был выполнен неверно");
      }

      setLoading(false);
      setFile(null);
      setSendButtonStyle(`${s.sendFileDisable}`);
    } catch (e) {
      setLoading(false);
      setFile(null);
      setSendButtonStyle(`${s.sendFileDisable}`);

      console.warn("Не удалось загрузить файл: ", e.message);
    }
  };

  return {
    hiddenFileInput,
    sendButtonStyle,
    file,
    loadingProcess,
    sendToServer,
    uploadOnClickHandler,
    uploadOnChangeHandler,
    getFullPath
  };
};
