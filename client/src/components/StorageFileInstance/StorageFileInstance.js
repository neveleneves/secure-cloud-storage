import React, { useContext } from "react";

import { ReactComponent as DocumentLogo } from "../../img/text-document-alt.svg";
import { ReactComponent as MediaLogo } from "../../img/image-document.svg";
import { ReactComponent as DirectoryLogo } from "../../img/folder.svg";

import { ReactComponent as DownloadLogo } from "../../img/download.svg";
import { ReactComponent as DeleteLogo } from "../../img/delete.svg";

import { DirectoryPathContext } from "../../context/directoryPathContext";

import { useFileAction } from "../../hooks/fileInstanceAction.hook";

import s from "./StorageFileInstance.module.css";

export const StorageFileInstance = (props) => {
  const { file, updateStorage } = props;

  const {changeCurrentPath} = useContext(DirectoryPathContext);

  const {
    loadingDownload,
    loadingDelete,
    fileState,
    downloadOnClickHandler,
    deleteFile,
  } = useFileAction(file);

  const deleteOnClickHandler = async (event) => {
    await deleteFile();
    await updateStorage();
  };

  const moveOnClickHandler = async (event) => {
    changeCurrentPath(file.name);
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

  return fileState ? (
    <tr className={s.fileLine}>
      <td className={s.fileType}>{getTypeFileLogo()}</td>
      <td className={s.fileName}>
        <button
          className={s.fileNameLink}
          onClick={
            file.type !== "directory"
              ? downloadOnClickHandler
              : moveOnClickHandler
          }
        >
          <span className={s.fileNameLinkText}>{file.name}</span>
        </button>
      </td>
      <td className={s.fileSize}>
        {file.type !== "directory" ? `${file.size} MB` : "—"}
      </td>
      <td className={s.fileAction}>
        <nav className={s.fileNav}>
          <button
            className={s.fileDownload}
            onClick={downloadOnClickHandler}
            disabled={loadingDownload}
          >
            <DownloadLogo />
          </button>
          <button
            className={s.fileDelete}
            href={"!#"}
            onClick={deleteOnClickHandler}
            disabled={loadingDelete}
          >
            <DeleteLogo />
          </button>
        </nav>
      </td>
    </tr>
  ) : null;
};
