import React, { useRef, useState } from "react";
// import { useRequst } from "../../hooks/request.hook";

import s from "./StorageActionNav.module.css";

export const StorageActionNav = (props) => {
  const { updateStorage, loadingStorage} = props;

  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sendButtonStyle, setSendButtonStyle] = useState(
    `${s.sendFileDisable}`
  );
  // const {ajaxRequest, loadingProcess, error } = useRequst();

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

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const sendToServer = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData,
      });
      const uploadFile = await response.json();

      if (!response.ok) {
        throw new Error(uploadFile.message || "Запрос был выполнен неверно");
      }

      updateStorage();

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

  return (
    <div className={s.storageAction}>
      <nav className={s.actionNav}>
        <div className={s.searchRow}>
          <label className={s.searchIcon}>
            <input
              className={s.searchField}
              placeholder="Найти документ"
              id="search"
              type="text"
              name="search"
            />
          </label>
        </div>
        <div className={s.buttonsRow}>
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
            />
            <button
              className={sendButtonStyle}
              onClick={sendToServer}
              disabled={loading || !file}
            >
              Отправить
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};
