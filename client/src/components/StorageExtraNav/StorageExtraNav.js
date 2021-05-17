import React from "react";
import { useCreateDir } from "../../hooks/createDirectory.hook";

import { ReactComponent as CreateFolderLogo } from "../../img/folder-plus.svg";

import s from "./StorageExtraNav.module.css";

export const StorageExtraNav = (props) => {
  const { updateStorage } = props;
  const {
    onClickCreateDir,
    onChangeCreateDirName,
    createButtonStype,
    createNameDir,
  } = useCreateDir(s)

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <nav className={s.extraNav}>
      <div className={s.searchNav}>
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
      </div>
      <div className={s.createFolderRow}>
        <form className={s.createFolderForm} onSubmit={submitHandler}>
          <input
            className={s.createFolderField}
            placeholder="Название новой папки"
            id="new-folder"
            onChange={onChangeCreateDirName}
            type="text"
            name="new-folder"
            maxLength="20"
          />
          <button
            className={createButtonStype}
            onClick={onClickCreateDir}
            disabled={!createNameDir}
          >
            <CreateFolderLogo />
          </button>
        </form>
      </div>
    </nav>
  );
};
