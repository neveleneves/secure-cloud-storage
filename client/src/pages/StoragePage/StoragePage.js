import React from "react";

import { StoragePathList } from "../../components/StoragePathList/StoragePathList";
import { StorageActionNav } from "../../components/StorageActionNav/StorageActionNav";
import { StorageDirStructure } from "../../components/StorageDirStructure/StorageDirStructure";
import { StorageActiveMenu } from "../../components/StorageActiveMenu/StorageActiveMenu";

import s from "./StoragePage.module.css";

import { useGetStorage } from "../../hooks/getStorageDirectory.hook";

export default function StoragePage() {
  const {loadingProcess, storageFiles} = useGetStorage()

  return (
    <section className={s.storage}>
      <div className={`${s.wrapper} ${s.container}`}>
        <div className={s.body}>
          <div className={s.wrapperBody}>
            <div className={s.containerBody}>
              <div className={s.contentHeader}>
                <StoragePathList />
                <StorageActionNav />
              </div>
              <div className={s.contentBody}>
                <StorageDirStructure 
                userStorage={storageFiles}
                />
              </div>
              <div className={s.sidebar}>
                <StorageActiveMenu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
