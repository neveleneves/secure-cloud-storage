import React from "react";

import { useCreateDir } from "../../hooks/createDirectory.hook";

import { ReactComponent as CreateFolderLogo } from "../../img/folder-plus.svg";

import s from "./StorageExtraNav.module.css";

export const StorageExtraNav = (props) => {
  const { updateStorage, searchStorageFiles } = props;

  const {
    createDirectory,
    onChangeCreateDirName,
    createButtonStype,
    createNameDir,
    loadingProcess,
    getFullPath,
  } = useCreateDir(s);

  const createDirOnClickHandler = async (event) => {
    await createDirectory();
    await updateStorage(getFullPath());
  };

  const searchOnChangeHandler = async (event) => {
    await searchStorageFiles(event.target.value.replace(/\s+/g, ""));
  };

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
              onChange={searchOnChangeHandler}
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
            onClick={createDirOnClickHandler}
            disabled={!createNameDir || loadingProcess}
          >
            <CreateFolderLogo />
          </button>
        </form>
      </div>
    </nav>
  );
};
