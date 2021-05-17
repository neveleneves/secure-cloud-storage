import { useState } from "react";
import { useRequest } from "./request.hook";

export const useCreateDir = (s) => {
  const [createButtonStype, setCreateButtonStyle] = useState(
    `${s.createFolder}`
  );
  const [createNameDir, setCreateNameDir] = useState(null);
  const { loadingProcess, ajaxRequest, error } = useRequest();

  const onClickCreateDir = async (event) => {
    try {
      const directoryCreated = await ajaxRequest(
        `/api/storage/create_dir/${createNameDir}`, 'POST'
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
    onClickCreateDir,
    onChangeCreateDirName,
  };
};
