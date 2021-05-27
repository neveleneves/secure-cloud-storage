import React from "react";

import { StorageExtraNav } from "../StorageExtraNav/StorageExtraNav";
import { StorageUploadFileNav } from "../StorageUploadFileNav/StorageUploadFileNav";

import s from "./StorageActionNav.module.css";

export const StorageActionNav = (props) => {
  const { updateStorage, searchStorageFiles } = props;

  return (
    <div className={s.navContainer}>
      <StorageExtraNav
        updateStorage={updateStorage}
        searchStorageFiles={searchStorageFiles}
      />
      <StorageUploadFileNav updateStorage={updateStorage} />
    </div>
  );
};
