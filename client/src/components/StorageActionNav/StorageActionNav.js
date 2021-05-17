import React from "react";

import { StorageExtraNav } from "../StorageExtraNav/StorageExtraNav";
import { StorageUploadFileNav } from "../StorageUploadFileNav/StorageUploadFileNav";

import s from "./StorageActionNav.module.css";

export const StorageActionNav = (props) => {
  const { updateStorage } = props;

  return (
    <div className={s.navContainer}>
      <StorageExtraNav updateStorage={updateStorage}/>
      <StorageUploadFileNav updateStorage={updateStorage} />
    </div>
  );
};
