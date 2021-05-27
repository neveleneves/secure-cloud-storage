import React from "react";

import { useUploadFile } from "../../hooks/uploadFIle.hook";

import s from "./StorageUploadFileNav.module.css";

export const StorageUploadFileNav = (props) => {
  const { updateStorage } = props;

  const {
    hiddenFileInput,
    sendButtonStyle,
    file,
    loadingProcess,
    sendToServer,
    uploadOnClickHandler,
    uploadOnChangeHandler,
    getFullPath,
  } = useUploadFile(s);

  const sendFileHandler = async () => {
    await sendToServer();
    await updateStorage(getFullPath());
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <nav className={s.uploadFileNav}>
      <label className={s.uploadFileInfo}>
        {file ? (
          <span>
            Выбранный файл:
             <span className={s.uploadFileName}> {file.name}</span>
          </span>
        ) : (
          <span>Выберите файл для загрузки</span>
        )}
      </label>
      <form
        className={s.fileUploadForm}
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <button className={s.uploadFile} onClick={uploadOnClickHandler}>
          Загрузить файл
        </button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={uploadOnChangeHandler}
          hidden
          id="file-upload"
        />
        <button
          className={sendButtonStyle}
          onClick={sendFileHandler}
          disabled={loadingProcess || !file}
        >
          Отправить
        </button>
      </form>
    </nav>
  );
};
