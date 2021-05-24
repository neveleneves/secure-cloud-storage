import React, { useContext } from "react";

import { useFileAction } from "../../hooks/fileInstanceAction.hook";
import { useDirAction } from "../../hooks/dirInstanceAction.hook";

import { DirectoryPathContext } from "../../context/directoryPathContext";

import { ReactComponent as DocumentLogo } from "../../img/text-document-alt.svg";
import { ReactComponent as MediaLogo } from "../../img/image-document.svg";
import { ReactComponent as DirectoryLogo } from "../../img/folder.svg";
import { ReactComponent as DownloadLogo } from "../../img/download.svg";
import { ReactComponent as DeleteLogo } from "../../img/delete.svg";

import s from "./StorageFileInstance.module.css";

export const StorageFileInstance = (props) => {
  const { file, updateStorage } = props;
  const { getFullPath } = useContext(DirectoryPathContext);

  const {
    loadingDownloadFile,
    loadingDeleteFile,
    fileState,
    downloadFileOnClickHandler,
    deleteFile,
  } = useFileAction(file);

  const {
    loadingDownloadDir,
    loadingDeleteDir,
    directoryState,
    downloadDirOnClickHandler,
    deleteDirectory,
    moveOnClickHandler,
  } = useDirAction(file);

  const deleteFileOnClickHandler = async (event) => {
    await deleteFile();
    await updateStorage(getFullPath());
  };

  const deleteDirOnClickHandler = async (event) => {
    await deleteDirectory();
    await updateStorage(getFullPath());
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

  return fileState || directoryState ? (
    <tr className={s.fileLine}>
      <td className={s.fileType}>{getTypeFileLogo()}</td>
      <td className={s.fileName}>
        <button
          className={s.fileNameLink}
          onClick={
            file.type !== "directory"
              ? downloadFileOnClickHandler
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
            onClick={
              file.type !== "directory"
                ? downloadFileOnClickHandler
                : downloadDirOnClickHandler
            }
            disabled={loadingDownloadFile || loadingDownloadDir}
          >
            <DownloadLogo />
          </button>
          <button
            className={s.fileDelete}
            href={"!#"}
            onClick={
              file.type !== "directory"
                ? deleteFileOnClickHandler
                : deleteDirOnClickHandler
            }
            disabled={loadingDeleteFile || loadingDeleteDir}
          >
            <DeleteLogo />
          </button>
        </nav>
      </td>
    </tr>
  ) : null;
};
