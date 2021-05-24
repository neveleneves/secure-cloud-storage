import React from "react";

import { StorageExtraNav } from "../StorageExtraNav/StorageExtraNav";
import { StorageUploadFileNav } from "../StorageUploadFileNav/StorageUploadFileNav";

import s from "./StorageActionNav.module.css";

export const StorageActionNav = (props) => {
  const { updateStorage, searchStorageFiles, loadingSearch} = props;

  return (
    <div className={s.navContainer}>
      <StorageExtraNav
        updateStorage={updateStorage}
        searchStorageFiles={searchStorageFiles}
        loadingSearch={loadingSearch}
      />
      <StorageUploadFileNav updateStorage={updateStorage} />
    </div>
  );
};
