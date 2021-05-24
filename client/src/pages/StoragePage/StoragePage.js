import React from "react";

import { StoragePathList } from "../../components/StoragePathList/StoragePathList";
import { StorageActionNav } from "../../components/StorageActionNav/StorageActionNav";
import { StorageDirStructure } from "../../components/StorageDirStructure/StorageDirStructure";
import { StorageActiveMenu } from "../../components/StorageActiveMenu/StorageActiveMenu";

import s from "./StoragePage.module.css";

import { useGetStorage } from "../../hooks/getStorageDirectory.hook";
import { useCurrentPath } from "../../hooks/currentPath.hook";
import { DirectoryPathContext } from "../../context/directoryPathContext";
import { useSearchFile } from "../../hooks/searchFile.hook";

export default function StoragePage() {
  const { currentPath, changeCurrentPath, getFullPath, backToDirectory } =
    useCurrentPath();
  const { loadingProcess, storageFiles, getUserStorage } =
    useGetStorage(currentPath);
  const {
    getSearchResultsStorage,
    searchValue,
    loadingSearchFiles,
    searchResultFiles,
  } = useSearchFile();

  console.log(storageFiles)
  console.log(searchResultFiles)
  return (
    <DirectoryPathContext.Provider
      value={{
        currentPath,
        changeCurrentPath,
        backToDirectory,
        getFullPath,
      }}
    >
      <section className={s.storage}>
        <div className={`${s.wrapper} ${s.container}`}>
          <div className={s.body}>
            <div className={s.wrapperBody}>
              <div className={s.containerBody}>
                <div className={s.contentHeader}>
                  <StoragePathList />
                  <StorageActionNav
                    updateStorage={getUserStorage}
                    searchStorageFiles={getSearchResultsStorage}
                    loadingSearch={loadingSearchFiles}
                  />
                </div>
                <div className={s.contentBody}>
                  <StorageDirStructure
                    userFiles={!searchResultFiles ? storageFiles : searchResultFiles}
                    loadingStorage={!searchResultFiles ? loadingProcess : loadingSearchFiles }
                    updateStorage={getUserStorage}
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
