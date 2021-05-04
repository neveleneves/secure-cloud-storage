import React, { useState } from "react";

import { useRequest } from "../../hooks/request.hook";

import { ReactComponent as DocumentLogo } from "../../img/text-document-alt.svg";
import { ReactComponent as MediaLogo } from "../../img/image-document.svg";
import { ReactComponent as DirectoryLogo } from "../../img/folder.svg";

import { ReactComponent as DownloadLogo } from "../../img/download.svg";
import { ReactComponent as DeleteLogo } from "../../img/delete.svg";

import s from "./StorageFileInstance.module.css";

export const StorageFileInstance = (props) => {
  const { file, updateStorage} = props;

  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { ajaxRequest } = useRequest();

  const downloadFileHandler = async () => {
    try {
      setLoadingDownload(true);

      const fileDownloaded = await ajaxRequest("/api/storage/download/:id");
      if(fileDownloaded) {
        
      }
      setLoadingDownload(false);
    } catch (e) {
      setLoadingDownload(false);
      console.warn("Не удалось загрузить файл с сервера", e.message);
    }
  };

  const deleteFileHandler = async () => {
    try {
      setLoadingDelete(true);

      const fileDeleted = await ajaxRequest("/api/storage/delete/:id", 'DELETE')
      if(fileDeleted) {
        updateStorage()
      }

      setLoadingDelete(false);
    } catch (e) {
      setLoadingDelete(false);
      console.warn("Не удалось удалить файл с сервера", e.message);
    }
  };

  const getTypeFileLogo = () => {
    switch (file.type) {
      case "media":
        return <MediaLogo />;
      case "document":
        return <DocumentLogo />;
      case "directory":
        return <DirectoryLogo />;
      default:
        return <DocumentLogo />;
    }
  };

  return (
    <tr className={s.fileLine}>
      <td className={s.fileType}>{getTypeFileLogo()}</td>
      <td className={s.fileName}>
        <a className={s.fileNameLink} href="/">
          {file.name}
        </a>
      </td>
      <td className={s.fileSize}>{file.size} MB</td>
      <td className={s.fileAction}>
        <nav className={s.fileNav}>
          <button onClick={downloadFileHandler} className={s.fileDownload}>
            <DownloadLogo />
          </button>
          <button onClick={deleteFileHandler} className={s.fileDelete}>
            <DeleteLogo />
          </button>
        </nav>
      </td>
    </tr>
  );
};
