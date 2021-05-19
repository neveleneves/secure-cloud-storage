import { useContext, useState } from "react";
import { DirectoryPathContext } from "../context/directoryPathContext";
import { useRequest } from "./request.hook";

export const useCreateDir = (s) => {
  const [createButtonStype, setCreateButtonStyle] = useState(
    `${s.createFolder}`
  );
  const [createNameDir, setCreateNameDir] = useState(null);
  const { loadingProcess, ajaxRequest } = useRequest();

  const {getFullPath} = useContext(DirectoryPathContext);

  const createDirectory = async (event) => {
    try {
      const fullPath = getFullPath();

      const directoryCreated = await ajaxRequest(
        `/api/storage/create_dir/${fullPath}`,
        "POST",
        {createNameDir}
      );
    } catch (e) {
      console.warn("Не удалось создать директорию: ", e.message);
    }
  };

  const onChangeCreateDirName = (event) => {
    setCreateNameDir(event.target.value);

    if (event.target.value) {
      setCreateButtonStyle(`${s.createFolder} ${s.createFolderActive}`);
    } else setCreateButtonStyle(`${s.createFolder}`);
  };

  return {
    createButtonStype,
    createNameDir,
    createDirectory,
    onChangeCreateDirName,
    loadingProcess,
    getFullPath
  };
};
