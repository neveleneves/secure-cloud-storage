import React from "react";

import s from "./StorageDirStructure.module.css";

export default function StorageDirStructure() {
  return (
    <div className={s.dirStructure}>
      <table className={s.dirTable}>
        <tbody>
          <tr className={s.titleLine}>
            <td className={s.titleItem}>Имя</td>
            <td className={s.titleItem}>Последнее изменение</td>
            <td className={s.titleItem}>Действие</td>
          </tr>
          <tr className={s.fileLine}>
            <td className={s.fileName}>Work.txt</td>
            <td className={s.fileLastChange}>25.05.21 17:03:01</td>
            <td className={s.fileAction}>
              <button></button>
              <button></button>
              <button></button>
            </td>
          </tr>
          <tr className={s.fileLine}>
            <td className={s.fileName}>Work.txt</td>
            <td className={s.fileLastChange}>25.05.21 17:03:01</td>
            <td className={s.fileAction}>
              <button></button>
              <button></button>
              <button></button>
            </td>
          </tr>
          <tr className={s.fileLine}>
            <td className={s.fileName}>Work.txt</td>
            <td className={s.fileLastChange}>25.05.21 17:03:01</td>
            <td className={s.fileAction}>
              <button></button>
              <button></button>
              <button></button>
            </td>
          </tr>
          <tr className={s.fileLine}>
            <td className={s.fileName}>Work.txt</td>
            <td className={s.fileLastChange}>25.05.21 17:03:01</td>
            <td className={s.fileAction}>
              <button></button>
              <button></button>
              <button></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
