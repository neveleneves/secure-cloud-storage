import React from "react";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import { StorageFileInstance } from "../StorageFileInstance/StorageFileInstance";

import s from "./StorageDirStructure.module.css";

export const StorageDirStructure = (props) => {
  const { userFiles, updateStorage, loadingStorage } = props;

  return (
    <div className={s.dirStructure}>
      {!loadingStorage ? (
        <div className={s.fileView}>
          {!userFiles ? (
            <div className={s.titleContainer}>
              <h2 className={s.emptyTitle}>
                В директории вашего хранилища - нет файлов
                <br />
              </h2>
            </div>
          ) : (
            <table className={s.dirTable}>
              <tbody>
                <tr className={s.titleLine}>
                  <td className={s.titleTypeFile}></td>
                  <td className={s.titleName}>Имя</td>
                  <td className={s.titleSize}>Размер файла</td>
                  <td className={s.titleAction}>Действие</td>
                </tr>
                {userFiles.map((fileInstance) => {
                  return (
                    <StorageFileInstance
                      file={fileInstance}
                      updateStorage={updateStorage}
                      key={fileInstance._id}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ) : 
      <div className={s.loaderContainer}>
        <LoadingSpinner/>
      </div>
      }
    </div>
  );
};
