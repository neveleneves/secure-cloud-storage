import React from "react";

import { StoragePathList } from "../../components/StoragePathList/StoragePathList";
import { StorageActionNav } from "../../components/StorageActionNav/StorageActionNav";
import { StorageDirStructure } from "../../components/StorageDirStructure/StorageDirStructure";
import { StorageActiveMenu } from "../../components/StorageActiveMenu/StorageActiveMenu";

import s from "./StoragePage.module.css";

import { useGetStorage } from "../../hooks/getStorageDirectory.hook";
import { useCurrentPath } from "../../hooks/currentPath.hook";
import { DirectoryPathContext } from "../../context/directoryPathContext";

export default function StoragePage() {
  const { changeCurrentPath, currentPath, getFullPath} = useCurrentPath();
  const { loadingProcess, storageFiles, getUserStorage } =
    useGetStorage(currentPath);

  return (
    <DirectoryPathContext.Provider value={{ currentPath, changeCurrentPath, getFullPath}}>
      <section className={s.storage}>
        <div className={`${s.wrapper} ${s.container}`}>
          <div className={s.body}>
            <div className={s.wrapperBody}>
              <div className={s.containerBody}>
                <div className={s.contentHeader}>
                  <StoragePathList />
                  <StorageActionNav
                    updateStorage={getUserStorage}
                    loadingStorage={loadingProcess}
                  />
                </div>
                <div className={s.contentBody}>
                  <StorageDirStructure
                    userFiles={storageFiles}
                    updateStorage={getUserStorage}
                    loadingStorage={loadingProcess}
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
    </DirectoryPathContext.Provider>
  );
}
